// 全部记录页
const mockData = require('../../mock/health');
const format = require('../../utils/format');

Page({
  data: {
    // 类型筛选
    activeTypeFilter: 'all',
    typeFilters: [
      { value: 'all', label: '全部' },
      { value: 'bloodPressure', label: '血压' },
      { value: 'bloodGlucose', label: '血糖' },
      { value: 'uricAcid', label: '尿酸' }
    ],
    // 时间筛选
    activeTimeFilter: '30',
    timeFilters: [
      { value: '7', label: '近 7 天' },
      { value: '30', label: '近 30 天' },
      { value: 'all', label: '全部' }
    ],
    // 分组后的记录
    groupedRecords: [],
    isEmpty: false,
    allRecords: []
  },

  onLoad: function (options) {
    const type = options.type || 'all';
    this.setData({ activeTypeFilter: type });
    this.loadRecords(type, this.data.activeTimeFilter);
    console.log('[全部记录] 加载，筛选类型:', type);
  },

  // 切换类型筛选
  onTypeFilterChange: function (e) {
    const value = e.currentTarget.dataset.value;
    this.setData({ activeTypeFilter: value });
    this.loadRecords(value, this.data.activeTimeFilter);
    console.log('[筛选] 类型:', value);
  },

  // 切换时间筛选
  onTimeFilterChange: function (e) {
    const value = e.currentTarget.dataset.value;
    this.setData({ activeTimeFilter: value });
    this.loadRecords(this.data.activeTypeFilter, value);
    console.log('[筛选] 时间:', value);
  },

  // 加载并筛选记录
  loadRecords: function (typeFilter, timeFilter) {
    // 合并设备同步记录
    var app = getApp();
    var syncedRecords = app.globalData.syncedRecords || [];
    var allRecords = (mockData.detailRecords || []).concat(syncedRecords);

    // 类型筛选
    if (typeFilter !== 'all') {
      allRecords = allRecords.filter(function (r) {
        return r.type === typeFilter;
      });
    }

    // 时间筛选
    var now = new Date();
    if (timeFilter !== 'all') {
      var days = parseInt(timeFilter);
      var cutoff = new Date(now);
      cutoff.setDate(cutoff.getDate() - days);
      allRecords = allRecords.filter(function (r) {
        return new Date(r.measuredAt) >= cutoff;
      });
    }

    // 按时间倒序
    allRecords.sort(function (a, b) {
      return new Date(b.measuredAt) - new Date(a.measuredAt);
    });

    // 预格式化和按日期分组
    var groups = {};
    allRecords.forEach(function (r) {
      var record = Object.assign({}, r, {
        formattedTime: format.formatRecordTime(r.measuredAt)
      });
      var group = format.getDateGroup(r.measuredAt);
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(record);
    });

    // 转换为列表（保持今天→昨天→更早的顺序）
    var groupOrder = ['今天', '昨天', '更早'];
    var groupedRecords = [];
    groupOrder.forEach(function (key) {
      if (groups[key]) {
        groupedRecords.push({
          dateLabel: key,
          records: groups[key]
        });
      }
    });

    this.setData({
      groupedRecords: groupedRecords,
      isEmpty: groupedRecords.length === 0
    });
  }
});
