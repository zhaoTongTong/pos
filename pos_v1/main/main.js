'use strict'

function printReceipt(tags) {
  let allItems = loadAllItems();
  let promotions = loadPromotions();
  let cartItems = buildCartItems(tags, allItems);
  let receiptItems = calculatCartItems(cartItems, promotions);
  let receipt = getReceiptItems(receiptItems);

  let receiptText = printItems(receipt);

  console.log(receiptText);

}

let buildCartItems = (tags, allItems) => {
  let cartItems = [];

  for(let tag of tags) {
    let splitedTag = tag.split('-');
    let barcode = splitedTag[0];
    let count = parseFloat(splitedTag[1] || 1);
    let cartItem = cartItems.find(cartItem => cartItem.item.barcode === barcode);

    if(cartItem) {
      cartItem.count += count;
    }else {
      let item = allItems.find(item => item.barcode === barcode);

      cartItems.push({item: item, count:count});
    }
  }

  return cartItems;
}

let calculatCartItems = (cartItems, promotions) => {
  return cartItems.map(cartItem => {
    let promotionType = getPromotionType(cartItem.item.barcode, promotions);
    let {saved, subTotal} = discount(cartItem, promotionType);

    return {cartItem, saved, subTotal};
  });
}

let getPromotionType = (barcode, promotions) => {
  let promotion = promotions.find(promotion => promotion.barcodes.includes(barcode));

  return promotion ? promotion.type : undefined;
}

let discount = (cartItem, type) => {
  let decreasedCount = 0;

  if(type === 'BUY_TWO_GET_ONE_FREE') {
    decreasedCount = parseInt(cartItem.count / 3);

  }

  let saved = decreasedCount * cartItem.item.price;
  let subTotal = cartItem.item.price * cartItem.count -saved;

  return {saved, subTotal};
}

let getReceiptItems = (cartItems) => {
  let [total, savedTotal] = [0, 0];

  for(let cartItem of cartItems) {
    total += cartItem.subTotal;
    savedTotal += cartItem.saved;
  }

  return {cartItems: cartItems, total:total, savedTotal:savedTotal};
}


let printItems = (receipt) => {
  let receiptItems = receipt.cartItems.map(receipItem => {
    return `名称：${receipItem.cartItem.item.name}，\
数量：${receipItem.cartItem.count}${receipItem.cartItem.item.unit}，\
单价：${formatMoney(receipItem.cartItem.item.price)}(元)，\
小计：${formatMoney(receipItem.subTotal)}(元)`;
  }).join('\n');

  let string = `***<没钱赚商店>收据***
${receiptItems}
----------------------
总计：${formatMoney(receipt.total)}(元)
节省：${formatMoney(receipt.savedTotal)}(元)
**********************`

  return string;
}

let formatMoney = (money) => {
  return money.toFixed(2);
}