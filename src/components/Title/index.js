import React from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './index.module.less';

const defaultProps = {
  showLeftLine: true,
};

const Title = (props) => {
  const {
    tooltip,
    showLeftLine = true,
    className,
    style,
    extraContent,
    children,
  } = props;
  const classNames = classnames(
    showLeftLine ? styles.title : styles.commonTitle,
    className
  );
  return (
    <div className={classNames} style={style}>
      <span>
        {children}
        {tooltip && (
          <span className={styles.tooltip}>
            <Tooltip title={tooltip}>
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        )}
      </span>
      <span className={styles.extraContent}>{extraContent}</span>
    </div>
  );
};

Title.propTypes = {
  /** 提示文字，支持string|ReactNode */
  tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** 是否显示左侧提示蓝条 */
  showLeftLine: PropTypes.bool,
  /** 容器类名 */
  className: PropTypes.string,
  /** 容器style样式 */
  style: PropTypes.object,
  /** 右侧额外内容  支持string|ReactNode */
  extraContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
  ]),
};

Title.defaultProps = defaultProps;

export default Title;
