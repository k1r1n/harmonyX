const numbers = (nums, target) => {
  for (let i = 0; i < nums.length; i++) {
    const pairNum = target - nums[i];
    const indexOfNum = nums.indexOf(pairNum);

    if (indexOfNum !== -1 && indexOfNum !== i) {
        return [i, indexOfNum];
    }
	}
}

const exchange = (buy, money) => {
  let display = ''
  let cashReturn = money - buy
  const withdrawal = []
  const moneyType = [1, 2, 5, 10, 20, 50, 100, 500, 1000]

  for (let index = moneyType.length - 1; index >= 0; index--) {
    let cash = moneyType[index]

    while (cashReturn >= cash) {
      cashReturn -= cash
      withdrawal.push(cash)
    }
  }
  const counts = withdrawal.reduce((key, value) => ({
     ...key,
     [value]: (key[value] || 0) + 1 
  }), {});
	
  Object.keys(counts).forEach(_item => {
  	const isBank = Number(_item) > 10 ? 'แบงค์' : 'เหรียญ'
    const unit = Number(_item) > 10 ? 'ใบ' : 'เหรียญ'
    
  	display += `${isBank} ${_item} จำนวน ${counts[_item]} ${unit}\n`
  })
  
  return display
}

const promotion = {
  amount: {
    sku: null,
    amount: 200,
    discount: 0.1,
  },
  bundle: {
    sku: ['a', 'b'],
    amount: 0,
    discount: 50,
  }
}

const product = [{
  sku: 'a',
  price: 99,
}, {
  sku: 'b',
  price: 199,
}, {
  sku: 'c',
  price: 3990
}]

const calculatePromotion = (list, promotion) => {
  const price = list.reduce((a, b) => a + b.price, 0)
  const productSku = list.map(_item => _item.sku)
  const findSku = promotion.sku?.map(r => productSku.includes(r))
  const isPromotion = findSku?.every(_item => _item)

  if (!promotion.sku && promotion.amount >= 200) {
    return `ราคาทั้งหมด ${(price - price * promotion.discount).toFixed(2)} บาท`
  }

  return `ราคาทั้งหมด ${(isPromotion ? price - promotion.discount : price).toFixed(2)} บาท`
}

console.log(numbers([2,7,11,15], 9))
console.log(exchange(35, 100))
console.log(calculatePromotion(product, promotion.bundle))
