import React, { PureComponent } from 'react';
import { Popover, Tooltip } from 'antd';
// import 'antd/dist/antd.css';
import PropTypes from 'prop-types';

/**
 * 长文本缩略
 */

class LongText extends PureComponent {
  render() {
    const {
      text = '',
      type,
      limit = 20,
      overlayStyle = {},
      ...leftProps
    } = this.props;
    const style = { wordWrap: 'break-word', maxWidth: 450, ...overlayStyle };
    let res = '';
    if (type === 'tooltip') {
      if (text.replace(/<\/?.+?>/g, '').length > limit) {
        res = (
          <Tooltip
            overlayStyle={style}
            title={text.replace(/<\/?.+?>/g, '')}
            placement="top"
            {...leftProps}
          >
            {`${text.replace(/<\/?.+?>/g, '').slice(0, limit - 1)}...`}
          </Tooltip>
        );
      } else {
        res = text.replace(/<\/?.+?>/g, '');
      }
    } else if ((text || '').length > limit) {
      res = (
        <Popover
          content={text}
          overlayStyle={style}
          trigger="hover"
          {...leftProps}
        >
          {`${text.slice(0, limit - 1)}...`}
        </Popover>
      );
    } else {
      res = text;
    }
    return res;
  }
}
LongText.propTypes = {
  /** 有html标签时必填，值为 tooltip  */
  type: PropTypes.string,
  /** 内容: 可以带html标签的字符串 */
  text: PropTypes.string.isRequired,
   /** 最多显示的字数 */
  limit: PropTypes.number.isRequired
}

export default LongText;
