import {
  customElement,
  html,
  state,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { UmbRoute } from "@umbraco-cms/backoffice/router";

/**
 * Main view for the Security section.
 * @see https://docs.umbraco.com/umbraco-cms/customizing/extending-overview/extension-types/sections/section-view
 */
@customElement("security-section-view")
export default class SecuritySectionViewElement extends UmbLitElement {
  @state()
  private _routes?: UmbRoute[];

  constructor() {
    super();

    this._routes = [
      {
        // Default to the Auth Policy Browser when entering the Security
        // as it is the only workspace we have (so far!).
        path: "",
        redirectTo: "../workspace/auth-policy-browser/browse",
      },
    ];
  }

  render() {
    if (!this._routes) return;
    return html`
      <umb-router-slot id="router-slot" .routes=${this._routes}>
      </umb-router-slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "security-section-view": SecuritySectionViewElement;
  }
}
