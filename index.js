const PromisedKinesis = function( kinesis, streamNameFactory ) {

    this.publish = function( record, partitionKey, streamName ) {

        if ( !streamName && !streamNameFactory ) {
            return Promise.reject( new Error( 'No streamName or streamNameFactory provided'))
        }
        return new Promise( ( resolve, reject ) => {

            try {
                kinesis.putRecord( {
                    Data: JSON.stringify(record),
                    PartitionKey: partitionKey,
                    StreamName: streamName ? streamName : streamNameFactory(record)
                }, (err, data) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve(data);
                } );
            } catch( e ) {
                reject( e );
            }

        } );
    }

};

const environmentAndTypeStreamNameFactory = require( './factories/environmentAndTypeStreamNameFactory' );

PromisedKinesis.factories = {
    environmentAndTypeStreamNameFactory: environmentAndTypeStreamNameFactory
};

module.exports = PromisedKinesis;
