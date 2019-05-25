const { CurrentDirectory } = require( 'WScript.Shell' )

const win32Sep = '\\'
const posixSep = '/'

const split = ( path ) => toPosixSep( path ).split( posixSep )
const toWin32Sep = ( path ) => path.split( posixSep ).join( win32Sep )
const toPosixSep = ( path ) => path.split( win32Sep ).join( posixSep )
const absolute = ( path ) => toPosixSep( FSO.GetAbsolutePathName( toWin32Sep( path ) ) )
const join = ( ...paths ) => absolute( toWin32Sep( paths.reduce( ( acc, curr ) => `${ acc }${ win32Sep }${ curr }` ) ) )
const dirname = ( path ) => absolute( FSO.GetParentFolderName( toWin32Sep( path ) ) )

const extname = ( path ) => {
    let temp = split( path )
    let res = temp[ temp.length - 1 ].split( '.' )
    if ( res.length > 1 ) return '.' + res[ res.length - 1 ]
    return ''
}

const relative = ( from, to ) => {
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

const basename = ( path, ext ) => {
    const temp = split( path )
    const res = temp[ temp.length - 1 ]
    if ( ext != null && ext[0] === '.' && res.slice( -ext.length ) === ext) {
        return res.slice( 0, res.length - ext.length )
    } else {
        return res
    }
}

const normalize = ( path ) => {
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

const isAbsolute = ( path ) => absolute( path ) === normalize( path )

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
