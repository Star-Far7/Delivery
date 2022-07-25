const cart = () => {
  const buttonCart = document.getElementById("cart-button");
  const modalCart = document.querySelector(".modal-cart");
  const close = modalCart.querySelector(".close");
  const body = modalCart.querySelector(".modal-body");
  const buttonSend = modalCart.querySelector(".button-primary");
  const clearCart = modalCart.querySelector(".clear-cart");
  const totalPrice = document.querySelector(".modal-pricetag");

  const resetCart = () => {
    body.innerHTML = "";
    localStorage.removeItem("cart");
    modalCart.classList.remove("is-open");
    totalPrice.innerHTML = 0;
  };

  const incrementCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem("cart"));

    cartArray.map((item) => {
      if (item.id === id) {
        item.count++;
      }

      return item;
    });

    localStorage.setItem("cart", JSON.stringify(cartArray));
    counting();

    renderItems(cartArray);
  };

  const decrementCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem("cart"));

    cartArray.map((item) => {
      if (item.id === id) {
        item.count = item.count > 0 ? item.count - 1 : 0;
      }

      return item;
    });

    localStorage.setItem("cart", JSON.stringify(cartArray));
    counting();

    renderItems(cartArray);
  };

  const counting = () => {
    const foodPrice = document.querySelectorAll(".food-price");
    const priceArray = [];

    foodPrice.forEach((item) => {
      priceArray.push(parseInt(item.textContent));
    });

    const result = priceArray.reduce(function (sum, current) {
      return sum + current;
    });

    totalPrice.innerHTML = result;
  };

  const renderItems = (data) => {
    body.innerHTML = "";
    data.forEach(({ name, price, id, count }) => {
      const cartElem = document.createElement("div");

      cartElem.classList.add("food-row");

      cartElem.innerHTML = `
      			<span class="food-name">${name}</span>
            <strong class="food-price">${price * count} ₽</strong>
            <div class="food-counter">
              <button class="counter-button btn-dec" data-index='${id}'>-</button>
              <span class="counter">${count}</span>
              <button class="counter-button btn-inc" data-index='${id}'>+</button>
            </div>`;

      body.append(cartElem);
    });

    counting();
  };

  body.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.classList.contains("btn-inc")) {
      incrementCount(e.target.dataset.index);
    } else if (e.target.classList.contains("btn-dec")) {
      decrementCount(e.target.dataset.index);
    }
  });

  buttonSend.addEventListener("click", () => {
    const cartArray = localStorage.getItem("cart");

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: cartArray,
    })
      .then((response) => {
        if (response.ok) {
          resetCart();
        }
      })
      .catch((e) => {
        console.error(e);
      });
  });

  clearCart.addEventListener("click", resetCart);

  buttonCart.addEventListener("click", () => {
    if (localStorage.getItem("cart")) {
      renderItems(JSON.parse(localStorage.getItem("cart")));
    }

    modalCart.classList.add("is-open");
  });

  close.addEventListener("click", () => {
    modalCart.classList.remove("is-open");
  });
};
cart();
