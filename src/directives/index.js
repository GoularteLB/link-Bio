import { vMagnetic } from './magnetic'
import { vSpotlight } from './spotlight'
import { vTilt } from './tilt'

export const motionDirectives = {
  install(app) {
    app.directive('magnetic', vMagnetic)
    app.directive('spotlight', vSpotlight)
    app.directive('tilt', vTilt)
  },
}
