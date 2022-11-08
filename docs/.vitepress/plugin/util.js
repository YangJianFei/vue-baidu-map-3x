/**
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Friday, September 30th 2022, 5:52:00 pm
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 黑发
 */

export const showHolidayTheme = () => {
  try {
    const nowTime = new Date();
    const holidayStar = new Date(nowTime.getFullYear() + '/10/01 00:00:00').getTime();
    const holidayEnd = new Date(nowTime.getFullYear() + '/10/07 23:59:59').getTime();

    if (holidayStar < nowTime.getTime() && nowTime.getTime() < holidayEnd) {
      const $style = document.createElement('style');
      $style.innerHTML = `
        .theme .nav-bar,
        .theme .nav-bar .nav-dropdown-link .nav-dropdown-link-item {
          background: rgb(222, 41, 16);      
        }
        .theme .nav-bar .nav-bar-title,
        .theme .nav-bar .nav-links .item,
        .theme .nav-bar .nav-dropdown-link .button {
          color: rgb(255, 222, 0);
        }
        .theme .nav-bar .nav-links .icon.outbound,
        .theme .nav-bar .nav-links .title-append {
          color: white;
        }
        .theme .nav-bar .nav-links .item.active {
          border-color: white;
        }
        .theme .nav-bar .nav-bar-title::before {
          content: '⭐';
          display: inline-block;
          margin-right: 8px
        }
        .theme .nav-bar .nav-bar-title .logo {
          display: none;
        }
      `;

      const $head = document.querySelector('head');
      $head.append($style);
    }
  } catch { }
};

/**
 * YY YYYY
 * M MM
 * D DD
 * H HH
 * m mm
 * s ss
 * */
export const getFormartTime = (time, format = 'YYYY-MM-DD') => {
  if (time) {
    if (!time.getFullYear) {
      time = new Date(time);
    }
    const year = time.getFullYear() + '';
    const month = (time.getMonth() + 1) + '';
    const day = time.getDate() + '';
    const hour = time.getHours() + '';
    const minute = time.getMinutes() + '';
    const second = time.getSeconds() + '';
    const formatList = [
      { label: 'YYYY', value: year },
      { label: 'YY', value: year.substring(2) },
      { label: 'MM', value: month.padStart(2, '0') },
      { label: 'M', value: month },
      { label: 'HH', value: hour.padStart(2, '0') },
      { label: 'M', value: month },
      { label: 'DD', value: day.padStart(2, '0') },
      { label: 'D', value: day },
      { label: 'mm', value: minute.padStart(2, '0') },
      { label: 'm', value: minute },
      { label: 'ss', value: second.padStart(2, '0') },
      { label: 's', value: second }
    ];
    formatList.forEach(item => {
      format = format.replace(item.label, item.value);
    });
    return format
  } else {
    return '';
  }
}