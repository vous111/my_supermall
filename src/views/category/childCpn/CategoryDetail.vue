<template>
  <div class="category-detail">
    <!-- tab-control -->
    <tab-control :titles="detailTitles" @titleClick="titleClick"></tab-control>

    <!-- goods -->
    <goods-list :goods="detailGoods" :imageType="2"></goods-list>
  </div>
</template>

<script>
  import TabControl from 'components/content/tabControl/TabControl';
  import GoodsList from 'components/content/goods/GoodsList';

  export default{
    name:"CategoryDetail",
    components:{
      TabControl,
      GoodsList,
    },
    data(){
      return {
        detailTitles:['流行','新款','精选'],
      }
    },
    props:{
      detailGoods:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
      titleClick(index){
        this.$emit('detailClick', index)
      }
    }
  }
</script>

<style scoped>
  
</style>