import { App } from 'vue'
import registerElement from './register-element'
import registerProerties from './register-properties'
export function registerApp(app: App) {
  // registerElement(app)
  app.use(registerProerties)
}
