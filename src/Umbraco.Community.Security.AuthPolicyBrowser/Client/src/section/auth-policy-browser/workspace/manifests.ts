import { UMB_WORKSPACE_CONDITION_ALIAS } from "@umbraco-cms/backoffice/workspace";
import type { ManifestWorkspace } from "@umbraco-cms/backoffice/workspace";

import { WORKSPACE_ALIAS } from "../../../constants";

const workspace: ManifestWorkspace = {
  type: "workspace",
  alias: WORKSPACE_ALIAS,
  name: "Auth Policy Browser Root Workspace",
  element: () => import("./auth-policy-browser-workspace.element"),
  meta: {
    entityType: "auth-policy-browser",
  },
};

const workspaceViews: UmbExtensionManifest[] = [
  {
    type: "workspaceView",
    alias: `${WORKSPACE_ALIAS}.Browse`,
    name: "Auth Policy Browser Default View",
    element: () => import("./views/auth-policy-browser-browse.element"),
    meta: {
      label: "Browse",
      pathname: "browse",
      icon: "icon-search",
    },
    conditions: [
      {
        alias: UMB_WORKSPACE_CONDITION_ALIAS,
        match: WORKSPACE_ALIAS,
      },
    ],
  },
  {
    type: "workspaceView",
    alias: `${WORKSPACE_ALIAS}.Export`,
    name: "Auth Policy Browser Export View",
    element: () => import("./views/auth-policy-browser-export.element"),
    meta: {
      label: "Export",
      pathname: "export",
      icon: "icon-code",
    },
    conditions: [
      {
        alias: UMB_WORKSPACE_CONDITION_ALIAS,
        match: WORKSPACE_ALIAS,
      },
    ],
  },
];

export const manifests = [workspace, ...workspaceViews];
