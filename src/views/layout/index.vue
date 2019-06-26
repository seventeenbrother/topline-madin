<template>
  <el-container>
    <el-aside width="200px">
      <AppAside/>
    </el-aside>
    <el-container>
      <el-header>
        <AppHead/>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/AppAside.vue'
import AppHead from './components/AppHead.vue'

export default {
  components: {
    AppAside,
    AppHead
  },
  name: '',
  data () {
    return {
      message: 'layout'
    }
  }
}
</script>

<style lang='less' scoped>
  .el-container {
    height: 100%;
  }
  .el-header {
    background-color: #ccc;
    line-height: 60px;
  }
  .el-aside {
    background-color: #323745;
  }
  .el-main {
    padding:5px;
    background-color: skyblue;
  }
  .el-header {
    line-height: 60px;
  }
</style>
