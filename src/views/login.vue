<template>
  <div id="login">
    <el-form class="demo-ruleForm">
      <img src="../assets/logo_index.png" alt>
      <el-row>
        <el-col :span="24">
          <el-input v-model="mobile" placeholder="请输入手机号"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="14">
          <el-input v-model="code" placeholder="请输入验证码"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button @click="yzm">获取验证码</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button class="login" @click='handlogin'>登录</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import '@/vendor/gt'
export default {
  name: 'Applogin',
  data () {
    return {
      mobile: '',
      code: ''
    }
  },

  methods: {
    /*
      输入验证码之后，点击登录实现跳转
    */
    handlogin () {
      const mobile = this.mobile
      const code = this.code
      axios({
        method: 'POST',
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
        data: {
          mobile,
          code
        }
      }).then((res) => {
        // console.log(res)
        // 弹出成功提醒
        this.$message({
          message: '恭喜你，登陆成功',
          type: 'success'
        })
        this.$router.push({
          name: 'home'
        })
      }).catch(() => {
        this.$message.error('登录失败，手机号或者验证码错误')
      })
    },
    /*
      验证码：点击发送验证码之后会发生两件事：1.发送请求弹出人机交互动画，2.动画验证通过之后发送请求请求发送短信。
    */
    yzm () {
      const mobile = this.mobile
      axios({
        method: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        // console.log(res)
        const data = res.data.data
        window.initGeetest(
          {
            // 以下配置参数来自服务端 SDK
            gt: data.gt,
            challenge: data.challenge,
            offline: !data.success,
            new_captcha: data.new_captcha,
            product: 'bind'
          },
          function (captchaObj) {
            captchaObj
              .onReady(function () {
                // 验证码ready之后才能调用verify方法显示验证码
                captchaObj.verify()// 弹出验证码
              })
              .onSuccess(function () {
              // your code
                var result = captchaObj.getValidate()
                console.log(result)
                axios({
                  method: 'GET',
                  url: `http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/${mobile}`,
                  params: {
                    challenge: result.geetest_challenge,
                    validate: result.geetest_validate,
                    seccode: result.geetest_seccode
                  }
                }).then((res) => {
                  console.log(res.data)
                })
              })
              .onError(function () {
                // your code
              })
          }
        )
      })
    }
  }
}
</script>

<style lang='less' scoped>
#login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(../assets/login_bg.jpg);
  background-size: 1366px;
}
.el-form {
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
