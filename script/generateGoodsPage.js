import getData from './getData.js';
import userData from './userData.js';

const NEW_COUMT_ITEM = 6;

const generateGoodsPage = () => {

    const mainHeader = document.querySelector('.main-header');
    const goodsList = document.querySelector('.goods-list');
    const generateCards = (data) => {
        goodsList.textContent = '';
        if (!data.length) {
            const goods = document.querySelector('.goods');
            goods.textContent = location.search === '?wishlist' ? 'Список желаний пуст' : 'По вашему запросу ничего не найдено.';
        }
        data.forEach((item) => {
            const { name, description, count, id, img, price } = item;
            goodsList.insertAdjacentHTML('afterbegin', `
                <li class="goods-list__item">
                    <a class="goods-item__link" href="card.html#${id}">
                        <article class="goods-item">
                            <div class="goods-item__img">
                                <img src=${img[0]}
                                    ${img[1] ? `data-second-image=${img[1]}` : ``} alt="${name}">
                            </div>
                            <p class="goods-item__new">
                            ${count > NEW_COUMT_ITEM ? `Новинка` : ''}
                            ${!count ? `Нет в наличии` : ''}
                            </p>
                            <h3 class="goods-item__header">${name}</h3>
                            <p class="goods-item__description">${description}</p>
                            <p class="goods-item__price">
                                <span class="goods-item__price-value">${price}</span>
                                <span class="goods-item__currency"> ₽</span>
                            </p>
                            ${count ? `<button class="btn btn-add-card" aria-label="Добравить в корзину" data-idd="${id}"></button>` : ``}
                        </article>
                    </a>
                </li>
            `);
        });
        goodsList.addEventListener('click', (event) => {
            const btnAddCart = event.target.closest('.btn-add-card');
            if (btnAddCart) {
                event.preventDefault();
                userData.cartList = btnAddCart.dataset.idd;
            }
        });    
    };

    if (location.pathname.includes('goods') && location.search) {
        const search = decodeURI(location.search);
        const prop = search.split('=')[0].slice(1);
        const value = search.split('=')[1];
        if (prop === 's') {
            getData.search(value, generateCards);
            mainHeader.textContent = `Поиск: ${value}`;
        } else if (prop === 'wishlist') {
            getData.wishList(userData.wishList, generateCards);
            mainHeader.textContent = `Список желаний`;            
        } else {
            getData.category(prop, value, generateCards);
            mainHeader.textContent = value;
        }
    }
};

export default generateGoodsPage;