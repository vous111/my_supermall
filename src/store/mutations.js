import {ADD_TO_CART, ADD_COUNT} from './mutation-types'

export default {
  [ADD_TO_CART](state, goods){
    goods.checked = false
    state.cartList.push(goods)
  },
  [ADD_COUNT](state, goods){
    goods.count += 1
  }
}