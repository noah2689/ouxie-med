# 瓯械健康 — 高保真 UI 开发交接包

> 版本：v1.0 | 交接日期：2026-06-09  
> 前提：基于已确认的低保真结构与高保真 UI 设计规范 v1.1，所有高保真文件已完成收口复检  
> 后续开发：微信小程序原生（WXML / WXSS / JS）

---

## 一、项目定位

| 维度 | 说明 |
|---|---|
| 产品名称 | 瓯械健康 |
| 产品类型 | 微信小程序 — 健康指标记录管理工具 |
| 面向用户 | 个人及其家庭成员（本人/父亲/母亲） |
| 核心指标 | 血压、血糖、尿酸 |
| 核心闭环 | 记录数据 → 首页展示今日状态 → 提醒关注 → 查看详情/趋势 → AI 解读 → 持续管理 |
| 产品气质 | 轻医疗、可信、清爽、克制、数据导向、家庭健康管理、微信小程序原生感 |

**产品边界（不做）：**
- ❌ 不做健康资讯 App
- ❌ 不做在线问诊 / 医疗诊断
- ❌ 不做医院后台系统
- ❌ 不做运动健身 App
- ❌ 不做电商小程序（无商城/订单/优惠券/会员）
- ❌ 不做社区/社交（无动态/关注/粉丝）
- ❌ 不做用药建议/处方管理

---

## 二、页面与组件清单

| # | 文件名 | 类型 | 对应小程序路由/组件 | 入口来源 | 独立路由 | 开发备注 |
|---|---|---|---|---|---|---|
| 1 | `health-home-hifi.html` | 一级 Tab 页面 | `pages/health/index` | 底部 Tab「健康」 | ✅ 是 | 含内嵌成员选择弹窗 |
| 2 | `ai-assistant-hifi.html` | 一级 Tab 页面 | `pages/ai/index` | 底部 Tab「AI 助手」 | ✅ 是 | |
| 3 | `my-hifi.html` | 一级 Tab 页面 | `pages/my/index` | 底部 Tab「我的」 | ✅ 是 | |
| 4 | `health-detail-hifi.html` | 二级页面 | `pages/health-detail/index` | 首页指标卡片「趋势」 | ✅ 是 | 通过 type 参数复用为血压/血糖/尿酸 |
| 5 | `records-hifi.html` | 二级页面 | `pages/records/index` | 首页「全部记录 >」/ 详情页「查看全部 >」 | ✅ 是 | 支持指标筛选 |
| 6 | `device-hifi.html` | 二级页面 | `pages/device/index` | 首页设备状态卡 / 我的页面 | ✅ 是 | 非商城页 |
| 7 | `family-hifi.html` | 二级页面 | `pages/family/index` | 我的页面「家庭成员」| ✅ 是 | |
| 8 | `reminder-hifi.html` | 二级页面 | `pages/reminder/index` | 我的页面「提醒设置」| ✅ 是 | |
| 9 | `add-record-sheet-hifi.html` | 底部弹窗组件 | `components/add-record-sheet` | 首页/详情页「记录」或「+ 添加记录」 | ❌ 否 | 封装为组件 |
| 10 | `member-switch-sheet-hifi.html` | 底部弹窗组件 | `components/member-switch-sheet` | 首页顶部「本人 ▾」| ❌ 否 | 封装为组件 |
| 11 | `ai-drawer-hifi.html` | 左侧抽屉组件 | `components/ai-session-drawer` | AI 助手页「≡ 会话管理」| ❌ 否 | 封装为组件 |
| 12 | `design-spec.md` | 设计规范文件 | `styles/tokens.wxss` | 全局引用 | — | 已含完整 token 系统 |

---

## 三、建议的小程序目录映射

