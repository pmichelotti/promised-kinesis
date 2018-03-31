const sinon = require( 'sinon' );

const mockKinesisFactory = function( errors ) {

    const mockKinesis = {
        putRecord: ( options, callback ) => {
            if ( errors ) {
                callback( new Error(), null );
            } else {
                callback( null, {} );
            }
        }
    };

    sinon.spy( mockKinesis, 'putRecord' );

    return mockKinesis;

};

module.exports = mockKinesisFactory;
