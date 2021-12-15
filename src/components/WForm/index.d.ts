import * as React from 'react';
import { ReactNode, CSSProperties } from 'react';
import { FormItemProps } from 'antd/lib/form';

interface IFormButtonSetting {
  label?: string;
  type?: string;
  htmlType?: string;
  loading?: boolean;
  modal?: {
    title?: string;
    content?: string;
  };
  isCheck?: boolean;
  fun?: Function;
}
interface IFormSetting {
  layout?: 'inline' | 'horizontal' | 'vertical';
  formItemLayout?: object;
  formTailLayout?: object;
  formButtonFixed?: boolean;
  formButton?: IFormButtonSetting[];
  columns?: {
    type: string;
    label: ReactNode;
    name: string;
    rules?: any[];
    addAfter?: string | ReactNode;
    style?: CSSProperties;
    itemSetting?: FormItemProps;
  }[];
  data?: object;
}
type IProps = {
  actionRef?: React.MutableRefObject<
    | {
        form: WrappedFormUtils;
        getFieldsValue: WrappedFormUtils[getFieldsValue];
        setFieldsValue: WrappedFormUtils[setFieldsValue];
      }
    | undefined
  >;
  formProps?: IFormSetting;
  onOk?: Function;
  onCancel?: Function;
  confirmLoading?: boolean;
};

declare class WForm extends React.Component<IProps, any> {}
export default WForm;
