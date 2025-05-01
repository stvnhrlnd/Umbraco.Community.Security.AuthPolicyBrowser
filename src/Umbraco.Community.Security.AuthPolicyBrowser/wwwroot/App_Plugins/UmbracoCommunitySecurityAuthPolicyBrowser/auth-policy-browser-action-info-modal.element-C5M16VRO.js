import { html as i, customElement as y } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalToken as p, UmbModalBaseElement as b } from "@umbraco-cms/backoffice/modal";
var f = Object.getOwnPropertyDescriptor, d = (o) => {
  throw TypeError(o);
}, _ = (o, t, e, c) => {
  for (var a = c > 1 ? void 0 : c ? f(t, e) : t, n = o.length - 1, u; n >= 0; n--)
    (u = o[n]) && (a = u(a) || a);
  return a;
}, w = (o, t, e) => t.has(o) || d("Cannot " + e), v = (o, t, e) => t.has(o) ? d("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(o) : t.set(o, e), r = (o, t, e) => (w(o, t, "access private method"), e), l, m, s;
const C = new p("Security.Modal.AuthPolicyBrowserActionInfo", {
  modal: {
    type: "sidebar",
    size: "small"
  }
});
let h = class extends b {
  constructor() {
    super(...arguments), v(this, l);
  }
  render() {
    if (this.modalContext === void 0)
      return i`
        <umb-body-layout headline="Error">
          <p>Modal context is undefined.</p>
          ${r(this, l, s).call(this)}
        </umb-body-layout>
      `;
    const o = this.modalContext.data.actionInfo;
    return i`
      <umb-body-layout
        headline="${o.controllerName}.${o.actionName}"
      >
        <h4>Assembly</h4>
        ${o.assemblyFullName}
        <h4>URL Template</h4>
        ${o.template || i`<em>None</em>`}
        <h4>Controller Policies</h4>
        <auth-policy-browser-policy-list
          .policies=${o.controllerPolicies}
        >
        </auth-policy-browser-policy-list>
        <h4>Action Policies</h4>
        <auth-policy-browser-policy-list .policies=${o.actionPolicies}>
        </auth-policy-browser-policy-list>
        <h4>Allow Anonymous</h4>
        <auth-policy-browser-allow-anonymous-tag .actionInfo=${o}>
        </auth-policy-browser-allow-anonymous-tag>
        ${r(this, l, s).call(this)}
      </umb-body-layout>
    `;
  }
};
l = /* @__PURE__ */ new WeakSet();
m = function() {
  var o;
  (o = this.modalContext) == null || o.reject();
};
s = function() {
  return i`
      <div slot="actions">
        <uui-button
          .label=${this.localize.term("general_close")}
          @click="${r(this, l, m)}"
        ></uui-button>
      </div>
    `;
};
h = _([
  y("auth-policy-browser-action-info-modal")
], h);
export {
  C as ACTION_INFO_MODAL,
  h as default
};
//# sourceMappingURL=auth-policy-browser-action-info-modal.element-C5M16VRO.js.map
