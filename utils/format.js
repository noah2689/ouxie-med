/* ═══════════════════════════════════════════════
   瓯械健康 — 工具函数
   ═══════════════════════════════════════════════ */

/**
 * 格式化日期为可读字符串
 * @param {string|Date} dateInput - ISO 日期字符串或 Date 对象
 * @param {string} format - 格式模板，默认 'YYYY-MM-DD'
 * @returns {string}
 */
function formatDate(dateInput, format) {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const fmt = format || 'YYYY-MM-DD';
  return fmt
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes);
}

/**
 * 格式化时间为简洁显示（今日/昨天/日期）
 * @param {string} dateInput - ISO 日期字符串
 * @returns {string}
 */
function formatRecordTime(dateInput) {
  const date = new Date(dateInput);
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const timeStr = hours + ':' + minutes;

  if (target.getTime() === today.getTime()) {
    return '今日 ' + timeStr;
  } else if (target.getTime() === yesterday.getTime()) {
    return '昨天 ' + timeStr;
  } else {
    return formatDate(date, 'MM 月 DD 日') + ' ' + timeStr;
  }
}

/**
 * 获取当前成员的指标数据
 * @param {string} memberId - 成员 ID
 * @param {Array} records - 健康记录列表
 * @param {string} metricType - 指标类型
 * @returns {Object|null}
 */
function getLatestRecord(memberId, records, metricType) {
  const filtered = records.filter(function (r) {
    return r.memberId === memberId && r.metricType === metricType;
  });
  if (filtered.length === 0) return null;
  return filtered.sort(function (a, b) {
    return new Date(b.recordTime) - new Date(a.recordTime);
  })[0];
}

/**
 * 获取日期分组标签（今天/昨天/更早）
 * @param {string} dateInput - ISO 日期字符串
 * @returns {string} "今天" | "昨天" | "更早"
 */
function getDateGroup(dateInput) {
  const date = new Date(dateInput);
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (target.getTime() === today.getTime()) {
    return '今天';
  } else if (target.getTime() === yesterday.getTime()) {
    return '昨天';
  } else {
    return '更早';
  }
}

module.exports = {
  formatDate,
  formatRecordTime,
  getLatestRecord,
  getDateGroup
};
