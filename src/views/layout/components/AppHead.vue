<template>
  <el-row :gutter="20">
  <el-col :span="10">江苏传智播客教育科技股份有限公司</el-col>
    <el-col :span="5" :offset="5">
      <el-dropdown @command='tchu'>
        <span class="el-dropdown-link"><img :src='user.photo' width="20px">{{ user.name }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item >用户设置</el-dropdown-item>
            <el-dropdown-item >退出</el-dropdown-item>
            <!-- <el-dropdown-item @click.native='tchu'>退出</el-dropdown-item> -->
            <!--  事件修饰符 .native 可以把事件注册到组件的根元素中-->
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'AppHead',
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.user = JSON.parse(window.localStorage.getItem('user_message'))
  },
  methods: {
    tchu () {
      // alert(1)
      this.$confirm('确认退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //  清除登录信息
        alert(1)
        window.localStorage.removeItem('user_message')
        // 跳转页面
        this.$router.push({
          name: 'login'
        })
        // 退出消息提醒
        this.$message({
          type: 'success',
          message: '退出成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出'
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
</style>
