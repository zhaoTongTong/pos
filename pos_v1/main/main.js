'use strict'

let buildCartItems = (tags, allItems) => {
  let cartItems = [];

  for(let value of tags) {
    let splitedTag = value.split('-');
    let barcode = splitedTag[0];
    let count = parseFloat(splitedTag[1] || 1);
    let cartItem = cartItems.find(cartItem => cartItem.item.barcode === barcode);

    if(cartItem) {
      cartItem.count++;
    }else {
      let item = allItems.find(item => item.barcode === barcode);

      cartItems.push({item: item, count:count});
    }
  }

  return cartItems;
}

let calculatCartItems = (cartItems, promotions) => {
  let receiptItems = [];

  for(let cartItem of cartItems) {
    let barcode = cartItem.item.barcode;
    let pomotionType = getPromotionType(barcode, promotions);
    let {saved, subTotal} = discount(cartItem, pomotionType);

    receiptItems.push({receipt:cartItem, saved: saved, subTotal: subTotal});
  }

  return receiptItems;
}

let getPromotionType = (barcode, promotions) => {
  let promotion = promotions.find(promotion => promotion.barcodes.includes(barcode));

  return promotion ? promotion.type : '';
}

let discount = (cartItem, type) => {
  let decreasedCount = 0;

  if(type === 'BUY_TWO_GET_ONE_FREE') {
    decreasedCount = parseInt(cartItem.count / 3);
  }
  let saved = decreasedCount * cartItem.item.price;
  let subTotal = cartItem.count * cartItem.item.price - saved;

  return {saved, subTotal};
}