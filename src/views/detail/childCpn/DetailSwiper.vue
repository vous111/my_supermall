<template>
    <swiper class="detail-swiper">
        <swiper-item v-for="item in topImages">
            <img :src="item" @load="imageLoad" alt="轮播图加载失败">
          </swiper-item>
    </swiper>
</template>

<script>
   import {Swiper, SwiperItem} from "components/common/swiper"

  export default{
    name:"DetailSwiper",
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      topImages:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        isLoad:false
      }
    },
    methods:{
      imageLoad(){
        if(!this.isLoad){
          this.$emit('swiperImgLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>
    .detail-swiper{
    height: 300px;
    overflow: hidden;
  }
</style>