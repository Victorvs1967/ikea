import getData from './getData.js';

const cartList = [
    { 
        'id': 'idd005',
        'count': 3
    },
    { 
        'id': 'idd066',
        'count': 2
    },
    { 
        'id': 'idd086',
        'count': 1
    }   
];

const loadData = () => {

    if (location.pathname.includes('cart')) {
        getData.cart(cartList, (data) => console.log(data));   
    }

    // getData.catalog((data) => console.log(data));
    // getData.subCatalog('Декор', (data) => console.log(data));
};

export default loadData;