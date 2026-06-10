// 健康首页
const mockData = require('../../mock/health');

Page({
  data: {
    memberName: '本人',
    currentMemberId: 'self',
    members: mockData.members,
    todayOverview: mockData.todayOverview,
    indicators: mockData.homeIndicators,
    todayReminders: mockData.todayReminders,

    // Phase 3：添加记录弹窗
    showRecordSheet: false,
    currentRecordType: 'bloodPressure',

    // Phase 5：成员切换弹窗
    showMemberSheet: false
  },

  onLoad: function () {
    console.log('[健康首页] 页面加载');
    this.loadMemberData(this.data.currentMemberId);
  },

  onShow: function () {
    console.log('[健康首页] 页面显示');
    // 每次显示时根据当前成员重新加载（处理从家庭页返回的情况）
    const app = getApp();
    if (app.globalData.currentMember) {
      const member = app.globalData.currentMember;
      if (member.id !== this.data.currentMemberId) {
        this.setData({
          currentMemberId: member.id,
          memberName: member.name
        });
        this.loadMemberData(member.id);
      }
    }
  },

  // 根据成员 ID 加载首页数据
  loadMemberData: function (memberId) {
    const homeData = mockData.memberHomeData;
    if (homeData && homeData[memberId]) {
      var data = homeData[memberId];

      // 合并设备同步记录：检查是否有当前成员的最新 BP 同步记录
      var app = getApp();
      var syncedRecords = app.globalData.syncedRecords || [];
      var latestSync = null;
      for (var i = syncedRecords.length - 1; i >= 0; i--) {
        if (syncedRecords[i].memberId === memberId && syncedRecords[i].type === 'bloodPressure') {
          latestSync = syncedRecords[i];
          break;
        }
      }

      // 如果有同步记录，更新血压卡片
      if (latestSync) {
        var indicators = data.indicators.map(function (item) {
          if (item.type === 'bloodPressure') {
            return Object.assign({}, item, {
              displayValue: latestSync.displayValue,
              recordTime: '刚刚',
              recordScene: latestSync.scene,
              subValue: '数据来源 · 设备同步'
            });
          }
          return item;
        });
        data.indicators = indicators;
      }

      this.setData({
        indicators: data.indicators,
        todayOverview: mockData.todayOverview,
        todayReminders: mockData.todayReminders
      });
    }
    console.log('[首页] 加载成员数据:', memberId);
  },

  // ① 点击成员入口
  onMemberTap: function () {
    // 如果添加记录弹窗开着，先关闭
    if (this.data.showRecordSheet) {
      this.setData({ showRecordSheet: false });
    }
    this.openMemberSheet();
  },

  // ② 点击提醒入口
  onRemindTap: function () {
    wx.navigateTo({
      url: '/pages/reminder/index',
      fail: function () {
        console.log('[提醒] 页面跳转失败');
      }
    });
  },

  // ③ 点击 AI 助手入口
  onAiEntryTap: function () {
    wx.switchTab({
      url: '/pages/ai/index',
      fail: function () {
        console.log('[AI] Tab 切换失败');
      }
    });
  },

  // ④ 点击记录按钮 → 打开弹窗
  onRecordTap: function (e) {
    const type = e.currentTarget.dataset.type;
    const name = e.currentTarget.dataset.name;
    console.log('[弹窗] 打开添加' + name + '记录弹窗，类型:', type);
    this.setData({
      showRecordSheet: true,
      currentRecordType: type
    });
    this.hideHomeTabBar();
  },

  // ⑤ 点击趋势按钮
  onTrendTap: function (e) {
    const type = e.currentTarget.dataset.type;
    const name = e.currentTarget.dataset.name;
    console.log('[导航] ' + name + ' 趋势 → 详情页，类型:', type);
    wx.navigateTo({
      url: '/pages/detail/index?type=' + type,
      fail: function () {
        console.log('[详情] 页面跳转失败');
      }
    });
  },

  // ⑥ 点击管理设备
  onDeviceManageTap: function () {
    wx.navigateTo({
      url: '/pages/device/index',
      fail: function () {
        console.log('[设备] 页面跳转失败');
      }
    });
  },

  // ⑦ 点击全部记录
  onViewAllRecords: function () {
    wx.navigateTo({
      url: '/pages/records/index',
      fail: function () {
        console.log('[记录] 页面跳转失败');
      }
    });
  },

  // ═══ Phase 3：添加记录弹窗 ═══

  closeRecordSheet: function () {
    this.setData({ showRecordSheet: false });
    this.showHomeTabBar();
  },

  noop: function () {},

  onSheetSave: function (e) {
    const record = e.detail.record;
    const type = record.type;
    console.log('[保存] 记录保存:', type, record);

    const indicators = this.data.indicators.map(function (item) {
      if (item.type === type && !item.isDeviceCard) {
        var updatedItem = Object.assign({}, item);
        if (type === 'bloodPressure') {
          updatedItem.displayValue = record.systolic + '/' + record.diastolic;
          updatedItem.subValue = record.pulse ? '脉搏 ' + record.pulse + ' bpm' : '';
          updatedItem.statusText = '正常范围';
          updatedItem.statusLevel = 'normal';
        } else if (type === 'bloodGlucose') {
          updatedItem.displayValue = record.value;
          updatedItem.statusText = '空腹记录';
          updatedItem.statusLevel = 'recorded';
        } else if (type === 'uricAcid') {
          updatedItem.displayValue = record.value;
          updatedItem.statusText = '需要关注';
          updatedItem.statusLevel = 'attention';
        }
        updatedItem.recordTime = '刚刚';
        updatedItem.recordScene = record.scene;
        return updatedItem;
      }
      return item;
    });

    var todayOverview = JSON.parse(JSON.stringify(this.data.todayOverview));
    var stats = todayOverview.stats.map(function (s) {
      if (s.label === '今日已记录') {
        return Object.assign({}, s, { value: parseInt(s.value) + 1 });
      }
      return s;
    });
    todayOverview.stats = stats;
    todayOverview.subTitle = '今日已完成 ' + stats[0].value + ' 项记录，' + stats[1].value + ' 项需要关注';

    var keywordMap = {
      bloodPressure: '血压',
      bloodGlucose: '血糖',
      uricAcid: '尿酸'
    };
    var keyword = keywordMap[type];
    var newReminders = this.data.todayReminders.filter(function (r) {
      return r.text.indexOf(keyword) === -1;
    });

    var updateData = {
      indicators: indicators,
      todayOverview: todayOverview,
      showRecordSheet: false
    };
    if (newReminders.length < this.data.todayReminders.length) {
      updateData.todayReminders = newReminders;
    }
    this.setData(updateData);

    wx.showToast({ title: '已保存', icon: 'success', duration: 1500 });
    this.showHomeTabBar();
    console.log('[保存] 首页数据已更新');
  },

  // ═══ Phase 5：成员切换弹窗 ═══

  openMemberSheet: function () {
    this.setData({ showMemberSheet: true });
    this.hideHomeTabBar();
  },

  closeMemberSheet: function () {
    this.setData({ showMemberSheet: false });
    this.showHomeTabBar();
  },

  onMemberSelect: function (e) {
    const memberId = e.detail.memberId;
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

    // 更新首页
    this.setData({
      currentMemberId: memberId,
      memberName: member.name,
      showMemberSheet: false
    });

    this.loadMemberData(memberId);
    this.showHomeTabBar();

    wx.showToast({
      title: '已切换查看成员',
      icon: 'none',
      duration: 1500
    });

    console.log('[成员] 切换至:', member.name);
  },

  onManageMembers: function () {
    this.setData({ showMemberSheet: false });
    this.showHomeTabBar();
    wx.navigateTo({
      url: '/pages/family/index',
      fail: function () {
        console.log('[家庭] 页面跳转失败');
      }
    });
  },

  // ═══ tabBar 控制 ═══

  hideHomeTabBar: function () {
    wx.hideTabBar({
      animation: true,
      fail: function () {
        console.log('[tabBar] 隐藏失败，不影响主流程');
      }
    });
  },

  showHomeTabBar: function () {
    wx.showTabBar({
      animation: true,
      fail: function () {
        console.log('[tabBar] 显示失败，不影响主流程');
      }
    });
  }
});
