/* ═══════════════════════════════════════════════
   瓯械健康 — Mock 数据
   本模块提供所有本地模拟数据，不接真实后端 API
   ═══════════════════════════════════════════════ */

// 家庭成员列表
const members = [
  {
    id: 'self',
    name: '本人',
    relation: '本人',
    avatarText: '本',
    age: 32,
    gender: '男',
    isDefault: true,
    recentRecordText: '今日已记录',
    healthFocus: ['血压', '血糖'],
    status: '默认成员',
    lastRecordTime: '2026-06-10T07:30:00'
  },
  {
    id: 'mother',
    name: '母亲',
    relation: '母亲',
    avatarText: '母',
    age: 58,
    gender: '女',
    isDefault: false,
    recentRecordText: '昨天有记录',
    healthFocus: ['血压', '尿酸'],
    status: '已添加',
    lastRecordTime: '2026-06-09T20:00:00'
  },
  {
    id: 'father',
    name: '父亲',
    relation: '父亲',
    avatarText: '父',
    age: 61,
    gender: '男',
    isDefault: false,
    recentRecordText: '3 天前记录',
    healthFocus: ['血糖'],
    status: '记录较少',
    lastRecordTime: '2026-06-07T08:00:00'
  }
];

// 指标配置
const metricTypes = [
  {
    type: 'bloodPressure',
    name: '血压',
    unit: 'mmHg',
    icon: 'bp'
  },
  {
    type: 'bloodGlucose',
    name: '血糖',
    unit: 'mmol/L',
    icon: 'glucose'
  },
  {
    type: 'uricAcid',
    name: '尿酸',
    unit: 'μmol/L',
    icon: 'uric'
  }
];

// 今日健康概览
const todayOverview = {
  title: '今日健康概览',
  subTitle: '今日已完成 2 项记录，1 项需要关注',
  stats: [
    { label: '今日已记录', value: 2, level: 'normal' },
    { label: '需要关注', value: 1, level: 'attention' },
    { label: '待观察', value: 1, level: 'info' }
  ],
  aiEntryText: 'AI 助手 · 查看记录解读'
};

// 首页 2×2 指标卡片专用数据
const homeIndicators = [
  {
    type: 'bloodPressure',
    name: '血压',
    displayValue: '128/82',
    unit: 'mmHg',
    subValue: '脉搏 72 bpm',
    recordTime: '今日 07:30',
    recordScene: '晨起',
    statusText: '正常范围',
    statusLevel: 'normal',
    hasRecordAction: true,
    hasTrendAction: true,
    isDeviceCard: false
  },
  {
    type: 'bloodGlucose',
    name: '血糖',
    displayValue: '6.2',
    unit: 'mmol/L',
    subValue: '',
    recordTime: '今日 07:10',
    recordScene: '空腹',
    statusText: '空腹记录',
    statusLevel: 'recorded',
    hasRecordAction: true,
    hasTrendAction: true,
    isDeviceCard: false
  },
  {
    type: 'uricAcid',
    name: '尿酸',
    displayValue: '428',
    unit: 'μmol/L',
    subValue: '',
    recordTime: '昨天 20:00',
    recordScene: '日常',
    statusText: '需要关注',
    statusLevel: 'attention',
    hasRecordAction: true,
    hasTrendAction: true,
    isDeviceCard: false
  },
  {
    type: 'deviceStatus',
    name: '设备状态',
    displayValue: '',
    unit: '',
    subValue: '',
    recordTime: '',
    recordScene: '',
    statusText: '待完善',
    statusLevel: 'pending',
    hasRecordAction: false,
    hasTrendAction: false,
    isDeviceCard: true,
    deviceConnectedCount: 1,
    deviceStatusText: '已连接 1 台',
    deviceSubText: '血压计正常同步',
    deviceHint: '推荐添加尿酸仪'
  }
];

