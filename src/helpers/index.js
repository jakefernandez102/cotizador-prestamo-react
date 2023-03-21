const formatMoney = ( value ) => {
    const formatter = new Intl.NumberFormat( 'en-US', {
        style: 'currency',
        currency: 'USD'
    } );
    return formatter.format( value );
};

const calculateTotalToPay = ( quantity, period ) => {
    let total;

    //Mientras mayor la cantidad solicitada menor es el interes
    if ( quantity < 5000 ) {

        total = quantity * 1.5;//50% interes

    } else if ( quantity >= 5000 && quantity < 10000 ) {

        total = quantity * 1.4;//40% interes

    } else if ( quantity >= 10000 && quantity < 15000 ) {

        total = quantity * 1.3;//30% interes

    } else {

        total = quantity * 1.2;//20% interes

    }

    //Plazo - mas plazo, mayor interes
    if ( period === 6 ) {

        total *= 1.1;//10% mas

    } else if ( period === 12 ) {

        total *= 1.2;//20% mas

    } else {

        total *= 1.3;//30% mas

    }

    return total;
};

export {
    formatMoney,
    calculateTotalToPay
};