<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>账户设置</span>
      <el-button style="float: right; padding: 3px 0"   type="text">操作按钮</el-button>
    </div>
      <el-col :span='10'>
        <el-form v-loading ='loading'>
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input :value="form.email" disabled></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
          <el-form-item label="头条ID">
            <el-input :value="form.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="媒体简介">
            <el-input v-model="form.intro"></el-input>
          </el-form-item>
          <el-form-item>
             <el-button type="primary" @click='saveUser'>保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span='10' :push='5'>
          <p>上传头像</p>
        <el-upload
          class="avatar-uploader"
          :http-request='handleUpload'
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo">
          <img v-if="form.photo" :src="form.photo"
          class="avatar" width='100px'>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
  </el-card>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      form: {}
    }
  },
  created () {
    this.handUser()
  },
  methods: {
    // 加载用户信息
    async handUser () {
      this.loading = true
      try {
        const data = await this.$http({
          url: '/user/profile',
          method: 'GET'
        })
        // console.log(data)
        this.form = data
        this.loading = false
      } catch (error) {
        this.$mesasge.error('加载用户信息失败')
        this.loading = false
      }
    },
    // 提交保存用户信息
    async saveUser () {
      try {
        const data = await this.$http({
          url: '/user/profile',
          method: 'PATCH',
          data: {
            name: this.form.name,
            email: this.form.email,
            intro: this.form.intro
          }
        })
        this.$message({
          type: 'success',
          message: '保存修改成功'
        })
        this.$store.commit('changeUser', data)
      } catch (error) {
        this.$message.error('保存修改失败')
      }
    },
    async handleUpload (uploadConfig) {
      // uploadConfig 是发送请求的对象内容包括数据，请求头等
      // console.log(uploadConfig)
      // 用Formdata收集到上传的文件
      const formData = new FormData()
      formData.append('photo', uploadConfig.file)
      // 发起请求将formdata作为axios的data
      try {
        const data = await this.$http({
          url: '/user/photo',
          method: 'PATCH',
          data: formData
        })
        this.form.photo = data.photo
        console.log(this.user)
        this.$store.commit('changeUser', this.form)
        this.$message({
          type: 'success',
          message: '修改媒体头像成功'
        })
      } catch (error) {
        this.$message.error('上传头像失败')
      }
    }
  }
}
</script>
<style>
    .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style lang='less' scoped>
</style>
