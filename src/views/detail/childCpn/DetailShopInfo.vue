<template>
  <div class="shop-info">
    <div class="s-title">
      <img :src="shop.logo" alt="">
      <span>{{shop.name}}</span>
    </div>
    <div class="s-desc">
      <div class="s-desc-item left">
        <div class="sells">
          <div class="sells-num">
            {{shop.sells | sellCountFilter}}
          </div>
          <div class="sells-text">
            总销量
          </div>
        </div>
        <div class="count">
          <div class="count-num">
            {{shop.goodsCount | sellCountFilter}}
          </div>
          <div class="count-text">
            全部宝贝
          </div>
        </div>
      </div>
      <div class="s-desc-item right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td class="td-left">
              {{item.name}}
            </td>
            <td class="td-middle" :class="{'score-better':item.isBetter}">
              {{item.score}}
            </td>
            <td class="td-right" :class="{'better-more':item.isBetter}">
              <span>
                  {{item.isBetter ? '高':'低'}}

              </span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="enter-shop">进店逛逛</div>
  </div>
</template>

<script>
  export default{
    name:"DetailShopInfo",
    props:{
      shop:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    filters: {
      sellCountFilter: function(value) {
        if (value < 10000) return value;
        return (value / 10000).toFixed(1) + "万";
      }
    }
  }
</script>

<style scoped>
  .shop-info{
    border-bottom: 5px solid #f2f5f8;
    border-top: 5px solid #f2f5f8;
    padding: 25px 5px;
  }

  .s-title{
    height: 50px;
    display: flex;
    align-items: center;
    /* line-height: 50px; */
  }
  .s-title img{
    height: 100%;
    border: 1px solid #ccc;
    border-radius: 50%;
  }
  .s-title span{
    /* position: relative;
    left: 8px;
    top: -20px; */
    margin-left: 8px;
  }

  .s-desc{
    margin-top: 20px;
    display: flex;
    align-items: center;
    color: #333;

  }
  .s-desc-item{
    flex: 1;
  }
  .s-desc-item.left{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    text-align: center;
    border-right: 1px solid rgba(0,0,0,.1);
  }
  
  .sells-num, .count-num{
    font-size: 18px;
  } 
  .sells-text, .count-text{
    font-size: 12px;
    margin-top: 10px;
  } 

  .s-desc-item.right{
    font-size: 13px;
  }
  .s-desc-item.right table{
    margin-left: 20px;
  }
  .s-desc-item.right td{
    padding: 5px;
  }

  .td-right span{
    /* border: 1px solid #bbb; */
    border-radius: 30%;
    background-color: #aaa;
    color: #fff;
    /* font-size: 14px; */
  }
  .score-better{
    color: var(--color-tint);
  }
  .better-more span{
    background-color: var(--color-tint);
  }

  .enter-shop{
    width: 30%;
    background-color: #e64039;
    border-radius: 15px;
    margin:10px auto 0;
    padding: 5px 0;
    text-align: center;
    color: #fff;
    font-size: 15px;
  }
</style>