```
├─ app.json
├─ app.wxss                  ← tokens.wxss + common.wxss 全局引用
├─ app.js
│
├─ pages/
│  ├─ health/                ← health-home-hifi.html
│  │  └─ index.wxml / .wxss / .js / .json
│  ├─ ai/                    ← ai-assistant-hifi.html
│  │  └─ index.*
│  ├─ my/                    ← my-hifi.html
│  │  └─ index.*
│  ├─ health-detail/         ← health-detail-hifi.html (type=blood_pressure|glucose|uric_acid)
│  │  └─ index.*
│  ├─ records/               ← records-hifi.html
│  │  └─ index.*
│  ├─ device/                ← device-hifi.html
│  │  └─ index.*
│  ├─ family/                ← family-hifi.html
│  │  └─ index.*
│  └─ reminder/              ← reminder-hifi.html
│     └─ index.*
│
├─ components/
│  ├─ add-record-sheet/      ← add-record-sheet-hifi.html
│  │  └─ index.*
│  ├─ member-switch-sheet/   ← member-switch-sheet-hifi.html
│  │  └─ index.*
│  └─ ai-session-drawer/     ← ai-drawer-hifi.html
│     └─ index.*
│
└─ styles/
   ├─ tokens.wxss            ← 全局 CSS 变量（从 design-spec.md 色值映射）
   └─ common.wxss            ← 通用样式（卡片、按钮、标签、列表等）
```

**底部 Tab 配置（app.json）：**
```json
{
  "tabBar": {
    "list": [
      { "pagePath": "pages/health/index", "text": "健康", "iconPath": "..." },
      { "pagePath": "pages/ai/index", "text": "AI 助手", "iconPath": "..." },
      { "pagePath": "pages/my/index", "text": "我的", "iconPath": "..." }
    ]
  }
}
```

---

## 四、全局视觉规范

### 4.1 核心色值

```css
/* 品牌色 */
--brand:          #2EAB8A    /* 主品牌色 — 选中态、主按钮、AI 标识 */
--brand-soft:     #E8F6F1    /* 浅品牌底 */
--brand-press:    #269C7A    /* 按钮按压态 */
--surface-brand:  #F0F9F5    /* 品牌最浅底 — 标签/徽标 */

/* 页面背景 */
--bg-page:        #F5F6F8    /* 页面背景 */
--bg-card:        #FFFFFF    /* 卡片背景 */
--bg-input:       #F8F9FA    /* 输入框背景 */
--bg-press:       #F0F1F3    /* 列表按压态背景（小程序用 :active 而非 :hover）*/
--bg-overlay:     rgba(0,0,0,0.4)  /* 遮罩层 */
--bg-tab-bar:     #FFFFFF    /* 底部 Tab 栏背景 */
--bg-nav-bar:     #FFFFFF    /* 导航栏背景 */

/* 文字色 */
--fg-primary:     #1A1A2E    /* 主标题 / 核心数据 — 近黑色 */
--fg-body:        #4A4A5A    /* 正文说明 */
--fg-secondary:   #8E8E9A    /* 次级信息 / 辅助文字 */
--fg-placeholder: #B8B8C4    /* 占位文字 */
--fg-disabled:    #C8C8D4    /* 禁用态 */
--fg-on-brand:    #FFFFFF    /* 品牌色背景上的文字 */

/* 边框 */
--border-card:    #E8E8EE    /* 卡片边框 */
--border-input:   #D8D8E0    /* 输入框边框 */

/* 图表色系 */
--chart-bp-sys:   #4A8C9E    /* 收缩压线 — 深蓝绿 */
--chart-bp-dia:   #8AB8C8    /* 舒张压线 — 浅蓝绿 */
--chart-glucose:  #8A9BB5    /* 血糖点 — 灰蓝 */
--chart-uric:     #B0907A    /* 尿酸线 — 浅棕褐 */
--chart-exceed:   #E8913A    /* 关注数据点 — 琥珀橙 */
```

### 4.2 状态标签色

| 状态 | 色值 | 场景 |
|---|---|---|
| 需要关注 | `#E8913A` 琥珀橙 | 指标需要关注、趋势需持续观察 |
| 待观察 | `#8A9BB5` 灰蓝 | 单次偏离但不确认趋势 |
| 正常范围 | `#5B9E7A` 柔和绿 | 数值在合理范围内 |
| 已记录 / 空腹记录 | `#7A8C9E` 中性灰蓝 | 已录入 |
| 待完善 / 记录较少 | `#B0A090` 浅灰褐 | 数据连续性不足 |
| 已连接 | `#5B9E7A` 柔和绿 | 设备已连接 |
| 未连接 / 未添加 | `#C0C0C8` 浅灰 | 设备未连接 |
| 当前查看 / 默认成员 | `#2EAB8A` 品牌绿 | 成员选中态 |

