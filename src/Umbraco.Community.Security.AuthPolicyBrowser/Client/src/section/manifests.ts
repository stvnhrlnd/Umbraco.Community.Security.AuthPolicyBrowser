import { ManifestMenu } from "@umbraco-cms/backoffice/menu";
import {
  ManifestSection,
  ManifestSectionSidebarApp,
  ManifestSectionView,
} from "@umbraco-cms/backoffice/section";

import { manifests as authPolicyBrowserManifests } from "./auth-policy-browser/manifests";
import { SECTION_ALIAS, MENU_ALIAS } from "../constants";

const section: ManifestSection = {
  type: "section",
  alias: SECTION_ALIAS,
  name: "Security Section",
  meta: {
    label: "Security",
    pathname: "security",
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionUserPermission",
      match: SECTION_ALIAS,
    },
  ],
};

const sectionView: ManifestSectionView = {
  type: "sectionView",
  alias: "Umb.SectionView.Security",
  name: "Security Section View",
  element: () => import("./security-section-view.element"),
  meta: {
    label: "Security",
    icon: "icon-browser-window",
    pathname: "view",
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionAlias",
      match: SECTION_ALIAS,
    },
  ],
};

const menu: ManifestMenu = {
  type: "menu",
  alias: MENU_ALIAS,
  name: "Security Menu",
  meta: {
    label: "Security",
  },
};

const menuSectionSidebarApp: ManifestSectionSidebarApp = {
  type: "sectionSidebarApp",
  kind: "menu",
  alias: "Umb.SectionSidebar.Security",
  name: "Security Section Sidebar Menu",
  meta: {
    label: "Security",
    menu: MENU_ALIAS,
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionAlias",
      match: SECTION_ALIAS,
    },
  ],
};

export const manifests = [
  section,
  sectionView,
  menu,
  menuSectionSidebarApp,
  ...authPolicyBrowserManifests,
];
