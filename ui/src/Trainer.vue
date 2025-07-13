<template>
		<div id="trainer-root">
				<div id="trainercontainer" v-if="showTrainer">
						<p class="traineroption trainertitle">{{ trainerTitle }}</p>
						<p v-for="(item, index) in menuPage"
							 :class="{ traineroption: true, selected: index == selected, sub: item.sub != null }"
							 :sub="item.sub"
							 :action="item.action"
							 :data-state="getItemStateString(item.action)"
							 :key="getItemKey(item)">
								{{ item.text }}
						</p>
						<PageIndicator :page="page" :page-count="pageCount"></PageIndicator>
				</div>

				<PreviewImage :img="currentImage"></PreviewImage>
		</div>
</template>

<script lang="ts">
import type { MenuItem } from '@common/Menu'
import { defineComponent } from 'vue'
import PageIndicator from './components/PageIndicator.vue'
import PreviewImage from './components/PreviewImage.vue'

type UnparsedConfig = { [key: string]: string }
type Config = { [key: string]: boolean }

export default defineComponent({
	components: {
		PreviewImage,
		PageIndicator,
	},
	data() {
		const itemStates: { [action: string]: boolean } = {}
		const config: Config = {}
		const menus: { [menuName: string]: MenuItem[] } = {
			mainmenu: [{ text: 'Waiting for menus to download...' }],
		}

		return {
			trainerTitle: 'Virakal Menu',
			maxPageSize: 15,
			showTrainer: false,
			menus,
			currentMenuKey: 'mainmenu',
			page: 0,
			selected: 0,
			config,
			itemStates,
		}
	},
	computed: {
		pageCount(): number {
			return Math.ceil(
				this.menus[this.currentMenuKey].length / this.maxPageSize,
			)
		},
		menuPage(): MenuItem[] {
			return this.menus[this.currentMenuKey].slice(
				this.page * this.maxPageSize,
				(this.page + 1) * this.maxPageSize,
			)
		},
		currentItem(): MenuItem {
			const currentIndex = this.page * this.maxPageSize + this.selected
			return this.menus[this.currentMenuKey][currentIndex]
		},
		currentImage(): string | undefined {
			const currentIndex = this.page * this.maxPageSize + this.selected
			return this.menus[this.currentMenuKey][currentIndex]
				? this.menus[this.currentMenuKey][currentIndex].image
				: undefined
		},
		currentMenu(): MenuItem[] {
			return this.menus[this.currentMenuKey]
		},
		parentKey(): string | undefined {
			// The main menu has no parent
			if (this.currentMenuKey === 'mainmenu') {
				return
			}

			const lastDot = this.currentMenuKey.lastIndexOf('.')

			// A key without a dot is a top-level one, so the parent is the main menu
			if (lastDot === -1) {
				return 'mainmenu'
			}

			// Get the string up to the last dot, so a.b.c returns a.b
			return this.currentMenuKey.substring(0, lastDot)
		},
	},
	created() {
		window.addEventListener('message', this.handleMessage, {
			passive: true,
		})

		this.sendData('uiReady')
	},
	methods: {
		// biome-ignore lint/suspicious/noExplicitAny: data can be anything
		async sendData(name: string, data: any = {}): Promise<Response> {
			// @ts-ignore
			return fetch(`https://${GetParentResourceName()}/${name}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json; charset=UTF-8',
				},
				body: JSON.stringify(data),
			})
		},
		playSound(sound: string): void {
			this.sendData('playsound', { name: sound })
		},
		showPage(page: number): void {
			this.page = page
			this.selected = 0
		},
		pageExists(page: number): boolean {
			return page >= 0 && page < this.pageCount
		},
		nextPage(): void {
			if (this.pageExists(this.page + 1)) {
				this.showPage(this.page + 1)
			} else if (this.pageCount > 1) {
				this.showPage(0)
			}

			this.playSound('NAV_UP_DOWN')
		},
		previousPage(): void {
			if (this.pageExists(this.page - 1)) {
				this.showPage(this.page - 1)
			} else if (this.pageCount > 1) {
				this.showPage(this.pageCount - 1)
			}

			this.playSound('NAV_UP_DOWN')
		},
		selectUp(): void {
			this.selected = this.selected
				? this.selected - 1
				: this.menuPage.length - 1
			this.playSound('NAV_UP_DOWN')
		},
		selectDown(): void {
			this.selected = (this.selected + 1) % this.menuPage.length
			this.playSound('NAV_UP_DOWN')
		},
		resetTrainer(): void {
			this.showMenu('mainmenu')
		},
		setMenu(menuName: string, menuData: MenuItem[]): void {
			// Grab any initial states that are included and update states on those we already have
			for (const key in menuData) {
				const item = menuData[key]

				if (item.state == null || item.action == null) {
					continue
				}

				if (item.action in this.itemStates) {
					item.state = this.getStateText(this.itemStates[item.action])
				} else if (item.configkey != null && item.configkey in this.config) {
					this.itemStates[item.action] = this.config[item.configkey]
					item.state = this.getStateText(this.config[item.configkey])
				} else {
					this.itemStates[item.action] = item.state === 'ON'
					item.state = this.getStateText(item.state)
				}

				menuData[key] = item
			}

			// Update the menus list
			this.menus[menuName] = menuData

			if (this.currentMenuKey === menuName) {
				// Because the underlying menu has changed, we need to force the update
				this.updateCurrentMenu()
			}
		},
		updateCurrentMenu(): void {
			const newMenuKey = this.currentMenuKey
			// Briefly change the currentMenuKey to force a recompute
			this.currentMenuKey = 'mainmenu'
			this.$forceUpdate()
			this.currentMenuKey = newMenuKey

			// If our selection is no longer available on the list, reset to 0
			if (this.selected >= this.currentMenu.length) {
				this.page = 0
				this.selected = 0
			}
		},
		showMenu(menuName: string): void {
			if (!this.menus[menuName]) {
				console.log(`No such menu as '${menuName}'`)
				this.showMenu('mainmenu')
				return
			}

			this.selected = 0
			this.page = 0
			this.currentMenuKey = menuName
		},
		handleSelection(): void {
			const sel = this.currentItem

			if (sel.sub) {
				this.showMenu(sel.sub)
			} else if (sel.action) {
				let newState = true

				if (sel.action in this.itemStates) {
					newState = !this.itemStates[sel.action]
					this.itemStates[sel.action] = newState
					this.$forceUpdate()
				}

				const data = sel.action.split(' ')

				console.log(
					`Sending message to server: ${data[0]}, action: ${data[1]}, newState: ${newState}`,
				)
				this.sendData(data[0], {
					action: data[1],
					newstate: newState,
					itemtext: sel.text,
				})
			}

			this.playSound('SELECT')
		},
		goBack(): void {
			if (typeof this.parentKey === 'undefined') {
				this.closeTrainer()
			} else {
				this.showMenu(this.parentKey)
			}

			this.playSound('BACK')
		},
		openTrainer(): void {
			this.resetTrainer()
			this.showTrainer = true
			this.playSound('YES')
		},
		closeTrainer(): void {
			this.resetTrainer()
			this.showTrainer = false
			this.sendData('trainerclose')
			this.playSound('NO')
		},
		updateFromConfig(config: UnparsedConfig): void {
			for (const key in config) {
				const value = config[key]

				if (value !== 'true' && value !== 'false') {
					// We only care about boolean configs from a UI perspective
					continue
				}

				this.config[key] = value === 'true'
			}
		},
		getStateText(value: boolean | string): string {
			if (typeof value === 'string') {
				value = value === 'true'
			}

			return value ? 'ON' : 'OFF'
		},
		getItemKey(item: MenuItem): string {
			return item.key || item.action || item.text
		},
		getItemStateString(action: string): string | undefined {
			if (action in this.itemStates) {
				return this.itemStates[action] ? 'ON' : 'OFF'
			}
		},
		handleMessage(event: MessageEvent): void {
			const item = event.data

			if (item.showtrainer) {
				this.openTrainer()
			} else if (item.hidetrainer) {
				this.closeTrainer()
			}

			if (item.trainerenter) {
				this.handleSelection()
			} else if (item.trainerback) {
				this.goBack()
			}

			if (item.trainerleft) {
				this.previousPage()
			} else if (item.trainerright) {
				this.nextPage()
			}

			if (item.trainerup) {
				this.selectUp()
			} else if (item.trainerdown) {
				this.selectDown()
			}

			if (item.setmenu) {
				this.setMenu(item.menuname, item.menudata)
			}

			if (item.configupdate) {
				this.updateFromConfig(item.config)
			}
		},
	},
})
</script>

<style>
		@font-face {
				font-family: "Roboto";
				src: url("assets/Roboto.ttf");
		}

		#trainercontainer {
				position: absolute;
				right: 200px;
				top: 100px;
		}

		p {
				font-family: "Roboto";
		}

		/* Need to move this into TrainerOption */
		.traineroption {
				display: flex;
				align-items: center;
				font-size: 16px;
				margin: 4px;
				color: white;
				height: 36px;
				width: 350px;
				background: rgba(0, 0, 0, 0.6);
				margin-top: -4px;
				padding-left: 5px;
		}

		.traineroption.trainertitle {
				justify-content: center;
				font-size: 25px;
				height: 75px;
				background: rgba(29, 123, 185, 0.8);
				text-shadow: 0 0 3px #340ba5;
		}

		.traineroption.trainertitle:after {
				margin-left: 0;
				margin-right: 0;
		}

		.traineroption:after {
				content: attr(data-state);
				margin-left: auto;
				margin-right: 10px;
		}

		.traineroption.sub:after {
				content: "»";
		}

		.traineroption.selected {
				background: rgba(255, 255, 255, 0.7);
				color: gray;
		}

		.traineroption.selected:after {
				content: attr(data-state);
		}

		.traineroption.selected.sub:after {
				content: "»";
		}
</style>
