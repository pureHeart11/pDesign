### 基础表单

```js
import { Tooltip, Icon, TimePicker, message, Button } from 'antd';
import moment from 'moment';
import LongText from '../LongText';
import React, { useState, useRef } from 'react';

function App(props) {
  const [confirmLoading, setConfirmLoading] = useState(false);

  // 表单配置
  const columns = [
    {
      title: '模块标题'
    },
    {
      name: 'userName',
      label: '用户名',
      placeholder: '请输入用户名',
      rules: [{ required: true, message: '请输入用户名' }],
      onChange: e => console.log(e.target.value)
    },
    {
      name: 'number',
      label: '数字输入',
      type: 'inputNumber',
      addAfter: '秒',
      min: 0,
      max: 100
    },
    {
      name: 'email',
      label: '邮箱',
      rules: [
        {
          required: true,
          message: '请输入邮箱'
        },
        {
          type: 'email',
          message: 'The input is not valid E-mail!'
        }
      ]
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
        { value: '8', label: '合买' }
      ],
      onChange: () => {
        actionRef.current.setFieldsValue({ multiple: void 0 });
      }
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
        { value: '8', label: '合买' }
      ]
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
                  label: 'West Lake'
                }
              ]
            }
          ]
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
                  label: 'Zhong Hua Men'
                }
              ]
            }
          ]
        }
      ]
      // formatter: value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    },
    {
      title: '模块标题'
    },
    {
      name: 'checkbox',
      label: '多选框',
      type: 'checkbox',
      options: [
        {
          label: 'Apple',
          value: 'apple'
        },
        {
          label: 'Pear',
          value: 'pear',
          disabled: true
        },
        {
          label: 'Orange',
          value: 'orange'
        }
      ],
      rules: [{ required: true, message: '请选择' }]
    },
    {
      name: 'radio',
      label: '单选框',
      type: 'radio',
      options: [
        {
          label: 'Apple',
          value: 'apple',
          disabled: true
        },
        {
          label: 'Pear',
          value: 'pear'
        },
        {
          label: 'Orange',
          value: 'orange'
        }
      ],
      rules: [{ required: true, message: '请选择' }]
    },
    {
      name: 'isOpen',
      label: '开关',
      type: 'switch'
    },
    {
      name: 'password',
      label: '密码',
      tooltip: '这是密码?',
      type: 'password',
      rules: [{ required: true, message: '请输入密码' }]
    },
    {
      name: 'rate',
      label: '星级',
      type: 'rate'
    },
    {
      name: 'textarea',
      label: '文本域',
      type: 'textarea',
      maxLength: 10,
      showCount: true,
      rows: 5, //默认为3
      rules: [{ required: true, message: '请输入文本域' }]
    },

    {
      name: 'date',
      label: '日期',
      type: 'datePicker',
      // format: 'YYYY-MM-DD',
      // showTime: true,
      rules: [{ required: true, message: '请选择日期' }]
    },
    {
      name: 'dateRange',
      label: '日期范围',
      type: 'rangePicker',
      rules: [{ required: true, message: '请选择日期' }]
    },
    {
      name: 'custom',
      label: '自定义组件',
      type: 'custom',
      render: <TimePicker />
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
              key: '0-0-1'
            },
            {
              title: 'Child Node2',
              value: '0-0-2',
              key: '0-0-2'
            }
          ]
        },
        {
          title: 'Node2',
          value: '0-1',
          key: '0-1'
        }
      ]
    },
    {
      name: 'fileList',
      label: '上传',
      type: 'commonUpload',
      multiple: true,
      rules: [{ required: true, message: '请上传文件' }]
    },
    {
      name: 'sortFileList',
      label: '上传拖拽',
      type: 'sortUpload',
      itemSetting: { colon: false },
      multiple: true
      // rules: [{ required: true, message: '请上传文件' }]
    },
    {
      name: 'agree',
      label: '',
      type: 'checkbox',
      options: [
        {
          value: 1,
          label: '是否需要邮件接收下载通知'
        }
      ]
    }
  ];

  const getFormData = v => {
    console.log('收取表单的值: ', v);
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      message.success('提交成功！');
    }, 3000);
  };
  const actionRef = useRef();
  return (
    <>
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
      <WForm
        actionRef={actionRef}
        onCancel={() => {
          console.log('取消取消');
        }}
        onOk={v => {
          getFormData(v);
        }}
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
            treeSelect: '0-0-2'
          }
        }}
      />
    </>
  );
}
<App></App>;
```

