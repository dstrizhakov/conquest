/************************************************/
// Бургер меню //
/************************************************/
// получаем элементы .menu__icon и .menu__body
const menuIcon = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".menu__body");
// если .menu__icon есть
if (menuIcon) {
  document.body.addEventListener("click", function (e) {
    // если кликнули по иконке бургер - переключаем классы
    // открываем меню или закрываем его
    if (e.target.closest(".menu__icon")) {
      document.body.classList.toggle("lock");
      menuIcon.classList.toggle("menu-open");
      menuBody.classList.toggle("menu-open");
      // иначе кликнули вне иконки бургер - закрываем меню
      // не важно, кликнули ли мы по пункту меню или вне его
    } else {
      document.body.classList.remove("lock");
      menuIcon.classList.remove("menu-open");
      menuBody.classList.remove("menu-open");
    }
  });
}
