let Mock = require('mockjs');

const template = Mock.mock({
  code: 0,
  msg: 'success',
  data: {
    'list|20': [
      {
        'id|+1': 1,
        pipelineName: '@ctitle(10)',
        'pipelineState|1-3': 1,
        businessName: 'yun',
        ip: '@ip',
        sceneName: '@ctitle(5)',
        createUser: '@first',
        createTime: 1597887422,
      },
    ],
    total: 20,
  },
});

module.exports = {
  'GET /api/api/v1/pipeline-list': function (req, res) {
    res.status(200).json(template);
  },
  'GET /api/api/v1/pipeline-get': function (req, res) {
    res.status(200).json({
      code: 0,
      msg: 'success',
      data: {
        pipelineName: 'cat',
        bsId: 32,
        businessName: 'yuncang',
        sceneName: '计算',
      },
    });
  },
  'POST /api/api/v1/pipeline-add': function (req, res) {
    res.status(200).json({ code: 0, msg: '添加成功' });
  },
  'POST /api/api/v1/pipeline-update': function (req, res) {
    res.status(200).json({ code: 0, msg: '修改成功' });
  },
  'POST /api/api/v1/pipeline-del': function (req, res) {
    res.status(200).json({ code: 0, msg: '删除成功' });
  },
  'POST /api/api/v1/pipeline-change-state': function (req, res) {
    res.status(200).json({ code: 0, msg: '操作成功' });
  },
  'GET /api/api/v1/log/list': function (req, res) {
    res.status(200).json(log);
  },
};
