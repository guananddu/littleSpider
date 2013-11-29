// npm install -g socket.io
// npm install -g ripple-lib
// npm install -g mongodb
// npm install -g date-utils

// 采集数据的时间间隔，默认10分钟一次
var args = process.argv;

var interval = args[ 2 ] 
    ? args[ 2 ] * 1000
    : 10 * 60 * 1000;

var bakerMax = 950;

require( 'date-utils' );
require( './browsersocket' );

var fs = require( 'fs' );
var remote = require( './remote' ).getRemote();
var currencyInfo = require( './currency' );
var autoBaker = require( './autoBaker' );

var pullUSD = require( './pullUSD' );
var pullCNY = require( './pullCNY' );

var section = require( './section' );
var handler = require( './handler' );

handler.set( section );

// 开始请求
remote.connect(function() {

    console.log('Connected!');

    run();

    setInterval( function () {
        run();
    }, interval );

});

function run () {
    
    section.clear();
    // 获取USD信息
    pullUSD.run( remote );
    // 获取CNY信息
    pullCNY.run( remote );

    autoBaker.run( bakerMax );

}