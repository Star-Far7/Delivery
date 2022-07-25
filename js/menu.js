const menu = () => {
  const cardsMenu = document.querySelector(".cards-menu");

  const cartArray = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  /**
   * Функция с помощью Деструктуризации заполняет заголовок секции
   */
  const changeTitle = ({ kitchen, name, price, stars }) => {
    const restaurantTitle = document.querySelector(".restaurant-title");
    const restaurantRating = document.querySelector(".rating");
    const restaurantPrice = document.querySelector(".price");
    const restaurantCategory = document.querySelector(".category");

    restaurantTitle.textContent = name;
    restaurantRating.textContent = stars;
    restaurantPrice.innerHTML = `От ${price} ₽`;
    restaurantCategory.textContent = kitchen;
  };

  const addToCart = (cartItem) => {
    if (cartArray.some((item) => item.id === cartItem.id)) {
      cartArray.map((item) => {
        if (item.id === cartItem.id) {
          item.count++;
        }

        return item;
      });
    } else {
      cartArray.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cartArray));
  };

  /**
   * Функция плучает объект и с помощью Деструктуризации
   * заполняет содержимое карточек в блоке cardsMenu
   */
  const renderItems = (data) => {
    data.forEach(({ description, id, image, name, price }) => {
      const card = document.createElement("div");

      card.classList.add("card");

      card.innerHTML = `
							<img
                src="${image}"
                alt="${name}"
                class="card-image"
              />
              <div class="card-text">
                <div class="card-heading">
                  <h3 class="card-title card-title-reg">Пицца Везувий</h3>
                </div>
                <div class="card-info">
                  <div class="ingredients">
                    ${description}
                  </div>
                </div>
                <div class="card-buttons">
                  <button class="button button-primary button-add-cart">
                    <span class="button-card-text">В корзину</span>
                    <span class="button-cart-svg"></span>
                  </button>
                  <strong class="card-price-bold">${price} ₽</strong>
                </div>
              </div>
		`;

      card.querySelector(".button-card-text").addEventListener("click", () => {
        addToCart({ name, price, id, count: 1 });
      });

      cardsMenu.append(card);
    });
  };

  /**
   * Если в localStorage есть объект restaurant,
   * то запрашиваем товары из базы данных и отрисовываем их.
   * Если нету, то воозвращаем пльзователя на главнуб страницу
   */
  if (localStorage.getItem("restaurant")) {
    const restaurant = JSON.parse(localStorage.getItem("restaurant"));

    changeTitle(restaurant);

    fetch(`./db/${restaurant.products}`)
      .then((response) => response.json())
      .then((data) => renderItems(data))
      .catch((error) => {
        console.log(error);
      });
  } else {
    window.location.href = "/";
  }
};
menu();
