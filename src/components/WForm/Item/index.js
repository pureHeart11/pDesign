import React, { createElement, useEffect, useImperativeHandle, useState } from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Checkbox,
  Switch,
  Radio,
  Cascader,
  Rate,
  TreeSelect,
  Button,
  Divider,
  Modal,
} from 'antd';
import { omit } from 'lodash';
// import CommonUpload from '../../CommonUpload';
// import SortUpload from '../../SortUpload';
import Title from '../../Title';
import classNames from 'classnames';
import styles from './index.module.less';

const { Password, TextArea } = Input,
  { Option } = Select,
  { RangePicker } = DatePicker,
  { confirm } = Modal,
  h = createElement;

const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
let resizeTimer = null;

const WFormItem = ({ formProps, onOk, onCancel, actionRef }) => {
  const [form] = Form.useForm();
  const {
    columns,
    data,
    layout = 'horizontal',
    formItemLayout,
    formTailLayout,
    formButton,
    formButtonFixed,
  } = formProps;

  // 侧边栏宽度
  const aside =
    document.getElementsByClassName('ant-layout-sider-children')[0] ||
    document.getElementsByClassName('rsg--sidebar-4')[0];
  const [asideWidth, setAsideWidth] = useState();

  const getAside = () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setAsideWidth(
        aside?.offsetWidth >= document.documentElement.clientWidth ? 0 : aside?.offsetWidth,
      );
    }, 250);
  };

  //监听浏览器窗口大小改变
  useEffect(() => {
    if (formButtonFixed) {
      getAside();
      if (document.getElementsByClassName('ant-layout')[0]) {
        document.getElementsByClassName('ant-layout')[0].style.paddingBottom = '54px';
      }
      window.addEventListener('resize', () => getAside());
    }
    return () => {
      window.removeEventListener('resize', () => getAside());
    };
  });

  useImperativeHandle(actionRef, () => ({
    form: () => form,
    setFieldsValue: (obj) => {
      console.log('obj: ', obj);
      form.setFieldsValue(obj);
    },
    getFieldsValue: (name) => {
      return form.getFieldsValue(name);
    },
  }));

  // 表单提交
  const submitForm = (modal, btnProps) => {
    const { fun, isCheck } = btnProps;
    form.validateFields().then((values) => {
      if (!!modal) {
        confirm({
          title: modal.title,
          content: modal.content,
          onOk() {
            !!fun && isCheck ? fun(values) : onOk(values, btnProps); //开启校验表单功能走自定义函数
          },
          onCancel() {
            onCancel();
          },
        });
      } else {
        !!fun && isCheck ? fun(values) : onOk(values, btnProps); //开启校验表单功能走自定义函数
      }
    });
  };

  // 通用组件
  const components = {
    select: (leftProps) =>
      h(
        Select,
        {
          placeholder: '请选择',
          allowClear: true,
          showSearch: true,
          filterOption: (input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
          ...leftProps,
        },
        leftProps?.options?.length > 0 &&
          leftProps.options.map(({ value, label, disabled }) =>
            h(Option, { key: value, value, disabled }, label),
          ),
      ),
    input: (leftProps) => <Input placeholder="请输入" allowClear {...leftProps} />,
    textarea: (leftProps) => <TextArea {...leftProps} />,
    password: (leftProps) => h(Password, { placeholder: '请输入', ...leftProps }),
    inputNumber: (leftProps) => <InputNumber style={{ width: '100%' }} {...leftProps} />,
    checkbox: (leftProps) => <Checkbox.Group {...leftProps} />,
    datePicker: (leftProps) => <DatePicker showTime format={dateTimeFormat} {...leftProps} />,
    rangePicker: (leftProps) => (
      <RangePicker showTime style={{ width: '100%' }} format={dateTimeFormat} {...leftProps} />
    ),
    // commonUpload: leftProps => <CommonUpload {...leftProps} />,
    // sortUpload: leftProps => <SortUpload {...leftProps} />,
    switch: (leftProps) => <Switch {...leftProps} />,
    radio: (leftProps) => <Radio.Group {...leftProps} />,
    cascader: (leftProps) => <Cascader {...leftProps} />,
    rate: (leftProps) => <Rate {...leftProps} />,
    treeSelect: (leftProps) => <TreeSelect allowClear showSearch {...leftProps} />,
    custom: ({ render }) => render, //自定义组件
  };

  // 表单操作按钮
  const handleForm = (e, btnProps) => {
    const { fun, htmlType, modal, isCheck } = btnProps;
    e.preventDefault();
    const values = form.getFieldsValue();
    if (!!fun && !isCheck) return fun(values); //存在自定义方法且未开启表单校验
    if (htmlType === 'submit') {
      // 提交
      submitForm(modal, btnProps);
    } else if (htmlType === 'reset') {
      //重置
      form.resetFields();
    } else if (htmlType === 'cancel') {
      //取消
      onCancel();
    }
  };

  return (
    <div
      className={classNames({
        [styles.form]: true,
        [styles.inline]: layout === 'inline',
      })}
    >
      <Form form={form} layout={layout} {...formItemLayout} initialValues={data} scrollToFirstError>
        {columns.length > 0 &&
          columns.map((n, index) => {
            const {
                title,
                type = 'input',
                label,
                name,
                rules = [],
                style,
                itemSetting,
                addAfter,
              } = n,
              C = components[type];
            const itemLayout = !n.label ? { ...formTailLayout } : { ...formItemLayout };

            return !!title ? (
              <div key={title + index} style={{ width: '100%' }}>
                {index !== 0 && <Divider />}
                <Title>{title}</Title>
              </div>
            ) : (
              <Form.Item
                key={name + index}
                required={rules.length > 0 ? rules.some((item) => !!item.required) : false}
                label={label}
                className={addAfter && styles.flex}
                {...itemLayout}
                {...itemSetting}
              >
                <Form.Item
                  name={name}
                  rules={rules}
                  valuePropName={type === 'switch' ? 'checked' : 'value'}
                  style={style}
                  {...itemSetting}
                  noStyle
                >
                  {C(omit(n, ['addAfter']))}
                </Form.Item>
                {addAfter && <span style={{ marginLeft: 8 }}>{addAfter}</span>}
              </Form.Item>
            );
          })}
        {formButton && formButton.length > 0 && (
          <Form.Item
            {...formTailLayout}
            className={classNames({
              [styles.footer]: true,
              [styles.footerInline]: layout === 'inline',
              [styles.footerFixed]: formButtonFixed,
            })}
            style={
              formButtonFixed
                ? {
                    width: 'calc(100% - ' + asideWidth + 'px)',
                  }
                : {}
            }
          >
            {formButton.map(({ label, type, loading, ...btnProps }, index) => (
              <Button
                type={type}
                onClick={(e) => handleForm(e, { label, type, loading, ...btnProps })}
                key={index}
                loading={loading}
              >
                {label}
              </Button>
            ))}
          </Form.Item>
        )}
      </Form>
    </div>
  );
};

export default WFormItem;
