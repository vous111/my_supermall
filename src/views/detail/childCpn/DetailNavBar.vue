<template>
      <nav-bar class="nav-bar">
          <div slot="left" class="left" ref="navLeft">
            <i class="el-icon-arrow-left" @click="backClick" ref="navIconLeft"></i>
          </div>
          <div slot="center" class="center ccenter" ref="navCenter">
            <span v-for="(item, index) in titles" :key="index" :class="{active: index === currentIndex}" @click="itemClick(index)">
              {{item}}
            </span>
          </div>
          <div slot="right" class="left " ref="navRight">
            <i class="el-icon-shopping-cart-1"  ref="navIconRight" @click="goCartClick"></i>
          </div>

        </nav-bar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"

  export default{
    name:"DetailNavBar",
    components:{
      NavBar
    },
    props:{
      titles:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        currentIndex:0,
        // titles:['商品','参数','评论','推荐'],

      }
    },
    methods:{
      itemClick(index){
        this.currentIndex = index
        this.$emit('navClick',index)
      },
      backClick(){
        this.$router.back()
      },
      goCartClick(){
        this.$router.push('/shopcart')
      }
    }
  }
</script>

<style scoped>
  /* 组件里面的样式，可以到外面再修改 */
  .nav-bar{
    top:0;
    left: 0;
    right: 0;
    position: fixed;
    /* background-color: #fff; */
    z-index: 9;
    /* opacity:0 */
  }
  /* .left, .right {
    opacity:1;
    background-color: #fff;
  } */
    .el-icon-arrow-left,.el-icon-shopping-cart-1{
    font-size: 20px;
    margin-top: 8px;
    color: rgb(255, 255, 255);
    background-color: rgba(0, 0, 0, .6);
    border-radius: 50%;
    padding:2px;
  }
  .center{
    display: flex;
    justify-content: space-evenly;
    /* align-items: center; */
    /* opacity:0 */

  }
  .center span{
    font-size: 12px;
    line-height: 40px;
  }
  .active{
    color:var(--color-tint);
    border-bottom: 2px solid var(--color-tint);
    /* transition: 0.1s 0.1s; */
  }
</style>