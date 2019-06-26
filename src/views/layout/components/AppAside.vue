<template>
  <el-menu
  default-active="2"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b"
  :router="true">
    <el-menu-item index="/">
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <span>内容管理</span>
      </template>
        <el-menu-item index="/publish">发布文章</el-menu-item>
        <el-menu-item index="/article">内容列表</el-menu-item>
        <el-menu-item index="1-3">评论列表</el-menu-item>
        <el-menu-item index="1-4">素材管理</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <span>粉丝管理</span>
      </template>
        <el-menu-item index="1-1">图文数据</el-menu-item>
        <el-menu-item index="1-2">粉丝概况</el-menu-item>
        <el-menu-item index="1-3">粉丝画像</el-menu-item>
        <el-menu-item index="1-4">粉丝列表</el-menu-item>
    </el-submenu>
    <el-menu-item index="3">
      <span slot="title">账户信息</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  data () {
    return {
    }
  }
}
</script>

<style lang='less' scoped>
</style>
