import { vMagnetic } from './magnetic'

export const motionDirectives = {
  install(app) {
    app.directive('magnetic', vMagnetic)
  },
}
