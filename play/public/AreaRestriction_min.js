/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-08-30 11:05:29
 * @LastEditTime: 2023-08-30 11:05:33
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\public\AreaRestriction_min.js
 */
/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-08-23 15:40:25
 * @LastEditTime: 2023-08-23 15:40:29
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\src\util\AreaRestriction_min.js
 */
var BMapLib = window.BMapLib = BMapLib || {}; (function () { var b = BMapLib.AreaRestriction = function () { }; var a = false; var c = null; var d = null; b.setBounds = function (f, e) { if (!f || !e || !(e instanceof BMap.Bounds)) { throw "\u8bf7\u68c0\u67e5\u4f20\u5165\u53c2\u6570\u503c\u7684\u5408\u6cd5\u6027"; return false } if (a) { this.clearBounds() } c = f; d = e; c.addEventListener("moveend", this._mapMoveendEvent); a = true; return true }; b._mapMoveendEvent = function (k) { if (d.containsBounds(c.getBounds())) { return } var i = c.getBounds(), h = i.getSouthWest(), g = i.getNorthEast(), m = d.getSouthWest(), j = d.getNorthEast(); var l = { n: 0, e: 0, s: 0, w: 0 }; l.n = (g.lat < j.lat) ? g.lat : j.lat; l.e = (g.lng < j.lng) ? g.lng : j.lng; l.s = (h.lat < m.lat) ? m.lat : h.lat; l.w = (h.lng < m.lng) ? m.lng : h.lng; var f = new BMap.Point(l.w + (l.e - l.w) / 2, l.s + (l.n - l.s) / 2); setTimeout(function () { c.panTo(f, { noAnimation: "no" }) }, 1) }; b.clearBounds = function () { if (!a) { return } c.removeEventListener("moveend", this._mapMoveendEvent); a = false } })();