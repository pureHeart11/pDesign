// import { svgIconData } from "@/constants/icon";

// 菜单图标 iconfont classname， 根据项目需求修改
// const menuIcon = {
//   "/": svgIconData.statistics,
//   "/storage": svgIconData.user,
//   "/business": svgIconData.virtual,
//   "/template": svgIconData.msg,
//   "/log": svgIconData.log,
//   "/test": svgIconData.log,
// };

function getEnv() {
  let env = 'development';
  const { host } = window.location;
  if (host === 'middle-admint.weipaitang.com') {
    env = 'test';
  } else if (host === 'middle-admingray.weipaitang.com') {
    env = 'gray';
  } else if (host === 'middle-admin.weipaitang.com') {
    env = 'production';
  }
  return env;
}
const env = getEnv();
// 根据项目的反向代理配置修改
const apiPrefixConf = {
  development: '/api',
  test: '/resource/skt-admint/api',
  gray: '/resource/skt-admingray/api',
  production: '/resource/skt-admin/api',
};
const apiPrefix = apiPrefixConf[env];
const ssoTokenKey = 'sso_token';
const tokenDomain = 'middle-admin.weipaitang.com'; // sso tokenDomain 通常为项目域名，需要与sso配置一致
const appRoot = '/resource'; // 运维配置的项目访问路径

export { ssoTokenKey, tokenDomain, appRoot, apiPrefix };
