const auth = () => {
  const buttonAuth = document.querySelector(".button-auth");
  const modalAuth = document.querySelector(".modal-auth");
  const buttonOut = document.querySelector(".button-out");
  const userName = document.querySelector(".user-name");
  const closeAuth = document.querySelector(".close-auth");
  const logInForm = document.getElementById("logInForm");
  const inputLogin = document.getElementById("login");
  const inputPassword = document.getElementById("password");
  const buttonCart = document.querySelector(".button-cart");

  /* 
Функция получает обект с данными о пользователе,
скрывает кнопку "войти" и показыет ктопку "выйти"
с логином пользователя и корзиной
 */
  const login = (user) => {
    buttonAuth.style.display = "none";

    buttonOut.style.display = "flex";
    userName.style.display = "flex";
    buttonCart.style.display = "flex";

    userName.textContent = user.login;
    modalAuth.style.display = "none";
  };

  /* 
Скрываем кнопку "выйти" с логином (очищаем логин) и корзиной,
показываем кнопку "войти" и удаляем user из 
 */
  const logout = () => {
    buttonAuth.style.display = "flex";

    buttonOut.style.display = "none";
    buttonCart.style.display = "none";
    userName.style.display = "none";
    userName.textContent = "";

    localStorage.removeItem("user");
  };

  /* 
Обработчики события на кнопке открытия модального окна и ее закрытия 
*/
  // --------------------
  buttonAuth.addEventListener("click", () => {
    modalAuth.style.display = "flex";
  });
  closeAuth.addEventListener("click", () => {
    modalAuth.style.display = "none";
  });
  // --------------------

  buttonOut.addEventListener("click", () => {
    logout();
  });

  /* 
Обработчик на форме проверят ввели ли что нибудь в форму,
еслт да то создает объект user, сохраняет его в localStorage,
и вызывает функцию входа
 */
  logInForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (inputLogin.value.length < 1 && inputPassword.value.length < 1) {
      alert("Введите логин и пароль");
    } else if (inputLogin.value.length < 1) {
      alert("Вы не ввели имя пользователя");
    } else if (inputPassword.value.length < 1) {
      alert("Вы не ввели пароль");
    } else {
      const user = {
        login: inputLogin.value,
        password: inputPassword.value,
      };

      localStorage.setItem("user", JSON.stringify(user));
      login(user);
    }
  });

  // вход при презагрузке сайта
  if (localStorage.getItem("user")) {
    login(JSON.parse(localStorage.getItem("user")));
  }
};
auth();
