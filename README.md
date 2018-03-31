# Promised Kinesis 

A simple promise based wrapper around Kinesis Publish.

## Usage

```
npm install promised-kinesis
```

```javascript
const AWS = require( 'aws-sdk' );
const PromisedKinesis = require( 'promised-kinesis' );

const kinesis = new PromisedKinesis( new AWS.Kinesis() ); 
```

### `PromisedKinesis( kinesis[, streamNameFactory ] )`

* `kinesis`: An AWS Kinesis instance
* `streamNameFactory`: Optional.  A factory function generating 
  stream names based on records.
  * `String streamNameFactory( record )`
  
### `Promise publish( record, partitionKey[, streamName ] )`

Publishes a record to a stream.  If the record is an object it 
will be stringified, otherwise it will be written as is.  

If no streamName is provided the streamNameFacotry will be used 
to generate a stream name based on the record.  If neither a 
streamName nor a streamNameFactory is provided the Promise is 
rejected.

### Environment and Type Stream Name Factory

A streamNameFactory implementation that I use on a lot of my 
projects so I published in case it's of general use.  It 
bases a stream name on an environment name and a type 
property of a record object.  

```javascript
const environmentAndTypeStreamNameFactory = require( 'promised-kinesis' ).factories.environmentAndTypeStreamNameFactory;

const streamNameFactory = environmentAndTypeStreamNameFactory( 'prod' );
```

This factory expects that records are objects and they have a
`type` key.  It also expects that the value of the `type` key 
is clean such that `[environment name]-[type]` make up a valid 
stream name (no sanitization is done).
