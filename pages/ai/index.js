// AI 助手
const mockData = require('../../mock/health');

Page({
  data: {
    // 数据
    aiInsight: mockData.aiInsight,
    quickQuestions: mockData.quickQuestions,
    sessions: mockData.aiSessions,
    messages: [],
    inputValue: '',
    scrollToId: '',

    // 状态
    showDrawer: false,
    isFirstLoad: true
  },

  onLoad: function () {
    this.resetChat();
    console.log('[AI 助手] 页面加载');
  },

  onShow: function () {
    console.log('[AI 助手] 页面显示');
  },

  // 重置聊天为初始消息
  resetChat: function () {
    this.setData({
      messages: [mockData.initialAiMessage],
      isFirstLoad: false
    });
  },

  // 点击快捷问题
  onQuickQuestionTap: function (e) {
    const question = e.currentTarget.dataset.question;
    this.sendMessage(question);
  },

  // 输入框变化
  onInputChange: function (e) {
    this.setData({ inputValue: e.detail.value });
  },

  // 点击发送
  onSendMessage: function () {
    const text = this.data.inputValue;
    if (!text || !text.trim()) {
      wx.showToast({ title: '请输入问题', icon: 'none' });
      return;
    }
    this.sendMessage(text.trim());
    this.setData({ inputValue: '' });
  },

  // 通用发送消息逻辑
  sendMessage: function (text) {
    // 添加用户消息
    var messages = this.data.messages.concat([{
      role: 'user',
      content: text
    }]);

    // 生成 AI 回复
    var reply = this.createAiReply(text);

    // 添加 AI 回复
    messages = messages.concat([{
      role: 'ai',
      content: reply
    }]);

    this.setData({
      messages: messages,
      scrollToId: 'msg-' + (messages.length - 1)
    });
  },

  // 根据输入生成 mock AI 回复
  createAiReply: function (text) {
    var map = mockData.aiReplyMap || [];
    for (var i = 0; i < map.length; i++) {
      var item = map[i];
      for (var j = 0; j < item.keywords.length; j++) {
        if (text.indexOf(item.keywords[j]) !== -1) {
          return item.reply;
        }
      }
    }
    return mockData.fallbackReply || '我可以根据近期记录，帮你整理趋势变化和记录建议。';
  },

  // 查看关联记录
  goRelatedRecords: function () {
    wx.navigateTo({
      url: '/pages/records/index',
      fail: function () {
        console.log('[AI] 跳转失败');
      }
    });
  },

  // ═══ 会话抽屉 ═══

  openSessionDrawer: function () {
    this.setData({ showDrawer: true });
  },

  closeSessionDrawer: function () {
    this.setData({ showDrawer: false });
  },

  onSessionSelect: function (e) {
    this.setData({ showDrawer: false });
    wx.showToast({ title: '已切换会话', icon: 'none' });
  },

  onNewSession: function () {
    this.resetChat();
    this.setData({ showDrawer: false });
    wx.showToast({ title: '已新建会话', icon: 'success' });
  },

  noop: function () {}
});
