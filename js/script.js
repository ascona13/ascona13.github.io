"use strict"

// Ждем загрузку контента
window.onload = function () {
	const parallax = document.querySelector('.parallax');

	if (parallax) {
		const content = document.querySelector('.parallax__container');
		const clouds = document.querySelector('.images-parallax__clouds');
		const mountains = document.querySelector('.images-parallax__mountains');
		const human = document.querySelector('.images-parallax__human');
    const human2 = document.querySelector('.images-parallax__human2');

		// Коэффициенты
		const forClouds = 40;
		const forMountains = 20;
		const forHuman = 10;
    const forHuman2 = 10;

		// Скорость анимации
		const speed = 0.05;

		// Объявление переменных
		let positionX = 0, positionY = 0;
		let coordXprocent = 0, coordYprocent = 0;

		function setMouseParallaxStyle() {
			const distX = coordXprocent - positionX;
			const distY = coordYprocent - positionY;

			positionX = positionX + (distX * speed);
			positionY = positionY + (distY * speed);

			// Передаем стили
			clouds.style.cssText = `transform: translate(${positionX / forClouds}%,${positionY / forClouds}%);`;
			mountains.style.cssText = `transform: translate(${positionX / forMountains}%,${positionY / forMountains}%);`;
			human.style.cssText = `transform: translate(${positionX / forHuman}%,${positionY / forHuman}%);`;
      human2.style.cssText = `transform: translate(${positionX / forHuman2}%,${positionY / forHuman2}%);`;

			requestAnimationFrame(setMouseParallaxStyle);
		}
		setMouseParallaxStyle();

		parallax.addEventListener("mousemove", function (e) {
			// Получение ширины и высоты блока
			const parallaxWidth = parallax.offsetWidth;
			const parallaxHeight = parallax.offsetHeight;

			// Ноль в центре
			const coordX = e.pageX - parallaxWidth / 2;
			const coordY = e.pageY - parallaxHeight / 2;

			// Получаем проценты
			coordXprocent = coordX / parallaxWidth * 100;
			coordYprocent = coordY / parallaxHeight * 100;
		});

		// Parallax при скролле

		let thresholdSets = [];
		for (let i = 0; i <= 1.0; i += 0.005) {
			thresholdSets.push(i);
		}
		const callback = function (entries, observer) {
			const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;
			setParallaxItemsStyle(scrollTopProcent);
		};
		const observer = new IntersectionObserver(callback, {
			threshold: thresholdSets
		});

		observer.observe(document.querySelector('.content'));

		function setParallaxItemsStyle(scrollTopProcent) {
			content.style.cssText = `transform: translate(0%,-${scrollTopProcent / 9}%);`;
			mountains.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 6}%);`;
			human.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 3}%);`;
      human2.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 3}%);`;
		}


	}

}
  /*============AboutParallax=============*/
  ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2500,
    delay: 600
  })
  ScrollReveal().reveal('.main-title, .parallax__label' , { delay: 500, origin: 'left'})
  ScrollReveal().reveal('.sec-01 .image', { delay: 600, origin: 'bottom'})
  ScrollReveal().reveal('.text-box, .parallax__title', { delay: 700, origin: 'right'})
  ScrollReveal().reveal('.sec-02 .image', { delay: 500, origin: 'top'})
  ScrollReveal().reveal('.navbar',  { delay: 500, origin: 'left'})


/*==============logoNavParallax=============*/

const logo = document.querySelector('.logo')
const nav = document.querySelector('.navbar')
const logo2 = document.querySelector('.logo2')
window.addEventListener('load', () => {
  logo.style.transform = "translateX(0)"
  /*logo2.style.transform = "translateX(0)"*/
})
window.addEventListener('scroll', () => {
  const scrollVal = window.scrollY
  /*logo2.style.left = scrollVal * -0.25 + "px"*/
})


/*=================BURGER======================*/

const iconMenu = document.querySelector('.menu-btn');//поиск класса
const menuBody = document.querySelector('.navbar');
if (iconMenu) {// проверка если ли такой класс
	iconMenu.addEventListener("click", function (e) {//если да то создаем событие
		document.body.classList.toggle('_lock');//добавление lock для body для отключения прокрутки во время открытого меню
		iconMenu.classList.toggle('_active');//c помощью toggle доб или удал. класс active
		menuBody.classList.toggle('_active');
	});
}


/*==============Scroll on click======================*/
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');//сбор массива обьектов которые учавствуют в навигации
if (menuLinks.length > 0) { //проверка..если что то из того что мы ищем
	menuLinks.forEach(menuLink => {//пробегаем по каждому найденному
		menuLink.addEventListener("click", onMenuLinkClick);//и вещаем каждому найденному событие
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;// получаем обьект на который кликаем
		
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {//проверка 1 заполнен ли данный атрибут && cуществует ли обьект на который ссылается данный атрибут
			const gotoBlock = document.querySelector(menuLink.dataset.goto);//получение обьекта
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;//получение местоположения обьекта в px + кол-во прокрученых px - высота шапки 
																			//можно поменять на scrollx
			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			window.scrollTo({//обращение к окну браузера с функцией прокрутки scrollTO
				top: gotoBlockValue,//указываем прокрутку сверху и константу с высшитаной позицией сверху
				behavior: "smooth"//поведение указываем плавное
			});
			e.preventDefault();//отключение работы ссылки чтобы она никуда не переходила
		}
	}
}

const btns = document.querySelectorAll('.menu__link')

let sliderNav = function(manual){
  btns.forEach((btn) => {
    btn.classList.remove('_active')
  })
  
  btns[manual].classList.add('_active')
  }
  btns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      sliderNav(i)
    })
  })
