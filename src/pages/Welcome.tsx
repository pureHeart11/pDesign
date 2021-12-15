import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, TimePicker, message, Button } from 'antd';
import moment from 'moment';
import WFrom from '@/components/WForm';

const Welcome: React.FC = () => {
  const actionRef = useRef();
  const [confirmLoading, setConfirmLoading] = useState(false);

  // 表单配置
  const columns = [
    {
      title: '模块标题',
    },
    {
      name: 'userName',
      label: '用户名',
      placeholder: '请输入用户名',
      rules: [{ required: true, message: '请输入用户名' }],
      onChange: (e) => console.log(e.target.value),
    },
    {
      name: 'number',
      label: '数字输入',
      type: 'inputNumber',
      addAfter: '秒',
      min: 0,
      max: 100,
    },
    {
      name: 'email',
      label: '邮箱',
      rules: [
        {
          required: true,
          message: '请输入邮箱',
        },
        {
          type: 'email',
          message: 'The input is not valid E-mail!',
        },
      ],
    },

    {
      name: 'gender',
      label: '下拉',
      type: 'select',
      showSearch: true,
      rules: [{ required: true, message: '请选择类别' }],
      options: [
        { value: '1', label: '名家' },
        { value: '2', label: '众筹' },
        { value: '3', label: '直播' },
        { value: '4', label: '捡漏' },
        { value: '5', label: '品牌馆' },
        { value: '6', label: '拍卖行' },
        { value: '7', label: '玩家社区' },
        { value: '8', label: '合买' },
      ],
      onChange: () => {
        actionRef.current.setFieldsValue({ multiple: void 0 });
      },
    },
    {
      name: 'multiple',
      label: '下拉多选',
      type: 'select',
      mode: 'multiple',
      rules: [{ required: true, message: '请选择' }],
      options: [
        { value: '1', label: '名家' },
        { value: '2', label: '众筹' },
        { value: '3', label: '直播' },
        { value: '4', label: '捡漏' },
        { value: '5', label: '品牌馆' },
        { value: '6', label: '拍卖行' },
        { value: '7', label: '玩家社区' },
        { value: '8', label: '合买' },
      ],
    },
    {
      name: 'cascader',
      label: '级联',
      type: 'cascader',
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        },
      ],
      // formatter: value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    },
    {
      title: '模块标题',
    },
    {
      name: 'checkbox',
      label: '多选框',
      type: 'checkbox',
      options: [
        {
          label: 'Apple',
          value: 'apple',
        },
        {
          label: 'Pear',
          value: 'pear',
          disabled: true,
        },
        {
          label: 'Orange',
          value: 'orange',
        },
      ],
      rules: [{ required: true, message: '请选择' }],
    },
    {
      name: 'radio',
      label: '单选框',
      type: 'radio',
      options: [
        {
          label: 'Apple',
          value: 'apple',
          disabled: true,
        },
        {
          label: 'Pear',
          value: 'pear',
        },
        {
          label: 'Orange',
          value: 'orange',
        },
      ],
      rules: [{ required: true, message: '请选择' }],
    },
    {
      name: 'isOpen',
      label: '开关',
      type: 'switch',
    },
    {
      name: 'password',
      label: '密码',
      tooltip: '这是密码?',
      type: 'password',
      rules: [{ required: true, message: '请输入密码' }],
    },
    {
      name: 'rate',
      label: '星级',
      type: 'rate',
    },
    {
      name: 'textarea',
      label: '文本域',
      type: 'textarea',
      maxLength: 10,
      showCount: true,
      rows: 5, //默认为3
      rules: [{ required: true, message: '请输入文本域' }],
    },

    {
      name: 'date',
      label: '日期',
      type: 'datePicker',
      // format: 'YYYY-MM-DD',
      // showTime: true,
      rules: [{ required: true, message: '请选择日期' }],
    },
    {
      name: 'dateRange',
      label: '日期范围',
      type: 'rangePicker',
      rules: [{ required: true, message: '请选择日期' }],
    },
    {
      name: 'custom',
      label: '自定义组件',
      type: 'custom',
      render: <TimePicker />,
    },
    {
      name: 'treeSelect',
      label: '树选择',
      type: 'treeSelect',
      treeData: [
        {
          title: 'Node1',
          value: '0-0',
          key: '0-0',
          children: [
            {
              title: 'Child Node1',
              value: '0-0-1',
              key: '0-0-1',
            },
            {
              title: 'Child Node2',
              value: '0-0-2',
              key: '0-0-2',
            },
          ],
        },
        {
          title: 'Node2',
          value: '0-1',
          key: '0-1',
        },
      ],
    },
    // {
    //   name: 'fileList',
    //   label: '上传',
    //   type: 'commonUpload',
    //   multiple: true,
    //   rules: [{ required: true, message: '请上传文件' }]
    // },
    // {
    //   name: 'sortFileList',
    //   label: '上传拖拽',
    //   type: 'sortUpload',
    //   itemSetting: { colon: false },
    //   multiple: true
    //   // rules: [{ required: true, message: '请上传文件' }]
    // },
    {
      name: 'agree',
      label: '',
      type: 'checkbox',
      options: [
        {
          value: 1,
          label: '是否需要邮件接收下载通知',
        },
      ],
    },
  ];
  const submit = (v: any) => {
    console.log('收取表单的值: ', v);
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      message.success('提交成功！');
    }, 3000);
  };

  return (
    <PageContainer>
      <Card>
        <Button
          style={{ marginRight: 16 }}
          onClick={() => {
            console.log(actionRef.current.getFieldsValue());
          }}
        >
          获取表单值
        </Button>
        <Button
          onClick={() => {
            actionRef.current.setFieldsValue({ userName: 'lyq-yyds' });
          }}
        >
          设置表单值
        </Button>
        <WFrom
          actionRef={actionRef}
          onCancel={() => {
            console.log('取消取消');
          }}
          onOk={submit}
          confirmLoading={confirmLoading}
          formProps={{
            columns,
            data: {
              userName: 'lyq',
              number: 99,
              password: '123456',
              checkbox: ['apple', 'orange'],
              radio: 'pear',
              gender: '1',
              multiple: ['3', '4'],
              fileList:
                'https://cdn01t.weipaitang.com/sky/common/houtaitp/image/20210519/88dd62328b6b422db9e7226c068a1b1b-W1366H768,https://cdn01t.weipaitang.com/sky/common/houtaitp/image/20210519/7d1993706a69480691748acf195c1756-W2636H4334',
              isOpen: true,
              rate: 3,
              custom: moment('10:10:12', 'HH:mm:ss'),
              treeSelect: '0-0-2',
            },
          }}
        />
      </Card>
    </PageContainer>
  );
};

export default Welcome;
