fx_version 'cerulean'
game 'gta5'

author 'Virakal'
version '1.0.0'

fxdk_watch_command 'yarn' {'watch'}
fxdk_build_command 'yarn' {'build'}

file 'ui/dist/index.html'
file 'ui/dist/assets/Roboto.ttf'
file 'ui/dist/assets/index.js'
file 'ui/dist/assets/index.css'

ui_page 'ui/dist/index.html'

client_script 'dist/client.js'
server_script 'dist/server.js'
