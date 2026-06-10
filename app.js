// app.js
App({
  globalData: {
    // 当前查看的成员
    currentMember: {
      id: 'self',
      name: '本人',
      relation: '本人'
    },
    // 家庭成员列表
    members: [],
    // 指标数据缓存
    metricData: {
      bloodPressure: {},
      bloodGlucose: {},
      uricAcid: {}
    },
    // 设备列表
    deviceList: [],
    // AI 会话列表
    aiSessions: []
  },

  onLaunch: function () {
    // 小程序启动时的初始化
    console.log('[瓯械健康] 小程序启动');
  }
});
