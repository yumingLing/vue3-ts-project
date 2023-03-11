import 'element-plus/dist/index.css'
import {
  ElAlert,
  ElAside,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio
} from 'element-plus'
import { App } from 'vue'
// 这个可以去掉了，element-plus支持自动导入了
const components = [
  ElAlert,
  ElAside,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio
]

export default function (app: App) {
  for (const com of components) {
    app.component(com.name, com)
  }
}
