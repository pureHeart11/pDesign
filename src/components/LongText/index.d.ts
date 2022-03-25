import * as React from 'react';
import * as PropTypes from 'prop-types';
// declare const textAlign: ["left", "right"];
declare const InputSizes: ['tooltip'];
interface ObjSize {
  width: number;
  height: number;
}
export interface IProps {
  limit?: number;
  text?: string;
  type?: typeof InputSizes[number];
}
declare class LongText extends React.Component<IProps, any> {}
export default LongText;
