import '@/vendor/gt'

export default function (option) {
  return new Promise((resolve, reject) => {
    window.initGeetest(option, captchaObj => {
      resolve(captchaObj)
    })
  })
}
