const argv = require( 'argv' )
const fs = require( 'filesystem' )
const { join, dirname, CurrentDirectory, posixSep } = require( 'pathname' )

const cd = CurrentDirectory
const modules = 'node_modules'
const json = '.json'
const atmark = '@'
const packageJson = 'package.json'
const index = 'index.js'

const install = function install_install ( name ) {
    const [ author, repository ] = splitName( name )
    const { raw, mods, authordir, repo, script, mod, packs, rawpacks } = getSpec( author, repository )

    if ( !fs.existsdirSync( mods ) ) fs.mkdirSync( mods )
    if ( !fs.existsdirSync( authordir ) ) fs.mkdirSync( authordir )
    if ( !fs.existsdirSync( repo ) ) fs.mkdirSync( repo )
    fs.download( raw, mod )
    const source = createSource( author, repository, fs.readTextFileSync( mod ) )
    fs.writeTextFileSync( script, source, 'UTF-8N')
    fs.deleteFileSync( mod )
    console.log( '%sInstalled %s', console.ansi.cyan, name )
}

function splitName ( name ) {
    if ( name.startsWith( atmark ) && name.includes( posixSep ) )
        return /^@(.+)\/(.+)/.exec( name ).slice( 1 )
    else throw new Error( '' )
}

function getSpec ( author, repository ) {
    const raw = `https://raw.githubusercontent.com/${ author }/${ repository }/master/${ repository }.json`

    const rawpacks = `https://raw.githubusercontent.com/${ author }/${ repository }/master/${ packageJson }`

    let mods = ( argv.get( 'unsafe' ) || argv.get( 'danger' ) ) && argv.get( 'g' ) && argv.get( 'global' )
        ? join( dirname( WScript.ScriptFullName ), modules )
        : join( cd, modules )

    let authordir = ( argv.get( 'unsafe' ) || argv.get( 'danger' ) ) && argv.get( 'c' ) && argv.get( 'core' )
        ? join( mods, author )
        : join( mods, atmark + author )

    let repo = join( authordir, repository )
    let script = join( repo, index )
    let mod = join( repo, repository + json )
    let packs = join( repo, packageJson )
    return { raw, mods, authordir, repo, script, mod, packs, rawpacks }
}

function createSource ( author, repository, mod ) {
    const parent = getParrentModule( JSON.parse( mod ) )
    return `// source: https://github.com/${ author }/${ repository }
const mods = ${ mod }
Object.keys( mods ).forEach( key => wes.Modules[ key ] = mods[ key ] )
module.exports = require( '${ parent }' )
`
}

function getParrentModule ( code ) {
    return Object.keys( code )[0]
}

install( argv[ 1 ] )