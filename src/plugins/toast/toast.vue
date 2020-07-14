<template>
  <transition name="fade">
      <div class="vue-toast" v-show="visible">
        <img src="./face.png">
        <div class="vue-toast-msg">{{ message }}</div>
      </div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      message: '系统错误',
      visible: false
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .vue-toast{
    position: fixed;
    top: 50%;
    left: 50%;
    min-width: 220px;
    max-width: 400px;
    max-height: 500px;
    min-height: 150px;
    overflow: hidden;
    transform: translate(-50%, -50%);
    z-index: 999;
    color: #fff;
    background: rgba(0,0,0,0.6);
    padding: 35px 20px;
    box-sizing: border-box;
    border-radius: 4px;
    overflow: hidden;
  }
  .vue-toast div {
    text-align: center;
    font-size: 18px;
    /* font-family: PingFangSC; */
    font-weight: 600;
    color:rgba(255,255,255,1);
    line-height:25px;
    letter-spacing:1px;
  }
  .vue-toast img {
    margin: 0 auto;
    display: block;
    width: 30px;
    height: 30px;
    margin-bottom: 15px;
  }
  .fade-enter-active{
    animation: fade-in .3s;
  }
  .fade-leave-active{
    animation: fade-out .3s;
  }
  /* @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.7;
    }
  }
  @keyframes fade-out {
    0% {
      opacity: 0.7;
    }
    100% {
      opacity: 0;
    }
  } */
</style>