**使用限制：** 同一屏琥珀橙高亮点 ≤ 2～3 个，其余用灰阶弱标签。

### 4.3 字号层级

| 层级 | 字号 | 字重 | 场景 |
|---|---|---|---|
| 导航栏标题 | 17px | 600 | 页面标题 |
| 模块标题 | 16px | 600 | 各模块标题 |
| 核心数据 | 36px | 700 | 详情页测量值 |
| 概览数字 | 22px | 700 | 首页统计数字 |
| 卡片数值 | 24px | 700 | 首页指标卡片数值 |
| 数据单位 | 11–12px | 400 | 数值后的单位 |
| 正文 | 14px | 400 | 说明文字、表单标签 |
| 次级信息 | 12px | 400 | 时间、辅助说明 |
| 标签文字 | 11px | 500 | 状态标签 |
| 按钮文字 | 14px | 500 | 按钮文字 |
| 输入框文字 | 14px | 400 | 表单输入 |
| 底部 Tab | 10px | 500 | Tab 标签 |
| 占位文字 | 13px | 400 | placeholder |

所有健康数值设置 `font-variant-numeric: tabular-nums`。

### 4.4 间距规范

| 属性 | 值 |
|---|---|
| 页面左右边距 | 16px |
| 模块间垂直间距 | 12px |
| 卡片内边距 | 14–16px |
| 列表项间距 | 10–12px |
| 标签间距 | 6–8px |

### 4.5 圆角规范

| 层级 | 值 | 场景 |
|---|---|---|
| 卡片 | 12px | 首页/详情页卡片 |
| 弹窗顶部 | 16–20px | 底部弹窗 |
| 按钮 | 8px | 主/次按钮 |
| 输入框 | 8px | 表单输入 |
| 标签 | 4px（或 12px） | 状态标签、pill |
| 小图标 | 50% | 头像、圆形标识 |

### 4.6 阴影规范

```css
--shadow-card:   0 1px 3px rgba(0,0,0,0.04);   /* 卡片阴影 */
--shadow-raised: 0 2px 8px rgba(0,0,0,0.08);   /* 弹窗/抽屉阴影 */
```

- 所有卡片使用极轻阴影，不超过 2 个阴影层级
- 不使用 neumorphism / glassmorphism

### 4.7 按压态（替代 hover）

微信小程序不识别 CSS `:hover`，请使用：

```css
/* 示例：列表项按压态 */
.list-item:active {
  background: var(--bg-press);
}

/* 示例：按钮按压态 */
.btn-primary:active {
  background: var(--brand-press);
}
```

---

## 五、核心数据对象建议

### 5.1 Member（成员）

```javascript
{
  id: string,            // 成员唯一标识
  name: string,          // 显示名称："本人" / "父亲" / "母亲"
  relation: string,      // 关系："本人" / "父亲" / "母亲"
  avatarText: string,    // 头像文字（单字）："本" / "父" / "母"
  age: number,           // 年龄：32 / 61 / 58
  gender: string,        // "男" / "女"
  isDefault: boolean,    // 是否为默认查看成员
  recentRecordText: string, // 最近记录时间描述
  healthFocus: string[], // 血压 / 血糖 / 尿酸
  status: string,        // "默认成员" / "已添加" / "待完善" / "记录较少"
  lastRecordTime: string // ISO 时间戳
}
```

### 5.2 HealthMetric（今日指标）

```javascript
{
  type: string,          // "blood_pressure" / "glucose" / "uric_acid"
  name: string,          // "血压" / "血糖" / "尿酸"
  value: string,         // 主数值："128 / 82" / "6.2" / "428"
  unit: string,          // "mmHg" / "mmol/L" / "μmol/L"
  subValue: string|null, // 脉搏："72 bpm"（仅血压）
  recordTime: string,    // 时间： "今日 07:30" / "昨天 20:00"
  recordScene: string,   // 测量场景："晨起" / "空腹" / "睡前" / "餐后2小时"
  statusText: string,    // "需要关注" / "空腹记录" / "待观察" / "正常范围"
  statusLevel: string,   // "attention" / "info" / "normal"
  trendSummary: string,  // 趋势结论（可选）
  hasRecordAction: boolean,  // 是否有"记录"按钮
  hasTrendAction: boolean    // 是否有"趋势"按钮
}
```

