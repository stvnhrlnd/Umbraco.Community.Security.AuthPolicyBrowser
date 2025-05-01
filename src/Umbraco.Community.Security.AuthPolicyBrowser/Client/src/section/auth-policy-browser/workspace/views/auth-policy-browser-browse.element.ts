import {
  css,
  customElement,
  html,
  state,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";

import AuthPolicyBrowserContext, {
  AUTH_POLICY_BROWSER_CONTEXT,
} from "../../../../context/auth-policy-browser.context";

/**
 * Auth Policy Browser "Browse" workspace view. Combines the filters, table,
 * search, and pagination components. This is the default view when users
 * land in the section.
 */
@customElement("auth-policy-browser-view")
export default class AuthPolicyBrowserViewElement extends UmbLitElement {
  #authPolicyBrowserContext?: AuthPolicyBrowserContext;

  @state()
  private _actionsTotal = 0;

  constructor() {
    super();

    this.consumeContext(AUTH_POLICY_BROWSER_CONTEXT, (instance) => {
      this.#authPolicyBrowserContext = instance;

      // Observe total actions count and update state when it changes
      this.observe(
        this.#authPolicyBrowserContext.filteredActionsTotal,
        (total) => (this._actionsTotal = total ?? 0),
      );

      // Get the actions from the API
      this.#authPolicyBrowserContext.getActions();
    });
  }

  render() {
    // TODO: Add loading animation when calling API (need to add observable to context)
    return false
      ? html` <umb-body-layout>
          <uui-box><uui-loader></uui-loader></uui-box>
        </umb-body-layout>`
      : html`
          <umb-body-layout>
            <div id="auth-policy-browser-filter-container">
              <auth-policy-browser-assembly-filter></auth-policy-browser-assembly-filter>
              <auth-policy-browser-policy-filter></auth-policy-browser-policy-filter>
              <auth-policy-browser-allow-anonymous-filter></auth-policy-browser-allow-anonymous-filter>
              <div>Total Actions: <strong>${this._actionsTotal}</strong></div>
            </div>
            <auth-policy-browser-search-input></auth-policy-browser-search-input>
            <auth-policy-browser-table></auth-policy-browser-table>
          </umb-body-layout>
        `;
  }

  static override styles = [
    css`
      #auth-policy-browser-filter-container {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      }

      #auth-policy-browser-filter-container :last-child {
        margin-inline-start: auto;
        padding-inline-end: var(--uui-size-space-4);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "auth-policy-browser-view": AuthPolicyBrowserViewElement;
  }
}
