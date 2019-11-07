<template>
    <div class="side-control">
      <div
      v-for="(item, index) in sideItems"
      :key="index"
      @click="itemClick(index)"
      class="item"
      :class="{active: currentIndex === index}">
      <span>{{ item.title }}</span>
      </div>
    </div>
  </template>
  
  <script>
    export default{
      name:"SideControl",
      props:{
        sideItems:{
          type:Array,
          default(){
            return []
          }
        }
      },
      data(){
        return{
          currentIndex:0
        }
      },
      methods:{
        itemClick(index){
          this.currentIndex = index
          this.$emit('sideClick', index)
        }
      }
    }
  </script>
  
  <style scoped>
    .side-control{
      /* display: flex; */
      /* width: 100px; */
      /* flex-flow: column wrap; */
      background-color: #f2f5f8;
    }

    .item{
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 14px;
    }

    .active{
      background-color: #fff;
      color: var(--color-tint);
      border-left: 3px solid var(--color-tint);
      font-weight: 700;
    }
  
  </style>