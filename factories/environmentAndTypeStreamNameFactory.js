module.exports = function( environment ) {

    return function( record ) {

        if ( !record.type ) {
            throw new Error( 'Environment and Type Stream Name Factory requires a type key on records' );
        }
        return `${environment}-${record.type}`;

    };

};