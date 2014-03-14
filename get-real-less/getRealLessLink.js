var args = process.argv;
var ext = args[ 2 ] ? args[ 2 ] : 'html';
var exec = require( 'child_process' ).exec;
var fs = require( 'fs' );
var shell = 'find . -name "*.' + ext + '" | xargs grep "<link" | grep "less"';

var child = exec( shell,
    function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
            return;
        }
        handler( stdout );
    } 
);

/**
 * 处理
 * 
 * @param  {string} stdout 标准输出
 */
function handler( stdout ) {

    var lines = stdout.split(/\r?\n/);

    console.log( lines.length );
    var o = {};
    lines.forEach(function(line){
        var cols = line.split('href="');
        if (cols.length == 2) {
             var href = cols[1].split('"')[0];
             if (!o[href]) {
              o[href] = 1;
         }
        }
    })
	
    var out = [ ];
    for ( var key in o ) {
        out.push( key );
    };
	
    fs.writeFileSync( './output.result', JSON.stringify( out ) );
}