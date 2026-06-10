// 设备管理页
const mockData = require('../../mock/health');

Page({
  data: {
    connectedDevices: [],
    recommendedDevices: [],
    connectedCount: 0,
    pendingCount: 0,

    // 连接弹窗
    showConnectSheet: false,
    connectStep: 'searching', // searching | found
    foundDevices: [],
    connectingDeviceId: ''
  },

  onLoad: function () {
    this.loadDevices();
    console.log('[设备管理] 页面加载');
  },

  onShow: function () {
    this.loadDevices();
  },

  loadDevices: function () {
    var app = getApp();
    var allDevices = mockData.deviceList || [];
    var recDevices = (mockData.recommendedDevices || []).slice();

    // 合并运行时连接的设备
    var appDevices = app.globalData.deviceList || [];
    appDevices.forEach(function (ad) {
      if (ad.connectedStatus === 'connected') {
        var exists = allDevices.some(function (d) { return d.id === ad.id; });
        if (!exists) {
          allDevices.push(ad);
        }
      }
    });

    // 已连接
    var connected = allDevices.filter(function (d) {
      return d.connectedStatus === 'connected';
    });

    // 从推荐中移除已连接的
    var connectedNames = connected.map(function (d) { return d.name; });
    recDevices = recDevices.filter(function (r) {
      return connectedNames.indexOf(r.name) === -1;
    });

    // 更新最近同步时间
    var now = new Date();
    var todayStr = '今日 ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    var syncedRecords = app.globalData.syncedRecords || [];

    connected = connected.map(function (d) {
      for (var i = syncedRecords.length - 1; i >= 0; i--) {
        if (syncedRecords[i].type === d.type) {
          return Object.assign({}, d, { lastSyncText: todayStr });
        }
      }
      return d;
    });

    this.setData({
      connectedDevices: connected,
      recommendedDevices: recDevices,
      connectedCount: connected.length,
      pendingCount: recDevices.length
    });
  },

  // 查看同步记录
  onViewSyncRecords: function () {
    wx.showToast({ title: '后续接入', icon: 'none' });
  },

  // 重新同步
  onResyncDevice: function () {
    var self = this;
    wx.showLoading({ title: '正在同步' });
    setTimeout(function () {
      var app = getApp();
      var currentMember = app.globalData.currentMember || { id: 'self', name: '本人' };
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
      app.globalData.syncedRecords.push(syncedRecord);
      wx.hideLoading();
      wx.showToast({ title: '已同步新记录', icon: 'success', duration: 2000 });
      self.loadDevices();
    }, 300);
  },

  // ═══ 连接设备 ═══

  // 点击「连接」按钮 → 打开弹窗并开始搜索
  onConnectDevice: function (e) {
    var deviceName = e.currentTarget.dataset.name;
    this.setData({
      showConnectSheet: true,
      connectStep: 'searching',
      connectingDeviceId: deviceName,
      foundDevices: []
    });

    // 1.5 秒后"发现"设备
    var self = this;
    setTimeout(function () {
      self.setData({
        connectStep: 'found',
        foundDevices: [
          { id: 'found-' + Date.now(), name: deviceName, signal: '强' }
        ]
      });
    }, 1500);
  },

  // 点击设备列表中的设备 → 连接成功
  onSelectDevice: function (e) {
    var name = e.currentTarget.dataset.name;
    var app = getApp();

    // 构造新设备
    var newDevice = {
      id: 'connected_' + Date.now(),
      name: name,
      type: 'bloodPressure',
      typeLabel: '血压设备',
      connectedStatus: 'connected',
      statusText: '已连接',
      statusLevel: 'ok',
      lastSyncText: '刚刚',
      description: name + '正常连接',
      actions: [{ label: '同步', type: 'secondary' }]
    };

    // 写入全局
    if (!app.globalData.deviceList) {
      app.globalData.deviceList = [];
    }
    app.globalData.deviceList.push(newDevice);

    // 关闭弹窗
    this.setData({ showConnectSheet: false });

    wx.showToast({ title: '已连接 ' + name, icon: 'success' });

    // 重新加载设备列表
    setTimeout(function () {
      wx.hideToast();
    }, 1500);
    this.loadDevices();
  },

  // 点击「商城」按钮
  onShopDevice: function () {
    wx.showToast({ title: '即将跳转至商城', icon: 'none' });
  },

  // 关闭连接弹窗
  closeConnectSheet: function () {
    this.setData({ showConnectSheet: false });
  },

  noop: function () {},

  // 添加设备（旧，保留兼容）
  onAddDevice: function () {
    wx.showToast({ title: '即将跳转至商城', icon: 'none' });
  }
});
