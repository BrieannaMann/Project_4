export default class productutil{
   constructor(){
   	this.updateCart();
   	this.removecart();

   }
   addtocart(s,p){
 		let getSku = sessionStorage.getItem(s);
 		let cartproduct = null;
    
    if (getSku ==null){
    	
       		sessionStorage.setItem(s, JSON.stringify(p));    
   	} else {
       let oldvalue = JSON.parse(getSku);
       let newvalue = oldvalue;
       newvalue.qty += p.qty;

         sessionStorage.setItem(s, JSON.stringify(newvalue));
        

   };
       
         this.updateCart();
          this.removecart();
       }
updateCart(s, p){
    $(document).on('click', '.addtocart', function(){

	let skuincart = "";
    let item = "";
    let cartobj ="";
    let quanityincart ="";
    let priceincart="";
    //empties each time and repopulates the correct quanity and price
   	$('#popup').empty();

        for (let i=0; i<sessionStorage.length; i++) {
         	skuincart = sessionStorage.key(i);
         	item = sessionStorage.getItem(skuincart);
         	cartobj = JSON.parse(item);
         	quanityincart =  parseInt(cartobj.qty);
         	priceincart = (cartobj.price * quanityincart).toFixed(2);

            let createDiv = $("<div></div>");
         	createDiv.addClass('singleCartItem');
         let remove =('<button class="remove"> REMOVE </button>')
         let update = ('<button class="update">UPDATE </button>')
         $('#popup').append(createDiv);

         createDiv.append(`SKU: ${skuincart} QUANITY: ${quanityincart} Total: ${priceincart} ${remove} ${update}`);
            }


        });
        }
removecart(s,p){
         $(document).on('click', '.remove', function(){
         	$(this).parent().remove();
         	$(this).sessionStorage.removeItem(".singleCartItem");
})
         this.updateCart();
       }
updateitem(){

}
cartNum(){
	var cartNum = document.getElementById("cartnum");

         cartnum.innerHTML = sessionStorage.length;

} }


