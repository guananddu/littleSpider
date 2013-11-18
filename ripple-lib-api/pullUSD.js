var fs = require( 'fs' );
var currencyInfo = require( './currency' );

var section = require( './section' );

var files = {

    bidsSource: './res/USD/bids.js',
    bidsAnalyzed: './res/USD/bidsAnalyzed.js',

    asksSource: './res/USD/asks.js',
    asksAnalyzed: './res/USD/asksAnalyzed.js'

};

function bidsCall ( err, res ) {

    fs.writeFile( files.bidsSource, JSON.stringify(res) );

    console.log( 'USD bids fetch done!' );
    console.log( 'start analyzing USD bids!' );

    var offers = res.offers;
    var file = files.bidsAnalyzed;

    fs.writeFile( file, '' );

    var maxBid;
    for ( var i = 0, len = offers.length; i < len; i ++ ) {
        var pays = offers[ i ].TakerPays.value; // 个数
        var gets = + offers[ i ].TakerGets / 1000000 / pays; // USD买入的单价
        var addr = offers[ i ].Account;

        i == 0 && (
                maxBid = gets
            );
        
        section.step( 'USD', 'bids', {

            // 数量
            quantity: pays,

            // 单价
            price: gets,

            // 地址
            addr: addr,

            // 最高出价
            maxBid: maxBid

        } );

        fs.appendFileSync( file, 
            addr + ' wanna buy : ' + pays + ' USD, ' + gets + ' XRP / USD. \n' );
    }

    section.pull( 

        'USD',
        'bids', 
        // 最高出价
        maxBid

     );

    console.log( 'USD analyzing bids done!' );

}

function asksCall ( err, res ) {

    fs.writeFile( files.asksSource, JSON.stringify(res) );

    console.log( 'USD asks fetch done!' );
    console.log( 'start analyzing USD asks!' );

    var offers = res.offers;
    var file = files.asksAnalyzed;
    fs.writeFile( file, '' );

    var minAsk;
    for ( var i = 0, len = offers.length; i < len; i ++ ) {
        var gets = offers[ i ].TakerGets.value; // 卖出个数
        var pays = + offers[ i ].TakerPays / 1000000 / gets; // 每个单价单价
        var addr = offers[ i ].Account;

        i == 0 && (
                minAsk = pays
            );

        section.step( 'USD', 'asks', {

            // 数量
            quantity: gets,

            // 单价
            price: pays,

            // 地址
            addr: addr,

            // 最低要价
            minAsk: minAsk

        } );

        fs.appendFileSync( file, 
            addr + ' wanna sell ' + gets + ' USD, ' + pays + ' XRP / USD. \n' );
    }

    section.pull( 

        'USD',
        'asks', 
        // 最低要价
        minAsk

     );

    console.log( 'analyzing USD asks done!' );

}

exports.run = function ( remote ) {

    // 寻找最高出价，买入USD
    var bids = remote.request_book_offers( 
        currencyInfo.XRP,
        currencyInfo.USD,
        '',
        bidsCall
     );

    // 寻找最低要价，卖USD
    var asks = remote.request_book_offers( 
        currencyInfo.USD,
        currencyInfo.XRP,
        '',
        asksCall
     );

    bids.request();
    asks.request();

};