// 健康记录
const healthRecords = [
  {
    id: 'rec-001',
    memberId: 'self',
    metricType: 'bloodPressure',
    systolic: 128,
    diastolic: 82,
    pulse: 72,
    value: null,
    unit: 'mmHg',
    recordTime: '2026-06-10T07:30:00',
    recordScene: '晨起',
    statusText: '正常范围',
    statusLevel: 'normal',
    remark: ''
  },
  {
    id: 'rec-002',
    memberId: 'self',
    metricType: 'bloodGlucose',
    systolic: null,
    diastolic: null,
    pulse: null,
    value: 6.2,
    unit: 'mmol/L',
    recordTime: '2026-06-10T07:10:00',
    recordScene: '空腹',
    statusText: '空腹记录',
    statusLevel: 'recorded',
    remark: ''
  },
  {
    id: 'rec-003',
    memberId: 'self',
    metricType: 'uricAcid',
    systolic: null,
    diastolic: null,
    pulse: null,
    value: 428,
    unit: 'μmol/L',
    recordTime: '2026-06-09T20:00:00',
    recordScene: '日常',
    statusText: '需要关注',
    statusLevel: 'attention',
    remark: ''
  }
];

// 设备列表
const deviceList = [
  {
    id: 'dev-001',
    name: '智能血压计',
    type: 'bloodPressure',
    typeLabel: '血压设备',
    connectedStatus: 'connected',
    statusText: '已连接',
    statusLevel: 'ok',
    lastSyncText: '今日 07:30',
    description: '血压计正常同步',
    actions: [
      { label: '同步', type: 'secondary' }
    ]
  },
  {
    id: 'dev-002',
    name: '智能血糖仪',
    type: 'bloodGlucose',
    typeLabel: '血糖设备',
    connectedStatus: 'connected',
    statusText: '已连接',
    statusLevel: 'ok',
    lastSyncText: '今日 07:00',
    description: '血糖仪正常同步',
    actions: [
      { label: '同步', type: 'secondary' }
    ]
  }
];

// 推荐添加设备
const recommendedDevices = [
  {
    id: 'rec-dev-001',
    name: '智能血糖仪',
    type: 'bloodGlucose',
    typeLabel: '血糖设备',
    description: '支持血糖记录同步',
    reason: '建议补充血糖监测'
  },
  {
    id: 'rec-dev-002',
    name: '智能尿酸仪',
    type: 'uricAcid',
    typeLabel: '尿酸设备',
    description: '支持尿酸记录同步',
    reason: '尿酸记录较少'
  }
];

// 今日提醒
const todayReminders = [
  {
    id: 'today-rem-001',
    text: '血糖餐后 2 小时建议继续记录',
    level: 'info'
  },
  {
    id: 'today-rem-002',
    text: '血压近期需要关注，建议保持记录',
    level: 'attention'
  },
  {
    id: 'today-rem-003',
    text: '尿酸记录较少，建议固定周期记录',
    level: 'info'
  }
];

// 提醒设置
const reminders = [
  {
    id: 'rem-001',
    memberId: 'self',
    memberName: '本人',
    metricType: 'bloodPressure',
    metricLabel: '血压',
    title: '血压记录提醒',
    time: '每天 07:30',
    repeatText: '每天',
    enabled: true,
    statusText: '已开启',
    description: '晨起后建议记录一次'
  },
  {
    id: 'rem-002',
    memberId: 'self',
    memberName: '本人',
    metricType: 'bloodGlucose',
    metricLabel: '血糖',
    title: '血糖记录提醒',
    time: '每天 09:30',
    repeatText: '每天',
    enabled: true,
    statusText: '已开启',
    description: '餐后 2 小时建议继续记录'
  },
  {
    id: 'rem-003',
    memberId: 'father',
    memberName: '父亲',
    metricType: 'uricAcid',
    metricLabel: '尿酸',
    title: '尿酸记录提醒',
    time: '每周三 20:00',
    repeatText: '每周',
    enabled: false,
    statusText: '已关闭',
    description: '建议保持固定周期记录'
  }
];

