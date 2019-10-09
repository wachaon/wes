const argv = require( 'argv' )
const { relative, normalize } = require( 'pathname' )
const { writeTextFileSync } = require( 'filesystem' )
const { REG_LINE_SEP, LF } = require( 'text' )

const cd = normalize( require( 'WScript.Shell' ).CurrentDirectory )
const sep = '/'
const dir = cd.split( sep ).pop()

const host = 'wes'
if ( dir === host ) throw new Error( `Cannot bundle if the current directory is "${ host }"` )

const { parse, stringify } = JSON
const bracket = '{'
function bundle ( _modules ) {
    const modules = parse( stringify( _modules ) )
    const mods = {}
    Object.keys( modules )
        .filter( key => key.startsWith( bracket ) )
        .map( key => {
            const mod = modules[ key ]
            mod.path = `{${ dir }}${ sep }${ relative( cd, mod.path ) }`
            delete mod.module
            delete mod.exports
            return key
        } )
        .forEach( key => mods[ key ] = modules[ key ] )
    return mods
}


if (
    argv[2] === '/engine:Chakra' ||
    argv[2].toLowerCase() === '/color:monotone' ||
    argv[2].toLowerCase() === '/sec:unsafe' ||
    argv[2].toLowerCase() === '/sec:danger' ||
    argv[2].toLowerCase() === '/log:debug'
) throw new Error( 'Module must be specified' )
require( argv[2] )

const mods = bundle( wes.Modules )
const json = '.json'
console.log( writeTextFileSync( dir + json, stringify( mods, null, 4 ).replace( REG_LINE_SEP, LF ) ) )
