<template>
  <div id="login">
    <el-form class="demo-ruleForm"
    :rules="rules"
    :model='form'
    ref='form'>
      <img src="../../assets/logo_index.png" alt>
        <el-form-item prop='mobile'>
          <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
      <el-row :gutter="20">
        <el-form-item prop='code'>
          <el-col :span="14">
            <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col :span="8">
            <el-button
            :loading='buttLoading'
            @click="handSendCode" :disabled='!!timer'>{{ timer? `剩余${timerNumber}秒`:'发送验证码'}}</el-button>
          </el-col>
        </el-form-item>
      </el-row>
      <el-form-item prop='agree' v-model='form.agree'>
          <el-checkbox v-model="form.agree">
            <span class="agree-text">我已阅读并同意<a href="#">用户协议</a>和<a href="#">隐私条款</a></span></el-checkbox>
      </el-form-item>
      <el-row>
        <el-col :span="24">
          <el-button
          class="login"
          @click='subLogin'
          v-bind:disabled='!form.agree'
          :loading='loginLoading'>登录</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import '@/vendor/gt'
import { setUser } from '@/utils/auth'
import initGeetest from '@/utils/init-geetest'
const timerSeconds = 60
export default {
  name: 'Applogin',
  data () {
    return {
      form: {
        mobile: '13911111111',
        code: '123456',
        agree: ''
      },
      loginLoading: false,
      buttLoading: false,
      timer: null,
      timerNumber: timerSeconds,
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /\d{11}/, message: '输入正确格式的手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '输入正确的验证码', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    // 点击发送验证码验证手机号码是否正确
    handSendCode () {
      // 验证表单的局部控件是否有mobile的错误提示
      this.$refs['form'].validateField('mobile', errorMessage => {
        if (errorMessage) {
          return
        }
        // 验证手机号码正确，则请求验证码
        this.yzm()
      })
    },
    /*
      验证码：点击发送验证码之后会发生三件事：1.验证手机号是否输入且正确格式：只要有提示错误信息就不会发送验证码。2.手机号通过验证就发送请求弹出人机交互动画，3.动画验证通过之后发送请求请求发送短信。
    */
    async yzm () {
      try {
        this.buttLoading = true
        const mobile = this.form.mobile
        // 请求人机交互初始化参数
        const data = await this.$http({
          method: 'GET',
          url: `/captchas/${mobile}`
        })
        const captchaObj = await initGeetest({
          // 以下配置参数来自服务端 SDK
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: data.new_captcha,
          product: 'bind'
        })
        captchaObj.onReady(() => {
          // 验证码ready之后才能调用verify方法显示验证码
          captchaObj.verify()// 弹出人机交互验证码
        }).onSuccess(async () => {
          try {
            var result = captchaObj.getValidate()
            // console.log(result)
            // 验证码正确请求发送短信
            await this.$http({
              method: 'GET',
              url: `/sms/codes/${mobile}`,
              params: {
                challenge: result.geetest_challenge,
                validate: result.geetest_validate,
                seccode: result.geetest_seccode
              }
            })
            // console.log(res.data)
            // 发送短信成功后开启倒计时
            this.djs()
          } catch (error) {
            this.$message.error('获取验证码失败')
            this.codeLoading = false
          }
        })
      } catch (err) {
        this.$message.error('获取验证码失败')
        this.buttLoading = false
      }
    },
    // 发送短信成功倒计时开启
    djs () {
      this.timer = window.setInterval(() => {
        this.timerNumber--
        if (this.timerNumber <= 0) {
          window.clearInterval(this.timer)
          this.timerNumber = timerSeconds
          this.timer = null
        }
      }, 1000)
    },
    // 点击登陆按钮对整个表单进行验证，
    subLogin () {
      this.$refs['form'].validate(valid => {
        if (!valid) {
          return
        }
        // 整个表单通过验证的话则发送请求
        this.handlogin()
      })
    },
    // 输入验证码之后，点击登录实现跳转
    async handlogin () {
      this.loginLoading = true
      try {
        const userInfo = await this.$http({
          method: 'POST',
          url: '/authorizations',
          data: this.form
        })
        // data为登陆成功后的返回值
        // 当本地存储写在跳转页面之后，当跳转home页时，本地存储值为null，且访问的不是登录页，所以跳转到登录页，因为此时就在登录页面，所以点击登录之后不会跳转页面，再点击一次才会跳转
        setUser(userInfo)
        // window.localStorage.setItem('user_message', JSON.stringify(data))
        // console.log(res)
        // 弹出成功提醒
        this.$message({
          message: '恭喜你，登陆成功',
          type: 'success'
        })
        this.$router.push({
          name: 'home'
        })
      } catch (err) {
        this.$message.error('登录失败，手机号或者验证码错误')
      }
      this.loginLoading = false
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
  background-image: url(../../assets/login_bg.jpg);
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
