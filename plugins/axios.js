// Doc: https://axios.nuxtjs.org/extend/
// Doc: https://axios.nuxtjs.org/helpers
export default ({ $axios, $auth, isDev }) => {
  $axios.onRequest((config) => {
    if (isDev) {
      console.log(config)
    }
  })
  $axios.onResponse((response) => {
    if (isDev) {
      console.log(response)
    }
  })
  $axios.onError((e) => {
    console.log(e.response)
  })
}
