// 全部记录页
Page({
  data: {
    filterType: ''
  },

  onLoad: function (options) {
    const type = options.type || '';
    this.setData({
      filterType: type
    });
    console.log('[全部记录] 加载，筛选类型:', type);
  }
});
