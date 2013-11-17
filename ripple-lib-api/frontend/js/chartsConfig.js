define( function ( require ) {

    return {

        USD: {
            chart: {
                type: 'spline',
                zoomType: 'xy'
            },
            title: {
                text: 'XRP / 美元（每 1 美元值多少 XRP）'
            },
            subtitle: {
                text: 'Data From Bitstamp Gateway.'
            },
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
                }/*,
                tooltip: {
                    shared: true
                }*/
            },
            plotOptions: {
                series: {
                    lineWidth: 2,
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            }
        },

        CNYCHINA: {
            chart: {
                type: 'spline',
                zoomType: 'xy'
            },
            title: {
                text: '人民币 / XRP（每 XRP 值多少人民币）'
            },
            subtitle: {
                text: 'Data From RippleChina Gateway.'
            },
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
            },
            plotOptions: {
                series: {
                    lineWidth: 2,
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            }
        },

        CNYCN: {
            chart: {
                type: 'spline',
                zoomType: 'xy'
            },
            title: {
                text: '人民币 / XRP（每 XRP 值多少人民币）'
            },
            subtitle: {
                text: 'Data From RippleCN Gateway.'
            },
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
            },
            plotOptions: {
                series: {
                    lineWidth: 2,
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            }
        }


    };

} );