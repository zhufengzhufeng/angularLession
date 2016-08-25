function drinkCoffee() {
    console.log('drinkCoffee');
}

function sweetCoffee() {
    drinkCoffee();
    console.log('加糖');
}

function sweetMilkCoffee() {
    sweetCoffee();
    console.log('加牛奶');
}
sweetCoffee()