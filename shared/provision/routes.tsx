import CodePage from './code-page/container'
import ErrorView from './error/container'
import ForgotUsername from './forgot-username/container'
import GpgSign from './gpg-sign/container'
import Paperkey from './paper-key/container'
import Password from './password/container'
import SelectOtherDevice from './select-other-device/container'
import SetPublicName from './set-public-name/container'
import Username from './username-or-email/container'

export const newRoutes = {
  codePage: {getScreen: (): typeof CodePage => require('./code-page/container').default, upgraded: true},
  error: {getScreen: (): typeof ErrorView => require('./error/container').default, upgraded: true},
  forgotUsername: {getScreen: (): typeof ForgotUsername => require('./forgot-username/container').default},
  gpgSign: {getScreen: (): typeof GpgSign => require('./gpg-sign/container').default, upgraded: true},
  paperkey: {getScreen: (): typeof Paperkey => require('./paper-key/container').default, upgraded: true},
  password: {getScreen: (): typeof Password => require('./password/container').default, upgraded: true},
  selectOtherDevice: {
    getScreen: (): typeof SelectOtherDevice => require('./select-other-device/container').default,
    upgraded: true,
  },
  setPublicName: {
    getScreen: (): typeof SetPublicName => require('./set-public-name/container').default,
    upgraded: true,
  },
  username: {
    getScreen: (): typeof Username => require('./username-or-email/container').default,
    upgraded: true,
  },
}
export const newModalRoutes = {}
