module.exports = function( environment ) {

    if ( !environment ) {
        throw new Error( 'No value provided for environment. Environment is a required parameter of the Environment and Type Stream Name Factory' );
    }

    return function( record ) {

        if ( !record.type ) {
            throw new Error( 'Environment and Type Stream Name Factory requires a type key on records' );
        }
        return `${environment}-${record.type}`;

    };

};