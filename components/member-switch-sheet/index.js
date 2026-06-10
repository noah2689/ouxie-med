// 成员切换底部弹窗组件
Component({
  properties: {
    members: {
      type: Array,
      value: []
    },
    currentMemberId: {
      type: String,
      value: 'self'
    }
  },

  data: {
    // 组件内部维护当前选中 ID（同步 props 传入值）
    activeId: 'self'
  },

  observers: {
    'currentMemberId': function (id) {
      this.setData({ activeId: id });
    }
  },

  methods: {
    // 选择成员
    onSelect: function (e) {
      const id = e.currentTarget.dataset.id;
      if (id === this.data.activeId) {
        this.triggerEvent('close');
        return;
      }
      this.triggerEvent('select', { memberId: id });
    },

    // 管理家庭成员
    onManage: function () {
      this.triggerEvent('manage');
    },

    // 关闭
    onClose: function () {
      this.triggerEvent('close');
    },

    noop: function () {}
  }
});
