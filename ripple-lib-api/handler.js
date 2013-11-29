var config = require( './mongoconfig' );
var MongoClient = require('mongodb').MongoClient;

var bsocket;
var target = 'mongodb://' 
    + config.host + ':' 
    + config.port + '/' 
    + config.dbs;

exports.setBSocket = function ( socket ) {
    bsocket = socket;

    bsocket.on( 'GET', function ( data ) {

        MongoClient.connect( target, function ( err, db ) {
            if ( err ) throw err;
            var collection = db.collection( data.type );
            collection.find().sort( { _id: 1 } ).toArray( function ( err, results ) {

                bsocket 
                    && bsocket.emit( 'DONE', { list: results, type: data.type } );
                db.close();

            });  

        } );

    } );
};

exports.clearBSocket = function () {
    bsocket = null;
};

exports.set = function ( section ) {

    // pull data
    section
        .addPull( 'GETBIDANDASK', function ( type, info ) {

            console.log( type, info );
            // 存储至mongodb

            MongoClient.connect( target, function ( err, db ) {
                if ( err ) throw err;

                var collection = db.collection( type );
                collection.insert( info, function ( err, docs ) {

                    if ( err ) throw err;
                    // collection.count( function ( err, count ) {
                    //     console.log(format("count = %s", count));
                    // } );
                    // Locate all the entries using find
                    collection.find().sort( { _id: 1 } ).toArray( function ( err, results ) {
                        bsocket 
                            && bsocket.emit( 'DONE', { list: results, type: type } );
                        db.close();
                    } );
                } );
            } );

        } );

    // step data
    // section.addStep( 'COMMONSTEP', function ( type, tradeType, info ) {

    //     // your call back

    // } );

};