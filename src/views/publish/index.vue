<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>发布文章</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click='handlePublish(false)'>发布</el-button>
      <el-button style="float: right; padding: 3px 0" type="text" @click='handlePublish(true)'>存入草稿</el-button>
    </div>
    <el-col :span='10'>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="封面">
      </el-form-item>
      <el-form-item label="频道">
        <!-- <article-channel
       :value='form.channel_id'
       @input='form.channel_id=$event'
       ></article-channel>
      v-model是 上述：value和 @input事件的合并
       -->
       <article-channel v-model='form.channel_id'></article-channel>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
    </el-form>
    </el-col>
  </el-card>
</template>

<script>
import ArticleChannel from '@/components/article-channel'
export default {
  components: {
    ArticleChannel
  },
  name: 'AppPublish',
  data () {
    return {
      form: {
        title: '',
        content: '',
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] //
        },
        channel_id: '' // 频道ID
      }
    }
  },
  created () {

  },
  methods: {
    async handlePublish (draft) {
      try {
        await this.$http({
          url: '/articles',
          method: 'POST',
          params: {
            draft
          },
          data: this.form
        })
        this.$message({
          type: 'success',
          message: '发布成功'
        })
      } catch (error) {
        this.$message.error('发布文章失败', error)
      }
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
