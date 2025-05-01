import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import {
  css,
  customElement,
  html,
  state,
} from "@umbraco-cms/backoffice/external/lit";
import { path, query, toQueryString } from "@umbraco-cms/backoffice/router";
import { UUIInputElement } from "@umbraco-cms/backoffice/external/uui";

import AuthPolicyBrowserContext, {
  AUTH_POLICY_BROWSER_CONTEXT,
} from "../../../context/auth-policy-browser.context";

@customElement("auth-policy-browser-search-input")
export class AuthPolicyBrowserSearchInputElement extends UmbLitElement {
  #authPolicyBrowserContext?: AuthPolicyBrowserContext;

  @state()
  private _searchQuery = "";

  constructor() {
    super();

    this.consumeContext(AUTH_POLICY_BROWSER_CONTEXT, (instance) => {
      this.#authPolicyBrowserContext = instance;

      this.observe(
        this.#authPolicyBrowserContext.searchQuery,
        (searchQuery) => (this._searchQuery = searchQuery ?? ""),
      );

      // Get the actions from the API
      this.#authPolicyBrowserContext.getActions();
    });
  }

  render() {
    return html`
      <uui-input
        id="auth-policy-browser-search-input"
        label="Search actions"
        placeholder="Search for a controller, action, or URL..."
        .value=${this._searchQuery}
        @input=${this.#updateQueryString}
      ></uui-input>
    `;
  }

  #updateQueryString(event: Event) {
    const target = event.target as UUIInputElement;
    let q = query();

    if (target.value) {
      q.q = target.value as string;
    } else {
      delete q.q;
    }

    // Reset to first page when filter changes
    q.page = "1";

    window.history.pushState({}, "", `${path()}?${toQueryString(q)}`);
  }

  static override styles = [
    css`
      #auth-policy-browser-search-input {
        margin-block: var(--uui-size-space-3);
        width: 100%;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "auth-policy-browser-search-input": AuthPolicyBrowserSearchInputElement;
  }
}
