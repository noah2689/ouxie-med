// 指标详情页（通过 type 参数复用）
const mockData = require('../../mock/health');
const format = require('../../utils/format');

Page({
  data: {
    metricType: 'bloodPressure',
    metricName: '血压',
    detailData: null,
    recentRecords: [],
    activeRange: '7',
    rangeOptions: [
      { value: '7', label: '近 7 天' },
      { value: '30', label: '近 30 天' },
      { value: '90', label: '近 90 天' }
    ],
    // 按类型切换的差异化数据
    statusConfig: {
      bloodPressure: {
        displayValue: '128/82',
        unit: 'mmHg',
        scene: '晨起',
        statusText: '正常范围',
        statusLevel: 'normal',
        description: '最近记录保持稳定',
        chartHint: '近 7 天记录较平稳'
      },
      bloodGlucose: {
        displayValue: '6.2',
        unit: 'mmol/L',
        scene: '空腹',
        statusText: '空腹记录',
        statusLevel: 'recorded',
        description: '建议继续保持固定时间记录',
        chartHint: '建议保持固定场景记录'
      },
      uricAcid: {
        displayValue: '428',
        unit: 'μmol/L',
        scene: '日常',
        statusText: '需要关注',
        statusLevel: 'attention',
        description: '近期记录较少，建议固定周期记录',
        chartHint: '记录较少，建议继续观察'
      }
    }
  },

  onLoad: function (options) {
    const type = options.type || 'bloodPressure';
    const nameMap = {
      bloodPressure: '血压',
      bloodGlucose: '血糖',
      uricAcid: '尿酸'
    };
    const name = nameMap[type] || '指标';
    const config = this.data.statusConfig[type];

    // 合并设备同步记录
    const app = getApp();
    const syncedRecords = app.globalData.syncedRecords || [];
    const allRecords = (mockData.detailRecords || []).concat(
      syncedRecords.filter(function (s) {
        return s.type === type;
      })
    );

    // 加载该类型的最近记录（3 条）
    const typeRecords = allRecords.filter(function (r) {
      return r.type === type;
    }).sort(function (a, b) {
      return new Date(b.measuredAt) - new Date(a.measuredAt);
    }).slice(0, 3).map(function (r) {
      return Object.assign({}, r, {
        formattedTime: format.formatRecordTime(r.measuredAt)
      });
    });

    // 如果有同步记录，核心卡片优先展示最新值
    var detailConfig = Object.assign({}, config);
    if (typeRecords.length > 0 && syncedRecords.length > 0) {
      var newest = typeRecords[0];
      for (var i = 0; i < syncedRecords.length; i++) {
        if (syncedRecords[i].type === type && new Date(syncedRecords[i].measuredAt) >= new Date(newest.measuredAt)) {
          newest = syncedRecords[i];
        }
      }
      detailConfig.displayValue = newest.displayValue;
      detailConfig.scene = newest.scene;
    }

    this.setData({
      metricType: type,
      metricName: name,
      detailData: detailConfig,
      recentRecords: typeRecords
    });

    wx.setNavigationBarTitle({
      title: name + '详情'
    });

    console.log('[指标详情] 加载类型:', type);
  },

  // 切换时间筛选
  onRangeChange: function (e) {
    const value = e.currentTarget.dataset.value;
    this.setData({ activeRange: value });
    console.log('[筛选] 时间范围:', value);
  },

  // 查看全部记录
  onViewAllRecords: function () {
    wx.navigateTo({
      url: '/pages/records/index?type=' + this.data.metricType,
      fail: function () {
        console.log('[导航] 查看全部记录失败');
      }
    });
  }
});
