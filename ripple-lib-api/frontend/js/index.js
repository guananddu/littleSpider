define( function ( require ) {

    var renderCharts = require( './renderCharts' );

    var host = 'localhost';
    var port = '8181';

    var socket = io.connect('http://' + host + ':' + port);

    return {

        init: function () {

            socket.on('DONE', function ( data ) {
                // data.list / data.type
                renderCharts( data );

            });

            socket.emit( 'GET', { type: 'USD' } );
            socket.emit( 'GET', { type: 'CNYCHINA' } );
            socket.emit( 'GET', { type: 'CNYCN' } );

        }

    };

} );