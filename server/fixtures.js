// Standart menu items

if(Menu.find().count() === 0){

	Menu.insert({
		name: "Coke",
		img: "../coke.png",
		price: 5
	});

	Menu.insert({
		name: "Burger",
		img: "../burger.png",
		price: 8
	});

	Menu.insert({
		name: "Pizza",
		img: "../mini-pizza.jpg",
		price: 10
	});

	Menu.insert({
		name: "French fries",
		img: "../fries.jpg",
		price: 7
	});

	Menu.insert({
		name: "Sprite",
		img: "../sprite.jpg",
		price: 5
	});

	Menu.insert({
		name: "Beer",
		img: "../beer.jpg",
		price: 6
	});

	Menu.insert({
		name: "Vegetarian pizza",
		img: "../vegetarian-pizza.png",
		price: 7
	});

}