### 高级表单

```js
import { message, Button, Checkbox, Form, Input, Tooltip, Icon, TimePicker, Radio } from 'antd';
import moment from 'moment';
// import WModal from '../WModal';
import LongText from '../LongText';
import React, { useState } from 'react';

function App(props) {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [buttonFixed, setButtonFixed] = useState(false);

  // 表单配置
  const columns = [
    {
      title: '模块标题1'
    },
    {
      name: 'userName',
      label: '用户名',
      placeholder: '请输入',
      rules: [{ required: true, message: '请输入用户名' }]
    },
    {
      name: 'number',
      label: '数字输入',
      type: 'inputNumber',
      min: 0,
      max: 100
    },
    {
      name: 'email',
      label: '邮箱'
      // rules: [
      //   {
      //     required: true,
      //     message: '请输入邮箱'
      //   },
      //   {
      //     type: 'email',
      //     message: 'The input is not valid E-mail!'
      //   }
      // ]
    },

    {
      name: 'gender',
      label: '下拉',
      type: 'select',
      showSearch: true,
      options: [
        { value: '1', label: '名家' },
        { value: '2', label: '众筹' },
        { value: '3', label: '直播' },
        { value: '4', label: '捡漏' },
        { value: '5', label: '品牌馆' },
        { value: '6', label: '拍卖行' },
        { value: '7', label: '玩家社区' },
        { value: '8', label: '合买' }
      ],
      onChange: () => {}
    },
    {
      name: 'multiple',
      label: '下拉多选',
      type: 'select',
      mode: 'multiple',
      options: [
        { value: '1', label: '名家' },
        { value: '2', label: '众筹' },
        { value: '3', label: '直播' },
        { value: '4', label: '捡漏' },
        { value: '5', label: '品牌馆' },
        { value: '6', label: '拍卖行' },
        { value: '7', label: '玩家社区' },
        { value: '8', label: '合买' }
      ]
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
                  label: 'West Lake'
                }
              ]
            }
          ]
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
                  label: 'Zhong Hua Men'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      title: '模块标题2'
    },
    {
      name: 'userName1',
      label: '用户名',
      placeholder: '请输入'
    },
    {
      name: 'number1',
      label: '数字输入',
      type: 'inputNumber',
      min: 0,
      max: 100
    },
    {
      name: 'email1',
      label: '邮箱'
      // rules: [
      //   {
      //     required: true,
      //     message: '请输入邮箱'
      //   },
      //   {
      //     type: 'email',
      //     message: 'The input is not valid E-mail!'
      //   }
      // ]
    },

    {
      name: 'gender1',
      label: '下拉',
      type: 'select',
      showSearch: true,
      options: [
        { value: '1', label: '名家' },
        { value: '2', label: '众筹' },
        { value: '3', label: '直播' },
        { value: '4', label: '捡漏' },
        { value: '5', label: '品牌馆' },
        { value: '6', label: '拍卖行' },
        { value: '7', label: '玩家社区' },
        { value: '8', label: '合买' }
      ]
    },
    {
      name: 'multiple1',
      label: '下拉多选',
      type: 'select',
      mode: 'multiple',
      options: [
        { value: '1', label: '名家' },
        { value: '2', label: '众筹' },
        { value: '3', label: '直播' },
        { value: '4', label: '捡漏' },
        { value: '5', label: '品牌馆' },
        { value: '6', label: '拍卖行' },
        { value: '7', label: '玩家社区' },
        { value: '8', label: '合买' }
      ]
    },
    {
      name: 'cascader1',
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
                  label: 'West Lake'
                }
              ]
            }
          ]
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
                  label: 'Zhong Hua Men'
                }
              ]
            }
          ]
        }
      ]
    }
  ];
  return (
    <>
      <Radio.Group
        value={+buttonFixed + ''}
        onChange={e => {
          setButtonFixed(+e.target.value);
        }}
      >
        <Radio.Button value="0">基础</Radio.Button>
        <Radio.Button value="1">悬浮按钮</Radio.Button>
      </Radio.Group>
      <WForm
        onCancel={() => {
          console.log('取消取消');
        }}
        onOk={(v, btnObj) => {
          console.log('获取自定义提交按钮的配置对象: ', btnObj);
          console.log('收到表单的值:', v);
          setSubmitLoading(true);
          setTimeout(() => {
            setSubmitLoading(false);
            message.success('提交成功');
          }, 3000);
        }}
        formProps={{
          layout: 'inline',
          formButtonFixed: buttonFixed,
          formButton: [
            {
              label: '自定义提交',
              type: 'primary',
              htmlType: 'submit',
              loading: submitLoading,
              modal: {
                title: '是否确认提交信息？'
                // content: '是否确认提交信息？'
              }
            },
            {
              label: '保存草稿',
              type: 'primary',
              htmlType: 'submit',
              isCheck: true, // 开启自定义校验走自定义函数fun
              fun: v => {
                console.log('不走onOk回调获取表单值：', v);
              }
            },
            {
              label: '重置',
              htmlType: 'reset'
            },
            {
              label: '返回上一页',
              fun: values => console.log('返回上一页', values)
            }
          ],
          columns,
          data: {
            userName: ''
          }
        }}
      />
    </>
  );
}
<App />;
```

