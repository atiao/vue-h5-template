<template>
  <div class="page">
    <normal-page :imgSrc="noFind">
      <div>哎呀，您所访问的页面找不到啦~</div>
    </normal-page>
  </div>
</template>
<script>
import noFind from './404.png'
import normalPage from '@/components/normalPage'
export default {
  name: 'noFind',
  components: {
    normalPage
  },
  data() {
    return {
      noFind
    }
  }
}
</script>
<style lang="less">
</style>
