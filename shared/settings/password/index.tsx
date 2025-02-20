import React, {Component} from 'react'
import * as Styles from '../../styles'
import * as Kb from '../../common-adapters'

type Props = {
  error?: Error | null
  hasPGPKeyOnServer?: boolean
  hasRandomPW: boolean
  newPasswordError?: string
  newPasswordConfirmError?: string
  onCancel?: () => void
  onSave: (password: string, passwordConfirm: string) => void
  saveLabel?: string
  showTyping?: boolean
  waitingForResponse?: boolean
  onUpdatePGPSettings?: () => void
}

type State = {
  password: string
  passwordConfirm: string
  showTyping: boolean
  errorSaving: string
}

class UpdatePassword extends Component<Props, State> {
  state: State

  constructor(props: Props) {
    super(props)
    this.state = {
      errorSaving: '',
      password: '',
      passwordConfirm: '',
      showTyping: !!props.showTyping,
    }
  }

  _handlePasswordChange(password: string) {
    this.setState({
      errorSaving: this._errorSaving(password, this.state.passwordConfirm),
      password,
    })
  }

  _handlePasswordConfirmChange(passwordConfirm: string) {
    this.setState({
      errorSaving: this._errorSaving(this.state.password, passwordConfirm),
      passwordConfirm,
    })
  }

  _errorSaving(password: string, passwordConfirm: string): string {
    if (password && passwordConfirm && password !== passwordConfirm) {
      return 'Passwords must match.'
    }
    if (this.props.hasPGPKeyOnServer === null) {
      return 'There was a problem downloading your PGP key status.'
    }
    return ''
  }

  render() {
    const inputType = this.state.showTyping ? 'text' : 'password'
    const keyboardType = this.state.showTyping && Styles.isAndroid ? 'visible-password' : 'default'
    const notification = this.props.error
      ? this.props.error.message
      : this.props.hasPGPKeyOnServer
      ? "Changing your password will delete your PGP key from Keybase, and you'll need to generate or upload one again."
      : null
    return (
      <Kb.Modal
        banners={[
          notification && <Kb.Banner color="yellow" text={notification} />,
          !!this.props.newPasswordError && <Kb.Banner color="red" text={this.props.newPasswordError} />,
          !!this.state.errorSaving && <Kb.Banner color="red" text={this.state.errorSaving} />,
          !!this.props.newPasswordConfirmError && (
            <Kb.Banner color="red" text={this.props.newPasswordConfirmError} />
          ),
        ]}
        footer={{
          content: (
            <Kb.ButtonBar align="center" direction="row" fullWidth={true} style={styles.buttonBar}>
              <Kb.Button
                fullWidth={true}
                label={this.props.saveLabel || 'Save'}
                disabled={
                  !!this.state.errorSaving ||
                  this.state.password.length < 8 ||
                  this.state.password !== this.state.passwordConfirm
                }
                onClick={() => this.props.onSave(this.state.password, this.state.passwordConfirm)}
                waiting={this.props.waitingForResponse}
              />
            </Kb.ButtonBar>
          ),
        }}
        header={{
          leftButton: Styles.isMobile ? (
            <Kb.Text type="BodyBigLink" onClick={this.props.onCancel}>
              Cancel
            </Kb.Text>
          ) : null,
          title: this.props.hasRandomPW ? 'Set a password' : 'Change password',
        }}
        onClose={this.props.onCancel}
      >
        <Kb.Box2 centerChildren={true} direction="vertical" fullHeight={true} style={styles.container}>
          <Kb.Text type="Body" style={styles.bodyText} center={true}>
            A password allows you to sign out and sign back in, and use the keybase.io website.
          </Kb.Text>
          <Kb.RoundedBox side="top">
            <Kb.PlainInput
              placeholder="New password"
              type={inputType}
              keyboardType={keyboardType}
              value={this.state.password}
              onChangeText={password => this._handlePasswordChange(password)}
            />
          </Kb.RoundedBox>
          <Kb.RoundedBox side="bottom">
            <Kb.PlainInput
              placeholder="Confirm password"
              type={inputType}
              keyboardType={keyboardType}
              value={this.state.passwordConfirm}
              onChangeText={password => this._handlePasswordConfirmChange(password)}
            />
          </Kb.RoundedBox>
          <Kb.Text style={styles.passwordFormat} type="BodySmall">
            Password must be at least 8 characters.
          </Kb.Text>
          <Kb.Checkbox
            boxBackgroundColor={Styles.globalColors.white}
            label="Show typing"
            onCheck={showTyping => this.setState(prevState => ({showTyping: !prevState.showTyping}))}
            checked={this.state.showTyping || !!this.props.showTyping}
            style={styles.checkbox}
          />
        </Kb.Box2>
      </Kb.Modal>
    )
  }
}

const styles = Styles.styleSheetCreate({
  bodyText: {
    paddingBottom: Styles.globalMargins.small,
  },
  buttonBar: {
    minHeight: undefined,
  },
  checkbox: {
    paddingBottom: Styles.globalMargins.tiny,
    paddingRight: Styles.globalMargins.small,
    paddingTop: Styles.globalMargins.small,
    width: '100%',
  },
  container: {
    backgroundColor: Styles.globalColors.blueGrey,
    flexGrow: 1,
    padding: Styles.globalMargins.small,
  },
  headerText: {
    paddingBottom: Styles.globalMargins.small,
    paddingTop: Styles.globalMargins.small,
  },
  passwordFormat: {
    alignSelf: 'flex-start',
    marginTop: Styles.globalMargins.xtiny,
  },
})

export default UpdatePassword
