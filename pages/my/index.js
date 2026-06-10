// 我的
const mockData = require('../../mock/health');

Page({
  data: {
    avatarText: '本',
    memberName: '本人',
    memberGender: '男',
    memberAge: '32 岁',
    profilePercent: 70,
    memberCount: 3,
    reminderCount: 3,
    deviceCount: 1
  },

  onLoad: function () {
    this.loadPageData();
    console.log('[我的] 页面加载');
  },

  onShow: function () {
    // 每次显示时重新加载当前成员信息（处理从首页切换成员后返回）
    this.loadMemberInfo();
    console.log('[我的] 页面显示');
  },

  // 加载页面基础数据
  loadPageData: function () {
    const members = mockData.members || [];
    const reminders = mockData.reminders || [];
    const deviceList = mockData.deviceList || [];

    this.setData({
      memberCount: members.length,
      reminderCount: reminders.length,
      deviceCount: deviceList.length
    });

    this.loadMemberInfo();
  },

  // 从全局状态加载当前成员信息
  loadMemberInfo: function () {
    const app = getApp();
    const currentMember = app.globalData.currentMember || { id: 'self' };
    const members = mockData.members || [];

    // 查找当前成员的完整信息
    var member = null;
    for (var i = 0; i < members.length; i++) {
      if (members[i].id === currentMember.id) {
        member = members[i];
        break;
      }
    }

    if (member) {
      this.setData({
        avatarText: member.avatarText || '本',
        memberName: member.name,
        memberGender: member.gender || '男',
        memberAge: (member.age || 32) + ' 岁',
        profilePercent: member.id === 'self' ? 70 : (member.id === 'mother' ? 50 : 40)
      });
    }
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
