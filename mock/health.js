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

// 健康记录（最简结构）
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
    statusText: '需要关注',
    statusLevel: 'attention',
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
    recordTime: '2026-06-10T07:00:00',
    recordScene: '空腹',
    statusText: '空腹记录',
    statusLevel: 'recorded',
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

// 提醒设置
const reminders = [
  {
    id: 'rem-001',
    memberId: 'self',
    memberName: '本人',
    metricType: 'bloodPressure',
    metricLabel: '血压',
    title: '晨起血压记录',
    time: '07:30',
    repeatText: '每天',
    enabled: true,
    statusText: '已开启',
    description: '每日晨起测量血压'
  },
  {
    id: 'rem-002',
    memberId: 'self',
    memberName: '本人',
    metricType: 'bloodGlucose',
    metricLabel: '血糖',
    title: '空腹血糖记录',
    time: '07:00',
    repeatText: '每天',
    enabled: true,
    statusText: '已开启',
    description: '每日空腹测量血糖'
  }
];

// 今日概览
const todayOverview = {
  attentionCount: 2,
  recordedCount: 3,
  lastSyncTime: '07:30',
  summary: '今日有 2 项指标需要关注',
  subText: '保持每日记录，及时了解健康趋势'
};

// 今日提醒
const todayReminders = [
  {
    id: 'today-rem-001',
    text: '血糖餐后 2 小时未记录',
    level: 'info'
  },
  {
    id: 'today-rem-002',
    text: '血压连续 3 天需要关注，建议记录',
    level: 'attention'
  },
  {
    id: 'today-rem-003',
    text: '尿酸记录还不连续，建议补充记录',
    level: 'info'
  }
];

// AI 快捷问题
const quickQuestions = [
  '最近有哪些指标需要关注？',
  '为什么我的血压最近需要关注？',
  '今天还缺哪些记录？',
  '帮我总结本周健康变化'
];

// AI 示例回话
const aiSessions = [];

module.exports = {
  members,
  metricTypes,
  healthRecords,
  deviceList,
  reminders,
  todayOverview,
  todayReminders,
  quickQuestions,
  aiSessions
};
