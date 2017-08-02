import request from "./bestbuy";
import {carousel} from "./carousel";
import productutil from "./productutil";

export default class App{
	constructor(){
		this.baseurl = "https://api.bestbuy.com/v1/products";
		this.url = "https://api.bestbuy.com/v1/products";
		this.initBBCall();
		this.eventHandle();
		this.addtocart();
	}
	eventHandle () {
		$(".category").on('click', (e) => {
			let target = e.target.value;
			this.url = this.baseurl + target;
			// console.log(this.url);
			this.initBBCall();
		});
	}

	initBBCall () { 
		request({url: this.url, api : "8ccddf4rtjz5k5btqam84qak" })
		
		.then(data => {
			$('#content').empty();
			(carousel(data));
			/* fill carosel with products */
		})
		.catch(error => {
			console.log("warning Christopher Robins... Error");
			console.log(error);
		});
	}
	addtocart(){
		let x= new productutil;
		x.addtocart();
	}

}
let x = new App;


$('#mainproduct').click();

