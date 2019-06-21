<template>
  <div id="home">
    <el-form class="demo-ruleForm">
        <img src="../assets/logo_index.png" alt="">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-input v-model="mobile" placeholder="请输入手机号"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="14">
          <el-input v-model="code" placeholder="请输入验证码"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button>获取验证码</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-button class="login">登录</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AppHome',
  data () {
    return {
      mobile: '',
      code: ''
    }
  }
}
</script>

<style lang='less' scoped>
  #home {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(../assets/login_bg.jpg);
    background-size: 1366px;
  }
  .el-form{
    width: 300px;
    padding: 30px;
    text-align: center;
    background-color: #fff;
}
  .el-input {
    width: 100%;
    margin-bottom: 10px;
  }

  img {
      width: 70%;
      margin-bottom: 10px;
  }
  .login {
      width: 100%;
      background-color: skyblue;
  }
</style>
