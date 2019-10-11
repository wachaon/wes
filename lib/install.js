const argv = require( 'argv' )
const fs = require( 'filesystem' )
const Shell = require( 'WScript.Shell' )
const { join } = require( 'pathname' )

const cd = Shell.CurrentDirectory
const modules = 'node_modules'
const node_modules = join( cd, modules )
const json = '.json'
const js = '.js'

const install = function install ( name ) {
    const modspec = join( node_modules, name + js )
    const json = downloadJson( name )
    const script = makeModule( name )
    console.log( fs.writeTextFileSync( modspec, script ) )
    console.log( fs.deleteFileSync( json ) )
    console.log( fs.writeTextFileSync( 'temp.json', JSON.stringify( wes, null, 4 ) ) )
    console.log( `Installed ${ name }.` )
}

const splitName = function install_splitName ( name ) {
    const atmark = '@'
    if ( !name.includes( atmark ) ) throw new Error ( '' )
    return name.split( atmark )
}

const downloadJson = function install_downloadJson ( name ) {
    const [ author, repository ] = splitName( name )

    const JSONspec = join( node_modules, name + json )
    const rawspec = `https://raw.githubusercontent.com/${ author }/${ repository }/master/${ repository }.json`

    if ( !fs.folderExists( node_modules ) ) fs.mkdirSync( node_modules )
    fs.httpGet( rawspec, JSONspec )
    return JSONspec
}

const getParrentModule = function install_getParrentModule ( code ) {
    return Object.keys( code )[0]
}

const makeModule = function install_makeModule ( name ) {

    const [ author, repository ] = splitName( name )
    const JSONspec = join( node_modules, name + json )
    const source = fs.readTextFileSync( JSONspec )
    const code = JSON.parse( source )
    const parent = getParrentModule( code )

    return `// source: https://github.com/${ author }/${ repository }
const mods = ${ source }
Object.keys( mods ).forEach( key => wes.Modules[ key ] = mods[ key ] )
module.exports = require( '${ parent }' )
`
}

if (
    argv[2] === '/engine:Chakra' ||
    argv[2].toLowerCase() === '/color:monotone' ||
    argv[2].toLowerCase() === '/sec:unsafe' ||
    argv[2].toLowerCase() === '/sec:danger' ||
    argv[2].toLowerCase() === '/log:debug'
) throw new Error( 'Module must be specified' )
install( argv[2] )