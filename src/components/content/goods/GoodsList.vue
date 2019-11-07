<template>
  <div class="goods-list">
      <goods-list-item v-for="(item, index) in goods" :key="index" :goods-item="item" :image-type="imageType"></goods-list-item>
    </div>
  </div> 
</template>

<script>

  import GoodsListItem from './GoodsListItem.vue'

  export default{
    name:"GoodsList",
    props:{
      goods:{
        type:Array,
        default(){
          return []
        }
      },
      imageType:{
        type:Number,
        default:1
      }
    },
    components:{
      GoodsListItem
    },
    // computed:{
    //   imageUrl(item){
    //     switch(this.imageType){
		// 			case 1:return this.goodsItem.show.img
		// 			case 2:return this.goodsItem.img
		// 			case 3:return this.goodsItem.image
		// 		}
    //   }     
    // }
  }
</script>

<style scoped>
    .goods-list{
    display: flex;
    flex-wrap: wrap;/* 让弹性盒元素在必要的时候拆行 */
    justify-content: space-around; /*在弹性盒对象的 <div> 元素中的各项周围留有空白*/
    padding: 2px; 
    /*这里目的是使得左右两张图片的间隔等宽，需要微调*/
  }

</style>