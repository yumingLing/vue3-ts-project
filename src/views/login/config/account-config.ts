export const rules = {
  name: [
    {
      required: true,
      message: '用户名是必填内容',
      trigger: 'blur' //失去焦点的时候验证
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是5-10个字母或者数字',
      trigger: 'blur' //失去焦点的时候验证
    }
  ],
  password: [
    {
      required: true,
      message: '密码是必填内容',
      trigger: 'blur' //失去焦点的时候验证
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '密码必须是3个以上字母或者数字',
      trigger: 'blur' //失去焦点的时候验证
    }
  ]
}
