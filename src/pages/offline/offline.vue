<template>
    <normal-page :imgSrc="offNet">
      <div>网络不给力，请检查后<span @click="handleReload">重试</span></div>
    </normal-page>
</template>
<script>
import normalPage from '@/components/normalPage'
import offNet from './offNet.png'
export default {
  name: 'offline',
  components: {
    normalPage
  },
  data() {
    return {
      offNet
    }
  },
  methods: {
    handleReload() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less">
</style>
