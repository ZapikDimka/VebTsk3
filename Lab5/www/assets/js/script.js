import { pizza_info } from "../../../src/Pizza_List.js";

const pizzaList = document.getElementById("pizza-list");
const pizzaCart = document.getElementById("order-list");
const orderCounter = document.getElementById("amount_in_cart");
const orderPrice = document.getElementById("price");
const filterLabel = document.getElementById("filter");
const clearOrderButton = document.getElementById("clear-order-button");

//localStorage.setItem("order",JSON.stringify([]));
let orderList = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
//let currIndex = 0;
// console.log(pizzaList);
// console.log(pizza_info);

pizza_info.forEach(drawPizza);

orderList.forEach(drawPizzaCart);
updateOrderPrice();
orderCounter.innerText = orderList.length;
function drawPizza(pizzaData) {
    let buyOptions = "";

    if (pizzaData.small_size !== undefined) {
        buyOptions += `<div>
                        <div class="pizza-parameter"><img src="assets/images/size-icon.svg"/>${pizzaData.small_size.size}
                        </div>
                        <div class="pizza-parameter"><img src="assets/images/weight.svg"/>${pizzaData.small_size.weight}г.
                        </div>
                      
                        <div class="image-text-row1">
    <img src="assets/images/strila1.png" alt="Стріла зображення">
    <p>було</p>
    <img src="assets/images/strila2.png" alt="Стріла зображення">
</div>
                             <div class="pizza-oldprice1">
                        <s>${pizzaData.small_size.price}грн.</s>
                        </div>
                        
                        <div class="image-text-row2">
    <img src="assets/images/strila1.png" alt="Стріла зображення">
    <p>стало</p>
    <img src="assets/images/strila2.png" alt="Стріла зображення">
</div>
<div class="pizza-price">
                        <p>${pizzaData.small_size.newPrice}грн.</p>
                        </div>
                        <button>Купити</button>
                       </div>
                    `;
    }
    if (pizzaData.big_size !== undefined) {
        buyOptions += `<div>
                        <div class="pizza-parameter"><img src="assets/images/size-icon.svg"/>${pizzaData.big_size.size}
                        </div>
                        <div class="pizza-parameter"><img src="assets/images/weight.svg"/>${pizzaData.big_size.weight}г.
                        </div>
                        <div class="image-text-row3">
    <img src="assets/images/strila1.png" alt="Стріла зображення">
    <p>було</p>
    <img src="assets/images/strila2.png" alt="Стріла зображення">
</div>
                        <div class="pizza-oldprice2">
                        <s>${pizzaData.big_size.price}грн.</s>
                        </div>
                        <div class="image-text-row4">
    <img src="assets/images/strila1.png" alt="Стріла зображення">
    <p>стало</p>
    <img src="assets/images/strila2.png" alt="Стріла зображення">
</div>
                        <div class="pizza-price">
                        <p>${pizzaData.big_size.newPrice}грн. </p>
                        </div>
                        <button>Купити</button>
                       </div>
                    `;
    }

    let labels = "";
    if (pizzaData.is_new) {
        labels += `<label style="color: white; border-radius: 5px; background-color: #cc3a33; font-size: 1.7rem; padding-right: 10px; padding-left: 10px; padding-top: 3px; height: 30px;
                            box-sizing: border-box">Нова</label>`;
    }
    if (pizzaData.is_popular) {
        labels += `<label style="color: white; border-radius: 5px; background-color: #49a649; font-size: 1.7rem; padding-right: 10px; padding-left: 10px; padding-top: 3px; margin-left: 5px">Популярна</label>`;
    }
    let upperLabel = `<div style="position: relative">
                        <div style="position: absolute; top: -15px; right: -15px; display: flex; justify-content: flex-end;">
                           ${labels}                          
                        </div>
                       </div>`;

    let pizza = `<div class="col-sm-6 col-md-4 resize">
                    <div class="thumbnail pizza-card">
                        ${upperLabel}
                        <img src=${pizzaData.icon}>
                        <div class="caption"><h3>${pizzaData.title}</h3>
                            <p class="description">${pizzaData.type}</p>
                            <p class="content">${getPizzaContent(pizzaData.content)}</p>
    
                            <div class="buy-options">
                                ${buyOptions}
                            </div>
                        </div>
                    </div>
                </div>`;
    pizzaList.innerHTML += pizza;
   // pizzaList.appendChild(pizza);
    console.log(pizza);
}

