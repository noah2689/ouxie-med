// 指标详情页（通过 type 参数复用：bloodPressure / bloodGlucose / uricAcid）
Page({
  data: {
    metricType: '',
    metricName: ''
  },

  onLoad: function (options) {
    const type = options.type || '';
    const nameMap = {
      bloodPressure: '血压',
      bloodGlucose: '血糖',
      uricAcid: '尿酸'
    };
    this.setData({
      metricType: type,
      metricName: nameMap[type] || '指标'
    });
    console.log('[指标详情] 加载类型:', type);
  }
});
