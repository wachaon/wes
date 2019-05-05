const path = require( 'pathname' )
const { describe, it, assert } = require( 'minitest' )


describe( 'extname', () => {
    it( 'WScript.ScriptFullName', () => {
        assert( path.extname( WScript.ScriptFullName ) === ".js" )
    } )
    it( 'index.html', () => {
        assert( path.extname( 'index.html' ) === ".html" )
    } )
    it( 'index.coffee.md', () => {
        assert( path.extname( 'index.coffee.md' ) === ".md" )
    } )
    it( 'index.', () => {
        assert( path.extname( 'index.' ) === "." )
    } )
    it( 'index', () => {
        assert( path.extname( 'index' ) === "" )
    } )
    it( '.index.md', () => {
        assert( path.extname( '.index.md' ) === ".md" )
    } )
} )

describe( 'normalize', () => {
    it( 'c://bin/github//wes////wes.js', () => {
        assert( path.normalize( 'c://bin/github//wes////wes.js' ) === 'C:/bin/github/wes/wes.js' )
    } )
    it( 'c://bin/github//./wes////wes.js', () => {
        assert( path.normalize( 'c://bin/github//./wes////wes.js' ) === 'C:/bin/github/wes/wes.js' )
    } )
    it( 'c://bin/github//../wes////wes.js', () => {
        assert( path.normalize( 'c://bin/github//../wes////wes.js' ) === 'C:/bin/wes/wes.js' )
    } )
    it( 'c://bin/github/..//../wes////wes.js', () => {
        assert( path.normalize( 'c://bin/github/..//../wes////wes.js' ) === 'C:/wes/wes.js' )
    } )
    it( 'bin/github/wes////wes.js', () => {
        assert( path.normalize( 'bin/github/wes////wes.js' ) === 'bin/github/wes/wes.js' )
    } )
    it( 'github/.././../wes////wes.js', () => {
        assert( path.normalize( 'github/.././../wes////wes.js' ) === '../wes/wes.js' )
    } )
} )

describe( 'isAbsolute', () => {
    it( 'WScript.ScriptFullName', () => {
        assert( path.isAbsolute( WScript.ScriptFullName ) === true )
    } )
    it( 'c:/bin/github/wes/wes.js', () => {
        assert( path.isAbsolute( 'c:/bin/github/wes/wes.js' ) === true )
    } )
    it( 'github/wes/wes.js', () => {
        assert( path.isAbsolute( 'github/wes/wes.js' ) === false )
    } )
    it( './wes.js', () => {
        assert( path.isAbsolute( './wes.js' ) === false )
    } )
    it( 'c:/bin/github/../Desktop/log/log.json', () => {
        assert( path.isAbsolute( 'c:/bin/github/../Desktop/log/log.json' ) === true )
    } )
} )