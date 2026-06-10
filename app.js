// app.js
App({
  globalData: {
    // 当前查看的成员
    currentMember: {
      id: 'self',
      name: '本人',
      relation: '本人'
    },
    // 家庭成员列表（启动时从 mock 加载）
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
    aiSessions: [],
    // 设备同步记录（运行时可追加）
    syncedRecords: []
  },

  onLaunch: function () {
    // 从 mock 数据初始化成员列表
    const mockData = require('./mock/health');
    this.globalData.members = mockData.members;
    console.log('[瓯械健康] 小程序启动，加载成员:', this.globalData.members.length, '人');
  }
});
