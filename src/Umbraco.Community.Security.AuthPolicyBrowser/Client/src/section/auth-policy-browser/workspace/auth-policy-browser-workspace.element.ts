import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { customElement, html } from "@umbraco-cms/backoffice/external/lit";

import "../components/index";

/**
 * Root workspace for the Auth Policy Browser.
 * @see https://docs.umbraco.com/umbraco-cms/customizing/extending-overview/extension-types/workspaces
 */
@customElement("auth-policy-browser-workspace")
export default class AuthPolicyBrowserRootWorkspaceElement extends UmbLitElement {
  render() {
    return html`
      <umb-workspace-editor
        headline="Authorization Policy Browser"
        .enforceNoFooter=${true}
      >
      </umb-workspace-editor>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "auth-policy-browser-workspace": AuthPolicyBrowserRootWorkspaceElement;
  }
}
