define( function ( require ) {

    return {

        USD: {
            chart: {
                type: 'spline',
                zoomType: 'xy'
            },
            title: {
                text: '美元/XRP'
            },
            // subtitle: {
            //     text: ''
            // },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                title: {
                    text: 'XRP'
                }
            },
            tooltip: {
                formatter: function() {
                        console.log( this );
                        return '<b>' + this.series.name + '</b><br />' +
                            this.y +' xrp<br />' + 
                            this.key;
                }
            }
        },

        CNYCHINA: {
            chart: {
                type: 'spline',
                zoomType: 'xy'
            },
            title: {
                text: 'XRP/人民币（ripplechina）'
            },
            // subtitle: {
            //     text: ''
            // },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                title: {
                    text: 'CNY'
                }
            },
            tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br />' +
                            this.y +' cny<br />' + 
                            this.key;
                }
            }
        },

        CNYCN: {
            chart: {
                type: 'spline',
                zoomType: 'xy'
            },
            title: {
                text: 'XRP/人民币（ripplecn）'
            },
            // subtitle: {
            //     text: ''
            // },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                title: {
                    text: 'CNY'
                }
            },
            tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br />'+
                            this.y +' cny<br />' + 
                            this.key;
                }
            }
        }


    };

} );