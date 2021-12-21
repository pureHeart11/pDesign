import request from "@/utils/request";
import { apiPrefix } from "@/utils/config";

// 查看列表
export async function getTableList(params) {
  return request({
    method: "get",
    url: `${apiPrefix}/api/v1/pipeline-list`,
    params,
  });
}
// 查看详情
export async function pipelineDetail(params) {
  return request({
    method: "get",
    url: `${apiPrefix}/api/v1/pipeline-get`,
    params,
  });
}
// 创建
export async function pipelineAdd(data) {
  return request({
    method: "post",
    url: `${apiPrefix}/api/v1/pipeline-add`,
    data,
  });
}
// 修改
export async function pipelineUpdate(data) {
  return request({
    method: "post",
    url: `${apiPrefix}/api/v1/pipeline-update`,
    data,
  });
}
// 删除
export async function pipelineDelete(data) {
  return request({
    method: "post",
    url: `${apiPrefix}/api/v1/pipeline-del`,
    data,
  });
}
// 修改状态 暂停/启用
export async function pipelineChangeState(data) {
  return request({
    method: "post",
    url: `${apiPrefix}/api/v1/pipeline-change-state`,
    data,
  });
}
// 业务场景名下拉列表
export async function businessNameList(params) {
  return request({
    method: "get",
    url: `${apiPrefix}/api/v1/business-name-list`,
    params,
  });
}
// 计算单元列表
export async function computingUnit(params) {
  return request({
    method: "get",
    url: `${apiPrefix}/api/v1/computing-unit`,
    params,
  });
}