### 5.3 HealthRecord（历史记录）

```javascript
{
  id: string,
  memberId: string,
  metricType: string,    // "blood_pressure" / "glucose" / "uric_acid"
  // 血压额外字段
  systolic: number|null,    // 收缩压
  diastolic: number|null,   // 舒张压
  pulse: number|null,       // 脉搏
  // 血糖/尿酸字段
  value: number|null,
  unit: string,          // "mmHg" / "mmol/L" / "μmol/L"
  recordTime: string,    // ISO 时间戳
  recordScene: string,   // "晨起" / "睡前" / "日常" / "空腹" / "餐前" / "餐后2小时" / "随机"
  statusText: string,    // "需要关注" / "正常范围" / "空腹记录" / "待观察"
  statusLevel: string,
  remark: string         // 备注文本
}
```

### 5.4 Device（设备）

```javascript
{
  id: string,
  name: string,              // "智能血压计" / "智能血糖仪" / "智能尿酸仪"
  type: string,              // "blood_pressure" / "glucose" / "uric_acid"
  typeLabel: string,         // "血压设备" / "血糖设备" / "尿酸设备"
  connectedStatus: string,   // "connected" / "disconnected" / "not_added" / "optional"
  statusText: string,        // "已连接" / "未连接" / "推荐添加" / "可选设备"
  statusLevel: string,       // "ok" / "info" / "pending" / "muted"
  lastSyncText: string,      // "今日 07:30" / "暂无" / —
  description: string,       // 设备说明文字
  actions: [{                // 可用的操作
    label: string,           // "同步" / "解绑" / "连接" / "添加设备" / "了解设备"
    type: string             // "primary" / "secondary" / "danger"
  }]
}
```

### 5.5 Reminder（提醒）

```javascript
{
  id: string,
  memberId: string,
  memberName: string,      // "本人" / "父亲"
  metricType: string,
  metricLabel: string,     // "血压" / "血糖"
  title: string,           // "晨起血压记录" / "空腹血糖记录"
  time: string,            // "07:30" / "07:00" / "21:00"
  repeatText: string,      // "每天"
  enabled: boolean,
  statusText: string,      // "已开启" / "已关闭"
  description: string      // 说明文案
}
```

### 5.6 AiSession（AI 会话）

```javascript
{
  id: string,
  title: string,           // "最近血压趋势" / "血糖记录建议"
  summary: string,         // 会话摘要
  timeText: string,        // "今天 09:12" / "昨天 20:30" / "6月8日"
  tagText: string,         // "当前会话" / "已记录" / "记录较少"
  isCurrent: boolean,
  messages: [{             // 消息列表（参考 AI 助手页对话结构）
    role: "ai" | "user",
    content: string,
    structured?: {         // AI 结构化回复（可选）
      conclusion: string,
      dataPoints: string[],
      suggestions: string[],
      note: string
    }
  }]
}
```

---

## 六、交互占位说明

当前阶段所有交互均为 console.log 占位，不接入真实 API、不做页面跳转。后续开发按以下清单替换为小程序路由或真实状态管理。

### 6.1 首页（health-home-hifi.html）

| 交互 | console.log 内容 | 替换目标 |
|---|---|---|
| 成员切换「本人 ▾」 | `[弹窗占位] 打开成员快捷选择` | 打开 member-switch-sheet 组件 |
| AI 解读入口 | `[导航占位] AI 解读今日健康数据 → AI 健康助手页` | `wx.navigateTo` → AI 助手页 |
| 指标「记录」 | `[弹窗占位] 打开添加{指标}记录弹窗` | 打开 add-record-sheet 组件（type 参数） |
| 指标「趋势」 | `[导航占位] {指标}「趋势」→ {指标}详情页` | `wx.navigateTo` → health-detail 页 |
| 今日提醒「全部记录 >」 | `[导航占位] 全部记录 > → 全部记录页` | `wx.navigateTo` → records 页 |
| 设备状态「管理设备」 | `[导航占位] 管理设备 → 设备管理页` | `wx.navigateTo` → device 页 |
| 提醒入口 | `[导航占位] 提醒 → 提醒设置页` | `wx.navigateTo` → reminder 页 |
| Tab「AI 助手」 | `[Tab 占位] 切换到 AI 助手` | `wx.switchTab` |
| Tab「我的」 | `[Tab 占位] 切换到我的页面` | `wx.switchTab` |

