import React, { useRef, FC } from 'react';
import { Button, message, Space, Popconfirm } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { useReactive, useRequest } from 'ahooks';
import { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import moment from 'moment';
import WProTable from '@/components/WProTable';
import { apiPrefix } from '@/utils/config';
import { pipelineDelete, pipelineAdd } from './service';

const apiUrl = `${apiPrefix}/api/v1/pipeline-list`;

type TableItem = {
  businessName: string;
  createTime: number;
  createUser: string;
  id: number;
  pipelineName: string;
  pipelineState: number;
  sceneName?: string;
};

interface IProps {
  location: {
    query: Record<string, any>;
  };
}
const Index: FC<IProps> = ({ location }) => {
  const actionRef = useRef<ActionType>();

  const { data, run, params, loading } = useRequest(pipelineDelete, {
    manual: true,
    onSuccess: (result: { code: number; msg: string; data?: any }) => {
      if (result?.code === 0) {
        message.success('删除成功！');
        actionRef.current?.reload();
      }
    },
  });

  const columns: ProColumns<TableItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      // search: false,
      width: 60,
      hideInSearch: true,
    },
    {
      title: '管道名称',
      dataIndex: 'pipelineName',
      copyable: true,
      ellipsis: true,
      // initialValue: "测试管道名称",
    },
    {
      title: '业务场景',
      dataIndex: 'sceneName',
      render: (text, record) => `${record.businessName || ''}_${text || ''}`,
    },
    {
      title: '创建人',
      dataIndex: 'createUser',
      search: false,
    },
    {
      title: 'ip',
      dataIndex: 'ip',
      width: 160,
      search: false,
    },
    {
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
      // hideInSearch: true,
      render: (text, { createTime }) => {
        return moment.unix(createTime).format('YYYY-MM-DD HH:mm');
      },
    },
    {
      title: '管道状态',
      dataIndex: 'pipelineState',
      valueEnum: {
        0: { text: '全部', color: '#eee' },
        1: { text: '待启用', color: '#FB8C00' },
        2: { text: '运行中', color: '#38BEA6' },
        3: { text: '已暂停', color: '#999999' },
      },
    },
    {
      title: '操作',
      fixed: 'right',
      valueType: 'option',
      width: 120,
      render: (text, record, _, action) => [
        <a target="_blank" rel="noopener noreferrer" key="view">
          查看
        </a>,
        <Popconfirm title="是否确认删除？" onConfirm={() => run({ id: record.id })}>
          <a key="del" style={{ color: '#FF4D4F' }}>
            删除
          </a>
        </Popconfirm>,
      ],
    },
  ];
  return (
    <>
      <WProTable
        actionRef={actionRef}
        columns={columns}
        // initParams={{ id: location.query.id }}
        url={apiUrl}
        rowSelection={{}}
        tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
          <Space size={24}>
            <span>
              已选 {selectedRowKeys.length} 项
              <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
            </span>
          </Space>
        )}
        tableAlertOptionRender={({ selectedRowKeys, selectedRows }) => {
          return (
            <Space size={16}>
              {/* <a onClick={() => run({ id: selectedRowKeys.join(',') })}>批量删除</a> */}
              <a>导出数据</a>
            </Space>
          );
        }}
        // toolBarRender={() => [
        //   <ModalForm
        //     labelCol={{ span: 5 }}
        //     wrapperCol={{ span: 19 }}
        //     title="新建"
        //     width="40%"
        //     layout="horizontal"
        //     trigger={<Button type="primary">新建</Button>}
        //     modalProps={{
        //       destroyOnClose: true,
        //       bodyStyle: {
        //         padding: document.body.clientWidth === 1920 ? '32px 108px 24px' : '32px 24px 24px',
        //       },
        //     }}
        //     onFinish={async (values) => {
        //       await pipelineAdd(values);
        //       message.success('提交成功');
        //       return true;
        //     }}
        //   >
        //     <ProFormText
        //       name="name"
        //       label="管道名称"
        //       placeholder="请输入"
        //       rules={[{ required: true, message: '请输入管道名称' }]}
        //     />

        //     <ProFormText name="company" label="业务场景" placeholder="请输入" />
        //     <ProFormSelect
        //       options={[
        //         {
        //           value: 'chapter',
        //           label: '盖章后生效',
        //         },
        //         {
        //           value: 'test',
        //           label: '测试后生效',
        //         },
        //       ]}
        //       name="useMode"
        //       label="合同生效方式"
        //     />
        //   </ModalForm>,
        // ]}
      />
    </>
  );
};
export default Index;
