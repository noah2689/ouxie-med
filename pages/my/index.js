// 我的
const mockData = require('../../mock/health');

Page({
  data: {
    memberName: '本人',
    memberGender: '男',
    memberAge: '32 岁',
    profilePercent: 70,
    memberCount: 3,
    reminderCount: 3,
    deviceCount: 1
  },

  onLoad: function () {
    const members = mockData.members || [];
    const self = members.find(function (m) {
      return m.id === 'self';
    });
    if (self) {
      this.setData({
        memberName: self.name,
        memberGender: self.gender || '男',
        memberAge: (self.age || 32) + ' 岁'
      });
    }

    const reminders = mockData.reminders || [];
    const deviceList = mockData.deviceList || [];

    this.setData({
      memberCount: members.length,
      reminderCount: reminders.length,
      deviceCount: deviceList.length
    });

    console.log('[我的] 页面加载');
  },

  // 健康管理入口
  goFamily: function () {
    wx.navigateTo({ url: '/pages/family/index' });
  },

  goReminder: function () {
    wx.navigateTo({ url: '/pages/reminder/index' });
  },

  goDevice: function () {
    wx.navigateTo({ url: '/pages/device/index' });
  },

  goRecords: function () {
    wx.navigateTo({ url: '/pages/records/index' });
  },

  // 通用设置入口（占位）
  onPrivacyTap: function () {
    wx.showToast({ title: '后续接入', icon: 'none' });
  },

  onAboutTap: function () {
    wx.showToast({ title: '瓯械健康 Demo', icon: 'none' });
  }
});
