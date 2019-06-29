<template>
  <el-select
  clearable
  placeholder="请选频道"
  :value='value'
  @change='handChange'
  ><el-option
    v-for="item in channels"
    :key='item.id'
    :label="item.name"
    :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'ArticleChannel',
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      message: 'channel',
      channels: []
    }
  },
  created () {
    // 请求频道总数
    this.loadPd()
  },
  methods: {
    // 请求频道总数
    async loadPd () {
      try {
        const pd = await this.$http({
          url: '/channels',
          method: 'GET'
        })
        this.channels = pd.channels
      } catch (error) {
        this.$message.error('加载频道列表失败')
      }
    },
    // 当频道id改变时获取当前频道并传给父组件
    handChange (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
