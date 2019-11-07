<template>
    <div id="tab-bar">
      <slot></slot>
      </div>
  </template>
  
  <script>
    export default{
      name:"TabBar"
    }
  </script>
  
  <style scoped>
    /* @import "./assets/css/base.css" */

    #tab-bar{
    position: fixed;
    background-color: #f6f6f6;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    box-shadow: 0 -1px 2px rgba(80, 64, 64, 0.2);
    /* justify-content: space-between; */
  }

  </style>