const should = require( 'should' );
const sinon = require( 'sinon' );
require( 'should-sinon' );
const mockKinesisFactory = require( './mocks/mockKinesis' );
const mockStreamNameFactory = require( './mocks/mockStreamNameFactory' );

const PromisedKinesis = require( '../index' );

describe( 'Promised Kinesis', () => {

    it( 'Should put validly published records to the configured stream', () => {

        const kinesisSpy = mockKinesisFactory( false );
        const kinesis = new PromisedKinesis( kinesisSpy );

        return kinesis.publish( { value: 1 }, '1', 'stream' )
            .then( () => {
                kinesisSpy.putRecord.should.be.calledWithMatch( {
                    Data: JSON.stringify( { value: 1 } ),
                    PartitionKey: "1",
                    StreamName: "stream"
                } );
            } );

    } );

    it( 'Should publish string records as strings', () => {

        const kinesisSpy = mockKinesisFactory( false );
        const kinesis = new PromisedKinesis( kinesisSpy );

        return kinesis.publish( 'record', '1', 'stream' )
            .then( () => {
                kinesisSpy.putRecord.should.be.calledWithMatch( {
                    Data: "record",
                    PartitionKey: "1",
                    StreamName: "stream"
                } );
            } );

    } );

    it( 'Should use a configured Stream Name Factory when a stream name is not provided', () => {

        const kinesisSpy = mockKinesisFactory( false );
        const kinesis = new PromisedKinesis( kinesisSpy, mockStreamNameFactory );

        return kinesis.publish( { value: 1 }, '1' )
            .then( () => {
                kinesisSpy.putRecord.should.be.calledWithMatch( {
                    Data: JSON.stringify( { value: 1 } ),
                    PartitionKey: "1",
                    StreamName: "stream-name"
                } );
            } );

    } );

    it( 'Should use a provided stream name even if a Stream Name Factory is configured', () => {

        const kinesisSpy = mockKinesisFactory( false );
        const kinesis = new PromisedKinesis( kinesisSpy, mockStreamNameFactory );

        return kinesis.publish( { value: 1 }, '1', 'stream' )
            .then( () => {
                kinesisSpy.putRecord.should.be.calledWithMatch( {
                    Data: JSON.stringify( { value: 1 } ),
                    PartitionKey: "1",
                    StreamName: "stream"
                } );
            } );

    } );

    it( 'Should reject a publish request with no stream', () => {

        const kinesisSpy = mockKinesisFactory( false );
        const kinesis = new PromisedKinesis( kinesisSpy );

        return kinesis.publish( { value: 1 }, '1' )
            .should.be.rejected();

    } );

    it( 'Should reject a failed kinesis putRecord attempt', () => {

        const kinesisSpy = mockKinesisFactory( true );
        const kinesis = new PromisedKinesis( kinesisSpy );

        return kinesis.publish( { value: 1 }, '1', 'stream')
            .should.be.rejected();

    } );

} );