'use strict';

function buildCartItems(inputs, allItems) {
  let cartItems = [];

  for(let value of inputs) {
    let item = value.split('-');
    let itemCount = (item[1] || 1);
    let cartItem = findExistItem(item[0], cartItems);

    if(cartItem) {
      cartItem.count++ ;
    }else {
      let existItem = findExist(item[0], allItems);
      cartItems.push({item: existItem, count: parseInt(itemCount)});
    }
  }
  return cartItems;
}

function findExist(item, allItems) {
  for(let value of allItems) {
    if(item === value.barcode) {
      return value;
    }
  }
}

function findExistItem(item, cartItems) {
  for(let value of cartItems) {
    if(item === value.item.barcode) {
      return value;
    }
  }
}
