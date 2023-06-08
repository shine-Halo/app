
//表单验证
import Vue from "vue";
import VeeValidate, { extend, ValidationObserver, ValidationProvider, localize, configure } from 'vee-validate'
//import * as rules from 'vee-validate/dist/rules'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
//import merge from 'lodash/merge' // 用于合并多个对象
Vue.use(VeeValidate)

// // 配置错误提示文本的样式类名
// configure({
//     classes: {
//       valid: 'is-valid', // 验证合法的类名
//       invalid: 'is-invalid', // 验证不合法的类名
//     }
//   })
  
//   // 注册所有规则
//   Object.keys(rules).forEach(rule => {
//     extend(rule, rules[rule])
//   })
  
//   // 将自定义的message与内置的中文message合并
//   const locale = merge(zh_CN, {
//     messages: { 
//       is: '{_field_}必须与密码相同',
//       oneOf: '{_field_}必须同意'
//     }
//   })
//   // 指定中文提示信息
//   localize('zh_CN', locale)
  
//   // 注册用于校验的组件
//   Vue.component('ValidationProvider', ValidationProvider) // 用于输入过程中实时校验
//   Vue.component('ValidationObserver', ValidationObserver) // 用于点击按钮时统一校验
  
VeeValidate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,
        is:(filed) => `${filed}必须与密码相同`
    },
    attributes: {
        phone:'手机号',
        code:'验证码',
        password:'密码',
        password1:'确认密码',
        arg:'协议'
    }
})
//自定义校验规则
VeeValidate.Validator.extend('agree', {
    validate:value => {
        return value
    },
    getMessage:field => field + '必须同意'
})
