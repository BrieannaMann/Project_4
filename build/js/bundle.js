(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (obj) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(obj.method || "GET", obj.url + '?apiKey=' + obj.api + '&format=json');

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = function () {
            return reject(xhr.statusText);
        };
        xhr.send(obj.body);
    });
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var carousel = exports.carousel = function carousel(data) {

	for (var i = 0; i < data.products.length; i++) {
		var brand = '<p  class= "brand">' + data.products[i].manufacturer;+'</p>';
		var name = '<p  class= "price">' + data.products[i].name + '</p>';
		var image = '<img src="' + data.products[i].largeImage + '">';
		var displayPrice = '<p  class= "price">' + data.products[i].regularPrice + '</p>';
		var price = data.products[i].regularPrice;
		var sku = data.products[i].sku;
		var addcart = '<button class="addtocart" data-sku="' + sku + '" data-price="' + price + '"> ADD TO CART </button>';
		//creating a new div for each product 
		var createDiv = $("<div></div>");
		createDiv.addClass('products');
		//append content to new div 
		$('#content').append(createDiv);

		createDiv.append(brand + name + image + displayPrice + addcart);
	};
};

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bestbuy = require("./bestbuy");

var _bestbuy2 = _interopRequireDefault(_bestbuy);

var _carousel = require("./carousel");

var _productutil = require("./productutil");

var _productutil2 = _interopRequireDefault(_productutil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
	function App() {
		_classCallCheck(this, App);

		this.baseurl = "https://api.bestbuy.com/v1/products";
		this.url = "https://api.bestbuy.com/v1/products";
		this.initBBCall();
		this.eventHandle();
		this.addtocart();
		console.log(sessionStorage.length);
	}

	_createClass(App, [{
		key: "eventHandle",
		value: function eventHandle() {
			var _this = this;

			$(".category").on('click', function (e) {
				var target = e.target.value;
				_this.url = _this.baseurl + target;
				// console.log(this.url);
				_this.initBBCall();
			});
		}
	}, {
		key: "initBBCall",
		value: function initBBCall() {
			(0, _bestbuy2.default)({ url: this.url, api: "8ccddf4rtjz5k5btqam84qak" }).then(function (data) {
				$('#content').empty();
				(0, _carousel.carousel)(data);
				/* fill carosel with products */
			}).catch(function (error) {
				console.log("warning Christopher Robins... Error");
				console.log(error);
			});
		}
	}, {
		key: "addtocart",
		value: function addtocart(item) {
			$(document).on('click', '.addtocart', function () {

				//item price & sku
				var price = $(this).data("price");
				var productsku = $(this).data("sku");
				//console.log(price,  productsku);
				var x = new _productutil2.default();
				x.addtocart(price, productsku);
			});
		}
	}]);

	return App;
}();

exports.default = App;

var x = new App();

$('#mainproduct').click();

},{"./bestbuy":1,"./carousel":2,"./productutil":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var productutil = function () {
	function productutil() {
		_classCallCheck(this, productutil);

		this.addtocart();
		this.cartnumber();
	}

	_createClass(productutil, [{
		key: "addtocart",
		value: function addtocart(p, s) {
			var item = {
				price: p,
				quanity: 0
			};
			var getSku = sessionStorage.getItem(s);
			var cartproduct = "";
			//if the add to cart button has NOT been clicked add price and quanity of 1
			if (getSku == null) {
				item.price = p;
				item.quanity = 1;
			}
			//if button has been clicked add 1 to already exisiting sku
			else {
					cartproduct = JSON.parse(getSku);
					item.price = cartproduct.price;
					item.quanity = cartproduct.quanity + 1;
				}
			//reassign sku and stringify the item. This has to be done after the if statment
			getSku = JSON.stringify(item);
			//setting the passed sku and parsed getsku and setting them in sessionstorage
			sessionStorage.setItem(s, getSku);
			//getting new information form the new set and parsing that data
			getSku = sessionStorage.getItem(s);
			cartproduct = JSON.parse(getSku);
			console.log("sku: " + s + " price: " + cartproduct.price + " quanitiy: " + cartproduct.quanity);

			this.cartnumber();
		}
	}, {
		key: "cartnumber",
		value: function cartnumber() {
			document.getElementById("cartnum").innerHTML = sessionStorage.length;
			//$("cartnum").innerHTML	= sessionStorage.length;
		}
	}]);

	return productutil;
}();

exports.default = productutil;

},{}]},{},[3]);
