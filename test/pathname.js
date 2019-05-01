const { describe, it, assert } = require( 'test' )

describe( 'extname', () => {
    it( 'WScript.ScriptFullName', () => {
        assert( extname( WScript.ScriptFullName ) === ".js" )
    } )
    it( 'index.html', () => {
        assert( extname( 'index.html' ) === ".html" )
    } )
    it( 'index.coffee.md', () => {
        assert( extname( 'index.coffee.md' ) === ".md" )
    } )
    it( 'index.', () => {
        assert( extname( 'index.' ) === "." )
    } )
    it( 'index', () => {
        assert( extname( 'index' ) === "" )
    } )
    it( '.index.md', () => {
        assert( extname( '.index.md' ) === ".md" )
    } )
} )

describe( 'normalize', () => {
    it( 'c://bin/github//wes////wes.js', () => {
        assert( normalize( 'c://bin/github//wes////wes.js' ) === 'C:/bin/github/wes/wes.js' )
    } )
    it( 'c://bin/github//./wes////wes.js', () => {
        assert( normalize( 'c://bin/github//./wes////wes.js' ) === 'C:/bin/github/wes/wes.js' )
    } )
    it( 'c://bin/github//../wes////wes.js', () => {
        assert( normalize( 'c://bin/github//../wes////wes.js' ) === 'C:/bin/wes/wes.js' )
    } )
    it( 'c://bin/github/..//../wes////wes.js', () => {
        assert( normalize( 'c://bin/github/..//../wes////wes.js' ) === 'C:/wes/wes.js' )
    } )
    it( 'bin/github/wes////wes.js', () => {
        assert( normalize( 'bin/github/wes////wes.js' ) === 'bin/github/wes/wes.js' )
    } )
    it( 'github/.././../wes////wes.js', () => {
        assert( normalize( 'github/.././../wes////wes.js' ) === '../wes/wes.js' )
    } )
} )

describe( 'isAbsolute', () => {
    it( 'WScript.ScriptFullName', () => {
        assert( isAbsolute( WScript.ScriptFullName ) === true )
    } )
    it( 'c:/bin/github/wes/wes.js', () => {
        assert( isAbsolute( 'c:/bin/github/wes/wes.js' ) === true )
    } )
    it( 'github/wes/wes.js', () => {
        assert( isAbsolute( 'github/wes/wes.js' ) === false )
    } )
    it( './wes.js', () => {
        assert( isAbsolute( './wes.js' ) === false )
    } )
    it( 'c:/bin/github/../Desktop/log/log.json', () => {
        assert( isAbsolute( 'c:/bin/github/../Desktop/log/log.json' ) === true )
    } )
} )