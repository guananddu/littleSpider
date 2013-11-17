// be careful!!!!!!

var config = require( './mongoconfig' );
var MongoClient = require('mongodb').MongoClient;

var target = 'mongodb://' 
                + config.host + ':' 
                + config.port + '/' 
                + config.dbs;
                
MongoClient.connect( target, function ( err, db ) {
    if ( err ) throw err;

    for ( var key in config.collections ) {

        db
            .collection( config.collections[ key ] )
            .remove( {}, function ( err, numberOfRemovedDocs ) {
                    if ( err ) throw err;
                    console.log( 'remove all!' );
                } );

    }

    db.close();    

} );