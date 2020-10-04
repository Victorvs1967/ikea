import getData from './getData.js';
import userData from './userData.js';


const generateCartPage = () => {
    
    if (location.pathname.includes('cart')) {
        const cartList = document.querySelector('.cart-list');
        const cartTotalPrice = document.querySelector('.cart-total-price');

        const renderCartList = (data) => {
            let totalPrice = 0;
            cartList.textContent = '';

            data.forEach(({ category, subcategory, name: itemName, price, description, count, img, id }) => {
                let countUser = parseInt(userData.cartList.find((item) => item.id === id).count);
                if (countUser > count) countUser = count;

                totalPrice += price * countUser;

                let options = '';
                for (let i = 1; i <= count; i++) {
                    options += `<option value=${i} ${countUser === i ? 'selected' : ''}>${i}</option>`;
                }

                cartList.insertAdjacentHTML('beforeend', `
                    <li class="cart-item">
                        <div class="product">
                            <div class="product__image-container">
                                <img src=${img[0]} alt="IKEA ${itemName} ${subcategory}" aria-describedby="aria_product_description_40366083" itemprop="image">
                            </div>
                            <div class="product__description">
                                <h3 class="product__name">
                                    <a href="card.html${id}">${itemName}</a></h3>
                                <p class="product_description-text">${description}</p>
                            </div>
                            <div class="product__prices">
                                <div class="product__price-type product__price-type-regular">
                                    <div>
                                        <div class="product__total product__total-regular">${price * countUser}-</div>
                                    ${ countUser > 1 ? `<div class="product__price-regular">${price}-</div>` : ``}
                                    </div>
                                </div>
                            </div>
                            <div class="product__controls">
        
                            <div class="product-controls__remove">
                                <button type="button" class="btn btn-remove" data-idd=${id}>
                                    <img src="image/remove-thin-24.16c1cc7a.svg" alt="Удалить товар">
                                </button>
                            </div>
                            <div class="product-controls__quantity">
                                <select title="Выберите количество" aria-label="Выберите количество" data-idd=${id}>
                                    ${options}
                                </select>
                            </div>
                        </div>
                    </div>
                    </li>
                `);
            });
            cartTotalPrice.textContent = `${totalPrice}-`;
        };
        getData.cart(userData.cartList, renderCartList);

        cartList.addEventListener('change', (event) => {
            const target = event.target;
            console.log(target.value);
            userData.changeCountcartList = {
                id: target.dataset.idd,
                count: target.value
            };
            getData.cart(userData.cartList, renderCartList);
        });

        cartList.addEventListener('click', (event) => {
            const target = event.target;
            const btnRemove = target.closest('.btn-remove');
            if (btnRemove) {
                userData.deleteItemCart = btnRemove.dataset.idd;
                getData.cart(userData.cartList, renderCartList);    
            }
        });
    }
};

export default generateCartPage;