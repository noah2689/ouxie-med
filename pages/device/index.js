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
    const allDevices = mockData.deviceList || [];
    const recDevices = mockData.recommendedDevices || [];

    // 已连接设备
    const connected = allDevices.filter(function (d) {
      return d.connectedStatus === 'connected';
    });

    this.setData({
      connectedDevices: connected,
      recommendedDevices: recDevices,
      connectedCount: connected.length,
      pendingCount: recDevices.length
    });

    console.log('[设备管理] 页面加载');
  },

  // 查看同步记录
  onViewSyncRecords: function () {
    wx.showToast({
      title: '后续接入',
      icon: 'none'
    });
  },

  // 重新同步
  onResyncDevice: function () {
    wx.showToast({
      title: '已刷新同步状态',
      icon: 'success'
    });
  },

  // 添加设备
  onAddDevice: function () {
    wx.showToast({
      title: '后续接入',
      icon: 'none'
    });
  }
});
