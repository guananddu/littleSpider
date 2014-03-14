/**
 * node-xlsx 的使用
 */

var xlsx = require('node-xlsx');
var obj = xlsx.parse(__dirname + '/1.xlsx'); // parses a file

// require( 'fs' ).writeFile( './re.json', JSON.stringify( obj.worksheets[ 0 ].data ) );

// console.log( obj.worksheets[ 0 ].data );

var map = {};

var data = obj.worksheets[ 0 ].data;

for ( var i = 0, len = data.length; i < len; i ++ ) {

    if ( i == 0 ) {
        continue;
    }

    map[ data[ i ][ 2 ].value ] = data[ i ][ 0 ].value + '';

}

require( 'fs' ).writeFile( './re.json', JSON.stringify( map ) );