### 6.2 详情页（health-detail-hifi.html）

| 交互 | console.log 内容 | 替换目标 |
|---|---|---|
| 返回按钮 | `[导航占位] {指标}详情返回首页` | `wx.navigateBack` |
| + 添加记录 | `[弹窗占位] 打开添加{指标}记录弹窗` | 打开 add-record-sheet 组件 |
| 查看全部 > | `[导航占位] 查看全部记录，筛选：{指标}` | `wx.navigateTo` → records 页（带 type 参数） |
| 筛选 pill | 切换选中态 | 本地状态切换 |
| 历史记录点击 | `[导航占位] 查看{指标}记录详情` | 后续可扩展 |

### 6.3 添加记录弹窗（add-record-sheet-hifi.html）

| 交互 | console.log 内容 | 替换目标 |
|---|---|---|
| 关闭/取消 | `[弹窗占位] 关闭/取消添加记录` | 关闭弹窗 |
| 保存 | `[弹窗占位] 保存记录` | 调用 API 保存记录 |
| 测量时间 | `[弹窗占位] 打开时间选择器` | 打开微信原生时间选择器 |
| 前往设备管理 | `[导航占位] 前往设备管理页` | `wx.navigateTo` → device 页 |
| 设备同步 | `[设备占位] 同步设备数据` | 调用蓝牙/蓝牙API |

### 6.4 全部记录页（records-hifi.html）

| 交互 | console.log 内容 | 替换目标 |
|---|---|---|
| 返回按钮 | `[导航占位] 全部记录返回上一页` | `wx.navigateBack` |
| 指标筛选 | `[筛选切换] 指标：全部/血压/血糖/尿酸` | 刷新列表数据 |
| 时间筛选 | `[筛选切换] 时间：近7天/近30天/近90天` | 刷新列表数据 |
| 记录点击 | `[导航占位] 查看记录详情` | 后续可扩展 |

### 6.5 设备管理页（device-hifi.html）

| 交互 | console.log 内容 | 替换目标 |
|---|---|---|
| 返回按钮 | `[导航占位] 设备管理返回上一页` | `wx.navigateBack` |
| 同步 | `[设备占位] 同步{设备名}数据` | 调用蓝牙同步 |
| 解绑 | `[设备占位] 解绑{设备名}` | 调用解绑 API |
| 连接 | `[设备占位] 连接{设备名}` | 打开蓝牙扫描 |
| 添加设备 | `[设备占位] 添加{设备名}` | 调用添加 API |
| 引导卡添加按钮 | `[设备占位] 添加健康设备` | 打开设备列表 |

### 6.6 我的页面（my-hifi.html）

| 交互 | console.log 内容 | 替换目标 |
|---|---|---|
| 家庭成员 | `[导航占位] 进入家庭成员页` | `wx.navigateTo` → family 页 |
| 提醒设置 | `[导航占位] 进入提醒设置页` | `wx.navigateTo` → reminder 页 |
| 设备管理 | `[导航占位] 进入设备管理页` | `wx.navigateTo` → device 页 |
| 全部记录 | `[导航占位] 进入全部记录页` | `wx.navigateTo` → records 页 |
| Tab 切换 | `[Tab 占位] 切换到{页面}` | `wx.switchTab` |

### 6.7 家庭成员页（family-hifi.html）

| 交互 | console.log 内容 | 替换目标 |
|---|---|---|
| 返回按钮 | `[导航占位] 家庭成员返回上一页` | `wx.navigateBack` |
| 切换查看成员 | `[成员占位] 切换查看{成员名}` | 切换全局当前成员并返回首页 |
| 查看记录 | `[导航占位] 查看成员记录` | `wx.navigateTo` → records 页（带 member 参数） |
| 完善资料 | `[导航占位] 完善成员资料` | 后续扩展 |
| 添加成员 | `[弹窗占位] 打开添加家庭成员` | 后续扩展 |

