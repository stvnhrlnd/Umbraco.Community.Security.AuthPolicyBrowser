export const manifests: UmbExtensionManifest[] = [
  {
    name: "Umbraco Community Security Auth Policy Browser Entrypoint",
    alias: "Umbraco.Community.Security.AuthPolicyBrowser.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint"),
  },
];
