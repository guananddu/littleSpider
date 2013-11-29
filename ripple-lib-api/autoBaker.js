var mongoc = require( './mongoconfig' );
var MongoClient = require('mongodb').MongoClient;
var exec = require( 'child_process' ).exec,
    child;

require( 'date-utils' );

var target = 'mongodb://' 
            + mongoc.host + ':' 
            + mongoc.port + '/' 
            + mongoc.dbs;

exports.run = function ( max, func ) {

    MongoClient.connect( target, function ( err, db ) {
        if ( err ) throw err;

        var collection = db.collection( 'USD' );
        collection.find().toArray( function ( err, results ) {

            if ( results.length >= max ) {

                var name = ( new Date() ).toFormat( 'YYYY-MM-DD-HH-MI-SS-P' );
                var comm = mongoc.bindir 
                    + '/mongodump '
                    + '-h "' + mongoc.host + ':' + mongoc.port + '" '
                    + '-d "' + mongoc.dbs + '" '
                    + '-o "' +  mongoc.bakdir
                    + '/'
                    + name + '"';

                var restoreComm = mongoc.bindir
                    + '/mongorestore '
                    + '-h "' + mongoc.host + ':' + mongoc.port + '" '
                    + '-d "' + mongoc.bakdbs + '" '
                    + '--directoryperdb "' 
                    + mongoc.bakdir 
                    + '/' 
                    + name + '"';

                child = exec( comm,
                    function ( error, stdout, stderr ) {
                        console.log('stdout: ' + stdout);
                        console.log('stderr: ' + stderr);
                        if (error !== null) {
                            console.log('exec error: ' + error);
                        }

                        // require( 'fs' ).writeFile( 'commmmm', restoreComm );

                        // exec( restoreComm, function ( error, stdout, stderr ) {

                        //     console.log('stdout: ' + stdout);
                        //     console.log('stderr: ' + stderr);
                        //     if (error !== null) {
                        //         console.log('exec error: ' + error);
                        //     }

                            require( './removeall' ).run();

                            func && func();

                        // } );
                    }
                );

            }

            db.close();

        });  

    } );

};