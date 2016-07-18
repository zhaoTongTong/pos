'use strict';

let buildCartItems = (tags, allItems) => {
  let cartItems = [];

  for(let value of tags) {
    let item = value.split('-');
    let itemCount = (item[1] || 1);
    let barcode = item[0];
    let cartItem = cartItems.find(cartItem => cartItem.item.barcode === barcode);

    if(cartItem) {
      cartItem.count++ ;
    }else {
      let item = allItems.find(item => item.barcode === barcode);
      cartItems.push({item: item, count: parseFloat(itemCount)});
    }
  }
  
  return cartItems;
}