### formProps 参数具体说明

```json
{
  "formButtonFixed": true, //操作按钮是否悬浮
  "formButton": [
    //默认展示【提交】&【取消】按钮，可通过此属性进行自定义,具体见案例
    {
      "label": "提交", //按钮名称
      "type": "primary", //按钮类型
      "htmlType": "submit", //submit:提交、reset:重置，可为空
      "loading": false, // 提交按钮loading，防止重复提交，异步时使用
      "modal": {
        // 二次确认弹窗
        "title": "是否确认提交信息？", // 标题
        "content": "这里展示详细信息" // 内容
      },
      "isCheck":false, //默认false,开启状态下走自定义fun函数，获取表单值，详情见高级表单【保存草稿】案例
      "fun": (values) => console.log("返回上一页") //自定义方法，values获取表单值
    }
  ],
  // "fields":{}, //改动表单的值，同form.setFieldsValue
  "columns": [
    {
      "name": "userId", // 提交的字段值【name值唯一】
      "label": "用户 ID", // 标签文本
      "type": "textarea", // 表单类型：input(输入框)、textarea(文本域)、password(密码框)、inputNumber(数字输入框)、checkbox(复选框)、datePicker(日期选择框)、rangePicker(日期范围选择框)、commonUpload(上传)、sortUpload(上传拖拽排序)、switch(开关)、radio(单选框)、cascader(级联)、rate(评分)、treeSelect(树选择)、custom(若以上组件不支持现有需求，可采用自定义组件)
      "rules": [{ "required": true, "message": "" }], // 表单校验
      "addAfter": "", // 如果antd默认的addonAfter（带标签的 input，设置后置标签）不满足需求，不妨试试addAfter
      "itemSetting": {}, // FormItem额外属性，支持 ant-design 中Form.Item所有属性
      // ...left, // 额外的属性，支持 ant-design 中对应组件(Input, Textarea等)的所有属性
    }
  ],
  "data": {
    // 表单默认值,同initialValue
  }
}
```
