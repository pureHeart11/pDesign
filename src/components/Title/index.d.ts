import * as React from 'react';

export interface TitleProps {
  /** 气泡提示 */
  tooltip?: React.ReactNode | string;
  /** 是否显示左侧蓝条 */
  showLeftLine?: PropTypes.bool;
  className?: React.CSSProperties;
  style?: React.CSSProperties;
  extraContent?: React.ReactNode;
}

export default class Title extends React.PureComponent<TitleProps, any> {}
