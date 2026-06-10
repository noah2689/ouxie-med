// 添加记录底部弹窗组件
Component({
  properties: {
    type: {
      type: String,
      value: 'bloodPressure'
    }
  },

  data: {
    // 当前激活的类型 tab
    activeTab: 'bloodPressure',
    // 录入方式：manual / sync
    inputMode: 'manual',

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

  observers: {
    'type': function (newType) {
      this.initForType(newType);
    }
  },

  attached: function () {
    this.initForType(this.properties.type);
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

    // 阻止冒泡（配合 catchtap）
    noop: function () {}
  }
});
