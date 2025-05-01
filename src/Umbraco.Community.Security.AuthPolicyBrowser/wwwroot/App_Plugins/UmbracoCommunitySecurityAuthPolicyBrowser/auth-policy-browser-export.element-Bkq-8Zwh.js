import { html as f, state as m, customElement as w } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as y } from "@umbraco-cms/backoffice/lit-element";
import { A as O } from "./auth-policy-browser.context-DD_t0hww.js";
var E = Object.defineProperty, x = Object.getOwnPropertyDescriptor, u = (t) => {
  throw TypeError(t);
}, v = (t, e, r, a) => {
  for (var o = a > 1 ? void 0 : a ? x(e, r) : e, i = t.length - 1, n; i >= 0; i--)
    (n = t[i]) && (o = (a ? n(e, r, o) : n(o)) || o);
  return a && o && E(e, r, o), o;
}, p = (t, e, r) => e.has(t) || u("Cannot " + r), _ = (t, e, r) => (p(t, e, "read from private field"), r ? r.call(t) : e.get(t)), h = (t, e, r) => e.has(t) ? u("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), S = (t, e, r, a) => (p(t, e, "write to private field"), e.set(t, r), r), C = (t, e, r) => (p(t, e, "access private method"), r), s, c, d;
let l = class extends y {
  constructor() {
    super(), h(this, c), h(this, s), this._actionsJSON = "[]", this.consumeContext(O, (t) => {
      S(this, s, t), this.observe(
        _(this, s).allActions,
        (e) => C(this, c, d).call(this, e)
      ), _(this, s).getActions();
    });
  }
  render() {
    return f`
      <umb-body-layout>
        <uui-box headline="JSON">
          <umb-code-block ?copy=${!0}>${this._actionsJSON}</umb-code-block>
        </uui-box>
      </umb-body-layout>
    `;
  }
};
s = /* @__PURE__ */ new WeakMap();
c = /* @__PURE__ */ new WeakSet();
d = function(t) {
  t && (this._actionsJSON = JSON.stringify(t, null, 2));
};
v([
  m()
], l.prototype, "_actionsJSON", 2);
l = v([
  w("auth-policy-browser-export-view")
], l);
export {
  l as default
};
//# sourceMappingURL=auth-policy-browser-export.element-Bkq-8Zwh.js.map
