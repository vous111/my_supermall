import {ADD_COUNT, ADD_TO_CART} from './mutation-types'

export default {
  addCart(context, goods){
    return new Promise((resolve, reject)=>{
    // 1.查找之前数组中是否有该商品
    let oldProduct = context.state.cartList.find(item => item.iid === goods.iid)
    // 2.判断oldProduct
    if(oldProduct){
      // oldProduct.count += 1
      context.commit(ADD_COUNT, oldProduct)
      resolve('当前商品数量+1')
    }else{
      goods.count = 1
      // state.cartList.push(goods)
      context.commit(ADD_TO_CART, goods)
      resolve('添加成功，在购物车等亲~')
    }
    })

  }
}