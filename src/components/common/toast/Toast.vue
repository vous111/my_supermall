<template>
  <div id="toast" v-show="isShow">
    <div class="toast-icon">
      <i :class="{'el-icon-check': isPass, 'el-icon-warning-outline': !isPass}"></i>
    </div>
    <div class="toast-text">
      {{message}}
    </div>
  </div>
</template>

<script>
  export default{
    name:"Toast",
    data(){
      return{
        message: "",
        isShow:false,
        isPass:true
      }
    },
    methods:{
      show(message="成功",time=2000,isPass=true){
        console.log('toast');
        this.message = message;
        this.isShow = true
        this.isPass = isPass
        setTimeout(()=>{
          this.isShow = false
          this.isPass = true
        },time)
      }
    }
  }
</script>

<style scoped>
  #toast{
    width: 60vw;
    height: 16vh;
    background-color: rgba(25, 25, 25, 0.8);
    position: fixed;
    top: 40%;
    left: 20%;
    /* transform: translate(50%, 50%); */
    z-index: 999;
    border-radius: 10px;
    /* padding-top: 2vh; */
  }
  .toast-icon{
    height: 8vh;
    text-align: center;
    padding-top: 3vh;
  }
  .el-icon-check,.el-icon-close, .el-icon-warning-outline{
    font-size: 35px;
    color: var(--color-light);
  }
  .toast-text{
    height: 8vh;
    line-height:8vh;
    font-size: 16px;
    color: #fff;
    font-weight: 400;
    text-align: center;
  }
</style>