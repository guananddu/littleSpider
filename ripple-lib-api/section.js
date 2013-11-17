// 切面

var states;

var pool = {

    step : {},
    pull: {}

};

exports.addPull = function ( key, func ) {

    pool.pull[ key ] = func;

};

exports.delPull = function ( key ) {

    delete pool.pull[ key ];

};

exports.addStep = function ( key, func ) {

    pool.step[ key ] = func;

};

exports.delStep = function ( key ) {

    delete pool.step[ key ];

};

exports.step = function ( type, tradeType, info ) {

    // type : USD / CNYCHINA / CNYCN
    // tradeType: bids / asks
    /* info : {
        数量
        quantity: xx,

        单价
        price: xx,

        地址
        addr: xx,

        最高出价 / 最低要价
        maxBid / minAsk: xx
    } */

    for ( var key in pool.step ) {
        pool.step[ key ]( type, tradeType, info );
    }

};

exports.pull = function ( type, tradeType, maxMin ) {

    !states[ type ][ tradeType ] && ( 
        states[ type ][ tradeType ] = maxMin
     );

    // 都有了值的时候，进行处理
    if ( states[ type ].bids 
        && states[ type ].asks ) {

        for ( var key in pool.pull ) {

            pool.pull[ key ]( type, {

                bid: states[ type ].bids,
                ask: states[ type ].asks,
                spread: states[ type ].asks - states[ type ].bids,
                date: '' + ( new Date() ).toFormat( 'YYYY-MM-DD HH:MI:SS P' )
                // date: ( new Date() ).getTime()

            } );

        }

    }

};

exports.clear = function () {

    // 清除
    states = {

        USD: { },
        CNYCHINA: { },
        CNYCN: { }

    };

}