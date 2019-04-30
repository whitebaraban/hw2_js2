"use strict"

// function renderGoods(title, price) {
// 	return '<div class="item"><h2>' + title + '</h2><br>' + '<b>' + price + '<b>' + '</div>'
// }

// function renderGoodItems(GOODS) {
// 	var new_arr = GOODS.map(function (rec) { 
//		ЗДЕСЬ Я СКОРАТИЛ ЗАПИСЬ ФУНКЦИИ УБРАВ ЛИШНЮЮ ПЕРЕМЕННУЮ GOODS_LIST
// 		document.querySelector('.goods').innerHTML += renderGoods(rec.title, rec.price); }); 
// }	

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

function makeGETRequest(url, callback) {
  var xhr;

  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) { 
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
   		console.log(xhr.status);
      	callback(xhr.responseText);
    }
  }

xhr.open('GET', url, true);
xhr.send();
}


class GoodsList {
	constructor() {
		this.goods = [];
	}

 	fetchGoods() {
    	makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
      		this.goods = JSON.parse(goods);
      		console.log(this.goods);
      		list.render();
    	})
	}

	render() {
		let listHtml = '';
		this.goods.forEach(good => {
			const goodItem = new GoodsItem(good.product_name, good.price);
			listHtml += goodItem.render();
		});
		document.querySelector('.goods').innerHTML = listHtml;
	}
}

class GoodsItem {
	constructor(title, price) {
		this.title = title;
		this.price = price;
	}
	render() {
		return `<div class="item"><h2>${this.title}</h2>${this.price}$<button class="addToCartBtn">Добавить</button></div>`
	}
}

const list = new GoodsList();
list.fetchGoods();



// const GOODS = [
// 	{title: 'Book', price: 230},
// 	{title: 'T-short', price: 50},
// 	{title: 'Milk', price: 0.99},
// 	{title: 'Potato', price: 0.20},
// 	{title: 'Duck', price: 1.99},
// 	{title: 'Iphone', price: 200},
// 	{title: 'Pen', price: 0.30},
// 	{} // Для проверки значений по умолчанию
// ];

// const renderGoodsItem = (title  = 'Not found', price = "0") => `<div class="item"><h2>${title}</h2>${price}$
// 	<button class="addToCartBtn">Добавить</button></div>`;

// const renderGoodList = goods => {
// 	let goods_list = goods.map(item => document.querySelector('.goods').innerHTML += 
// 		renderGoodsItem(item.title, item.price));

// 	const summ_good = items => {
// 		let summ = 0;
// 		for (let i = 0; i < items.length; i++) { 
// 			if (!isNaN(items[i].price)) {
// 				summ += items[i].price;
// 			}
// 		}
// 		console.log(`Сумма всех товаров: ${summ}`)
// 	}
// 	summ_good(goods)
// }

// renderGoodList(GOODS);