// 详情页指标配置
const typeConfig = {
  bloodPressure: {
    name: '血压',
    unit: 'mmHg',
    displayValue: '128/82',
    statusText: '正常范围',
    statusLevel: 'normal',
    scene: '晨起',
    description: '最近记录保持稳定',
    chartHint: '近 7 天记录较平稳'
  },
  bloodGlucose: {
    name: '血糖',
    unit: 'mmol/L',
    displayValue: '6.2',
    statusText: '空腹记录',
    statusLevel: 'recorded',
    scene: '空腹',
    description: '建议继续保持固定时间记录',
    chartHint: '建议保持固定场景记录'
  },
  uricAcid: {
    name: '尿酸',
    unit: 'μmol/L',
    displayValue: '428',
    statusText: '需要关注',
    statusLevel: 'attention',
    scene: '日常',
    description: '近期记录较少，建议固定周期记录',
    chartHint: '记录较少，建议继续观察'
  }
};

// 详情页和记录页使用的完整记录数据
const detailRecords = [
  // === 血压记录 ===
  {
    id: 'rec-bp-001',
    type: 'bloodPressure',
    typeName: '血压',
    displayValue: '128/82',
    unit: 'mmHg',
    scene: '晨起',
    measuredAt: '2026-06-10T07:30:00',
    statusText: '正常范围',
    statusLevel: 'normal',
    source: 'manual',
    sourceText: '手动记录',
    memberId: 'self'
  },
  {
    id: 'rec-bp-002',
    type: 'bloodPressure',
    typeName: '血压',
    displayValue: '122/78',
    unit: 'mmHg',
    scene: '睡前',
    measuredAt: '2026-06-09T21:00:00',
    statusText: '正常范围',
    statusLevel: 'normal',
    source: 'device',
    sourceText: '设备同步',
    memberId: 'self'
  },
  {
    id: 'rec-bp-003',
    type: 'bloodPressure',
    typeName: '血压',
    displayValue: '130/85',
    unit: 'mmHg',
    scene: '晨起',
    measuredAt: '2026-06-08T07:20:00',
    statusText: '正常范围',
    statusLevel: 'normal',
    source: 'manual',
    sourceText: '手动记录',
    memberId: 'self'
  },
  {
    id: 'rec-bp-004',
    type: 'bloodPressure',
    typeName: '血压',
    displayValue: '126/80',
    unit: 'mmHg',
    scene: '午后',
    measuredAt: '2026-06-06T14:00:00',
    statusText: '正常范围',
    statusLevel: 'normal',
    source: 'device',
    sourceText: '设备同步',
    memberId: 'self'
  },
  // === 血糖记录 ===
  {
    id: 'rec-gl-001',
    type: 'bloodGlucose',
    typeName: '血糖',
    displayValue: '6.2',
    unit: 'mmol/L',
    scene: '空腹',
    measuredAt: '2026-06-10T07:10:00',
    statusText: '空腹记录',
    statusLevel: 'recorded',
    source: 'manual',
    sourceText: '手动记录',
    memberId: 'self'
  },
  {
    id: 'rec-gl-002',
    type: 'bloodGlucose',
    typeName: '血糖',
    displayValue: '9.8',
    unit: 'mmol/L',
    scene: '餐后 2 小时',
    measuredAt: '2026-06-09T12:20:00',
    statusText: '待观察',
    statusLevel: 'observe',
    source: 'manual',
    sourceText: '手动记录',
    memberId: 'self'
  },
  {
    id: 'rec-gl-003',
    type: 'bloodGlucose',
    typeName: '血糖',
    displayValue: '5.8',
    unit: 'mmol/L',
    scene: '空腹',
    measuredAt: '2026-06-07T07:00:00',
    statusText: '空腹记录',
    statusLevel: 'recorded',
    source: 'device',
    sourceText: '设备同步',
    memberId: 'self'
  },
  {
    id: 'rec-gl-004',
    type: 'bloodGlucose',
    typeName: '血糖',
    displayValue: '7.2',
    unit: 'mmol/L',
    scene: '睡前',
    measuredAt: '2026-06-05T21:30:00',
    statusText: '待观察',
    statusLevel: 'observe',
    source: 'device',
    sourceText: '设备同步',
    memberId: 'self'
  },
  // === 尿酸记录 ===
  {
    id: 'rec-ua-001',
    type: 'uricAcid',
    typeName: '尿酸',
    displayValue: '428',
    unit: 'μmol/L',
    scene: '日常',
    measuredAt: '2026-06-09T20:00:00',
    statusText: '需要关注',
    statusLevel: 'attention',
    source: 'manual',
    sourceText: '手动记录',
    memberId: 'self'
  },
  {
    id: 'rec-ua-002',
    type: 'uricAcid',
    typeName: '尿酸',
    displayValue: '396',
    unit: 'μmol/L',
    scene: '日常',
    measuredAt: '2026-06-05T19:30:00',
    statusText: '正常范围',
    statusLevel: 'normal',
    source: 'manual',
    sourceText: '手动记录',
    memberId: 'self'
  },
  {
    id: 'rec-ua-003',
    type: 'uricAcid',
    typeName: '尿酸',
    displayValue: '385',
    unit: 'μmol/L',
    scene: '饭后',
    measuredAt: '2026-06-01T20:00:00',
    statusText: '正常范围',
    statusLevel: 'normal',
    source: 'device',
    sourceText: '设备同步',
    memberId: 'self'
  },
  {
    id: 'rec-ua-004',
    type: 'uricAcid',
    typeName: '尿酸',
    displayValue: '412',
    unit: 'μmol/L',
    scene: '日常',
    measuredAt: '2026-05-28T08:00:00',
    statusText: '需要关注',
    statusLevel: 'attention',
    source: 'manual',
    sourceText: '手动记录',
    memberId: 'self'
  }
];

