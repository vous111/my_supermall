<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="g-title">
      <span>{{goods.title}}</span>
    </div>
    <div class="g-price">
      <span class="new">{{goods.newPrice}}</span>
      <span class="old">{{goods.oldPrice}}</span>
      <span class="discount" v-if="goods.discount">{{goods.discount}}</span>
    </div>
    <div class="g-other">
        <span>{{goods.columns[0]}}</span>
        <span>{{goods.columns[1]}}</span>
        <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="g-services">
        <span class="services-item" v-for="index in goods.services.length-1">
          <i class="el-icon-circle-check"></i>
          <span>{{goods.services[index-1].name}}</span>
        </span>
    </div>
  </div>
</template>

<script>
  export default{
    name:"DetailBaseInfo",
    props:{
      goods:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info{
    padding: 10px 5px;
  }
  .g-price{
    margin: 14px auto;
  }
  .g-price span{
    margin: 0 2px;
  }
  .g-price .new{
    color: var(--color-high-text);
    font-size: 24px;
  }
  .g-price .old{
    font-size: 12px;
    color: #aaa;
    text-decoration: line-through;
  }
  .g-price .discount{
    font-size: 10px;
    background-color: var(--color-tint);
    border-radius: 8px;
    color: #fff;
    padding:2px 5px;

    /* 使用相对定位可以使元素上浮 */
    position: relative;
    top: -8px;
  }
  .g-other{
    display: flex;
    justify-content: space-between;
    color: #aaa;
    font-size: 10px;
    margin: 20px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #ddd;

  }
  .g-services{
    display: flex;
    justify-content: space-between;
    /* line-height: 40px; */
    font-size: 13px;
    margin: 20px 0 10px;
  }
</style>