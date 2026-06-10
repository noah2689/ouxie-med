// AI 助手
const mockData = require('../../mock/health');

Page({
  data: {
    aiInsight: mockData.aiInsight,
    quickQuestions: mockData.quickQuestions,
    sessions: mockData.aiSessions,
    messages: [],
    inputValue: '',
    scrollToId: '',

    showDrawer: false,
    isFirstLoad: true,
    isThinking: false
  },

  // 打字机定时器
  _typewriterTimer: null,
  // 延迟等待定时器
  _thinkingTimer: null,

  onLoad: function () {
    this.resetChat();
    console.log('[AI 助手] 页面加载');
  },

  onUnload: function () {
    this._clearTimers();
  },

  // 清除所有定时器
  _clearTimers: function () {
    if (this._typewriterTimer) {
      clearInterval(this._typewriterTimer);
      this._typewriterTimer = null;
    }
    if (this._thinkingTimer) {
      clearTimeout(this._thinkingTimer);
      this._thinkingTimer = null;
    }
  },

  // 重置聊天
  resetChat: function () {
    this._clearTimers();
    this.setData({
      messages: [mockData.initialAiMessage],
      isFirstLoad: false,
      isThinking: false
    });
  },

  onQuickQuestionTap: function (e) {
    const question = e.currentTarget.dataset.question;
    this.sendMessage(question);
  },

  onInputChange: function (e) {
    this.setData({ inputValue: e.detail.value });
  },

  onSendMessage: function () {
    const text = this.data.inputValue;
    if (!text || !text.trim()) {
      wx.showToast({ title: '请输入问题', icon: 'none' });
      return;
    }
    this.sendMessage(text.trim());
    this.setData({ inputValue: '' });
  },

  // 发送消息
  sendMessage: function (text) {
    if (this.data.isThinking) return;

    // 添加用户消息
    var messages = this.data.messages.concat([{
      role: 'user',
      content: text
    }]);

    // 添加思考中占位
    var thinkingIdx = messages.length;
    messages = messages.concat([{
      role: 'ai',
      content: '',
      isThinking: true
    }]);

    this.setData({
      messages: messages,
      isThinking: true,
      scrollToId: 'msg-' + thinkingIdx
    });

    // 生成回复内容
    var reply = this.createAiReply(text);

    // 延迟后开始打字机效果
    var self = this;
    this._clearTimers();
    this._thinkingTimer = setTimeout(function () {
      self._startTypewriter(reply, thinkingIdx);
    }, 1200);
  },

  // 打字机效果
  _startTypewriter: function (fullText, msgIndex) {
    var self = this;
    var currentLen = 0;

    // 移除思考中占位，替换为空 AI 消息
    var msgs = this.data.messages.map(function (m, i) {
      if (i === msgIndex) {
        return { role: 'ai', content: '', isThinking: false };
      }
      return m;
    });
    this.setData({ messages: msgs });

    // 逐字追加
    this._typewriterTimer = setInterval(function () {
      currentLen++;
      var partialText = fullText.substring(0, currentLen);

      var updated = self.data.messages.map(function (m, i) {
        if (i === msgIndex) {
          return { role: 'ai', content: partialText, isThinking: false };
        }
        return m;
      });

      self.setData({
        messages: updated,
        scrollToId: 'msg-' + msgIndex
      });

      // 全部追加完毕
      if (currentLen >= fullText.length) {
        self._clearTimers();
        self.setData({ isThinking: false });
      }
    }, 30);
  },

  // 生成 AI 回复
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

  goRelatedRecords: function () {
    wx.navigateTo({
      url: '/pages/records/index',
      fail: function () { console.log('[AI] 跳转失败'); }
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
