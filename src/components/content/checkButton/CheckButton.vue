<template>
  <div class="check-button" @click="checkClick">
    <i class="el-icon-check" :class="{checked:isChecked}" ></i>
  </div>
</template>

<script>
  export default{
    name:"CheckButton",
    props:{
      isChecked:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      checkClick(){
        this.$emit('checkBtnClick')
      }
    }
  }
</script>

<style scoped>
  .el-icon-check{
    border-radius: 50%;
    background-color: #fff;
    color: #fff;
    font-size: 14px;
    border: 1px solid #aaa;
  }
  .checked{
    background-color: var(--color-tint);
    color: #fff;
    border: 1px solid var(--color-tint);

  }
</style>