import * as Constants from '../../../constants/chat2'
import * as React from 'react'
import * as Types from '../../../constants/types/chat2'
import * as Kb from '../../../common-adapters'
import {InviteBanner} from '.'
import {connect} from '../../../util/container'

type OwnProps = {
  conversationIDKey: Types.ConversationIDKey
}

type Props = {
  type: 'invite' | 'none' | 'broken'
  users: Array<string>
}

class BannerContainer extends React.PureComponent<Props> {
  render() {
    switch (this.props.type) {
      case 'invite':
        return <InviteBanner users={this.props.users} />
      case 'broken':
        return <Kb.ProofBrokenBanner users={this.props.users} />
      case 'none':
        return null
    }
    return null
  }
}

const mapStateToProps = (state, {conversationIDKey}) => {
  const _following = state.config.following
  const _meta = Constants.getMeta(state, conversationIDKey)
  const _users = state.users
  return {
    _following,
    _meta,
    _users,
  }
}

const mapDispatchToProps = dispatch => ({})

const mergeProps = (stateProps, dispatchProps) => {
  let type
  let users

  if (stateProps._meta.teamType !== 'adhoc') {
    type = 'none'
  } else {
    const broken = stateProps._meta.participants.filter(
      p => stateProps._users.infoMap.getIn([p, 'broken'], false) && stateProps._following.has(p)
    )
    if (!broken.isEmpty()) {
      type = 'broken'
      users = broken.toArray()
    } else {
      const toInvite = stateProps._meta.participants.filter(p => p.includes('@'))
      if (!toInvite.isEmpty()) {
        type = 'invite'
        users = toInvite.toArray()
      } else {
        type = 'none'
      }
    }
  }

  return {
    type,
    users: users || [],
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(BannerContainer)
