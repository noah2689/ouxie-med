// 添加记录底部弹窗组件
Component({
  properties: {
    type: {
      type: String,
      value: 'bloodPressure'
    },
    syncDeviceName: {
      type: String,
      value: ''
    }
  },

  data: {
    // 当前激活的类型 tab
    activeTab: 'bloodPressure',
    // 录入方式：manual / sync（默认设备同步）
    inputMode: 'sync',
    isAutoSyncing: false,
    autoSyncDone: false,

    // 各类型的场景选项
    sceneOptions: {
      bloodPressure: ['晨起', '午后', '睡前'],
      bloodGlucose: ['空腹', '餐后 2 小时', '睡前'],
      uricAcid: ['日常', '饭后', '睡前']
    },

    // 各类型的标题
    typeTitleMap: {
      bloodPressure: '血压',
      bloodGlucose: '血糖',
      uricAcid: '尿酸'
    },

    // 表单数据
    systolic: '',
    diastolic: '',
    pulse: '',
    glucoseValue: '',
    uricValue: '',
    recordTime: '刚刚',
    selectedScene: '',
    note: ''
  },

  _autoSyncTimer: null,

  observers: {
    'type': function (newType) {
      this.initForType(newType);
    }
  },

  lifetimes: {
    attached: function () {
      this.initForType(this.properties.type);
      this.autoSync();
    },
    detached: function () {
      if (this._autoSyncTimer) {
        clearTimeout(this._autoSyncTimer);
        this._autoSyncTimer = null;
      }
    }
  },

  methods: {
    // 根据类型初始化表单
    initForType: function (type) {
      const scenes = this.data.sceneOptions[type] || [];
      this.setData({
        activeTab: type,
        selectedScene: scenes.length > 0 ? scenes[0] : '',
        systolic: '',
        diastolic: '',
        pulse: '',
        glucoseValue: '',
        uricValue: '',
        recordTime: '刚刚',
        note: ''
      });
    },

    // 自动设备同步
    autoSync: function () {
      var self = this;
      var mode = this.data.inputMode;
      var deviceName = this.properties.syncDeviceName;

      // 只有在设备同步模式且有设备时才自动同步
      if (mode !== 'sync' || !deviceName) return;

      this.setData({ isAutoSyncing: true, autoSyncDone: false });

      this._autoSyncTimer = setTimeout(function () {
        self.setData({ isAutoSyncing: false, autoSyncDone: true });
        wx.showToast({ title: '同步成功', icon: 'success', duration: 1500 });

        // 同步成功后自动关闭弹窗（模拟保存）
        setTimeout(function () {
          self.triggerEvent('close');
        }, 800);
      }, 1200);
    },

    // 切换指标类型 tab
    onTypeChange: function (e) {
      const type = e.currentTarget.dataset.type;
      if (type === this.data.activeTab) return;
      this.initForType(type);
    },

    // 切换录入方式
    onModeChange: function (e) {
      const mode = e.currentTarget.dataset.mode;
      this.setData({ inputMode: mode });
    },

    // 输入框变化
    onInputChange: function (e) {
      const field = e.currentTarget.dataset.field;
      const value = e.detail.value;
      this.setData({ [field]: value });
    },

    // 选择场景
    onSceneSelect: function (e) {
      const scene = e.currentTarget.dataset.scene;
      this.setData({ selectedScene: scene });
    },

    // 取消
    onCancel: function () {
      this.triggerEvent('close');
    },

    // 保存
    onSave: function () {
      const type = this.data.activeTab;

      // 校验必填
      if (type === 'bloodPressure') {
        if (!this.data.systolic || !this.data.diastolic) {
          wx.showToast({ title: '请填写记录数值', icon: 'none' });
          return;
        }
      } else if (type === 'bloodGlucose') {
        if (!this.data.glucoseValue) {
          wx.showToast({ title: '请填写记录数值', icon: 'none' });
          return;
        }
      } else if (type === 'uricAcid') {
        if (!this.data.uricValue) {
          wx.showToast({ title: '请填写记录数值', icon: 'none' });
          return;
        }
      }

      // 构造保存数据
      const record = {
        type: type,
        memberId: 'self',
        scene: this.data.selectedScene || '日常',
        time: this.data.recordTime,
        note: this.data.note,
        source: 'manual'
      };

      // 按类型填充值
      if (type === 'bloodPressure') {
        record.systolic = this.data.systolic;
        record.diastolic = this.data.diastolic;
        record.pulse = this.data.pulse;
        record.unit = 'mmHg';
      } else if (type === 'bloodGlucose') {
        record.value = this.data.glucoseValue;
        record.unit = 'mmol/L';
      } else if (type === 'uricAcid') {
        record.value = this.data.uricValue;
        record.unit = 'μmol/L';
      }

      this.triggerEvent('save', { record: record });
    },

    // 去商城购买设备
    onGoShop: function () {
      wx.showToast({
        title: '即将跳转至商城',
        icon: 'none',
        duration: 1500
      });
    },

    // 设备同步
    onSyncFromDevice: function () {
      wx.showToast({
        title: '正在同步',
        icon: 'none',
        duration: 1500
      });
    },

    // 阻止冒泡（配合 catchtap）
    noop: function () {}
  }
});
