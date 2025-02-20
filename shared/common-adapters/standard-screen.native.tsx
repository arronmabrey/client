import * as React from 'react'
import {Props} from './standard-screen'
import {NativeScrollView} from './native-wrappers.native'
import HeaderHoc from './header-hoc'
import * as Styles from '../styles'
import Banner from './banner'
import Box from './box'
import Text from './text'

const Kb = {
  Banner,
  Box,
  NativeScrollView,
  Text,
}

const StandardScreen = (props: Props) => {
  return (
    // @ts-ignore for now
    <Kb.NativeScrollView scrollEnabled={props.scrollEnabled}>
      {!!props.notification && (
        <Kb.Banner
          color={props.notification.type === 'error' ? 'red' : 'blue'}
          text={props.notification.message}
        />
      )}
      <Kb.Box
        style={Styles.collapseStyles([
          styles.content,
          !!props.notification && styles.contentMargin,
          props.style,
        ])}
      >
        {props.children}
      </Kb.Box>
    </Kb.NativeScrollView>
  )
}

const MIN_BANNER_HEIGHT = 40
const styles = Styles.styleSheetCreate({
  container: {
    ...Styles.globalStyles.flexBoxColumn,
    backgroundColor: Styles.globalColors.white,
    flexGrow: 1,
  },
  content: {
    ...Styles.globalStyles.flexBoxColumn,
    alignItems: 'stretch',
    paddingLeft: Styles.globalMargins.medium,
    paddingRight: Styles.globalMargins.medium,
  },
  contentMargin: {marginTop: MIN_BANNER_HEIGHT},
})

export default HeaderHoc(StandardScreen)
