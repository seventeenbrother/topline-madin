<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>发布文章</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click='handlePublish(false)'>发布</el-button>
      <el-button style="float: right; padding: 3px 0" type="text" @click='handlePublish(true)'>存入草稿</el-button>
    </div>
    <el-col :span='16'>
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
        <!-- 富文本编辑器 -->
          <quill-editor v-model="form.content"
                  ref="myQuillEditor"
                  :options="editorOption"
                  >
          </quill-editor>
        </el-form-item>
      </el-form>
    </el-col>
  </el-card>
</template>

<script>
// 引入富文本编辑器的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

import ArticleChannel from '@/components/article-channel'
export default {
  components: {
    ArticleChannel,
    quillEditor
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
      },
      editorOption: {} // 富文本编辑器配置选项
    }
  },
  created () {
    if (this.$route.name === 'publish-edit') {
      this.loadArticle()
    }
  },
  methods: {
    // 发布文章
    async handlePublish (draft) {
      try {
        if (this.$route.name === 'publish-edit') {
          await this.$http({
            url: `/articles/${this.$route.params.id}`,
            method: 'PUT',
            params: {
              draft
            },
            data: this.form
          })
          this.$message({
            type: 'success',
            message: '发布成功'
          })
        } else {
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
        }
      } catch (error) {
        this.$message.error('操作失败', error)
      }
    },
    // 修改文章
    async loadArticle () {
      try {
        const article = await this.$http({
          url: `/articles/${this.$route.params.id}`,
          method: 'GET'
        })
        this.form = article
      } catch (error) {
        this.$message.error('获取文章失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
  .quill-editor {
    height: 500px;
    margin-bottom: 20px;
  }
</style>
