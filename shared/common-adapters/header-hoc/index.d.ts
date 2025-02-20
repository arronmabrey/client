import * as React from 'react'
import {Props as HeaderHocProps, LeftActionProps} from './types'

export declare class HeaderHocHeader extends React.Component<HeaderHocProps> {}
export declare class LeftAction extends React.Component<LeftActionProps> {}
declare function HeaderHoc<P extends {}>(
  WrappedComponent: React.ComponentType<P>
): React.ComponentType<P & HeaderHocProps>
export default HeaderHoc
