'use strict'

function printReceipt(tags) {
  const allItems = loadAllItems();
  const promotions = loadPromotions()
  const cartItems = buildCartItems(tags, allItems);
  const receiptItems = buildReceiptItems(cartItems, promotions);
  const receipt = buildReceipt(receiptItems);
  const receiptText = buildReceiptText(receipt);

  console.log(receiptText);
}

function buildCartItems(tags, allItems) {
  const cartItems= [];

  for(const tag of tags){
    const splittag = tag.split('-');
    const barcode = splittag[0];
    const count = parseFloat(splittag[1] || 1);
    const cartItem = cartItems.find(cartItem => cartItem.item.barcode=== barcode);

    if(cartItem) {
      cartItem.count += count;
    }else {
      const item = allItems.find(item => item.barcode === barcode);

      cartItems.push({item, count});
    }
  }

  return cartItems;
}

function buildReceiptItems(cartItems, promotions) {
  return cartItems.map(cartItem => {
    const promotionType = findPromotionType(cartItem.item.barcode, promotions);
    const {saved, subTotal} = discount(cartItem.count, cartItem.item.price, promotionType);

    return {cartItem, saved, subTotal};
  });
}

function findPromotionType(barcode, promotions) {
  const promotion = promotions.find(promotion => promotion.barcodes.some(b => b === barcode
));

  return promotion ? promotion.type : undefined;
}

function discount(count, price, type) {
  let subTotal = count * price;
  let saved = 0;
  if(type === 'BUY_TWO_GET_ONE_FREE') {
    saved = parseInt(count/3) * price;
  }

  subTotal -= saved;

  return {saved, subTotal};
}


function buildReceipt(receiptItems) {
  let total = 0;
  let savedTotal = 0;

  for(const receiptItem of receiptItems) {
    total += receiptItem.subTotal;
    savedTotal += receiptItem.saved;
  }

  return {receiptItems, total, savedTotal};
}

function buildReceiptText(receipt) {
  let receiptText = receipt.receiptItems.map(receiptItem => {
    const cartItem = receiptItem.cartItem;
    return `名称：${cartItem.item.name}，\
数量：${cartItem.count}${cartItem.item.unit}，\
单价：${formatMoney(cartItem.item.price)}(元)，\
小计：${formatMoney(receiptItem.subTotal)}(元)`;
  }).join('\n');

  return `***<没钱赚商店>收据***
${receiptText}
----------------------
总计：${formatMoney(receipt.total)}(元)
节省：${formatMoney(receipt.savedTotal)}(元)
**********************`;
}

function formatMoney(money) {
  return money.toFixed(2);
}