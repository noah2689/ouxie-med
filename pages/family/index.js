// 家庭成员页
const mockData = require('../../mock/health');

Page({
  data: {
    members: [],
    currentMemberId: 'self'
  },

  onLoad: function () {
    const app = getApp();
    const members = app.globalData.members.length > 0
      ? app.globalData.members
      : mockData.members;
    const currentId = app.globalData.currentMember
      ? app.globalData.currentMember.id
      : 'self';

    this.setData({
      members: members,
      currentMemberId: currentId
    });
    console.log('[家庭成员] 页面加载');
  },

  // 切换当前查看成员
  onMemberSelect: function (e) {
    const memberId = e.currentTarget.dataset.id;
    const member = this.data.members.find(function (m) {
      return m.id === memberId;
    });
    if (!member) return;

    // 更新全局状态
    const app = getApp();
    app.globalData.currentMember = {
      id: member.id,
      name: member.name,
      relation: member.relation
    };

    this.setData({ currentMemberId: memberId });

    wx.showToast({
      title: '已切换至' + member.name,
      icon: 'none',
      duration: 1500
    });

    // 返回首页
    setTimeout(function () {
      wx.switchTab({
        url: '/pages/health/index'
      });
    }, 800);
  },

  // 添加家庭成员（占位）
  onAddMember: function () {
    wx.showToast({
      title: '后续接入',
      icon: 'none'
    });
  }
});
