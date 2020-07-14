<style rel="stylesheet/less" lang="less" >
    .dialog-container {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        z-index: 301;
        overflow: hidden;
        .dialog-wrapper {
            z-index: 500;
            position: absolute;
            top: 45%;
            left: 50%;
            width: 350px;
            transform: translate(-50%, -50%);
            box-shadow: 0px 4px 20px 0px rgba(0,0,0,0.15);
            border-radius: 4px;
            background-color: rgba(255, 255, 255, 1);
            .dialog-header {
                box-sizing: border-box;
                width: 100%;
                height: 35px;
                background:rgba(255,137,46,1);
                border-radius:4px 4px 0px 0px;
                padding: 0 15px 0 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                span {
                    height:22px;
                    font-size:16px;
                    // font-family:PingFangSC;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    line-height:22px;
                }
                img {
                    width: 24px;
                    height: 24px;
                    cursor: pointer;
                }
            }
            slot {
                display: block;
                width: 100%;
                background-color: rgba(255, 255, 255, 1);
                border-radius: 0 0 4px 4px;
            }
        }
        .medium-size {
            width: 500px;
        }
        .confirm-fade-enter-active {
            animation: bounce-in 0.5s;
        }
        .confirm-fade-leave-active {
            animation: bounce-in 0.5s reverse;
        }
        .confirm-fade-enter,
        .confirm-fade-leave-to {
            opacity: 0;
        }
        @keyframes bounce-in {
            0% {
                transform: scale(0);
            }
            50% {
                transform: scale(1.2);
            }
            100% {
                transform: scale(1);
            }
        }
    }
    .mask-container {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        // background-color: rgba(255, 255, 255, 0.8);
        // filter: blur(50px);
        // -webkit-filter: blur(50px);
        z-index: 400; 
        position: relative;
    }
</style>
<template>
    <div class="dialog-container" v-if="showDialog" v-fixed>
        <div class="mask-container" :style="{'background-color': maskColor}">
        </div>
        <div class="dialog-wrapper" :class="sizeType === 'medium' ? 'medium-size' : ''">
            <div class="dialog-header">
                <span>{{ dialogTitle }}</span>
                <img :src="close" @click="handleClose" v-if="showClose" />
            </div>
            <slot class="slot-wrapper"></slot>
        </div>
    </div>
    
</template>
<script>
import close from './close.png'
export default {
    name: 'dialogComp',
    props: {
        showDialog: {
            type: Boolean,
            default: false
        },
        // 目前支持small medium两个参数
        sizeType: {
            type: String,
            default: 'small'
        },
        dialogTitle: {
            type: String,
            default: ''
        },
        maskColor: {
            type: String,
            default: ''
        },
        showClose: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            close
        }
    },
    methods: {
        handleClose() {
            this.$emit('closeDialog')
        }
    }
}
</script>