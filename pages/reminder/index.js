// 提醒设置页
const mockData = require('../../mock/health');

Page({
  data: {
    reminders: []
  },

  onLoad: function () {
    this.setData({
      reminders: mockData.reminders || []
    });
    console.log('[提醒设置] 页面加载');
  },

  // 切换提醒开关
  onToggleReminder: function (e) {
    const id = e.currentTarget.dataset.id;
    const enabled = e.detail.value;

    const reminders = this.data.reminders.map(function (r) {
      if (r.id === id) {
        return Object.assign({}, r, {
          enabled: enabled,
          statusText: enabled ? '已开启' : '已关闭'
        });
      }
      return r;
    });

    this.setData({ reminders: reminders });

    wx.showToast({
      title: enabled ? '已开启提醒' : '已关闭提醒',
      icon: 'none',
      duration: 1500
    });

    console.log('[提醒] 切换:', id, enabled ? '开启' : '关闭');
  },

  // 添加提醒（占位）
  onAddReminder: function () {
    wx.showToast({
      title: '后续接入',
      icon: 'none'
    });
  }
});
