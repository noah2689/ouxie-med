// 健康首页
const mockData = require('../../mock/health');

Page({
  data: {
    memberName: '本人',
    todayOverview: mockData.todayOverview,
    indicators: mockData.homeIndicators,
    todayReminders: mockData.todayReminders,

    // Phase 3：添加记录弹窗
    showRecordSheet: false,
    currentRecordType: 'bloodPressure'
  },

  onLoad: function () {
    console.log('[健康首页] 页面加载');
  },

  onShow: function () {
    console.log('[健康首页] 页面显示');
  },

  // ① 点击成员入口
  onMemberTap: function () {
    console.log('[占位] 打开成员切换弹窗，Phase 5 实现');
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

  // ═══ Phase 3：弹窗控制 ═══

  // 关闭弹窗
  closeRecordSheet: function () {
    this.setData({ showRecordSheet: false });
    this.showHomeTabBar();
  },

  // 阻止冒泡
  noop: function () {},

  // 接收保存事件 → 更新首页数据
  onSheetSave: function (e) {
    const record = e.detail.record;
    const type = record.type;
    console.log('[保存] 记录保存:', type, record);

    // ① 更新对应指标卡片
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

    // ② 更新今日已记录数 +1
    var todayOverview = JSON.parse(JSON.stringify(this.data.todayOverview));
    var stats = todayOverview.stats.map(function (s) {
      if (s.label === '今日已记录') {
        return Object.assign({}, s, { value: parseInt(s.value) + 1 });
      }
      return s;
    });
    todayOverview.stats = stats;
    todayOverview.subTitle = '今日已完成 ' + stats[0].value + ' 项记录，' + stats[1].value + ' 项需要关注';

    // ③ 更新提醒（移除对应类型的提醒）
    var keywordMap = {
      bloodPressure: '血压',
      bloodGlucose: '血糖',
      uricAcid: '尿酸'
    };
    var keyword = keywordMap[type];
    var newReminders = this.data.todayReminders.filter(function (r) {
      return r.text.indexOf(keyword) === -1;
    });

    // ④ 合并更新
    var updateData = {
      indicators: indicators,
      todayOverview: todayOverview,
      showRecordSheet: false
    };

    if (newReminders.length < this.data.todayReminders.length) {
      updateData.todayReminders = newReminders;
    }

    this.setData(updateData);

    // ⑤ 提示
    wx.showToast({
      title: '已保存',
      icon: 'success',
      duration: 1500
    });

    // ⑥ 恢复 tabBar
    this.showHomeTabBar();

    console.log('[保存] 首页数据已更新');
  },

  // ═══ Phase 3.1：tabBar 控制 ═══

  // 隐藏底部 tabBar
  hideHomeTabBar: function () {
    wx.hideTabBar({
      animation: true,
      fail: function () {
        console.log('[tabBar] 隐藏失败，不影响主流程');
      }
    });
  },

  // 显示底部 tabBar
  showHomeTabBar: function () {
    wx.showTabBar({
      animation: true,
      fail: function () {
        console.log('[tabBar] 显示失败，不影响主流程');
      }
    });
  }
});
