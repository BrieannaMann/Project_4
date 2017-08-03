export default class productutil{
	constructor(){
		this.addtocart();
		this.cartnumber();
		this.carttotal();

	}
	addtocart(p,s){
          let item = {
          	price : p,
          	quanity :0
          }
        let getSku = sessionStorage.getItem(s);
        let cartproduct = null;
        //if the add to cart button has NOT been clicked add price and quanity of 1
          if (getSku == null){
          	item.price = p;
          	item.quanity = 1;

			}
		//if button has been clicked add 1 to already exisiting sku
			else{
				cartproduct = JSON.parse(getSku);
			let price= p;
			item.price = cartproduct.price+ price;
				//item.price = cartproduct.price;
          		item.quanity = cartproduct.quanity+1;
			}
			//reassign sku and stringify the item. This has to be done after the if statment
          	getSku = JSON.stringify(item);
          	//setting the passed sku and parsed getsku and setting them in sessionstorage
			sessionStorage.setItem(s, getSku);
         	//getting new information form the new set and parsing that data
			getSku = sessionStorage.getItem(s);
			cartproduct = JSON.parse(getSku);


		document.getElementById("sku").innerHTML = (`sku: ${s}`);
		document.getElementById("quanity").innerHTML = (`quanitiy: ${cartproduct.quanity}`);
		document.getElementById("total-price").innerHTML = (`price: ${cartproduct.price}`);
		this.cartnumber();
	}
	cartnumber(){
		document.getElementById("cartnum").innerHTML = sessionStorage.length;


	}
	carttotal(){
		//console.log(sessionStorage.key[0])
		
	
	}
}








