import { html as c, state as m, customElement as n } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as _ } from "@umbraco-cms/backoffice/lit-element";
var f = Object.defineProperty, a = Object.getOwnPropertyDescriptor, p = (l, r, o, t) => {
  for (var e = t > 1 ? void 0 : t ? a(r, o) : r, s = l.length - 1, u; s >= 0; s--)
    (u = l[s]) && (e = (t ? u(r, o, e) : u(e)) || e);
  return t && e && f(r, o, e), e;
};
let i = class extends _ {
  constructor() {
    super(), this._routes = [
      {
        // Default to the Auth Policy Browser when entering the Security
        // as it is the only workspace we have (so far!).
        path: "",
        redirectTo: "../workspace/auth-policy-browser/browse"
      }
    ];
  }
  render() {
    if (this._routes)
      return c`
      <umb-router-slot id="router-slot" .routes=${this._routes}>
      </umb-router-slot>
    `;
  }
};
p([
  m()
], i.prototype, "_routes", 2);
i = p([
  n("security-section-view")
], i);
export {
  i as default
};
//# sourceMappingURL=security-section-view.element-COAdFhTS.js.map
