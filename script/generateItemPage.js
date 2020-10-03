import getData from './getData.js';

const NEW_COUMT_ITEM = 6;

const generateItemPage = () => {

    const renderCard = ({ category, count, description, id, img, name: itemName, price, subcategory}) => {
        const goodImages = document.querySelector('.good-images'),
            breadcrumbLink = document.querySelectorAll('.breadcrumb__link'),
            goodItemNew = document.querySelector('.good-item__new'),
            goodItemHeader = document.querySelector('.good-item__header'),
            goodItemDescription = document.querySelector('.good-item__description'),
            goodItemEmpty = document.querySelector('.good-item__empty'),
            goodItemPriceValue = document.querySelector('.good-item__price-value'),
            btnGood = document.querySelector('.btn-good'),
            btnAddWishlist = document.querySelector('.btn-add-wishlist');

            breadcrumbLink[0].textContent = category;
            breadcrumbLink[0].href = `goods.html?cat=${category}`;
            breadcrumbLink[1].textContent = subcategory;
            breadcrumbLink[1].href = `goods.html?subcat=${subcategory}`;
            breadcrumbLink[2].textContent = itemName;

            goodImages.textContent = '';
            goodItemHeader.textContent = itemName;
            goodItemDescription.textContent = description;
            goodItemPriceValue.textContent = price;
            btnGood.dataset.idd = id;
            btnAddWishlist.dataset.idd = id;

            img.forEach((item) => {
                goodImages.insertAdjacentHTML('afterbegin', `
                    <div class="good-image__item">
                        <img src=${item} alt="${itemName} - ${description}">
                    </div>
                `);
            });

            if (count > NEW_COUMT_ITEM) {
                goodItemNew.style.display = 'block';
                goodItemNew.style.color = 'red';
            } else if (!count) {
                goodItemEmpty.style.display = 'block';
                btnGood.style.display = 'none';
            }

    };

    if (location.hash && location.pathname.includes('card')) {
        getData.item(location.hash.slice(1), renderCard);
    }

};

export default generateItemPage;