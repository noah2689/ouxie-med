// 设备管理页
const mockData = require('../../mock/health');

Page({
  data: {
    connectedDevices: [],
    recommendedDevices: [],
    connectedCount: 0,
    pendingCount: 0
  },

  onLoad: function () {
    this.loadDevices();
    console.log('[设备管理] 页面加载');
  },

  onShow: function () {
    // 每次显示时重新加载（同步后更新最近同步时间）
    this.loadDevices();
  },

  loadDevices: function () {
    const app = getApp();
    const allDevices = mockData.deviceList || [];
    const recDevices = mockData.recommendedDevices || [];

    const connected = allDevices.filter(function (d) {
      return d.connectedStatus === 'connected';
    });

    // 从全局同步记录中读取最近同步时间
    var syncedRecords = app.globalData.syncedRecords || [];
    var now = new Date();
    var todayStr = '今日 ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');

    var updatedDevices = connected.map(function (d) {
      // 查找该设备类型的最近同步记录
      var lastSync = null;
      for (var i = syncedRecords.length - 1; i >= 0; i--) {
        if (syncedRecords[i].type === d.type) {
          lastSync = syncedRecords[i];
          break;
        }
      }
      if (lastSync) {
        return Object.assign({}, d, { lastSyncText: todayStr });
      }
      return d;
    });

    this.setData({
      connectedDevices: updatedDevices,
      recommendedDevices: recDevices,
      connectedCount: updatedDevices.length,
      pendingCount: recDevices.length
    });
  },

  // 查看同步记录
  onViewSyncRecords: function () {
    wx.showToast({
      title: '后续接入',
      icon: 'none'
    });
  },

  // 重新同步（生成 mock 记录）
  onResyncDevice: function () {
    var self = this;
    wx.showLoading({ title: '正在同步' });

    setTimeout(function () {
      var app = getApp();
      var currentMember = app.globalData.currentMember || { id: 'self', name: '本人' };

      // 生成一条血压同步记录（字段对齐 detailRecords 格式）
      var now = new Date();
      var syncedRecord = {
        id: 'sync_' + now.getTime(),
        type: 'bloodPressure',
        typeName: '血压',
        displayValue: '126/80',
        unit: 'mmHg',
        scene: '设备同步',
        measuredAt: now.toISOString(),
        statusText: '正常范围',
        statusLevel: 'normal',
        source: 'device',
        sourceText: '设备同步',
        memberId: currentMember.id
      };

      // 写入全局
      app.globalData.syncedRecords.push(syncedRecord);

      // 更新设备最近同步时间
      var todayStr = '今日 ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
      var devices = self.data.connectedDevices.map(function (d) {
        if (d.type === 'bloodPressure') {
          return Object.assign({}, d, { lastSyncText: todayStr });
        }
        return d;
      });
      self.setData({ connectedDevices: devices });

      wx.hideLoading();
      wx.showToast({
        title: '已同步新记录',
        icon: 'success',
        duration: 2000
      });

      console.log('[设备] 同步记录已生成:', syncedRecord.id);
    }, 300);
  },

  // 添加设备
  onAddDevice: function () {
    wx.showToast({
      title: '后续接入',
      icon: 'none'
    });
  }
});
