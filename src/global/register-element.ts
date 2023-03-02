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
