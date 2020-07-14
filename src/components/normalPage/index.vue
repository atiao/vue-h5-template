<style rel="stylesheet/scss" lang="less">
    .normal-page-container {
        height: 300px;
        width: 400px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        img {
            width: 344px;
            height: 224px;
            margin-bottom: 20px;
        }
        div {
            font-size:18px;
            // font-family:PingFangSC;
            font-weight:400;
            color: #666;
            line-height:25px;
            text-align: center;
            span {
                cursor: pointer;
                color: #FF892E;
            }
        }
    }
</style>
<template>
    <div class="normal-page-container">
        <img :src="imgSrc">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'normalPage',
    props: {
        imgSrc: {
            type: String,
            default: ''
        }
    },
    data() {
        return {

        }
    }
}
</script>