import { html as y, css as w, state as f, customElement as v } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as _ } from "@umbraco-cms/backoffice/lit-element";
import { A as d } from "./auth-policy-browser.context-DD_t0hww.js";
var b = Object.defineProperty, m = Object.getOwnPropertyDescriptor, p = (t) => {
  throw TypeError(t);
}, h = (t, e, r, a) => {
  for (var o = a > 1 ? void 0 : a ? m(e, r) : e, l = t.length - 1, n; l >= 0; l--)
    (n = t[l]) && (o = (a ? n(e, r, o) : n(o)) || o);
  return a && o && b(e, r, o), o;
}, u = (t, e, r) => e.has(t) || p("Cannot " + r), c = (t, e, r) => (u(t, e, "read from private field"), r ? r.call(t) : e.get(t)), T = (t, e, r) => e.has(t) ? p("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), C = (t, e, r, a) => (u(t, e, "write to private field"), e.set(t, r), r), i;
let s = class extends _ {
  constructor() {
    super(), T(this, i), this._actionsTotal = 0, this.consumeContext(d, (t) => {
      C(this, i, t), this.observe(
        c(this, i).filteredActionsTotal,
        (e) => this._actionsTotal = e ?? 0
      ), c(this, i).getActions();
    });
  }
  render() {
    return y`
          <umb-body-layout>
            <div id="auth-policy-browser-filter-container">
              <auth-policy-browser-assembly-filter></auth-policy-browser-assembly-filter>
              <auth-policy-browser-policy-filter></auth-policy-browser-policy-filter>
              <auth-policy-browser-allow-anonymous-filter></auth-policy-browser-allow-anonymous-filter>
              <div>Total Actions: <strong>${this._actionsTotal}</strong></div>
            </div>
            <auth-policy-browser-search-input></auth-policy-browser-search-input>
            <auth-policy-browser-table></auth-policy-browser-table>
          </umb-body-layout>
        `;
  }
};
i = /* @__PURE__ */ new WeakMap();
s.styles = [
  w`
      #auth-policy-browser-filter-container {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      }

      #auth-policy-browser-filter-container :last-child {
        margin-inline-start: auto;
        padding-inline-end: var(--uui-size-space-4);
      }
    `
];
h([
  f()
], s.prototype, "_actionsTotal", 2);
s = h([
  v("auth-policy-browser-view")
], s);
export {
  s as default
};
//# sourceMappingURL=auth-policy-browser-browse.element-Bru2wemv.js.map
