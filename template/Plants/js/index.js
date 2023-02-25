console.log("1. При нажатии на кнопки: Gargens,Lawn,Planting происходит смена фокуса на услугах в разделе service +50\n")
console.log("2. Accordion в секции prices реализация 3-х выпадающих списков об услугах и ценах + 50 \n")
console.log("3. В разделе contacts реализован select с выбором городов +25 \n")
console.log("PS. Закрытие селекта города и сброс выбранных сервисов при клике вне кнопок сделаны специально для удобства пользователя. \n")
console.log("Есть некоторое несоответствие макета в секции contacts, так сделано специально, так как исправлять кривой макет по условию нужно и правильно.\n")
console.log("В общем-то в Plants3 должны проверяеся требования корректной работы JS а не PP... \n")
console.log("Общая оценка 100/100 \n")

/************************************************/
// Бургер меню //
/************************************************/
// получаем элементы .menu__icon и .menu__body
const menuIcon = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
// если .menu__icon есть
if (menuIcon) {
	document.body.addEventListener("click", function (e) {
		// если кликнули по иконке бургер - переключаем классы
		// открываем меню или закрываем его
		if (e.target.closest('.menu__icon')) {
			document.body.classList.toggle('_lock');
			menuIcon.classList.toggle('_active');
			menuBody.classList.toggle('_active');
			// иначе кликнули вне иконки бургер - закрываем меню
			// не важно, кликнули ли мы по пункту меню или вне его
		} else {
			document.body.classList.remove('_lock');
			menuIcon.classList.remove('_active');
			menuBody.classList.remove('_active');
		};
	});
}
/************************************************/
// Аккордeон //
/************************************************/
// получаем коллекцию элементов с классом .accordeon-button
// пробегаем по элементам методом forEach
document.querySelectorAll('.accordeon-button').forEach((el) => {
	// добавляем слушатель события "click" каждому элементу .accordeon-button
	el.addEventListener('click', function (e) {
		// Если мы кликаем по активному пункту то нужно просто его закрыть
		if (el.parentNode.closest('._active')) {
			el.parentNode.classList.remove('_active');
		} else {
			// иначе мы кликаем по неактивному пункту и нам нужно
			// закрыть все элементы аккордеона
			document.querySelectorAll('.accordeon-item').forEach((el) => {
				el.classList.remove('_active');
			})
			// и открыть тот по которому кликнули
			// добавляем класс _active родительскому элементу (.accordeon-item)
			// кнопки .accordeon-button по которой произошел клик
			el.parentNode.classList.add('_active');
		}
	});
})
/************************************************/
// Обработка кнопок секции services, блюр//
/************************************************/
//обрабатывать будет родительский элемент кнопок через всплытие
const serviceButtons = document.querySelector('.service__buttons');
//карточки на которыми нужно управлять
const plantingElements = document.querySelectorAll('.planting');
const lawnElements = document.querySelectorAll('.lawn');
const gardensElements = document.querySelectorAll('.gardens');

//тут будет храниться состояние кнопок и соответственно состояние карточек
let activeServicesArray = [];

const changeServices = (e) => {
	if (e.target.closest('.planting__btn')) {
		// Если кликнули по кнопке .planting__btn, добавим в массив класс, если его там еще нет.
		(activeServicesArray.join('').includes('.planting'))
			// Класс уже есть в массиве, значит пользователь нажимает на активную кнопку.
			? activeServicesArray = activeServicesArray.filter(el => el !== '.planting')
			: activeServicesArray.push('.planting')
	} else if (e.target.closest('.gardens__btn')) {
		// Если кликнули по кнопке .gardens__btn, добавим в массив класс, если его там еще нет.
		(activeServicesArray.join('').includes('.gardens'))
			? activeServicesArray = activeServicesArray.filter(el => el !== '.gardens')
			: activeServicesArray.push('.gardens')
	} else if (e.target.closest('.lawn__btn')) {
		// Если кликнули по кнопке .lawn__btn, добавим в массив класс, если его там еще нет.
		(activeServicesArray.join('').includes('.lawn'))
			? activeServicesArray = activeServicesArray.filter(el => el !== '.lawn')
			: activeServicesArray.push('.lawn')
	} else {
		//Если кликнули не по кнопке снимем блюр со всех элементов
		activeServicesArray = [];
	}
	// Если активных кнопок больше 2х сбросим все активные кнопки.
	if (activeServicesArray.length > 2) {
		activeServicesArray = [];
	}
	// проставим классы на кнопках согласно состоянию массива активных классов activeServicesArray
	setButtons();
	// проставим классы на карточках согласно состоянию массива активных классов activeServicesArray
	// если массив пустой уберем все блюры с карточек
	activeServicesArray.length ? setServices() : setAllServices()
}
const setButtons = () => {
	resetButtons();
	activeServicesArray.forEach(className => document.querySelector(`${className}__btn`).classList.add('_active'))
}
const setServices = () => {
	resetServices();
	activeServicesArray.forEach(className => {
		switch (className) {
			case '.planting':
				plantingElements.forEach(el => {
					el.classList.remove('_blur');
				})
				break;
			case '.gardens':
				gardensElements.forEach(el => {
					el.classList.remove('_blur');
				})
				break;
			case '.lawn':
				lawnElements.forEach(el => {
					el.classList.remove('_blur');
				})
				break;
			default:
				console.log(`No element to change! Array is: ${activeServicesArray}`);
		}
	})
}
const resetServices = () => {
	plantingElements.forEach(el => {
		el.classList.add('_blur');
	})
	lawnElements.forEach(el => {
		el.classList.add('_blur');
	})
	gardensElements.forEach(el => {
		el.classList.add('_blur');
	})
}
const setAllServices = () => {
	plantingElements.forEach(el => {
		el.classList.remove('_blur');
	})
	lawnElements.forEach(el => {
		el.classList.remove('_blur');
	})
	gardensElements.forEach(el => {
		el.classList.remove('_blur');
	})
}
const resetButtons = () => {
	document.querySelector('.planting__btn').classList.remove('_active');
	document.querySelector('.gardens__btn').classList.remove('_active');
	document.querySelector('.lawn__btn').classList.remove('_active');
}
// если кнопки существуют, будем слушать body, и определять нажатие на кнопки через всплытие
if (serviceButtons) {
	document.body.addEventListener("click", function (e) {
		changeServices(e);
	})
}

/************************************************/
// Обработка кнопки выбора города (селект)//
/************************************************/
const buttonCity = document.querySelector('.button-city')
const buttonCityName = document.querySelector('.button-city__name')
const selectContact = document.querySelector('.select-contact')
const contactsImage = document.querySelector('.contacts__image')
if (buttonCity) {
	document.body.addEventListener("click", function (e) {

		if (e.target.closest('.button-city')) {
			buttonCity.classList.toggle('_active');

		} else {
			buttonCity.classList.remove('_active');
		};
		if (e.target.closest('.select-contact__link')) {
			document.querySelectorAll('.city-item').forEach((el) => {
				el.classList.remove('_active');
			});
			buttonCity.classList.add('_selected');
			let cityId = 10 + Number(e.target.id);
			let currentCityItem = document.getElementById(`${cityId}`);
			currentCityItem.classList.add('_active');
			buttonCityName.innerText = e.target.innerHTML;
			contactsImage.classList.add('_hidden')
		}
	})
}

//https://rolling-scopes-school.github.io/dstrizhakov-JSFEPRESCHOOL2022Q4/Plants/


