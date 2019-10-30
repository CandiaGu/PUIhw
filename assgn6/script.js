const allProducts = {'couchpillow':"Couch Pillow",'bedpillow':"Bed Pillow",'roundpillow':"Round Pillow", 'floorpillow':"Floor Pillow"};
const allProductsDescription = {
	'couchpillow':"A comfortable pillow to place on your couch.",
	'bedpillow':"A comfortable pillow to place on your bed.",
	'roundpillow':"A comfortable round pillow to place wherever.",
	'floorpillow':"A comfortable pillow to place on your floor."

}

const nameColorMapping = {
	"after school special":"yellow",
	"morning haze": "cyan",
	"rainy day":"red",
	"cozy denim":"blue"
}

function goToProduct(product){
	console.log("current product is" + product);
	localStorage.setItem("currentProduct",product);
}


var selectedColor = null;
var selectedStuffing = null;

function addItemToCart() {
	var numItems = parseInt(document.getElementById("qtyNum").value);
  	// add items to bag

  	//check if options selected
  	if(selectedColor!=null && selectedStuffing!=null){
  		var strItemsInBag = localStorage.getItem("itemsInBag");
  		var itemsInBag;
  		if(strItemsInBag!=null){
  			itemsInBag = JSON.parse(strItemsInBag);
  		}
  		else{
  			itemsInBag = {};
  		}
  		var currentProduct = localStorage.getItem("currentProduct");
  		itemsInBag[currentProduct] = {'color':selectedColor,'stuffing':selectedStuffing,'qty':numItems};
  		localStorage.setItem("itemsInBag",JSON.stringify(itemsInBag));
  		updateBadge()
  	}

  }

  function updateColor(){
  	var radioColor = document.getElementsByName('radioColor');


  	for ( var i = 0; i < radioColor.length; i++) {
  		if(radioColor[i].checked) {
  			color = radioColor[i].value;
  			document.getElementById('colorName').innerHTML = color;
  			document.getElementById('productImage').src = 'img/' + localStorage.getItem("currentProduct") + nameColorMapping[color]+ '.jpg';
  			selectedColor = color;
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
  			selectedStuffing = stuffing;
  			break;
  		}
  	}
  }

  function findNumOfItemsInBag(){
  	var strItemsInBag = localStorage.getItem("itemsInBag");
  	var itemsInBag = JSON.parse(strItemsInBag);
  	var totalNum = 0;
  	//find the numeber of items
  	for (var key in itemsInBag){
  		item = itemsInBag[key];
  		totalNum += item['qty'];
  	}
  	return totalNum;
  }

  function loadBadge(){
  	totalNum = findNumOfItemsInBag();
  	console.log("totalNum" + totalNum);

	document.getElementById('cartCount').innerHTML = totalNum;
	document.getElementById('cartCount').style.visibility = "visible";

	if(totalNum == 0){
		document.getElementById('cartCount').style.visibility = "hidden";
	}

  	


  }

  function loadProductDetailsPage(){
  	currentProduct = localStorage.getItem("currentProduct");
  	document.getElementById("productName").innerHTML = allProducts[currentProduct];
  	document.getElementById("productNav").innerHTML = allProducts[currentProduct];
  	document.getElementById("productDescription").innerHTML = allProductsDescription[currentProduct];

  	document.getElementById('productImage').src = 'img/' + localStorage.getItem("currentProduct") + 'yellow.jpg';

  }

  function addItemToBag(productName, color, stuffing, qty){
  	var currentProduct = localStorage.getItem("currentProduct");
  	const div = document.createElement('div');

  	div.className = 'container';

  	div.innerHTML = `
  	<div class="grid-item">
  	<div class="product-pics" style="height: 50px;background-color:grey; width: auto;">
  	<img src="img/`+ productName + nameColorMapping[color] + `.jpg" alt="pillow">
  	</div>
  	</div>
  	<div class="cart-item-description">
  	<h3>` + allProducts[productName] + `</h3>

  	<p>color: <i>`+ color +`</i></p>
  	<p>stuffing: <i>`+ stuffing+ `</i></p>

  	</div>
  	<div>
  	qty: <input type="number" min="1" max="99" placeholder="`+ qty+`">
  	<span onclick="removeItemFromBag(this,'`+ productName + `')">remove</span>
  	</div>

  	<div>
  	$XX.XX
  	</div>
  	`;

  	document.getElementById('notEmptyBag').appendChild(div);
  }

  function removeItemFromBag(input, productName){
  	document.getElementById('notEmptyBag').removeChild(input.parentNode.parentNode);
  	var strItemsInBag = localStorage.getItem("itemsInBag");
  	var itemsInBag = JSON.parse(strItemsInBag);
  	delete itemsInBag[productName];
  	localStorage.setItem('itemsInBag', JSON.stringify(itemsInBag));
  	updateBadge();
  	if(findNumOfItemsInBag() == 0){
		//empty
		document.getElementById('emptyBag').style.visibility = "visible";

	}

  }

  function loadShoppingCart(){
  	console.log("loading shopping cart");
	//load all object in bag
	strItemsInBag = localStorage.getItem("itemsInBag");
	var itemsInBag;
	if(strItemsInBag==null || findNumOfItemsInBag() == 0){
		//empty
		document.getElementById('emptyBag').style.visibility = "visible";

	}
	else{
		itemsInBag = JSON.parse(strItemsInBag);
		for (var key in itemsInBag){
			var productProp = itemsInBag[key];
			addItemToBag(key, productProp['color'], productProp['stuffing'], productProp['qty']);
		}

	}


}


function updateBadge(){

	loadBadge();
}

/*** Document Load ****/
function onLoad () {

	// localStorage.removeItem("cartCount");

	loadBadge();


}

function onLoadShoppingCart(){
	onLoad();
	loadShoppingCart();
}

function onLoadProductDetailsPage(){
	onLoad();
	loadProductDetailsPage();
}