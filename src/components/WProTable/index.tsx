/** WProTable(基于ProTable)保留除request所有的api并新增【url】用来处理列表接口
 更多api请参考https://procomponents.ant.design/components/table */
import React, { useRef, useState, useImperativeHandle, useCallback } from 'react';
import ProTable, { ProTableProps, ProColumns, ActionType } from '@ant-design/pro-table';
import { ParamsType } from '@ant-design/pro-provider';
import { useRequest } from 'ahooks';
import { isEmpty } from 'lodash';
import request from '@/utils/request';

import styles from './index.less';

type TableProps<T, U extends ParamsType = {}> = Omit<ProTableProps<T, U>, 'request'>;
type Column<T> = ProColumns<T>;

function WProTable<
  T,
  U extends {
    [key: string]: any;
  } = {},
>(
  props: {
    url: string;
    columns: Column<T>[];
    // eslint-disable-next-line react/require-default-props
    initParams?: Record<string, any>;
    // eslint-disable-next-line react/require-default-props
    formatters?: {
      response?: (res: any) => { total: number; list: any[] }; // 格式化接口结果
      params?: (res: any) => any; // 格式化接口参数
    };
  } & Omit<TableProps<T, U>, 'columns'>,
) {
  const {
    columns,
    actionRef,
    formatters,
    url,
    search,
    pagination = {},
    initParams = {},
    ...restProps
  } = props;
  const tableRef = useRef<ActionType>();
  // 查询
  const init = useCallback(() => {
    return Object.assign(
      columns.reduce((pre, cur: any) => {
        if (cur.initialValue) {
          pre[cur.dataIndex] = cur.initialValue;
        }
        return pre;
      }, {}),
      initParams,
    );
  }, []);
  const [searchParams, setSearchParams] = useState(init);
  // 表格数据
  const { tableProps, refresh, data, loading } = useRequest(
    ({ current, pageSize, sorter, filters }) => {
      let params: any = {
        page: current,
        pageSize,
        ...searchParams,
      };

      if (!isEmpty(filters)) {
        params = {
          ...params,
          filters,
        };
      }
      if (sorter?.order) {
        params = {
          ...params,
          // sort_field: sorter?.field,
          sort: sorter?.order === 'ascend' ? `${sorter?.field}_asc` : `${sorter?.field}_desc`,
        };
      }
      if (formatters?.params) {
        params = formatters.params(params);
      }
      return request({
        method: 'get',
        url,
        params,
      });
    },
    /* 格式化请求结果	*/
    {
      formatResult: formatters?.response
        ? formatters?.response
        : (res) => {
            return {
              total: res?.data?.total ?? 0,
              list: res?.data?.list,
            };
          },
      refreshDeps: [searchParams],
      paginated: true,
      onError(errr) {
        console.log({ errr });
      },
      throwOnError: true,
    },
  );

  // 转发到父组件
  useImperativeHandle(actionRef, () => ({
    // @ts-ignore
    reload: refresh,
    reset: () => {
      tableRef.current?.reset?.();
      setSearchParams({});
    },
    // reloadAndRest: tableRef.current?.reloadAndRest?.(),
    clearSelected: tableRef.current?.clearSelected,
    tableData: data,
  }));

  return (
    <div className={styles.proTable}>
      <ProTable<T, U>
        actionRef={tableRef}
        columns={columns}
        bordered
        loading={loading}
        dataSource={tableProps.dataSource}
        options={false}
        rowKey="id"
        dateFormatter="string"
        search={{
          labelWidth: 'auto',
          // span: 6,
          optionRender: (searchConfig, formProps, dom) => [...dom.reverse()],
        }}
        pagination={
          pagination === false
            ? false
            : {
                ...tableProps.pagination,
                showQuickJumper: true,
                pageSize: 10,
                size: 'default',
                ...(pagination ?? {}),
              }
        }
        onReset={() => {
          tableRef.current?.reset?.();
          setSearchParams(init);
        }}
        onSubmit={(params) => {
          setSearchParams({ ...params, ...initParams });
        }}
        onChange={(params, sorter, filters) => {
          tableProps.onChange(params, sorter, filters);
        }}
        {...restProps}
        request={undefined} // 取消request，自行处理接口
      />
    </div>
  );
}

export default WProTable;
