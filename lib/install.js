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
    return /^(@.+)\/(.+)$/.exec( name ).slice( 1 )
}

const downloadJson = function install_downloadJson ( name ) {
    const [ author, repository ] = splitName( name )

    const rawspec = `https://raw.githubusercontent.com/${ author }/${ repository }/master/${ repository }.json`

    if ( !fs.existsdirSync( node_modules ) ) fs.mkdirSync( node_modules )

    const atAuthor = join( node_modules, '@' + auther )
    if ( !fs.existsdirSync( atAuthor ) ) fs.mkdirSync( atAuthor )

    const JSONspec = join( atAuthor, name + json )
    fs.download( rawspec, JSONspec )

    return JSONspec
}

const getParrentModule = function install_getParrentModule ( code ) {
    return Object.keys( code )[0]
}

const makeModule = function install_makeModule ( name ) {

    const [ author, repository ] = splitName( name )

    const atAuthor = join( node_modules, '@' + auther )
    const JSONspec = join( atAuthor, name + json )

    let source = fs.readTextFileSync( JSONspec )
    const code = JSON.parse( source )
    const parent = getParrentModule( code )

    Object.keys( code ).forEach( key => {
        const exp = new RegExp( `^(\\{${repository}\\})` )
        code[ key ].path = code[ key ].path.replace( exp, `{@${ author }/${ repository }}` )
    } )

    source = JSON.stringify( code, null, 4 )

    return `// source: https://github.com/${ author }/${ repository }
const mods = ${ source }
Object.keys( mods ).forEach( key => wes.Modules[ key ] = mods[ key ] )
module.exports = require( '${ parent }' )
`
}

install( argv[1] )