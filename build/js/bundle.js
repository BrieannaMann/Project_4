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
				console.log(e);
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
		value: function addtocart() {
			$(document).on('click', '.addtocart', function () {
				var sku = $(this).data("sku");
				var product = {
					price: $(this).data("price"),
					qty: 1
				};

				var x = new _productutil2.default();
				x.addtocart(sku, product);
				x.updateCart(sku, product);
				x.removecart(sku, product);
				x.cartNum();
			});
		}
	}]);

	return App;
}();

exports.default = App;


var x = new App();

$('#mainproduct').click();

},{"./bestbuy":1,"./carousel":2,"./productutil":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var productutil = function () {
   function productutil() {
      _classCallCheck(this, productutil);

      this.updateCart();
      this.removecart();
   }

   _createClass(productutil, [{
      key: 'addtocart',
      value: function addtocart(s, p) {
         var getSku = sessionStorage.getItem(s);
         var cartproduct = null;

         if (getSku == null) {

            sessionStorage.setItem(s, JSON.stringify(p));
         } else {
            var oldvalue = JSON.parse(getSku);
            var newvalue = oldvalue;
            newvalue.qty += p.qty;

            sessionStorage.setItem(s, JSON.stringify(newvalue));
         };

         this.updateCart();
         this.removecart();
      }
   }, {
      key: 'updateCart',
      value: function updateCart(s, p) {
         $(document).on('click', '.addtocart', function () {

            var skuincart = "";
            var item = "";
            var cartobj = "";
            var quanityincart = "";
            var priceincart = "";
            //empties each time and repopulates the correct quanity and price
            $('#popup').empty();

            for (var i = 0; i < sessionStorage.length; i++) {
               skuincart = sessionStorage.key(i);
               item = sessionStorage.getItem(skuincart);
               cartobj = JSON.parse(item);
               quanityincart = parseInt(cartobj.qty);
               priceincart = (cartobj.price * quanityincart).toFixed(2);

               var createDiv = $("<div></div>");
               createDiv.addClass('singleCartItem');
               var remove = '<button class="remove"> REMOVE </button>';
               var update = '<button class="update">UPDATE </button>';
               $('#popup').append(createDiv);

               createDiv.append('SKU: ' + skuincart + ' QUANITY: ' + quanityincart + ' Total: ' + priceincart + ' ' + remove + ' ' + update);
            }
         });
      }
   }, {
      key: 'removecart',
      value: function removecart(s, p) {
         $(document).on('click', '.remove', function () {
            $(this).parent().remove();
            $(this).sessionStorage.removeItem(".singleCartItem");
         });
         this.updateCart();
      }
   }, {
      key: 'updateitem',
      value: function updateitem() {}
   }, {
      key: 'cartNum',
      value: function cartNum() {
         var cartNum = document.getElementById("cartnum");

         cartnum.innerHTML = sessionStorage.length;
      }
   }]);

   return productutil;
}();

exports.default = productutil;

},{}]},{},[3]);
