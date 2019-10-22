


function addItemToCart() {
	var numItems = parseInt(document.getElementById("qtyNum").value);
	console.log("adding items");
	console.log("numItems=" + numItems);
	if(numItems!=null) updateBadge(numItems);
  // to do later
}

function updateColor(){
	var radioColor = document.getElementsByName('radioColor');
	var nameColorMapping = {
		"after school special":"yellow",
		"morning haze": "cyan",
		"rainy day":"red",
		"cozy denim":"blue"
	}

	for ( var i = 0; i < radioColor.length; i++) {
		if(radioColor[i].checked) {
			color = radioColor[i].value;
			document.getElementById('colorName').innerHTML = color;
			document.getElementById('productImage').src = 'img/bedpillow'+ nameColorMapping[color]+ '.jpg';
			break;
		}
	}
}

function updateStuffing(){
	var radioStuffing = document.getElementsByName('radioStuffing');

	for ( var i = 0; i < radioStuffing.length; i++) {
		if(radioStuffing[i].checked) {
			stuffing = radioStuffing[i].value;
			document.getElementById('stuffingName').innerHTML = stuffing;
			break;
		}
	}
}

function loadBadge(){

	if (localStorage.getItem("cartCount")==null){
		localStorage.setItem("cartCount","0");
		cartCountInt = 0;
	}
	else{
		console.log(localStorage.getItem("cartCount"));
		document.getElementById('cartCount').innerHTML = localStorage.getItem("cartCount");
		document.getElementById('cartCount').style.visibility = "visible";
	}


}

function updateBadge(numNewItems){

	var cartCount = localStorage.getItem("cartCount");
	var cartCountInt = parseInt(localStorage.getItem("cartCount"));
	
	cartCountInt+=numNewItems;
	localStorage.setItem("cartCount", cartCountInt.toString());

	loadBadge();
}

/*** Document Load ****/
function onLoad () {

	loadBadge();


}