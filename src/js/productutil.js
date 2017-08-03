export default class productutil{
	constructor(){
		this.addtocart();
		this.cartnumber();


	}
	addtocart(p,s){
          let item = {
          	price : p,
          	quanity :0
          }
        let getSku = sessionStorage.getItem(s);
        let cartproduct = "";
        //if the add to cart button has NOT been clicked add price and quanity of 1
          if (getSku == null){
          	item.price = p;
          	item.quanity = 1;

			}
		//if button has been clicked add 1 to already exisiting sku
			else{
				cartproduct = JSON.parse(getSku);
				item.price = cartproduct.price;
          		item.quanity = cartproduct.quanity+1;
			}
			//reassign sku and stringify the item. This has to be done after the if statment
          	getSku = JSON.stringify(item);
          	//setting the passed sku and parsed getsku and setting them in sessionstorage
			sessionStorage.setItem(s, getSku);
         	//getting new information form the new set and parsing that data
			getSku = sessionStorage.getItem(s);
			cartproduct = JSON.parse(getSku);
console.log(`sku: ${s} price: ${cartproduct.price} quanitiy: ${cartproduct.quanity}`);

			this.cartnumber();
	}
	cartnumber(){
document.getElementById("cartnum").innerHTML = sessionStorage.length;
		//$("cartnum").innerHTML	= sessionStorage.length;


	}
}








