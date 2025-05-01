import type { ManifestMenuItem } from "@umbraco-cms/backoffice/menu";

import { MENU_ALIAS } from "../../../constants";

const menuItem: ManifestMenuItem = {
  type: "menuItem",
  alias: "Security.MenuItem.AuthPolicyBrowser",
  name: "Auth Policy Browser Menu Item",
  meta: {
    label: "Auth Policy Browser",
    icon: "icon-browser-window",
    entityType: "auth-policy-browser",
    menus: [MENU_ALIAS],
  },
};

export const manifests = [menuItem];
