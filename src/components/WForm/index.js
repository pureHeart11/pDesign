import React from 'react';
import WFormItem from './Item';
import PropTypes from 'prop-types';
import styles from './index.module.less';

const formItemLayout = {
  horizontal: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: document.body.clientWidth > 1440 ? 8 : 6 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: document.body.clientWidth > 1440 ? 8 : 12 }
    }
  },
  inline: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 10 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 }
    }
  }
};
const formTailLayout = {
  horizontal: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: document.body.clientWidth > 1440 ? 8 : 6 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: {
        span: document.body.clientWidth > 1440 ? 8 : 12,
        offset: document.body.clientWidth > 1440 ? 8 : 6
      }
    }
  },
  inline: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12, offset: 6 }
    }
  }
};

const WForm = props => {
  const { formProps, onCancel, onOk, confirmLoading, actionRef } = props;
  const { layout = 'horizontal' } = formProps;

  const formSetting = {
    formItemLayout: formItemLayout[layout],
    formTailLayout: formTailLayout[layout],
    layout,
    formButton: [
      {
        label: '提交',
        type: 'primary',
        htmlType: 'submit',
        loading: confirmLoading
      },
      {
        label: '取消',
        htmlType: 'cancel',
        type: ''
      }
    ],
    ...formProps
  };

  return (
    <div className={styles.wrapper}>
      <WFormItem formProps={formSetting} onOk={onOk} onCancel={onCancel} actionRef={actionRef} />
    </div>
  );
};
WForm.propTypes = {
  /** 表单实例,可获取/设置表单值: actionRef.current类型 { form， getFieldsValue，setFieldsValue }	*/
  actionRef: PropTypes.shape({
    current: {
      form: PropTypes.object,
      getFieldsValue: PropTypes.func,
      setFieldsValue: PropTypes.func
    }
  }),
  /** 表单配置项 { columns: [表单配置],data: {表单默认值} } 	*/
  formProps: PropTypes.object,
  /**  提交按钮loading */
  confirmLoading: PropTypes.bool,
  /** 提交表单回调（value,btnProps）=> void	*/
  onOk: PropTypes.func,
  /** 取消回调	*/
  onCancel: PropTypes.func
};

export default WForm;
export { default as WFormItem } from './Item';
