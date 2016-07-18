'use strict'

let buildCartItems = (tags, allItems) => {
  let cartItems = []

  for(let value of tags) {
    let splitedTag = value.split('-');
    let barcode = splitedTag[0];
    let count = parseFloat(splitedTag[1] || 1);
    let cartItem = cartItems.find(cartItem => cartItem.item.barcode === barcode);

    if(cartItem) {
      cartItem.count ++;
    }else {
      let item = allItems.find(item => item.barcode === barcode);

      cartItems.push({item: item, count: count});
    }
  }

  return cartItems;
}