var mongoc = require( './mongoconfig' );
var MongoClient = require('mongodb').MongoClient;
var exec = require( 'child_process' ).exec,
    child;

require( 'date-utils' );

var target = 'mongodb://' 
            + mongoc.host + ':' 
            + mongoc.port + '/' 
            + mongoc.dbs;

exports.run = function ( max ) {

    MongoClient.connect( target, function ( err, db ) {
        if ( err ) throw err;

        var collection = db.collection( 'USD' );
        collection.find().toArray( function ( err, results ) {

            if ( results.length >= max ) {

                var comm = mongoc.bindir 
                    + '/mongodump '
                    + '-h "' + mongoc.host + ':' + mongoc.port + '" '
                    + '-d "' + mongoc.dbs + '" '
                    + '-o "' +  mongoc.bakdir
                    + '/'
                    + ( new Date() ).toFormat( 'YYYY-MM-DD-HH-MI-SS-P' ) + '"';

                child = exec( comm,
                    function (error, stdout, stderr) {
                        console.log('stdout: ' + stdout);
                        console.log('stderr: ' + stderr);
                        if (error !== null) {
                        console.log('exec error: ' + error);
                    }
                });

            }

            db.close();

        });  

    } );

};