function getPizzaContent(pizzaContent) {
    let allContent = [].concat(...Object.values(pizzaContent));
//    console.log(allContent);
    return allContent.join(", ");
}

function drawPizzaCart(pizza) {
    let label;
    let size;
    let weight;
    let price;

    if (pizza.isSmallSize) {
        label = pizza.pizzaInfo.title + " (Мала)" ;
        size = pizza.pizzaInfo.small_size.size ;
        weight = pizza.pizzaInfo.small_size.weight ;
        price = pizza.pizzaInfo.small_size.newPrice * pizza.amount;
    } else {
        label = pizza.pizzaInfo.title + " (Велика)" ;
        size = pizza.pizzaInfo.big_size.size ;
        weight = pizza.pizzaInfo.big_size.weight ;
        price = pizza.pizzaInfo.big_size.newPrice * pizza.amount;
    }

    const order = `<div class="order-item">
                    <div class="item-info">
                        <label>${label}
                        </label>
                        <div>
                            <img src="assets/images/size-icon.svg"/>${size}
                            <img src="assets/images/weight.svg"/>${weight}
                        </div>
                        <div>
                            <h4>${price} грн</h4>
                            <button class="button-red">–</button>
                            <label class="counter">${pizza.amount}</label>
                            <button class="button-green">+</button>
                            <button class="remove-button">✖</button>
                        </div>
                    </div>
                    <div class="item-image">
                        <img src="${pizza.pizzaInfo.icon}"/>
                    </div>
                </div>`

    pizzaCart.innerHTML += order;
}

pizzaList.addEventListener("click", function (event) {
    if (event.target.matches("button")) {
        const pizzaName = event.target.parentElement.parentElement.parentElement.children[0].innerText;
        const pizzaRadius = event.target.parentElement.children[0].innerText;
        // console.log(pizzaRadius);
        const pizzaInfo = pizza_info.find(pizza => pizza.title === pizzaName);
        // console.log(pizzaInfo);
        addPizzaDataToCart(pizzaInfo,pizzaRadius);
    }
});

pizzaCart.addEventListener("click", function (event) {
   let pizzaName = event.target.parentElement.parentElement.children[0].innerText;
//   console.log(pizzaName);
   const isSmall = pizzaName.includes(" (Мала)");
   if (isSmall) {
       pizzaName = pizzaName.substring(0, pizzaName.length - 7);
   } else {
       pizzaName = pizzaName.substring(0, pizzaName.length - 9);
   }
 //  const pizza = orderList.find(pizza => pizza.pizzaInfo.title === pizzaName && pizza.isSmallSize === isSmall);
    let i;
    let pizza;
    for (i = 0; i < orderList.length; i++) {
        if (orderList[i].pizzaInfo.title === pizzaName && orderList[i].isSmallSize === isSmall) {
            pizza = orderList[i];
            break;
        }
    }

   if (event.target.classList.contains("button-red")) {
       pizza.amount--;
       if (pizza.amount === 0) {
           orderList.splice(i,1);
       }
   } else if (event.target.classList.contains("button-green")) {
       pizza.amount++;
   } else if (event.target.classList.contains("remove-button")) {
       orderList.splice(i,1);
   }
   // console.log(i);
   // console.log(orderList);

   localStorage.setItem("order", JSON.stringify(orderList));
   pizzaCart.innerHTML = "";
   orderCounter.innerText = orderList.length;
   updateOrderPrice();
   orderList.forEach(drawPizzaCart);
   //console.log(pizzaName);
});
clearOrderButton.addEventListener("click",function (event) {
    pizzaCart.innerHTML = "";
    orderList = [];
    orderCounter.innerText = '0';
    orderPrice.innerText = 0 + " грн";
    localStorage.setItem("order", JSON.stringify(orderList));
});

