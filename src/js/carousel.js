

export const carousel = (data)=>{
 
	for(var i= 0; i< data.products.length; i++){
		let brand = '<p  class= "brand">'+data.products[i].manufacturer;+'</p>';
		let name = '<p  class= "price">'+ data.products[i].name+ '</p>';
		let image = '<img src="' + data.products[i].largeImage + '">';
		let displayPrice = '<p  class= "price">'+data.products[i].regularPrice+'</p>';
		let price = data.products[i].regularPrice
		let sku = data.products[i].sku
		let addcart = '<button class="addtocart" data-sku="'+sku+'" data-price="'+price+'"> ADD TO CART </button>';
			//creating a new div for each product 
			let createDiv = $("<div></div>");
					createDiv.addClass('products');
			//append content to new div 
				$('#content').append(createDiv);
				
			        createDiv.append( brand + name + image+ displayPrice + addcart);
	};
};

