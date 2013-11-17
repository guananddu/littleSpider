define( function ( require ) {

    var chartsConfig = require( './chartsConfig' );

    var ids = {

        USD: 'usd',
        CNYCHINA: 'cny-china',
        CNYCN: 'cny-cn'

    };

    function splitData ( list ) {

        var series = [ ];
        var ask = [ ], bid = [ ], spread = [ ];

        for ( var i = 0, len = list.length; i < len; i ++ ) {

            ask.push( [ list[ i ].date, list[ i ].ask ] );
            bid.push( [ list[ i ].date, list[ i ].bid ] );
            spread.push( [ list[ i ].date, list[ i ].spread ] );

            // ask.push( [ '', list[ i ].ask ] );
            // bid.push( [ '', list[ i ].bid ] );
            // spread.push( [ '', list[ i ].spread ] );

        }

        series = [

            {
                name: 'Bid',
                data: bid
            }, 
            {
                name: 'Ask',
                data: ask
            }/*, 
            {
                name: 'spread',
                data: spread
            }*/

        ];

        return series;

    }

    return function ( data ) {

        var config = chartsConfig[ data.type ];
        config.series = splitData( data.list );
        $( '#' + ids[ data.type ] ).highcharts( config );

    };

} );