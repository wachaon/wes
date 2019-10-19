const argv = require( 'argv' )
const fs = require( 'filesystem' )
const { join, dirname, CurrentDirectory } = require( 'pathname' )

const cd = CurrentDirectory
const modules = 'node_modules'
const g = join( dirname( WScript.ScriptFullName ), modules )
const node_modules = join( cd, modules )
const json = '.json'
const js = '.js'
const atmark = '@'

const install = function install ( name ) {
    const json = downloadJson( name )
    const script = makeModule( name )
    let file = name
    let spec = node_modules

    if ( argv.get( 'unsafe' ) || argv.get( 'danger' ) ) {
        if ( argv.get( 'c' ) || argv.get( 'core' ) ) file = splitName( name )[1]
        if ( argv.get( 'g' ) || argv.get( 'global' ) ) {
            spec = g
            if ( !fs.existsdirSync( spec ) ) fs.mkdirSync( spec )
        }
    }
    console.log( fs.writeTextFileSync( join( spec, file + js ), script ) )
    console.log( fs.deleteFileSync( json ) )
    console.log( '%sInstalled %s.', console.ansi.cyan, name )
}

const splitName = function install_splitName ( name ) {
    if ( !name.includes( atmark ) ) throw new Error ( '' )
    return name.split( atmark )
}

const downloadJson = function install_downloadJson ( name ) {
    const [ author, repository ] = splitName( name )

    const JSONspec = join( node_modules, name + json )
    const rawspec = `https://raw.githubusercontent.com/${ author }/${ repository }/master/${ repository }.json`

    if ( !fs.existsdirSync( node_modules ) ) fs.mkdirSync( node_modules )
    fs.download( rawspec, JSONspec )
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

install( argv[1] )