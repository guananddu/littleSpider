// 连接设置
var server =  {

    host: 's1.ripple.com',
    port: 443,
    secure: true

};

var Remote = require( 'ripple-lib' ).Remote;

exports.getRemote = function () {

    return new Remote( {

        trusted: true,
        local_signing: true,
        local_fee: true,
        fee_cushion: 1.5,

        servers: [ server ]

    } );

};