const should = require( 'should' );

const streamNameFactory = require( '../factories/environmentAndTypeStreamNameFactory' );

describe( 'Environment and Type Stream Name Factory', () => {

    it( 'Should calculate a stream name for a valid record', () => {

        streamNameFactory( 'test' )( { type: "type" } ).should.equal( 'test-type' );

    } );

    it( 'Should error if no environment is set', () => {

        should.throws( () => {
            streamNameFactory();
        } );

    } );

    it( 'Should error if no type is set on a record', () => {

        should.throws( () => {
            streamNameFactory( 'test' )( {} );
        } );

    } );

} );