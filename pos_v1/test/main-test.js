'use strict';

describe('pos', () => {
  let inputs;
  let allItems = loadAllItems();
  let allPromotions = loadPromotions();

  beforeEach(() => {
    inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
  });

  it('should print correct text', () => {

    spyOn(console, 'log');

    printReceipt(inputs);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });


  it('cartItems text', () => {
    let cartItems = buildCartItems(inputs, allItems);

    const expectCartItems = [
      {
        item: {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00
        },
        count: 5
      },
      {
        item: {
          barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15.00
        },
        count: 2
      },
      {
        item: {
          barcode: 'ITEM000005',
          name: '方便面',
          unit: '袋',
          price: 4.50
        },
        count: 3
      }
    ];
    expect(cartItems).toEqual(expectCartItems);
  });

  it('calculatCartItems text', () => {
    let cartItems = [
      {
        item: {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00
        },
        count: 5
      },
      {
        item: {
          barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15.00
        },
        count: 2
      }
    ];

    let receiptItems = buildReceiptItems(cartItems, allPromotions);

    const expectCartItems = [
      {
        cartItem:
        {
          item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },
          count: 5
        },
        saved: 3.00,
        subTotal: 12.00
      },
      {
        cartItem:
        {
          item: {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
          },
          count: 2
        },
        saved: 0.00,
        subTotal: 30.00
      }
    ];

    expect(receiptItems).toEqual(expectCartItems);
  });
  
  it('receiptItems build', () => {
    let receiptItems = [
      {
        cartItem:
        {
          item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },
          count: 5
        },
        saved: 3.00,
        subTotal: 12.00
      },
      {
        cartItem:
        {
          item: {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
          },
          count: 2
        },
        saved: 0.00,
        subTotal: 30.00
      }
    ];
    
    let receipt = buildReceipt(receiptItems);

    const expectReceiptItems = {
      receiptItems: receiptItems,
      total: 42.00,
      savedTotal : 3.00
    }

    expect(receipt).toEqual(expectReceiptItems);
  });

  it('print text', () => {

    let items = {
      receiptItems: [
        {
          cartItem:
          {
            item: {
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00
            },
            count: 5
          },
          saved: 3.00,
          subTotal: 12.00
        },
        {
          cartItem:
          {
            item: {
              barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15.00
            },
            count: 2
          },
          saved: 0.00,
          subTotal: 30.00
        }
      ],
      total: 42.00,
      savedTotal : 3.00
    }

    let text = buildReceiptText(items);

    const expectString = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
----------------------
总计：42.00(元)
节省：3.00(元)
**********************`;
    expect(text).toEqual(expectString);

  });



});
