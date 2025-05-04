fx_version 'cerulean'
game 'gta5'

author 'Virakal'
version '1.0.0'

fxdk_watch_command 'yarn' {'watch'}
fxdk_build_command 'yarn' {'build'}

file 'ui/dist/css/app.css'
file 'ui/dist/fonts/Roboto.ttf'
file 'ui/dist/index.html'
file 'ui/dist/js/app.js.map'
file 'ui/dist/js/app.js'
file 'ui/dist/js/chunk-vendors.js.map'
file 'ui/dist/js/chunk-vendors.js'

ui_page "ui/dist/index.html"

client_script 'dist/client.js'
server_script 'dist/server.js'
