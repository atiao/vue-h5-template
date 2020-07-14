<style lang="less">
.msg-box-container {
    text-align: center;
    padding: 30px 10px;
    p {
      white-space: pre-wrap;
      font-size:16px;
      // font-family:PingFangSC;
      font-weight:400;
      color:rgba(34,34,34,1);
      line-height:24px;
      // margin-bottom: 25px;
    }
    .ui-alert {
      display: inline-block;
      width: 20px;
      height: 18px;
      vertical-align: text-bottom;
      background: url('../../assets/images/alert.png') center no-repeat;
      background-size: 100%;
    }
    button {
      border: none;
      outline: none;
      box-sizing: border-box;
      background:linear-gradient(360deg,rgba(255,137,46,1) 0%,rgba(255,164,48,1) 100%);
      border-radius:23px;
      // padding: 0 38px;
      height: 40px;
      width: 145px;
      font-size: 16px;
      // font-family: PingFangSC;
      font-weight: 600;
      color: rgba(255,255,255,1);
      line-height: 40px
    }
    .cancelButton {
      margin-right: 20px;
      line-height: 36px;
      color: rgba(255,137,46,1);
      background: rgba(255, 255, 255, 1);
      border: 2px solid rgba(255, 137, 46, 1);
    }
}
</style>
<template>
  <dialog-comp :showDialog="isShowMessageBox"  :maskColor="maskColor" :showClose="showClose" :dialogTitle="title" @closeDialog="cancel">
      <div class="msg-box-container">
          <p>
            <i v-if="isAlert" class="ui-alert"></i>{{ content }}
          </p>
          <button v-if="isShowCancelBtn" class="cancelButton" @click="cancel">{{ cancelVal }}</button>
          <button v-if="isShowConfirmBtn" @click="confirm">{{ confirmVal }}</button>
      </div>
  </dialog-comp>
</template>

<script>
import dialogComp from '@/components/dialogComp'
export default {
  components: {
  },
  data() {
    return {
      isShowMessageBox: false,
      resolve: '',
      reject: '',
      promise: '', // 保存promise对象
    };
  },
  components: {
    dialogComp
  },
  props: {
    isAlert: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: '这是弹框内容'
    },
    maskColor: {
      type: String,
      default: ''
    },
    isShowConfirmBtn: {
      type: Boolean,
      default: true
    },
    isShowCancelBtn: {  //是否展示取消按钮
      type: Boolean,
      default: false
    },
    title: {   //标题
      type: String,
      default: '提示',
    },
    confirmVal: {
      type: String,  //确认文字
      default: '确定'
    },
    cancelVal: {   //取消文字
      type: String,
      default: '取消'
    },
    showClose: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    // 确定,将promise断定为resolve状态
    confirm() {
      this.isShowMessageBox = false;
      this.resolve('confirm');
      this.remove();
      this.removeBlur();
    },
    // 取消,将promise断定为reject状态
    cancel(tip) {
      this.isShowMessageBox = false;
      if (tip) {
        this.reject(tip)
      } else {
        this.reject('cancel')
      }
      this.remove();
      this.removeBlur();
    },

    removeBlur() {
      const dom = document.getElementById('app');
      if (dom.classList.contains('blur')) {
        dom.classList.remove('blur')
      }
    },
    
    
    // 弹出messageBox,并创建promise对象
    showMsgBox() {
      this.isShowMessageBox = true;
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
      // 返回promise对象
      return this.promise;
    },
    remove() {
      setTimeout(() => {
        this.destroy();
      }, 100);
    },
    destroy() {
      // document.body.removeChild(this.$el);
      this.$destroy();
    },

  }
};
</script>