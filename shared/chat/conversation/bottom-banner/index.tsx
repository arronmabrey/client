import * as React from 'react'
import {Box, Text} from '../../../common-adapters'
import {globalStyles, globalColors} from '../../../styles'

export type InviteProps = {
  users: Array<string>
}

const commonBannerStyle = {
  ...globalStyles.flexBoxColumn,
  alignItems: 'center',
  backgroundColor: globalColors.red,
  flexWrap: 'wrap',
  justifyContent: 'center',
  paddingBottom: 8,
  paddingLeft: 24,
  paddingRight: 24,
  paddingTop: 8,
}

const BannerBox = (props: {children: React.ReactNode; color: string}) => (
  <Box style={{...commonBannerStyle, backgroundColor: props.color}}>{props.children}</Box>
)

const BannerText = props => <Text center={true} type="BodySmallSemibold" negative={true} {...props} />

const InviteBanner = ({users}: InviteProps) => (
  <BannerBox color={globalColors.blue}>
    <BannerText>Your messages to {users.join(' & ')} will unlock when they join Keybase.</BannerText>
  </BannerBox>
)

export {InviteBanner}
