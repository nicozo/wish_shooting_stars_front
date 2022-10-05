export default ({ $axios, $auth, isDev }) => {
  $axios.onRequest((config) => {
    if (isDev) {
      console.log(response)
    }
  })
  $axios.onResponse((config) => {
    if (isDev) {
      console.log(response)
    }
  })
  $axios.onError((e) => {
    console.log(e.response)
  })
}
