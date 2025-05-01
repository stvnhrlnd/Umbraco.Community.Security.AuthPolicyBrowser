import { UmbLitElement as _ } from "@umbraco-cms/backoffice/lit-element";
import { css as f, queryAll as L, state as n, customElement as y, html as a, property as ae, repeat as Be } from "@umbraco-cms/backoffice/external/lit";
import { query as O, path as E, toQueryString as k } from "@umbraco-cms/backoffice/router";
import { A as F } from "./auth-policy-browser.context-DD_t0hww.js";
import { UMB_MODAL_MANAGER_CONTEXT as De } from "@umbraco-cms/backoffice/modal";
import { ACTION_INFO_MODAL as Te } from "./auth-policy-browser-action-info-modal.element-C5M16VRO.js";
import { D as J } from "./bundle.manifests-D3jbIH9z.js";
var Ie = Object.defineProperty, Me = Object.getOwnPropertyDescriptor, ne = (e) => {
  throw TypeError(e);
}, z = (e, t, o, i) => {
  for (var s = i > 1 ? void 0 : i ? Me(t, o) : t, l = e.length - 1, r; l >= 0; l--)
    (r = e[l]) && (s = (i ? r(t, o, s) : r(s)) || s);
  return i && s && Ie(t, o, s), s;
}, R = (e, t, o) => t.has(e) || ne("Cannot " + o), K = (e, t, o) => (R(e, t, "read from private field"), o ? o.call(e) : t.get(e)), j = (e, t, o) => t.has(e) ? ne("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, o), Ne = (e, t, o, i) => (R(e, t, "write to private field"), t.set(e, o), o), m = (e, t, o) => (R(e, t, "access private method"), o), A, u, ce, W, ue, he;
let b = class extends _ {
  constructor() {
    super(), j(this, u), j(this, A), this._assemblyFilter = [], this._assemblies = [], this.consumeContext(F, (e) => {
      Ne(this, A, e), this.observe(K(this, A).allActions, (t) => {
        this._assemblies = [...new Set(t == null ? void 0 : t.map((o) => o.assemblyName))];
      }), this.observe(
        K(this, A).assemblyFilter,
        (t) => {
          this._assemblyFilter = t ?? [];
        }
      );
    });
  }
  render() {
    const e = this._assemblyFilter.length === 0 ? "All" : this._assemblyFilter.length <= 3 ? this._assemblyFilter.map(
      (t) => a` <span class="assembly-selector__selected-assembly"
                  >${t}</span
                >`
    ) : "Multiple selected";
    return a`
      <umb-dropdown label="Select assemblies">
        <span slot="label" class="assembly-selector__label">
          Assembly: ${e}
        </span>
        ${m(this, u, ce).call(this)}
      </umb-dropdown>
    `;
  }
};
A = /* @__PURE__ */ new WeakMap();
u = /* @__PURE__ */ new WeakSet();
ce = function() {
  return a`
      <div id="assembly-selector" @change=${m(this, u, W)}>
        ${this._assemblies.map(
    (e) => a`
            <uui-checkbox
              .checked=${this._assemblyFilter.includes(e)}
              .value=${e}
              label="${e}"
            >
              <small><code>${e}</code></small>
            </uui-checkbox>
          `
  )}
        <uui-button @click=${m(this, u, ue)}>
          Select all
        </uui-button>
        <uui-button @click=${m(this, u, he)}>
          Deselect all
        </uui-button>
      </div>
    `;
};
W = function() {
  const e = Array.from(this._assemblySelectorCheckboxes).filter((o) => o.checked).map((o) => o.value);
  let t = O();
  e.length ? t = { ...t, assemblies: e.join(",") } : delete t.assemblies, t.page = "1", window.history.pushState({}, "", `${E()}?${k(t)}`);
};
ue = function() {
  this._assemblySelectorCheckboxes.forEach(
    (e) => e.checked = !0
  ), m(this, u, W).call(this);
};
he = function() {
  this._assemblySelectorCheckboxes.forEach(
    (e) => e.checked = !1
  ), m(this, u, W).call(this);
};
b.styles = [
  f`
      #assembly-selector {
        display: flex;
        flex-direction: column;
        gap: var(--uui-size-space-3);
        padding: var(--uui-box-default-padding, var(--uui-size-space-5, 18px));
        max-height: 50vh;
        overflow-y: auto;
      }

      .assembly-selector__selected-assembly {
        font-weight: 600;
      }

      .assembly-selector__selected-assembly:not(:last-of-type)::after {
        content: ", ";
      }
    `
];
z([
  L("#assembly-selector > uui-checkbox")
], b.prototype, "_assemblySelectorCheckboxes", 2);
z([
  n()
], b.prototype, "_assemblyFilter", 2);
z([
  n()
], b.prototype, "_assemblies", 2);
b = z([
  y("auth-policy-browser-assembly-filter")
], b);
var ze = Object.defineProperty, We = Object.getOwnPropertyDescriptor, pe = (e, t, o, i) => {
  for (var s = i > 1 ? void 0 : i ? We(t, o) : t, l = e.length - 1, r; l >= 0; l--)
    (r = e[l]) && (s = (i ? r(t, o, s) : r(s)) || s);
  return i && s && ze(t, o, s), s;
};
let D = class extends _ {
  constructor() {
    super(...arguments), this.actionInfo = void 0;
  }
  render() {
    return this.actionInfo === void 0 ? "" : this.actionInfo.controllerAllowAnonymous && this.actionInfo.actionAllowAnonymous ? a`<uui-tag color="warning"
        >Yes (controller and action)</uui-tag
      >` : this.actionInfo.controllerAllowAnonymous ? a`<uui-tag color="warning">Yes (controller)</uui-tag>` : this.actionInfo.actionAllowAnonymous ? a`<uui-tag color="warning">Yes (action)</uui-tag>` : a`<uui-tag color="positive">No</uui-tag>`;
  }
};
D.styles = [
  f`
      .auth-policy-browser-policy-list {
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        row-gap: var(--uui-size-space-1);
      }
    `
];
pe([
  ae({ type: Object })
], D.prototype, "actionInfo", 2);
D = pe([
  y("auth-policy-browser-allow-anonymous-tag")
], D);
var Qe = Object.defineProperty, qe = Object.getOwnPropertyDescriptor, _e = (e) => {
  throw TypeError(e);
}, Q = (e, t, o, i) => {
  for (var s = i > 1 ? void 0 : i ? qe(t, o) : t, l = e.length - 1, r; l >= 0; l--)
    (r = e[l]) && (s = (i ? r(t, o, s) : r(s)) || s);
  return i && s && Qe(t, o, s), s;
}, U = (e, t, o) => t.has(e) || _e("Cannot " + o), ee = (e, t, o) => (U(e, t, "read from private field"), o ? o.call(e) : t.get(e)), te = (e, t, o) => t.has(e) ? _e("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, o), Ye = (e, t, o, i) => (U(e, t, "write to private field"), t.set(e, o), o), w = (e, t, o) => (U(e, t, "access private method"), o), P, h, ye, q, de, ve;
let g = class extends _ {
  constructor() {
    super(), te(this, h), te(this, P), this._policyFilter = [], this._policies = [], this.consumeContext(F, (e) => {
      Ye(this, P, e), this.observe(ee(this, P).allActions, (t) => {
        this._policies = [
          ...new Set(
            t == null ? void 0 : t.flatMap(
              (o) => o.controllerPolicies.concat(o.actionPolicies)
            )
          )
        ], this._policies.sort();
      }), this.observe(
        ee(this, P).policyFilter,
        (t) => {
          this._policyFilter = t ?? [];
        }
      );
    });
  }
  render() {
    const e = this._policyFilter.length === 0 ? "All" : this._policyFilter.length <= 3 ? this._policyFilter.map(
      (t) => a` <span class="policy-selector__selected-policy"
                  >${t}</span
                >`
    ) : "Multiple selected";
    return a`
      <umb-dropdown label="Select policies">
        <span slot="label"> Policy: ${e} </span>
        ${w(this, h, ye).call(this)}
      </umb-dropdown>
    `;
  }
};
P = /* @__PURE__ */ new WeakMap();
h = /* @__PURE__ */ new WeakSet();
ye = function() {
  return a`
      <div id="policy-selector" @change=${w(this, h, q)}>
        <uui-checkbox
          .checked=${this._policyFilter.includes("None")}
          value="None"
          label="None"
        >
          <uui-tag color="warning">None</uui-tag>
        </uui-checkbox>
        ${this._policies.map(
    (e) => a`
            <uui-checkbox
              .checked=${this._policyFilter.includes(e)}
              .value=${e}
              label="${e}"
            >
              <uui-tag>${e}</uui-tag>
            </uui-checkbox>
          `
  )}
        <uui-button @click=${w(this, h, de)}> Select all </uui-button>
        <uui-button @click=${w(this, h, ve)}>
          Deselect all
        </uui-button>
      </div>
    `;
};
q = function() {
  const e = Array.from(this._policySelectorCheckboxes).filter((o) => o.checked).map((o) => o.value);
  let t = O();
  e.length ? t = { ...t, policies: e.join(",") } : delete t.policies, t.page = "1", window.history.pushState({}, "", `${E()}?${k(t)}`);
};
de = function() {
  this._policySelectorCheckboxes.forEach(
    (e) => e.checked = !0
  ), w(this, h, q).call(this);
};
ve = function() {
  this._policySelectorCheckboxes.forEach(
    (e) => e.checked = !1
  ), w(this, h, q).call(this);
};
g.styles = [
  f`
      #policy-selector {
        display: flex;
        flex-direction: column;
        gap: var(--uui-size-space-3);
        padding: var(--uui-box-default-padding, var(--uui-size-space-5, 18px));
        max-height: 50vh;
        overflow-y: auto;
      }

      .policy-selector__selected-policy {
        font-weight: 600;
      }

      .policy-selector__selected-policy:not(:last-of-type)::after {
        content: ", ";
      }
    `
];
Q([
  L("#policy-selector > uui-checkbox")
], g.prototype, "_policySelectorCheckboxes", 2);
Q([
  n()
], g.prototype, "_policyFilter", 2);
Q([
  n()
], g.prototype, "_policies", 2);
g = Q([
  y("auth-policy-browser-policy-filter")
], g);
var Ge = Object.defineProperty, Le = Object.getOwnPropertyDescriptor, fe = (e, t, o, i) => {
  for (var s = i > 1 ? void 0 : i ? Le(t, o) : t, l = e.length - 1, r; l >= 0; l--)
    (r = e[l]) && (s = (i ? r(t, o, s) : r(s)) || s);
  return i && s && Ge(t, o, s), s;
};
let T = class extends _ {
  constructor() {
    super(...arguments), this.policies = [];
  }
  render() {
    return this.policies.length == 0 ? a`<uui-tag color="warning">None</uui-tag>` : a` <div class="auth-policy-browser-policy-list">
          ${Be(
      this.policies,
      (e) => e,
      (e) => a` <uui-tag>${e}</uui-tag> `
    )}
        </div>`;
  }
};
T.styles = [
  f`
      .auth-policy-browser-policy-list {
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        gap: var(--uui-size-space-1);
      }
    `
];
fe([
  ae({ type: Array })
], T.prototype, "policies", 2);
T = fe([
  y("auth-policy-browser-policy-list")
], T);
var Re = Object.defineProperty, Ue = Object.getOwnPropertyDescriptor, me = (e) => {
  throw TypeError(e);
}, X = (e, t, o, i) => {
  for (var s = i > 1 ? void 0 : i ? Ue(t, o) : t, l = e.length - 1, r; l >= 0; l--)
    (r = e[l]) && (s = (i ? r(t, o, s) : r(s)) || s);
  return i && s && Re(t, o, s), s;
}, H = (e, t, o) => t.has(e) || me("Cannot " + o), Xe = (e, t, o) => (H(e, t, "read from private field"), o ? o.call(e) : t.get(e)), oe = (e, t, o) => t.has(e) ? me("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, o), He = (e, t, o, i) => (H(e, t, "write to private field"), t.set(e, o), o), we = (e, t, o) => (H(e, t, "access private method"), o), B, I, be, ge;
let C = class extends _ {
  constructor() {
    super(), oe(this, I), oe(this, B), this._allowAnonymousFilter = [], this.consumeContext(F, (e) => {
      He(this, B, e), this.observe(
        Xe(this, B).allowAnonymousFilter,
        (t) => {
          this._allowAnonymousFilter = t ?? [];
        }
      );
    });
  }
  render() {
    return a`
      <umb-dropdown label="Allow anonymous">
        <span slot="label">
          Allow Anonymous:
          ${this._allowAnonymousFilter.length > 0 ? this._allowAnonymousFilter.map(
      (e) => a`<span class="allow-anonymous-selector__selected-option"
                    >${e}</span
                  >`
    ) : "All"}
        </span>
        ${we(this, I, be).call(this)}
      </umb-dropdown>
    `;
  }
};
B = /* @__PURE__ */ new WeakMap();
I = /* @__PURE__ */ new WeakSet();
be = function() {
  return a`
      <div id="allow-anonymous-selector" @change=${we(this, I, ge)}>
        <uui-checkbox
          .checked=${this._allowAnonymousFilter.includes("Yes")}
          value="Yes"
          label="Yes"
        >
          <uui-tag color="warning">Yes</uui-tag>
        </uui-checkbox>
        <uui-checkbox
          .checked=${this._allowAnonymousFilter.includes("No")}
          value="No"
          label="No"
        >
          <uui-tag color="positive">No</uui-tag>
        </uui-checkbox>
      </div>
    `;
};
ge = function() {
  const e = Array.from(
    this._allowAnonymousSelectorCheckboxes
  ).filter((o) => o.checked).map((o) => o.value);
  let t = O();
  e.length ? t = { ...t, allowAnonymous: e.join(",") } : delete t.allowAnonymous, t.page = "1", window.history.pushState({}, "", `${E()}?${k(t)}`);
};
C.styles = [
  f`
      #allow-anonymous-selector {
        display: flex;
        flex-direction: column;
        gap: var(--uui-size-space-3);
        padding: var(--uui-box-default-padding, var(--uui-size-space-5, 18px));
        max-height: 50vh;
        overflow-y: auto;
      }

      .allow-anonymous-selector__selected-option {
        font-weight: 600;
      }

      .allow-anonymous-selector__selected-option:not(:last-of-type)::after {
        content: ", ";
      }
    `
];
X([
  L("#allow-anonymous-selector > uui-checkbox")
], C.prototype, "_allowAnonymousSelectorCheckboxes", 2);
X([
  n()
], C.prototype, "_allowAnonymousFilter", 2);
C = X([
  y("auth-policy-browser-allow-anonymous-filter")
], C);
var Ve = Object.defineProperty, Ze = Object.getOwnPropertyDescriptor, $e = (e) => {
  throw TypeError(e);
}, Ae = (e, t, o, i) => {
  for (var s = i > 1 ? void 0 : i ? Ze(t, o) : t, l = e.length - 1, r; l >= 0; l--)
    (r = e[l]) && (s = (i ? r(t, o, s) : r(s)) || s);
  return i && s && Ve(t, o, s), s;
}, V = (e, t, o) => t.has(e) || $e("Cannot " + o), se = (e, t, o) => (V(e, t, "read from private field"), o ? o.call(e) : t.get(e)), ie = (e, t, o) => t.has(e) ? $e("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, o), Je = (e, t, o, i) => (V(e, t, "write to private field"), t.set(e, o), o), Ke = (e, t, o) => (V(e, t, "access private method"), o), x, G, Pe;
let M = class extends _ {
  constructor() {
    super(), ie(this, G), ie(this, x), this._searchQuery = "", this.consumeContext(F, (e) => {
      Je(this, x, e), this.observe(
        se(this, x).searchQuery,
        (t) => this._searchQuery = t ?? ""
      ), se(this, x).getActions();
    });
  }
  render() {
    return a`
      <uui-input
        id="auth-policy-browser-search-input"
        label="Search actions"
        placeholder="Search for a controller, action, or URL..."
        .value=${this._searchQuery}
        @input=${Ke(this, G, Pe)}
      ></uui-input>
    `;
  }
};
x = /* @__PURE__ */ new WeakMap();
G = /* @__PURE__ */ new WeakSet();
Pe = function(e) {
  const t = e.target;
  let o = O();
  t.value ? o.q = t.value : delete o.q, o.page = "1", window.history.pushState({}, "", `${E()}?${k(o)}`);
};
M.styles = [
  f`
      #auth-policy-browser-search-input {
        margin-block: var(--uui-size-space-3);
        width: 100%;
      }
    `
];
Ae([
  n()
], M.prototype, "_searchQuery", 2);
M = Ae([
  y("auth-policy-browser-search-input")
], M);
var je = Object.defineProperty, et = Object.getOwnPropertyDescriptor, xe = (e) => {
  throw TypeError(e);
}, d = (e, t, o, i) => {
  for (var s = i > 1 ? void 0 : i ? et(t, o) : t, l = e.length - 1, r; l >= 0; l--)
    (r = e[l]) && (s = (i ? r(t, o, s) : r(s)) || s);
  return i && s && je(t, o, s), s;
}, Z = (e, t, o) => t.has(e) || xe("Cannot " + o), S = (e, t, o) => (Z(e, t, "read from private field"), o ? o.call(e) : t.get(e)), Y = (e, t, o) => t.has(e) ? xe("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, o), le = (e, t, o, i) => (Z(e, t, "write to private field"), t.set(e, o), o), $ = (e, t, o) => (Z(e, t, "access private method"), o), v, N, p, Se, Ce, Oe, Ee, ke, Fe;
let c = class extends _ {
  constructor() {
    super(), Y(this, p), Y(this, v), Y(this, N), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "Action",
        alias: "action"
      },
      {
        name: "Policies",
        alias: "policies"
      },
      {
        name: "Allow Anonymous",
        alias: "allowAnonymous"
      },
      {
        name: "",
        alias: "info"
      }
    ], this._tableItems = [], this._actionsTotal = 0, this._pageSize = J, this._currentPage = 1, this._totalPages = 1, this.consumeContext(De, (e) => {
      le(this, N, e);
    }), this.consumeContext(F, (e) => {
      le(this, v, e), this.observe(
        S(this, v).filteredActionsPage,
        (t) => $(this, p, Se).call(this, t)
      ), this.observe(
        S(this, v).filteredActionsTotal,
        (t) => {
          this._actionsTotal = t ?? 0, this._totalPages = Math.ceil(this._actionsTotal / this._pageSize);
        }
      ), this.observe(
        S(this, v).currentPage,
        (t) => this._currentPage = t ?? 1
      ), this.observe(
        S(this, v).pageSize,
        (t) => this._pageSize = t ?? J
      );
    });
  }
  render() {
    return a`
      ${this._tableItems.length === 0 ? a`<uui-box>
            <em>No actions matching your search criteria.</em>
          </uui-box>` : a`
            <umb-table
              .config=${this._tableConfig}
              .columns=${this._tableColumns}
              .items=${this._tableItems}
            >
            </umb-table>
            ${$(this, p, ke).call(this)}
          `}
    `;
  }
};
v = /* @__PURE__ */ new WeakMap();
N = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakSet();
Se = function(e) {
  e && (this._tableItems = e.map((t, o) => ({
    id: o.toString(),
    data: [
      {
        columnAlias: "action",
        value: $(this, p, Fe).call(this, t)
      },
      {
        columnAlias: "policies",
        value: a`
              <div style="padding-block: var(--uui-size-space-1);">
                <auth-policy-browser-policy-list
                  .policies=${t.controllerPolicies.concat(
          t.actionPolicies
        )}
                >
                </auth-policy-browser-policy-list>
              </div>
            `
      },
      {
        columnAlias: "allowAnonymous",
        value: a`
              <auth-policy-browser-allow-anonymous-tag .actionInfo=${t}>
              </auth-policy-browser-allow-anonymous-tag>
            `
      },
      {
        columnAlias: "info",
        value: $(this, p, Oe).call(this, t)
      }
    ]
  })));
};
Ce = function(e) {
  var t;
  (t = S(this, N)) == null || t.open(this, Te, {
    data: {
      actionInfo: e
    }
  });
};
Oe = function(e) {
  return a`
      <uui-button
        label="View details"
        @click=${() => $(this, p, Ce).call(this, e)}
        compact
      >
        <uui-icon name="info"></uui-icon>
      </uui-button>
    `;
};
Ee = function(e) {
  const t = e.target.current;
  let o = O();
  o.page = t.toString(), window.history.pushState({}, "", `${E()}?${k(o)}`);
};
ke = function() {
  return !this._actionsTotal || this._totalPages <= 1 ? "" : a` <div id="auth-policy-browser-pagination">
      <uui-pagination
        .total=${this._totalPages}
        .current=${this._currentPage}
        @change="${$(this, p, Ee)}"
      >
      </uui-pagination>
    </div>`;
};
Fe = function(e) {
  return a`
      <div style="padding-block: var(--uui-size-space-3);">
        <div>
          <strong>
            <code>${e.controllerName}.${e.actionName}</code>
          </strong>
        </div>
        <div>
          <small style="margin-block-end: var(--uui-size-space-1);">
            <code>${e.assemblyName}</code>
          </small>
        </div>
        <div>${e.template}</div>
      </div>
    `;
};
c.styles = [
  f`
      #auth-policy-browser-pagination {
        margin-block-start: var(--uui-size-space-6);
      }
    `
];
d([
  n()
], c.prototype, "_tableConfig", 2);
d([
  n()
], c.prototype, "_tableColumns", 2);
d([
  n()
], c.prototype, "_tableItems", 2);
d([
  n()
], c.prototype, "_actionsTotal", 2);
d([
  n()
], c.prototype, "_pageSize", 2);
d([
  n()
], c.prototype, "_currentPage", 2);
d([
  n()
], c.prototype, "_totalPages", 2);
c = d([
  y("auth-policy-browser-table")
], c);
var tt = Object.getOwnPropertyDescriptor, ot = (e, t, o, i) => {
  for (var s = i > 1 ? void 0 : i ? tt(t, o) : t, l = e.length - 1, r; l >= 0; l--)
    (r = e[l]) && (s = r(s) || s);
  return s;
};
let re = class extends _ {
  render() {
    return a`
      <umb-workspace-editor
        headline="Authorization Policy Browser"
        .enforceNoFooter=${!0}
      >
      </umb-workspace-editor>
    `;
  }
};
re = ot([
  y("auth-policy-browser-workspace")
], re);
export {
  re as default
};
//# sourceMappingURL=auth-policy-browser-workspace.element-CuaCiyxg.js.map