### 6.8 提醒设置页（reminder-hifi.html）

| 交互 | console.log 内容 | 替换目标 |
|---|---|---|
| 返回按钮 | `[导航占位] 提醒设置返回上一页` | `wx.navigateBack` |
| 提醒卡片点击 | `[提醒占位] 查看{提醒名}提醒` | 进入编辑态 |
| 开关切换 | `[提醒占位] 切换提醒开关` | 调用更新开关 API |
| 添加提醒 | `[弹窗占位] 打开添加提醒` | 后续扩展 |

### 6.9 AI 助手页（ai-assistant-hifi.html）

| 交互 | console.log 内容 | 替换目标 |
|---|---|---|
| 快捷问题 | `[AI 占位] 点击快捷问题：{问题文案}` | 填入输入框并调用 AI API |
| 发送按钮 | `[AI 占位] 发送健康问题` | 调用 AI API |
| Tab 切换 | `[Tab 占位] 切换到{页面}` | `wx.switchTab` |

### 6.10 AI 会话抽屉（ai-drawer-hifi.html）

| 交互 | console.log 内容 | 替换目标 |
|---|---|---|
| 遮罩/关闭 | `[抽屉占位] 关闭 AI 会话抽屉` | 关闭抽屉动画 |
| 新建会话 | `[AI 占位] 新建 AI 会话` | 清空对话并切换 |
| 切换会话 | `[AI 占位] 切换会话：{会话标题}` | 加载该会话消息列表 |
| 清理历史 | `[AI 占位] 清理历史会话` | 调用清理 API |

### 6.11 成员快捷选择弹窗（member-switch-sheet-hifi.html）

| 交互 | console.log 内容 | 替换目标 |
|---|---|---|
| 遮罩/关闭 | `[弹窗占位] 关闭成员快捷选择` | 关闭弹窗 |
| 切换成员 | `[成员占位] 切换查看{成员名}` | 切换全局当前成员，更新首页数据 |
| 管理家庭成员 | `[导航占位] 进入家庭成员页` | `wx.navigateTo` → family 页 |

---

## 七、健康文案安全规范

### 7.1 禁止词表

以下词语**严禁**出现在界面文案中：

| 禁止词 | 原因 | 替换为 |
|---|---|---|
| 异常 | 医疗诊断感过强 | 需要关注 |
| 偏高 / 略高 | 医疗判断口吻 | 需要关注 / 建议观察 |
| 诊断 | 超出产品边界（非医疗产品） | — |
| 治疗 | 超出产品边界 | — |
| 用药 | 超出产品边界（不做用药管理） | — |
| 处方 | 超出产品边界 | — |
| 高血压 / 糖尿病 / 痛风 | 疾病名称，不应在界面上直接使用 | 血压关注 / 血糖关注 / 尿酸关注 |
| 复查 | 偏医疗化 | 记录 / 测量 |
| 患者 | 医疗化表述 | 用户 / 成员 |
| 病情 | 医疗化表述 | 情况 / 状态 |

### 7.2 推荐词表

| 推荐使用 | 使用场景 |
|---|---|
| 需要关注 | 指标需要关注或趋势需持续观察时 |
| 待观察 | 单次偏离但不确认趋势 |
| 已记录 | 已录入，无特殊判断 |
| 空腹记录 | 血糖空腹场景 |
| 记录较少 | 数据连续性不足 |
| 建议继续记录 | 鼓励性提示 |
| 建议保持固定周期测量 | 健康管理建议 |
| 正常范围 | 数值在合理范围内（完整使用，不可简化为"正常"）|
| 仅供参考 | AI 回复/免责声明 |
| 如有不适请咨询专业人士 | 免责声明 |

### 7.3 「正常」的使用例外

「正常」仅允许用于**设备工作状态**描述，例如：
- ✅ `数据同步正常`（设备状态）
- ✅ `血压计正常同步`（设备状态）

健康指标状态建议使用 `正常范围`（完整词组，不带诊断判断感）。

---

## 八、开发注意事项

### 8.1 高保真文件与小程序的区别

