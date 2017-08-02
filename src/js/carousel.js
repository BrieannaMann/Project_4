import Wallop from 'Wallop';

export const carousel = (data)=>{
 
	for(var i= 0; i< data.products.length; i++){
		let brand = '<p  class= "brand">'+data.products[i].manufacturer;+'</p>';
		let name = '<p  class= "price">'+ data.products[i].name+ '</p>';
		let image = '<img src="' + data.products[i].thumbnailImage + '">';
		let price = '<p  class= "price">'+data.products[i].regularPrice+'</p>';
			let createDiv = $("<div></div>");
					createDiv.addClass('Wallop-item');
				$('#content').append(createDiv);
			        createDiv.append( brand + name + image+ price);
	
	};
};