<template>
  <div id="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="el-icon-sell"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="el-icon-service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="el-icon-star-off"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">立即购买</div>
    </div>
    
  </div>
</template>

<script>
  export default{
    name:"DetailBottomBar",
    methods:{
      addToCart(){
        this.$emit('addCart')
        // this.$toast.show('添加成功，在购物车等亲~')
      }
    }
  }
</script>

<style scoped>
  #bottom-bar{
    position: fixed;
    background-color: #fff;
    height: 50px;
    display: flex;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    padding: 5px;
  }

  .bar-item{
    /* flex: 1; */
    display: flex;

  }
  /* > 子选择器 */
  .bar-item > div{
    flex: 1;
    /* width: 33.3%; */
  }
  .bar-left{
    width: 40%;
  }
  .bar-left  i{
    display: block;
    font-size: 20px;
    margin:0 auto 2px;
  }
  .el-icon-sell{
    color: #ff5777;
  }
  .bar-left .text{
    font-size: 10px;

  }

  .bar-right{
    line-height: 40px;
    width: 60%;
    margin-left: 10px;
    font-size: 14px;
    color: #ffffff;
  }
  .cart{
    background: -webkit-linear-gradient(0, #ffb000,#ff9500);
    border-radius:20px 0 0 20px ;
  }
  .buy{
    background: -webkit-linear-gradient(0, #f47728,#e4393c);
    border-radius:0 20px 20px 0 ;
  }
</style>