1. **不要照搬 phone 外壳**：高保真文件中的 `.phone { width:390px; height:844px; margin:auto }` 仅为演示容器。小程序中应使用真实页面宽度和安全区，不套用 phone 容器。

2. **导航栏处理**：高保真中的 `.status-bar` 和 `.nav` 是小程序系统导航栏的视觉模拟。开发时使用 `"navigationStyle":"custom"` 或保留原生导航栏，不直接复制 HTML 结构。

3. **安全区适配**：底部弹窗和 Tab 栏在小程序中需适配 `safe-area-inset-bottom`（iPhone X 系列底部安全区）。

4. **胶囊按钮**：高保真中右侧的 `.n-capsule` 是微信胶囊按钮占位。开发时保留原生胶囊，不自行绘制。

### 8.2 组件化建议

| 组件 | 建议方式 | 说明 |
|---|---|---|
| 添加记录底部弹窗 | 自定义组件 `<add-record-sheet>` | 通过 type 参数控制血压/血糖/尿酸 |
| 成员快捷选择弹窗 | 自定义组件 `<member-switch-sheet>` | 通过成员列表 prop 传入 |
| AI 会话抽屉 | 自定义组件 `<ai-session-drawer>` | 左侧滑出动画 + 遮罩 |
| 状态标签 | 自定义组件 `<status-tag>` | prop：text / level / type |
| 指标卡片 | 自定义组件 `<metric-card>` | prop：metricType / data |
| 设备卡片 | 自定义组件 `<device-card>` | prop：device / actions |

### 8.3 页面复用策略

- **health-detail 页面**：通过 `type` 参数复用为 3 种指标详情（血压/血糖/尿酸），共享页面结构模板，差异部分通过条件渲染实现
- **筛选组件**：首页、详情页、全部记录页的筛选 pill 复用同一组件

### 8.4 边界与约束

- 不要新增高保真中未设计的页面或功能
- 不要把 `add-record-sheet` / `member-switch-sheet` / `ai-session-drawer` 作为独立路由页面
- 不要引入医疗诊断表达（见第 7 节禁止词表）
- 不要新增商城、问诊、社区、资讯流等超出产品边界的功能
- 底部 Tab 固定 3 个（健康/AI 助手/我的），不要新增或减少

### 8.5 性能建议

- 建议使用 `wx.setNavigationBarTitle` 设置标题，不自定义整条导航栏
- 首页首屏优先渲染概览卡片和指标卡片（优先级最高的 2 个模块）
- 健康设备推荐和今日提醒模块可延迟渲染或懒加载
- AI 会话抽屉使用 hidden 切换而非 wx:if（保留 DOM 避免重绘）

### 8.6 全局状态建议

建议维护以下全局状态：

```javascript
// app.js 全局数据
globalData: {
  currentMember: {          // 当前查看的成员
    id: 'default',
    name: '本人',
    relation: '本人'
  },
  members: [],              // 全部家庭成员列表
  deviceList: [],           // 设备列表
  metricData: {             // 各指标数据缓存
    blood_pressure: {},
    glucose: {},
    uric_acid: {}
  },
  aiSessions: []            // AI 会话列表
}
```

---

## 九、是否进入开发阶段

**结论：可以进入开发交接。**

### 交接前提确认

| 检查项 | 状态 |
|---|---|
| 11 个核心页面高保真完成 | ✅ |
| 2 个底部弹窗 + 1 个左侧抽屉高保真完成 | ✅ |
| 所有页面/组件设计规范统一（色值/字号/间距/圆角） | ✅ |
| 交互占位仅使用 console.log，无真实 API | ✅ |
| 去医疗化文案收口完成 | ✅ |
| 命名体系统一（本人/父亲/母亲） | ✅ |
| 无功能越界 | ✅ |
| 底部 Tab 结构确认 3 个 | ✅ |
| 高保真收口复检通过 | ✅ |

### 开发阶段注意事项

1. 以高保真 HTML 为视觉参考，以本交接包为结构参考
2. 视觉 Token 从 `design-spec.md` 映射到 `tokens.wxss`
3. 组件封装见 8.2 节建议
4. console.log 占位按 6.1–6.11 节替换为小程序 API
5. 不再进行新的功能扩展和设计轮次
