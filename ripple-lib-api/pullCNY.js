var fs = require( 'fs' );
var currencyInfo = require( './currency' );

var section = require( './section' );

var files = {

    ripplechinaBidsSource: './res/CNYCHINA/bids.js',
    ripplechinaBidsAnalyzed: './res/CNYCHINA/bidsAnalyzed.js',

    ripplechinaAsksSource: './res/CNYCHINA/asks.js',
    ripplechinaAsksAnalyzed: './res/CNYCHINA/asksAnalyzed.js',

    ripplecnBidsSource: './res/CNYCN/bids.js',
    ripplecnBidsAnalyzed: './res/CNYCN/bidsAnalyzed.js',

    ripplecnAsksSource: './res/CNYCN/asks.js',
    ripplecnAsksAnalyzed: './res/CNYCN/asksAnalyzed.js'

};

function bidsCall ( err, res, type ) {

    var sourceFile = type == 'ripplechina' 
        ? files.ripplechinaBidsSource 
        : files.ripplecnBidsSource;

    fs.writeFile( sourceFile, JSON.stringify(res) );

    console.log( type + ' CNY bids fetch done!' );
    console.log( 'start analyzing ' + type + ' CNY bids!' );

    var offers = res.offers;
    var file = type == 'ripplechina' 
        ? files.ripplechinaBidsAnalyzed
        : files.ripplecnBidsAnalyzed;

    fs.writeFile( file, '' );

    var maxBid;
    for ( var i = 0, len = offers.length; i < len; i ++ ) {
        var addr = offers[ i ].Account;
        var a = + offers[ i ].TakerPays / 1000000; // 个数
        var b = offers[ i ].TakerGets.value / a; // 单价

        i == 0 && (
                maxBid = b
            );
        
        section.step( 

            type == 'ripplechina' 
                ? 'CNYCHINA'
                : 'CNYCN',
                
            'bids', 

            {

                // 数量
                quantity: a,

                // 单价
                price: b,

                // 地址
                addr: addr,

                // 最高出价
                maxBid: maxBid

            } 

        );

        fs.appendFileSync( file, 
            addr + ' wanna buy : ' + a + ' XRP, ' + b + ' CNY / XRP. \n' );
    }

    section.pull( 

        type == 'ripplechina' 
            ? 'CNYCHINA'
            : 'CNYCN',
        'bids', 
        // 最高出价
        maxBid

     );

    console.log( type + ' CNY analyzing bids done!' );

}

function asksCall ( err, res, type ) {

    var sourceFile = type == 'ripplechina' 
        ? files.ripplechinaAsksSource 
        : files.ripplecnAsksSource;

    fs.writeFile( sourceFile, JSON.stringify(res) );

    console.log( type + ' CNY asks fetch done!' );
    console.log( 'start analyzing ' + type + ' CNY asks!' );

    var offers = res.offers;
    var file = type == 'ripplechina' 
        ? files.ripplechinaAsksAnalyzed
        : files.ripplecnAsksAnalyzed;

    fs.writeFile( file, '' );

    var minAsk;
    for ( var i = 0, len = offers.length; i < len; i ++ ) {
        var addr = offers[ i ].Account;
        var a = + offers[ i ].TakerGets / 1000000; // 个数
        var b = offers[ i ].TakerPays.value / a; // 单价

        i == 0 && (
                minAsk = b
            );
        
        section.step( 

            type == 'ripplechina' 
                ? 'CNYCHINA'
                : 'CNYCN',
                
            'asks', 

            {

                // 数量
                quantity: a,

                // 单价
                price: b,

                // 地址
                addr: addr,

                // 最低要价
                minAsk: minAsk

            } 

        );

        fs.appendFileSync( file, 
            addr + ' wanna sell : ' + a + ' XRP, ' + b + ' CNY / XRP. \n' );
    }

    section.pull( 

        type == 'ripplechina' 
            ? 'CNYCHINA'
            : 'CNYCN',
        'asks', 
        // 最低要价
        minAsk
        
     );

    console.log( type + ' CNY analyzing asks done!' );

}

exports.run = function ( remote ) {

    // 寻找最高出价，买入ripplechina XRP
    var bids = remote.request_book_offers( 
        currencyInfo.CNYCHINA,
        currencyInfo.XRP,
        '',
        function ( err, res ) {
            bidsCall( err, res, 'ripplechina' );
        }
     );

    var bidsc = remote.request_book_offers( 
        currencyInfo.CNYCN,
        currencyInfo.XRP,
        '',
        function ( err, res ) {
            bidsCall( err, res, 'ripplecn' );
        }
     );

    // 寻找最低要价，卖XRP
    var asks = remote.request_book_offers( 
        currencyInfo.XRP,
        currencyInfo.CNYCN,
        '',
        function ( err, res ) {
            asksCall( err, res, 'ripplechina' );
        }
     );

    var asksc = remote.request_book_offers( 
        currencyInfo.XRP,
        currencyInfo.CNYCN,
        '',
        function ( err, res ) {
            asksCall( err, res, 'ripplecn' );
        }
     );

    bids.request();
    bidsc.request();

    asks.request();
    asksc.request();

};