function updateOrderPrice() {
    let amount = 0;
    for (const pizza of orderList) {
        if (pizza.isSmallSize) {
            amount += pizza.pizzaInfo.small_size.newPrice * pizza.amount;
        } else {
            amount += pizza.pizzaInfo.big_size.newPrice * pizza.amount;
        }
    }
    orderPrice.innerText = amount + " грн";
}
function createPizzaDataObj(pizzaInfo, pizzaRadius) {
    let isSmallSize = false;
    let amount = 1;

    if (pizzaInfo.small_size !== undefined && pizzaInfo.small_size.size == pizzaRadius) {
        isSmallSize = true;
    }

    return {pizzaInfo, isSmallSize, amount};
}
function addPizzaDataToCart(pizzaInfo, pizzaRadius) {
    const pizzaDataObj = createPizzaDataObj(pizzaInfo, pizzaRadius);
   // console.log(pizzaDataObj);
    const pizzaInList = orderList.find(pizzaInfo => pizzaInfo.pizzaInfo.title === pizzaDataObj.pizzaInfo.title && pizzaInfo.isSmallSize === pizzaDataObj.isSmallSize);

    if (pizzaInList) {
        pizzaInList.amount++;
    } else {
        orderList.push(pizzaDataObj);
    }
//    console.log(orderList);
    localStorage.setItem("order", JSON.stringify(orderList));
    pizzaCart.innerHTML = "";
    orderCounter.innerText = orderList.length;
    updateOrderPrice();
    orderList.forEach(drawPizzaCart);
}

document.getElementById("all-pizzas").addEventListener("click", drawAllPizza);
document.getElementById("meat-pizza").addEventListener("click", drawMeatPizza);
document.getElementById("pineapple-pizza").addEventListener("click", drawPineapplePizza);
document.getElementById("mushroom-pizza").addEventListener("click", drawMushroomPizza);
document.getElementById("sea-pizza").addEventListener("click", drawSeaPizza);
document.getElementById("vegan-pizza").addEventListener("click", drawVeganPizza);

function drawPizzaWithFilter(pizzaFilter, filterName) {
    document.querySelector(".active-filter").classList.remove("active-filter");

    pizzaList.innerHTML = "";
    const pizzas = pizza_info.filter(pizzaFilter);

    filterLabel.innerHTML = `${filterName} <span class="filter-amount" id="amount_in_filter">${pizzas.length}</span>`;

    pizzas.forEach(drawPizza);
}
function drawAllPizza() {
    document.querySelector(".active-filter").classList.remove("active-filter");
    pizzaList.innerHTML = "";
    filterLabel.innerHTML = `Усі піци <span class="filter-amount" id="amount_in_filter">${pizza_info.length}</span>`;
    pizza_info.forEach(drawPizza);
    this.classList.add("active-filter");
}
function drawMeatPizza() {
    drawPizzaWithFilter(pizza => pizza.content.meat !== undefined, "М'ясні");
    this.classList.add("active-filter");
}

function drawPineapplePizza() {
    drawPizzaWithFilter(pizza => pizza.content.pineapple !== undefined, "З ананасом");
    this.classList.add("active-filter");
}
function drawMushroomPizza() {
    drawPizzaWithFilter(pizza => pizza.content.mushroom !== undefined, "З грибами");
    this.classList.add("active-filter");
}

function drawSeaPizza() {
    drawPizzaWithFilter(pizza => pizza.content.ocean !== undefined, "З морепродуктами");
    this.classList.add("active-filter");
}

