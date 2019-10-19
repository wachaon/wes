const { CurrentDirectory } = require( 'WScript.Shell' )
const FSO = require( 'Scripting.FileSystemObject' )

const win32Sep = '\\'
const posixSep = '/'

const split = function pathname_split ( path ) { return toPosixSep( path ).split( posixSep ) }
const toWin32Sep = function pathname_toWin32Sep ( path ) { return path.split( posixSep ).join( win32Sep ) }
const toPosixSep = function pathname_toPosixSep ( path ) { return path.split( win32Sep ).join( posixSep ) }
const absolute = function pathname_absolute ( path ) { return toPosixSep( FSO.GetAbsolutePathName( toWin32Sep( path ) ) ) }

const join = function pathname_join ( ...paths ) {
    let acc = ''
    for ( let i = paths.length - 1; ~i ; i-- ) {
        let curr = toPosixSep( paths[ i ] )
        acc = FSO.BuildPath( curr, acc )
        if ( acc.toLowerCase() === absolute( acc ).toLowerCase() ) return absolute( acc )
    }
    return absolute( acc )
}

const dirname = function pathname_dirname ( path ) {
    if ( FSO.GetParentFolderName( toWin32Sep( path ) ) !== '' ){
        return absolute( FSO.GetParentFolderName( toWin32Sep( path ) ) )
    } else {
        return ''
    }
}

const extname = function pathname_extname ( path ) {
    let temp = split( path )
    let res = temp[ temp.length - 1 ].split( '.' )
    if ( res.length > 1 ) return '.' + res[ res.length - 1 ]
    return ''
}

const relative = function pathname_relative ( from, to ) {
    let _from = split( absolute( from ) )
    let _to = split( absolute( to ) )
    if ( _from[0] !== _to[0] ) return toPosixSep( to )
    while ( _from[0] === _to[0] ) {
        _from.shift()
        _to.shift()
    }
    _from = _from.fill( '..' )
    return _from.concat( _to ).join( posixSep )
}

const basename = function pathname_basename ( path, ext ) {
    const temp = split( path )
    const res = temp[ temp.length - 1 ]
    if ( ext != null && ext[0] === '.' && res.slice( -ext.length ) === ext) {
        return res.slice( 0, res.length - ext.length )
    } else {
        return res
    }
}

const normalize = function pathname_normalize ( path ) {
    let temp = split( toPosixSep( path ).replace( /\/+/g, posixSep ) )
    let res = []
    let parent = 0
    for ( let i = temp.length - 1; i > -1 ; i-- ) {
        let item = temp[i]
        if ( item === '.' ) continue
        else if ( item === '..' ) parent++
        else if ( parent ) parent--
        else res.unshift( item )
    }
    if ( parent > 0 ) res.unshift( ( new Array( parent ) ).fill( '..' ) )
    if ( /^[a-z]:$/.test( res[0] ) ) res[0] = res[0].toUpperCase()
    return res.join( posixSep )
}

const isAbsolute = function pathname_isAbsolute ( path ) { return absolute( path ) === normalize( path ) }

module.exports = {
    CurrentDirectory: toPosixSep( CurrentDirectory ),
    win32Sep,
    posixSep,
    split,
    toWin32Sep,
    toPosixSep,
    absolute,
    join,
    dirname,
    extname,
    relative,
    basename,
    normalize,
    isAbsolute
}
