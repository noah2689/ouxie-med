// AI 会话抽屉组件
Component({
  properties: {
    sessions: {
      type: Array,
      value: []
    },
    visible: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    onClose: function () {
      this.triggerEvent('close');
    },

    onSelect: function (e) {
      const id = e.currentTarget.dataset.id;
      this.triggerEvent('select', { sessionId: id });
    },

    onNewSession: function () {
      this.triggerEvent('new');
    },

    noop: function () {}
  }
});
