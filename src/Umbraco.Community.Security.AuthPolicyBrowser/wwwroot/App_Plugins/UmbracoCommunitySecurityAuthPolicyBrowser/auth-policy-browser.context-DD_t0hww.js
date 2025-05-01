var H = Object.defineProperty;
var z = (t) => {
  throw TypeError(t);
};
var J = (t, s, e) => s in t ? H(t, s, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[s] = e;
var V = (t, s, e) => J(t, typeof s != "symbol" ? s + "" : s, e), N = (t, s, e) => s.has(t) || z("Cannot " + e);
var o = (t, s, e) => (N(t, s, "read from private field"), e ? e.call(t) : s.get(t)), d = (t, s, e) => s.has(t) ? z("Cannot add the same private member more than once") : s instanceof WeakSet ? s.add(t) : s.set(t, e), f = (t, s, e, l) => (N(t, s, "write to private field"), l ? l.call(t, e) : s.set(t, e), e);
import { UmbContextToken as Q } from "@umbraco-cms/backoffice/context-api";
import { UmbControllerBase as k } from "@umbraco-cms/backoffice/class-api";
import { UmbArrayState as $, UmbStringState as G, UmbNumberState as x } from "@umbraco-cms/backoffice/observable-api";
import { query as Y } from "@umbraco-cms/backoffice/router";
import { D as X } from "./bundle.manifests-D3jbIH9z.js";
var Z = /\{[^{}]+\}/g, R = ({ allowReserved: t, name: s, value: e }) => {
  if (e == null) return "";
  if (typeof e == "object") throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
  return `${s}=${t ? e : encodeURIComponent(e)}`;
}, K = (t) => {
  switch (t) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, M = (t) => {
  switch (t) {
    case "form":
      return ",";
    case "pipeDelimited":
      return "|";
    case "spaceDelimited":
      return "%20";
    default:
      return ",";
  }
}, ee = (t) => {
  switch (t) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, W = ({ allowReserved: t, explode: s, name: e, style: l, value: n }) => {
  if (!s) {
    let a = (t ? n : n.map((u) => encodeURIComponent(u))).join(M(l));
    switch (l) {
      case "label":
        return `.${a}`;
      case "matrix":
        return `;${e}=${a}`;
      case "simple":
        return a;
      default:
        return `${e}=${a}`;
    }
  }
  let i = K(l), r = n.map((a) => l === "label" || l === "simple" ? t ? a : encodeURIComponent(a) : R({ allowReserved: t, name: e, value: a })).join(i);
  return l === "label" || l === "matrix" ? i + r : r;
}, I = ({ allowReserved: t, explode: s, name: e, style: l, value: n }) => {
  if (n instanceof Date) return `${e}=${n.toISOString()}`;
  if (l !== "deepObject" && !s) {
    let a = [];
    Object.entries(n).forEach(([m, h]) => {
      a = [...a, m, t ? h : encodeURIComponent(h)];
    });
    let u = a.join(",");
    switch (l) {
      case "form":
        return `${e}=${u}`;
      case "label":
        return `.${u}`;
      case "matrix":
        return `;${e}=${u}`;
      default:
        return u;
    }
  }
  let i = ee(l), r = Object.entries(n).map(([a, u]) => R({ allowReserved: t, name: l === "deepObject" ? `${e}[${a}]` : a, value: u })).join(i);
  return l === "label" || l === "matrix" ? i + r : r;
}, te = ({ path: t, url: s }) => {
  let e = s, l = s.match(Z);
  if (l) for (let n of l) {
    let i = !1, r = n.substring(1, n.length - 1), a = "simple";
    r.endsWith("*") && (i = !0, r = r.substring(0, r.length - 1)), r.startsWith(".") ? (r = r.substring(1), a = "label") : r.startsWith(";") && (r = r.substring(1), a = "matrix");
    let u = t[r];
    if (u == null) continue;
    if (Array.isArray(u)) {
      e = e.replace(n, W({ explode: i, name: r, style: a, value: u }));
      continue;
    }
    if (typeof u == "object") {
      e = e.replace(n, I({ explode: i, name: r, style: a, value: u }));
      continue;
    }
    if (a === "matrix") {
      e = e.replace(n, `;${R({ name: r, value: u })}`);
      continue;
    }
    let m = encodeURIComponent(a === "label" ? `.${u}` : u);
    e = e.replace(n, m);
  }
  return e;
}, F = ({ allowReserved: t, array: s, object: e } = {}) => (l) => {
  let n = [];
  if (l && typeof l == "object") for (let i in l) {
    let r = l[i];
    if (r != null) {
      if (Array.isArray(r)) {
        n = [...n, W({ allowReserved: t, explode: !0, name: i, style: "form", value: r, ...s })];
        continue;
      }
      if (typeof r == "object") {
        n = [...n, I({ allowReserved: t, explode: !0, name: i, style: "deepObject", value: r, ...e })];
        continue;
      }
      n = [...n, R({ allowReserved: t, name: i, value: r })];
    }
  }
  return n.join("&");
}, se = (t) => {
  if (!t) return;
  let s = t.split(";")[0].trim();
  if (s.startsWith("application/json") || s.endsWith("+json")) return "json";
  if (s === "multipart/form-data") return "formData";
  if (["application/", "audio/", "image/", "video/"].some((e) => s.startsWith(e))) return "blob";
  if (s.startsWith("text/")) return "text";
}, re = ({ baseUrl: t, path: s, query: e, querySerializer: l, url: n }) => {
  let i = n.startsWith("/") ? n : `/${n}`, r = t + i;
  s && (r = te({ path: s, url: r }));
  let a = e ? l(e) : "";
  return a.startsWith("?") && (a = a.substring(1)), a && (r += `?${a}`), r;
}, D = (t, s) => {
  var l;
  let e = { ...t, ...s };
  return (l = e.baseUrl) != null && l.endsWith("/") && (e.baseUrl = e.baseUrl.substring(0, e.baseUrl.length - 1)), e.headers = L(t.headers, s.headers), e;
}, L = (...t) => {
  let s = new Headers();
  for (let e of t) {
    if (!e || typeof e != "object") continue;
    let l = e instanceof Headers ? e.entries() : Object.entries(e);
    for (let [n, i] of l) if (i === null) s.delete(n);
    else if (Array.isArray(i)) for (let r of i) s.append(n, r);
    else i !== void 0 && s.set(n, typeof i == "object" ? JSON.stringify(i) : i);
  }
  return s;
}, E = class {
  constructor() {
    V(this, "_fns");
    this._fns = [];
  }
  clear() {
    this._fns = [];
  }
  exists(t) {
    return this._fns.indexOf(t) !== -1;
  }
  eject(t) {
    let s = this._fns.indexOf(t);
    s !== -1 && (this._fns = [...this._fns.slice(0, s), ...this._fns.slice(s + 1)]);
  }
  use(t) {
    this._fns = [...this._fns, t];
  }
}, ae = () => ({ error: new E(), request: new E(), response: new E() }), ne = { bodySerializer: (t) => JSON.stringify(t) }, le = F({ allowReserved: !1, array: { explode: !0, style: "form" }, object: { explode: !0, style: "deepObject" } }), ie = { "Content-Type": "application/json" }, B = (t = {}) => ({ ...ne, baseUrl: "", fetch: globalThis.fetch, headers: ie, parseAs: "auto", querySerializer: le, ...t }), oe = (t = {}) => {
  let s = D(B(), t), e = () => ({ ...s }), l = (r) => (s = D(s, r), e()), n = ae(), i = async (r) => {
    let a = { ...s, ...r, headers: L(s.headers, r.headers) };
    a.body && a.bodySerializer && (a.body = a.bodySerializer(a.body)), a.body || a.headers.delete("Content-Type");
    let u = re({ baseUrl: a.baseUrl ?? "", path: a.path, query: a.query, querySerializer: typeof a.querySerializer == "function" ? a.querySerializer : F(a.querySerializer), url: a.url }), m = { redirect: "follow", ...a }, h = new Request(u, m);
    for (let b of n.request._fns) h = await b(h, a);
    let q = a.fetch, c = await q(h);
    for (let b of n.response._fns) c = await b(c, h, a);
    let y = { request: h, response: c };
    if (c.ok) {
      if (c.status === 204 || c.headers.get("Content-Length") === "0") return { data: {}, ...y };
      if (a.parseAs === "stream") return { data: c.body, ...y };
      let b = (a.parseAs === "auto" ? se(c.headers.get("Content-Type")) : a.parseAs) ?? "json", _ = await c[b]();
      return b === "json" && a.responseTransformer && (_ = await a.responseTransformer(_)), { data: _, ...y };
    }
    let p = await c.text();
    try {
      p = JSON.parse(p);
    } catch {
    }
    let T = p;
    for (let b of n.error._fns) T = await b(p, c, h, a);
    if (T = T || {}, a.throwOnError) throw T;
    return { error: T, ...y };
  };
  return { connect: (r) => i({ ...r, method: "CONNECT" }), delete: (r) => i({ ...r, method: "DELETE" }), get: (r) => i({ ...r, method: "GET" }), getConfig: e, head: (r) => i({ ...r, method: "HEAD" }), interceptors: n, options: (r) => i({ ...r, method: "OPTIONS" }), patch: (r) => i({ ...r, method: "PATCH" }), post: (r) => i({ ...r, method: "POST" }), put: (r) => i({ ...r, method: "PUT" }), request: i, setConfig: l, trace: (r) => i({ ...r, method: "TRACE" }) };
};
const ce = oe(B());
class ue {
  static getActions(s) {
    return ((s == null ? void 0 : s.client) ?? ce).get({
      ...s,
      url: "/umbraco/umbracocommunitysecurityauthpolicybrowser/api/v1/actions"
    });
  }
}
const ye = new Q("AuthPolicyBrowserContext");
var w, g, A, v, S, O, j, P, U, C;
class we extends k {
  constructor() {
    super(...arguments);
    d(this, w);
    d(this, g);
    d(this, A);
    d(this, v);
    d(this, S);
    d(this, O);
    d(this, j);
    d(this, P);
    d(this, U);
    d(this, C);
    f(this, w, new $([], (e) => e)), this.assemblyFilter = o(this, w).asObservable(), f(this, g, new $([], (e) => e)), this.policyFilter = o(this, g).asObservable(), f(this, A, new $([], (e) => e)), this.allowAnonymousFilter = o(this, A).asObservable(), f(this, v, new G("")), this.searchQuery = o(this, v).asObservable(), f(this, S, new x(1)), this.currentPage = o(this, S).asObservable(), f(this, O, new x(X)), this.pageSize = o(this, O).asObservable(), f(this, j, new $([], (e) => e)), this.allActions = o(this, j).asObservable(), f(this, P, new $([], (e) => e)), this.filteredActionsPage = o(this, P).asObservable(), f(this, U, new x(0)), this.filteredActionsTotal = o(this, U).asObservable(), f(this, C, () => {
      const e = Y(), l = e.assemblies ? e.assemblies.split(",") : [];
      o(this, w).setValue(l);
      const n = e.policies ? e.policies.split(",") : [];
      o(this, g).setValue(n);
      const i = e.allowAnonymous ? e.allowAnonymous.split(",") : [];
      o(this, A).setValue(i);
      const r = e.q ? e.q : "";
      o(this, v).setValue(r);
      const a = e.page ? Number(e.page) : 1;
      o(this, S).setValue(a);
      const u = e.pageSize ? Number(e.pageSize) : 10;
      o(this, O).setValue(u), this.filterAndPageActions();
    });
  }
  /**
   * Get all actions from the backend API.
   * Filtering and pagination happens on the client-side.
   */
  async getActions() {
    const { data: e, error: l } = await ue.getActions();
    if (l) {
      console.error(l);
      return;
    }
    e && (o(this, j).setValue(e), this.filterAndPageActions());
  }
  /**
   * Filter and paginate the actions based on the currently applied filters.
   */
  filterAndPageActions() {
    const e = o(this, j).getValue(), l = o(this, w).getValue(), n = o(this, g).getValue(), i = o(this, A).getValue(), r = o(this, v).getValue().toLowerCase(), a = e.filter(
      (c) => {
        var y;
        return (l.length === 0 || l.includes(c.assemblyName)) && (n.length === 0 || c.controllerPolicies.some((p) => n.includes(p)) || c.actionPolicies.some((p) => n.includes(p)) || n.includes("None") && c.controllerPolicies.length === 0 && c.actionPolicies.length === 0) && (i.length === 0 || i.includes("Yes") && (c.controllerAllowAnonymous || c.actionAllowAnonymous) || i.includes("No") && !(c.controllerAllowAnonymous || c.actionAllowAnonymous)) && (r.length === 0 || c.controllerName.toLowerCase().includes(r) || c.actionName.toLowerCase().includes(r) || ((y = c.template) == null ? void 0 : y.toLowerCase().includes(r)));
      }
    ), u = o(this, S).getValue(), m = o(this, O).getValue(), h = (u - 1) * m, q = a.slice(h, h + m);
    o(this, P).setValue(q), o(this, U).setValue(a.length);
  }
  /**
   * Attach event listener for when query string changes.
   */
  hostConnected() {
    super.hostConnected(), window.addEventListener("changestate", o(this, C)), o(this, C).call(this);
  }
  /**
   * Remove event listener for when query string changes.
   */
  hostDisconnected() {
    super.hostDisconnected(), window.removeEventListener("changestate", o(this, C));
  }
}
w = new WeakMap(), g = new WeakMap(), A = new WeakMap(), v = new WeakMap(), S = new WeakMap(), O = new WeakMap(), j = new WeakMap(), P = new WeakMap(), U = new WeakMap(), C = new WeakMap();
export {
  ye as A,
  we as a,
  ce as c
};
//# sourceMappingURL=auth-policy-browser.context-DD_t0hww.js.map
