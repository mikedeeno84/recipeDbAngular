function formatIngredients (ingredients){

var formattedIngredients= ingredients
	.map(function(ingredient){
		var tempVar;
		var tempObj = {};
		var splitIng = ingredient.replace(/\s\s+/g, ' ').split(" ");
		if (parseInt(splitIng[0]) !== NaN && parseInt(splitIng[0])>=0 && parseInt(splitIng[1]) !== NaN && parseInt(splitIng[1])>=0){
			tempObj.quantity = parseInt(splitIng.shift())
			tempVar = splitIng.shift().split('/');
			if (tempVar.length > 1) {
				tempObj.quantity += (parseInt(tempVar[0])/parseInt(tempVar[1]));
				tempObj.ingredient = splitIng.join(" ");	
			}
			else{
				tempObj.ingredient = tempVar[0] + " " + splitIng.join(" ");
			}
			return tempObj
		}
		else if (parseInt(splitIng[0]) !== NaN && parseInt(splitIng[0])>=0){
			tempVar = splitIng.shift().split('/')
			tempObj.quantity = parseInt(tempVar[0])
			tempObj.ingredient = splitIng.join(" ")
			if (tempVar.length === 1) return tempObj
			tempObj.quantity /= parseInt(tempVar[1]);
			return tempObj

		}
		else
			return {ingredient: splitIng.join(" ")}
	})
return formattedIngredients;
}

module.exports = formatIngredients;