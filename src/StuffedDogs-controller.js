const { writeJSONFile } = require("./helpers");
const {getStuffedDogId, getStuffedDogName, getStuffedDogPrice, getStuffedDogInStock} = require("./faker-functions");



function create (stuffedDogs) {
    const stuffedDog = { 
        id: getStuffedDogId(),
        name: getStuffedDogName(),
        priceInCents: getStuffedDogPrice(),
        inStock: getStuffedDogInStock(),
    };
    
    stuffedDogs.push(stuffedDog);
    
    return stuffedDogs
}

function index (stuffedDogs) {
    return  stuffedDogs.map((stuffedDog) => "id " + stuffedDog.id + " name " + stuffedDog.name + " priceInCents " + stuffedDog.priceInCents + " inStock " + stuffedDog.inStock).join("\n");
}

function show (stuffedDogs, stuffedDogId) {
    
    const foundStuffedDog = stuffedDogs.find((stuffedDog) => stuffedDog.id === stuffedDogId)
    
    const {id, name, priceInCents, inStock} = foundStuffedDog;
    
    return "id " + id + " name " + name + " priceInCents " + priceInCents  + " inStock " + inStock
}

function destroy (stuffedDogs, stuffedDogId) {
    
   const index =  stuffedDogs.findIndex((stuffedDog) => stuffedDog.id === stuffedDogId);
    
   if (index > -1) {
    
    stuffedDogs.splice(index, 1);
    console.log("we deleted your stuffedDog");
    
    return stuffedDogs
   } else {
    console.log("couldnt find a stuffedDog with that id")
   }
}

function update (stuffedDogs, stuffedDogId, updatedStuffedDogPrice, stuffedDogInStock) {
  
    const index =  stuffedDogs.findIndex((stuffedDog) => stuffedDog.id === stuffedDogId);
    
    if (index > -1) {
        
       stuffedDogs[index].id = stuffedDogId;
       
       stuffedDogs[index].priceInCents = updatedStuffedDogPrice;
       
       stuffedDogs[index].inStock = stuffedDogInStock;

       
       console.log("your stuffed dog has been updated");
      
       return stuffedDogs
   } else {
     console.log("couldnt find a stuffedDog with that id")
    }
   
}

function addToCart(cart, stuffedDogs, stuffedDogId) {
    const item = stuffedDogs.find((stuffedDog) => stuffedDog.id === stuffedDogId);
    if(item) {
        cart.push(item);
    }
    return cart;
}

function cartTotal(cart) {
    let totalAmount = 0;
    for(let item of cart) {
        totalAmount += Number(item.priceInCents);
    }
    return totalAmount;
}

function cancelCart() {
    writeJSONFile("./data","cart-data.json",[]);
}

module.exports = {
    create,
    index, 
    show,
    destroy,
    update,
    addToCart,
    cartTotal,
    cancelCart
 }
