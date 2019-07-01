<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>素材管理</span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <div class="action">
      <el-radio-group v-model="radio1">
        <el-radio-button
        label="全部"
        @click.native='loadImg(false)'
        ></el-radio-button>
        <el-radio-button
        @click.native='loadImg(true)'
        label="收藏"></el-radio-button>
      </el-radio-group>
      <el-upload
        class="upload-demo"
        :show-file-list='false'
        name='image'
        :on-success='handsx'
        :headers='{Authorization:`Bearer ${$store.state.user.token}`}'
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>
    <div class="bhh">
      <div class="box"
      v-for='item in img'
      :key='item.url'>
        <img :src='item.url'>
        <div class="icon">
          <el-row>
            <el-col :span='12'>
              <el-button
              circle
              @click='handsc(item)'
              :icon="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
              ></el-button>
            </el-col>
            <el-col :span='10'>
              <el-button
              circle
              @click='handDelet(item)'
              icon="el-icon-delete-solid"
              ></el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Appmedia',
  data () {
    return {
      radio1: '',
      img: []
    }
  },
  created () {
    this.loadImg()
  },
  methods: {
    // 请求展示图片
    async loadImg (collect = false) {
      console.log(collect)
      try {
        const data = await this.$http({
          url: '/user/images',
          method: 'GET',
          params: {
            collect,
            page: 1,
            per_page: 10
          }
        })
        console.log(data)
        this.img = data.results
      } catch (error) {
        this.$message.error('加载图片出错')
      }
    },
    // 删除图片
    async handDelet (item) {
      try {
        await this.$http({
          url: `/user/images/${item.id}`,
          method: 'DElETE'
        })
        this.loadImg()
        this.$message({
          type: 'success',
          message: '图片删除成功'
        })
      } catch (error) {
        this.$message.error('删除图片失败')
      }
    },
    // 收藏图片
    async handsc (item) {
      try {
        const collect = !item.is_collected
        const res = await this.$http({
          url: `/user/images/${item.id}`,
          method: 'PUT',
          data: {
            collect
          }
        })
        // console.log(res)
        item.is_collected = res.collect
        this.$message({
          type: 'success',
          message: `${collect ? '' : '取消'}收藏成功`
        })
      } catch (error) {
        this.message.error('收藏失败')
      }
    },
    // 上传图片成功后刷新页面
    handsx () {
      this.loadImg()
      this.$message({
        type: 'success',
        message: '图片上传成功'
      })
    }

  }
}
</script>

<style lang='less' scoped>
  .action {
      display:flex;
      justify-content: space-between;
  }
  .bhh {
    margin-top: 20px;
    display:flex
  }
  .box {
      width: 200px;
      height: 200px;
      padding: 15px;
      margin: 10px 10px 0 0;
      text-align: center;
      border: 1px solid #000;
  }
  img {
    width: 150px;
    height: 150px;
    margin-bottom: 8px;
  }
</style>
