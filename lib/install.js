const log = require( 'log' )

const argv = require( 'argv' )
const { options, security, security: { unsafe } } = argv

const { dirname, join, toPosixSep, posixSep } = require( 'pathname' )
const fs = require( 'filesystem' )

const global_install = security( unsafe ) && ( options.global || options.g )
const core_install = security( unsafe ) && ( options.core || options.c )

const cd = toPosixSep( require( 'WScript.Shell' ).CurrentDirectory )
const gd = dirname( WScript.ScriptFullName )
const index_js = 'index.js'
const ext_js = '.js'
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
    const script_spec = core_install
        ? join( module_dir, repository + ext_js )
        : join( module_dir, index_js )
    const json_spec = join( module_dir, repository + ext_json )

    return { author, repository, script_raw, module_dir, script_spec, json_spec }
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
Object.keys( mods ).forEach( key => wes.Modules[ key ] = mods[ key ] )
module.exports = require( '${ parent }' )
`
}

function getMainScript ( script ) {
    return Object.keys( script )[ 0 ]
}

function install ( arg ) {
    const { author, repository, script_raw, module_dir, script_spec, json_spec } = genSpec( arg )

    if ( !fs.existsdirSync( modules_dir ) ) fs.mkdirSync( modules_dir )
    if ( !fs.existsdirSync( module_dir ) ) fs.mkdirSync( module_dir )
    fs.download( script_raw, json_spec )

    const script = JSON.parse( fs.readTextFileSync( json_spec ), null, 4 )
    const source = genSource( author, repository, script )

    fs.writeTextFileSync( script_spec, source )
    fs.deleteFileSync( json_spec )
}

install( argv[ 1 ] )