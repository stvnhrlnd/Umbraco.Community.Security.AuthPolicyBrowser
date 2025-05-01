import { UMB_WORKSPACE_CONDITION_ALIAS as i } from "@umbraco-cms/backoffice/workspace";
const n = [
  {
    name: "Umbraco Community Security Auth Policy Browser Entrypoint",
    alias: "Umbraco.Community.Security.AuthPolicyBrowser.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-x5AfXPrk.js")
  }
], t = "Umb.Section.Security", o = "Umb.Menu.Security", e = "Security.Workspace.AuthPolicyBrowser", d = 10, a = {
  type: "menuItem",
  alias: "Security.MenuItem.AuthPolicyBrowser",
  name: "Auth Policy Browser Menu Item",
  meta: {
    label: "Auth Policy Browser",
    icon: "icon-browser-window",
    entityType: "auth-policy-browser",
    menus: [o]
  }
}, c = [a], s = {
  name: "Auth Policy Browser Action Info Modal",
  alias: "Security.Modal.AuthPolicyBrowserActionInfo",
  type: "modal",
  element: () => import("./auth-policy-browser-action-info-modal.element-C5M16VRO.js")
}, r = [s], m = {
  type: "workspace",
  alias: e,
  name: "Auth Policy Browser Root Workspace",
  element: () => import("./auth-policy-browser-workspace.element-CuaCiyxg.js"),
  meta: {
    entityType: "auth-policy-browser"
  }
}, l = [
  {
    type: "workspaceView",
    alias: `${e}.Browse`,
    name: "Auth Policy Browser Default View",
    element: () => import("./auth-policy-browser-browse.element-Bru2wemv.js"),
    meta: {
      label: "Browse",
      pathname: "browse",
      icon: "icon-search"
    },
    conditions: [
      {
        alias: i,
        match: e
      }
    ]
  },
  {
    type: "workspaceView",
    alias: `${e}.Export`,
    name: "Auth Policy Browser Export View",
    element: () => import("./auth-policy-browser-export.element-Bkq-8Zwh.js"),
    meta: {
      label: "Export",
      pathname: "export",
      icon: "icon-code"
    },
    conditions: [
      {
        alias: i,
        match: e
      }
    ]
  }
], y = [m, ...l], u = [...c, ...r, ...y], p = {
  type: "section",
  alias: t,
  name: "Security Section",
  meta: {
    label: "Security",
    pathname: "security"
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionUserPermission",
      match: t
    }
  ]
}, S = {
  type: "sectionView",
  alias: "Umb.SectionView.Security",
  name: "Security Section View",
  element: () => import("./security-section-view.element-COAdFhTS.js"),
  meta: {
    label: "Security",
    icon: "icon-browser-window",
    pathname: "view"
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionAlias",
      match: t
    }
  ]
}, w = {
  type: "menu",
  alias: o,
  name: "Security Menu",
  meta: {
    label: "Security"
  }
}, A = {
  type: "sectionSidebarApp",
  kind: "menu",
  alias: "Umb.SectionSidebar.Security",
  name: "Security Section Sidebar Menu",
  meta: {
    label: "Security",
    menu: o
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionAlias",
      match: t
    }
  ]
}, b = [
  p,
  S,
  w,
  A,
  ...u
], P = [...n, ...b];
export {
  d as D,
  P as m
};
//# sourceMappingURL=bundle.manifests-D3jbIH9z.js.map