function drawVeganPizza() {
    drawPizzaWithFilter(pizza => pizza.content.ocean === undefined && pizza.content.meat === undefined
                                                                            && pizza.content.chicken === undefined, "Вега");
    this.classList.add("active-filter");
}
// Отримати посилання на елементи кнопки та елемента з класом "shopping-cart"
const hideCartButton3 = document.querySelector('.hide-cart-button3');
const hideCartButton1 = document.querySelector('.hide-cart-button1');
const hideCartButton2 = document.querySelector('.hide-cart-button2');
const shoppingCart = document.querySelector('.shopping-cart');
var currentPosition = 0; // Початкове положення об'єкта
var isMovingRight = false; // Флаг, що вказує, чи здійснюється рух вправо
var moved = false;

hideCartButton1.addEventListener('click', function() {
    if (!isMovingRight) {
        moveRight();
    } else {
        moveBack();
    }
});
hideCartButton2.addEventListener('click', function() {
    if (!isMovingRight) {
        moveRight();
    } else {
        moveBack();
    }
});
hideCartButton3.addEventListener('click', function() {
    if (!isMovingRight) {
        moveRight();
    } else {
        moveBack();
    }
});

function moveRight() {
    moved = true;
    isMovingRight = true;
    var animation = setInterval(function() {
        currentPosition += 5; // Швидкість руху вправо (можна змінювати для більш плавного або швидкого руху)
        shoppingCart.style.transform = 'translateX(' + currentPosition + 'px)';
        if (currentPosition >= 350) {
            clearInterval(animation);
        }
    }, 0.001); // Інтервал оновлення анімації (можна змінювати для більш плавного або швидкого руху)
}

function moveBack() {
    moved = false;
    isMovingRight = false;
    var animation = setInterval(function() {
        currentPosition -= 5; // Швидкість руху назад (можна змінювати для більш плавного або швидкого руху)
        shoppingCart.style.transform = 'translateX(' + currentPosition + 'px)';

        if (currentPosition <= 0) {
            clearInterval(animation);
        }
    }, 0.001); // Інтервал оновлення анімації (можна змінювати для більш плавного або швидкого руху)
}

//region play music in background
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

var backgroundMusic = [
    document.getElementById("background-music1"),
    document.getElementById("background-music2"),
    document.getElementById("background-music3")
];

var currentSongIndex = 0;
var shuffledSongs = shuffleArray(backgroundMusic);

function playNextSong() {
    shuffledSongs[currentSongIndex].pause();
    shuffledSongs[currentSongIndex].currentTime = 0;
    currentSongIndex = (currentSongIndex + 1) % shuffledSongs.length;
    shuffledSongs[currentSongIndex].play();
}

function setVolume(volume) {
    shuffledSongs.forEach(function (music) {
        if (volume < 0) volume = 0;
        if (volume > 1) volume = 1;
        music.volume = volume;
    });
}

shuffledSongs.forEach(function (music) {
    music.addEventListener('ended', playNextSong);
});

setVolume(0.5);

var song;
window.onload = function() {
    // Видаліть наступний рядок, щоб пісня не програвалась при запуску сайту
    // shuffledSongs[0].play();
}

$(".playMusicButt").click(function() {
    shuffledSongs[currentSongIndex].play();
    setVolume(0.5);
    $(".playMusicButt").css("display", "none");
    $(".stopMusicButt").css("display", "inline-block");
});

$(".stopMusicButt").click(function() {
    shuffledSongs[currentSongIndex].pause();
    $(".stopMusicButt").css("display", "none");
    $(".playMusicButt").css("display", "inline-block");
});

$(".nextMusicButt").click(function() {
    playNextSong();
    setVolume(0.5);
    $(".playMusicButt").css("display", "none");
    $(".stopMusicButt").css("display", "inline-block");
});
//endregion

$(document).ready(function() {
    var isMusicPlaying = false;
    var audio = document.getElementById('background-music');
    var images = $('.pizza-background img');
    var currentIndex = 0;

    function toggleMusic() {
        if (isMusicPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        isMusicPlaying = !isMusicPlaying;
    }

    $('#stopButton, #playButton').on('click', toggleMusic);

    function changeImage() {
        images.removeClass('active');
        images.eq(currentIndex).addClass('active');
        currentIndex = (currentIndex + 1) % images.length;

        setTimeout(changeImage, 3000);
    }

    changeImage();
});
