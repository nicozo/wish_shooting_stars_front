import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  extend
} from 'vee-validate'

import {
  required
} from 'vee-validate/dist/rules'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

extend('required', {
  ...required,
  message: '{_field_}は必須項目です'
})

extend('max', {
  validate (value, { length }) {
    return value.length <= length
  },
  params: ['length'],
  message: '{_field_}は{length}文字以下で入力してください'
})

extend('wish', {
  validate (value) {
    const regex = new RegExp('ように$|ほしい$|ください$|欲しい$|下さい$')

    return regex.test(value)
  },
  message: '{_field_}は語尾が「ように」「欲しい」「ください」のいずれかになるように入力してください'
})
