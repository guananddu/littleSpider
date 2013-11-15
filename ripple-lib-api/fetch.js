var Remote = require('ripple-lib').Remote;
var remote = new Remote({
    trusted: true,
    local_signing: true,
    local_fee: true,
    fee_cushion: 1.5,
    servers: [{
        host: 's1.ripple.com',
        port: 443,
        secure: true
    }]
});

remote.connect(function() {
    console.log('connected!');

    var request = remote.request_book_offers(
        // gets
        {
            'currency': 'USD',
            'issuer': 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B'
        },
        // pays
        {
            'currency': 'XRP'
        },
        '', 
        function(err, res) {
            require('fs').writeFile( './res.js', JSON.stringify(res) );
        }
    );

    request.request();
});