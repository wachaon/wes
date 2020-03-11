const argv = require( 'argv' )
const { options, security, security: { unsafe } } = argv

const { dirname, join, toPosixSep, posixSep } = require( 'pathname' )
const fs = require( 'filesystem' )

const global_install = security( unsafe ) && ( options.global || options.g )
const core_install = security( unsafe ) && ( options.core || options.c )

const cd = toPosixSep( require( 'WScript.Shell' ).CurrentDirectory )
const gd = dirname( WScript.ScriptFullName )
const ext_js = '.js'
const index_js = 'index' + ext_js
const ext_json = '.json'
const atmark = '@'
const modules = 'node_modules'
const modules_dir = global_install
    ? join( gd, modules )
    : join( cd, modules )

function splitArg ( arg ) {
    const exp = /^@(.+)\/(.+)$/
    if ( exp.test( arg ) ) return exp.exec( arg ).slice( 1 )
    throw new Error( '@author/repository' )
}

function genSpec ( arg ) {
    const [ author, repository ] = splitArg( arg )
    const script_raw = `https://raw.githubusercontent.com/${ author }/${ repository }/master/${ repository }.json`
    const module_dir = core_install
        ? modules_dir
        : join( modules_dir, atmark + author )
    const repository_spec = join( module_dir, repository )
    const script_spec = join( repository_spec, index_js )
    const json_spec = join( repository_spec, repository + ext_json )

    return { author, repository, script_raw, module_dir, repository_spec, script_spec, json_spec }
}

function genSource ( author, repository, script ) {
    const exp = new RegExp( `^\\{${ repository }\\}` )
    Object.keys( script ).map( key => {
        script[ key ].path = script[ key ].path.replace( exp, `{${ atmark + author + posixSep + repository }}` )
    } )
    let source = JSON.stringify( script, null, 4 )
    const parent = getMainScript( script )

    return `// source: https://github.com/${ author }/${ repository }
const mods = ${ source }
if ( wes.Modules[wes.main].path === __filename ) wes.main = '${ parent }'
Object.keys( mods ).filter( name => name.startsWith( '{' ) ).forEach( id => {
    let mod = mods[ id ]
    mod.path = mod.path.replace( '{${repository}}', '{@${author}/${repository}}' )
    wes.Modules[ id ] = mod
} )
module.exports = require( '${ parent }' )
`
}

function getMainScript ( script ) {
    return Object.keys( script )[ 0 ]
}

function install ( arg ) {
    const { author, repository, script_raw, module_dir, repository_spec, script_spec, json_spec } = genSpec( arg )

    if ( !fs.existsdirSync( modules_dir ) ) fs.mkdirSync( modules_dir )
    if ( !fs.existsdirSync( module_dir ) ) fs.mkdirSync( module_dir )
    if ( !fs.existsdirSync( repository_spec ) ) fs.mkdirSync( repository_spec )
    fs.download( script_raw, json_spec )

    const script = JSON.parse( fs.readTextFileSync( json_spec ), null, 4 )
    const source = genSource( author, repository, script )

    fs.writeTextFileSync( script_spec, source )
    fs.deleteFileSync( json_spec )
    console.log( '%sInstalled %s', console.ansi.cyan, arg )
}
argv.slice( 2 ).forEach( mod => install( mod ) )
