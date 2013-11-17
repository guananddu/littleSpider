var port = 8181;
var io = require( 'socket.io' ).listen( port );

io.sockets.on( 'connection', function ( socket ) {

    // socket.emit( 'news', { hello: 'world' } );
    // socket.on( 'my other event', function ( data ) {
    //     console.log( data );
    // });
    console.log( 'connection to browser success!' );

    require( './handler' ).setBSocket( socket );

} );

io.sockets.on( 'disconnect', function () {

    // socket.emit( 'news', { hello: 'world' } );
    // socket.on( 'my other event', function ( data ) {
    //     console.log( data );
    // });
    console.log( 'disconnect to browser success!' );

    require( './handler' ).clearBSocket();

} );