// 各成员对应的首页数据
const memberHomeData = {
  self: {
    indicators: [
      {
        type: 'bloodPressure',
        name: '血压',
        displayValue: '128/82',
        unit: 'mmHg',
        subValue: '脉搏 72 bpm',
        recordTime: '今日 07:30',
        recordScene: '晨起',
        statusText: '正常范围',
        statusLevel: 'normal',
        hasRecordAction: true,
        hasTrendAction: true,
        isDeviceCard: false
      },
      {
        type: 'bloodGlucose',
        name: '血糖',
        displayValue: '6.2',
        unit: 'mmol/L',
        subValue: '',
        recordTime: '今日 07:10',
        recordScene: '空腹',
        statusText: '空腹记录',
        statusLevel: 'recorded',
        hasRecordAction: true,
        hasTrendAction: true,
        isDeviceCard: false
      },
      {
        type: 'uricAcid',
        name: '尿酸',
        displayValue: '428',
        unit: 'μmol/L',
        subValue: '',
        recordTime: '昨天 20:00',
        recordScene: '日常',
        statusText: '需要关注',
        statusLevel: 'attention',
        hasRecordAction: true,
        hasTrendAction: true,
        isDeviceCard: false
      },
      {
        type: 'deviceStatus',
        name: '设备状态',
        displayValue: '',
        unit: '',
        subValue: '',
        recordTime: '',
        recordScene: '',
        statusText: '待完善',
        statusLevel: 'pending',
        hasRecordAction: false,
        hasTrendAction: false,
        isDeviceCard: true,
        deviceConnectedCount: 1,
        deviceStatusText: '已连接 1 台',
        deviceSubText: '血压计正常同步',
        deviceHint: '推荐添加尿酸仪'
      }
    ]
  },
  father: {
    indicators: [
      {
        type: 'bloodPressure',
        name: '血压',
        displayValue: '135/84',
        unit: 'mmHg',
        subValue: '脉搏 68 bpm',
        recordTime: '今日 08:10',
        recordScene: '晨起',
        statusText: '正常范围',
        statusLevel: 'normal',
        hasRecordAction: true,
        hasTrendAction: true,
        isDeviceCard: false
      },
      {
        type: 'bloodGlucose',
        name: '血糖',
        displayValue: '6.8',
        unit: 'mmol/L',
        subValue: '',
        recordTime: '今日 08:00',
        recordScene: '空腹',
        statusText: '空腹记录',
        statusLevel: 'recorded',
        hasRecordAction: true,
        hasTrendAction: true,
        isDeviceCard: false
      },
      {
        type: 'uricAcid',
        name: '尿酸',
        displayValue: '402',
        unit: 'μmol/L',
        subValue: '',
        recordTime: '昨天 20:30',
        recordScene: '日常',
        statusText: '正常范围',
        statusLevel: 'normal',
        hasRecordAction: true,
        hasTrendAction: true,
        isDeviceCard: false
      },
      {
        type: 'deviceStatus',
        name: '设备状态',
        displayValue: '',
        unit: '',
        subValue: '',
        recordTime: '',
        recordScene: '',
        statusText: '待完善',
        statusLevel: 'pending',
        hasRecordAction: false,
        hasTrendAction: false,
        isDeviceCard: true,
        deviceConnectedCount: 0,
        deviceStatusText: '未连接设备',
        deviceSubText: '建议添加测量设备',
        deviceHint: '推荐添加智能血压计'
      }
    ]
  },
  mother: {
    indicators: [
      {
        type: 'bloodPressure',
        name: '血压',
        displayValue: '118/76',
        unit: 'mmHg',
        subValue: '脉搏 70 bpm',
        recordTime: '昨天 20:00',
        recordScene: '睡前',
        statusText: '正常范围',
        statusLevel: 'normal',
        hasRecordAction: true,
        hasTrendAction: true,
        isDeviceCard: false
      },
      {
        type: 'bloodGlucose',
        name: '血糖',
        displayValue: '5.9',
        unit: 'mmol/L',
        subValue: '',
        recordTime: '昨天 19:30',
        recordScene: '餐后 2 小时',
        statusText: '已记录',
        statusLevel: 'recorded',
        hasRecordAction: true,
        hasTrendAction: true,
        isDeviceCard: false
      },
      {
        type: 'uricAcid',
        name: '尿酸',
        displayValue: '360',
        unit: 'μmol/L',
        subValue: '',
        recordTime: '3 天前',
        recordScene: '日常',
        statusText: '正常范围',
        statusLevel: 'normal',
        hasRecordAction: true,
        hasTrendAction: true,
        isDeviceCard: false
      },
      {
        type: 'deviceStatus',
        name: '设备状态',
        displayValue: '',
        unit: '',
        subValue: '',
        recordTime: '',
        recordScene: '',
        statusText: '待完善',
        statusLevel: 'pending',
        hasRecordAction: false,
        hasTrendAction: false,
        isDeviceCard: true,
        deviceConnectedCount: 0,
        deviceStatusText: '未连接设备',
        deviceSubText: '建议添加测量设备',
        deviceHint: '推荐添加智能血压计'
      }
    ]
  }
};

// AI 快捷问题
const quickQuestions = [
  '最近有哪些指标需要关注？',
  '为什么我的血压最近需要关注？',
  '今天还缺哪些记录？',
  '帮我总结本周健康变化'
];

// AI 会话
const aiSessions = [];

module.exports = {
  members,
  metricTypes,
  healthRecords,
  deviceList,
  reminders,
  todayOverview,
  homeIndicators,
  todayReminders,
  quickQuestions,
  aiSessions,
  typeConfig,
  detailRecords,
  memberHomeData,
  recommendedDevices
};
