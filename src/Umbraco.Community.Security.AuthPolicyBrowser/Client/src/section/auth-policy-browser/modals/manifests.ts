const actionInfoModal: UmbExtensionManifest = {
  name: "Auth Policy Browser Action Info Modal",
  alias: "Security.Modal.AuthPolicyBrowserActionInfo",
  type: "modal",
  element: () => import("./auth-policy-browser-action-info-modal.element"),
};

export const manifests = [actionInfoModal];
