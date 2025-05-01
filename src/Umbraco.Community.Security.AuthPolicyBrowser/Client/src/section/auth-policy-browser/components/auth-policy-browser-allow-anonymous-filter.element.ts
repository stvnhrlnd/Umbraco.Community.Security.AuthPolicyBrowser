import {
  html,
  customElement,
  queryAll,
  state,
  css,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { path, query, toQueryString } from "@umbraco-cms/backoffice/router";
import { UUICheckboxElement } from "@umbraco-cms/backoffice/external/uui";

import AuthPolicyBrowserContext, {
  AUTH_POLICY_BROWSER_CONTEXT,
} from "../../../context/auth-policy-browser.context";

@customElement("auth-policy-browser-allow-anonymous-filter")
export class AuthPolicyBrowserAllowAnonymousFilterElement extends UmbLitElement {
  #authPolicyBrowserContext?: AuthPolicyBrowserContext;

  @queryAll("#allow-anonymous-selector > uui-checkbox")
  private _allowAnonymousSelectorCheckboxes!: NodeListOf<UUICheckboxElement>;

  @state()
  private _allowAnonymousFilter: string[] = [];

  constructor() {
    super();

    this.consumeContext(AUTH_POLICY_BROWSER_CONTEXT, (instance) => {
      this.#authPolicyBrowserContext = instance;

      // Watch for filter changes in context
      this.observe(
        this.#authPolicyBrowserContext.allowAnonymousFilter,
        (allowAnonymousFilter) => {
          this._allowAnonymousFilter = allowAnonymousFilter ?? [];
        },
      );
    });
  }

  render() {
    return html`
      <umb-dropdown label="Allow anonymous">
        <span slot="label">
          Allow Anonymous:
          ${this._allowAnonymousFilter.length > 0
            ? this._allowAnonymousFilter.map(
                (allowAnonymous) =>
                  html`<span class="allow-anonymous-selector__selected-option"
                    >${allowAnonymous}</span
                  >`,
              )
            : "All"}
        </span>
        ${this.#renderAllowAnonymousSelector()}
      </umb-dropdown>
    `;
  }

  #renderAllowAnonymousSelector() {
    return html`
      <div id="allow-anonymous-selector" @change=${this.#updateQueryString}>
        <uui-checkbox
          .checked=${this._allowAnonymousFilter.includes("Yes")}
          value="Yes"
          label="Yes"
        >
          <uui-tag color="warning">Yes</uui-tag>
        </uui-checkbox>
        <uui-checkbox
          .checked=${this._allowAnonymousFilter.includes("No")}
          value="No"
          label="No"
        >
          <uui-tag color="positive">No</uui-tag>
        </uui-checkbox>
      </div>
    `;
  }

  // Get values from checkboxes and set them in the query string
  #updateQueryString() {
    const allowAnonymousOptions = Array.from(
      this._allowAnonymousSelectorCheckboxes,
    )
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    let q = query();

    if (allowAnonymousOptions.length) {
      q = { ...q, allowAnonymous: allowAnonymousOptions.join(",") };
    } else {
      delete q.allowAnonymous;
    }

    // Reset to first page when filter changes
    q.page = "1";

    window.history.pushState({}, "", `${path()}?${toQueryString(q)}`);
  }

  static override styles = [
    css`
      #allow-anonymous-selector {
        display: flex;
        flex-direction: column;
        gap: var(--uui-size-space-3);
        padding: var(--uui-box-default-padding, var(--uui-size-space-5, 18px));
        max-height: 50vh;
        overflow-y: auto;
      }

      .allow-anonymous-selector__selected-option {
        font-weight: 600;
      }

      .allow-anonymous-selector__selected-option:not(:last-of-type)::after {
        content: ", ";
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "auth-policy-browser-allow-anonymous-filter": AuthPolicyBrowserAllowAnonymousFilterElement;
  }
}
