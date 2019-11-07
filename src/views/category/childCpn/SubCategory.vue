<template>
  <div class="sub-category"> 
    <div class="sub-items" v-for="(item, index) in subItems" :key="index">
      <img :src="item.image" @load="imageLoad">
      <span>{{item.title}}</span>
    </div>
  </div>
</template>

<script>
  export default{
    name:"SubCagegory",
    props:{
      subItems:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
      imageLoad(){
        this.$emit('subImageLoad')
      }
    }
  }
</script>

<style scoped>
  .sub-category{
    display: flex;
    flex-flow: row wrap;
    /* justify-content: space-evenly; */
    /* margin-top: 10px; */
    padding: 10px 10px;

  }
  .sub-items{
    width: 33%;
    text-align: center;
    /* padding: 10px; */
  }
  .sub-items img{
    width: 80%;
  }
  .sub-items span{
    font-size: 12px;
    margin: 15px 0;
    display: inline-block;
  }
</style>