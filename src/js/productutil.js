export default class productutil{
	constructor(){
		

	}
	addtocart(){
		  console.log('working');

		$(document).on('click', '.addtocart', function(){
			$("#cartnum").css("visibility", "visible");
			let cn = $("#cartnum").text();
				$("#cartnum").text(parseInt(cn)+1);
			let tp = $(this).data("price");
			let productsku = $(this).data("sku");

			    	console.log(tp,  productsku);
			});


  //              let price = $(this).data("price");
  //              let sku = $(this).data("sku");
  //              console.log(price, sku);

		
		}
}


		 






