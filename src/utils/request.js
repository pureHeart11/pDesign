import Axios from 'axios';
import { message } from 'antd';
import { history } from 'umi';
import { tokenDomain, appRoot } from './config';

const instance = Axios.create({
  // baseURL: `${getPrefix()}/api`,
  // timeout: 10000,
  withCredentials: true,
});

// instance.defaults.headers.common.fake_sso_token = 'ttokken';
// eslint-disable-next-line @typescript-eslint/dot-notation
// instance.defaults.headers.common['sso_token'] = '';

instance.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    return config;
  },
  async (error) => {
    // Do something with request error
    console.error('request error', JSON.stringify(error));
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  async (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.error('response error', JSON.stringify(error));

    return Promise.reject(error);
  },
);

// export {
//   instance,
// };

export default async function request(option) {
  const res = await instance.request(option);
  const { code, msg } = res;
  if (code !== 0) {
    // throw new Error(res); // Error 只能接受字符串
    // 报错时reject统一提示, 页面无需再判断code === 0, 同时返回res 便于页面自行处理
    if (code === 401) {
      const { origin, pathname } = window.location;
      const loginUrl = `${origin}${appRoot}/login`;
      const redirectUrl = `${origin}${pathname}`;
      if (redirectUrl === loginUrl) {
        console.error('redirectUrl is same with loginUrl', redirectUrl);
        return Promise.reject(res);
      }
      // encodeURIComponent=true 则返回的redirect参数按照原始encode过的返回， 不传会decode
      const s = `https://login.weipaitang.com/wechatLogin?loginUrl=${encodeURIComponent(
        loginUrl,
      )}&redirect=${encodeURIComponent(
        redirectUrl,
      )}&tokenDomain=${tokenDomain}&encodeURIComponent=true`;
      window.location.replace(s);
    }
    message.destroy();
    message.error(msg || '接口错误');
    if (code === 403) {
      history.replace({
        pathname: '/404',
        state: {
          code: 403,
        },
      });
    }

    return Promise.reject(res);
  }

  return res;
}

export function fetchApi(url, params) {
  return request({
    method: params?.method || 'get',
    url,
    params,
  });
}
