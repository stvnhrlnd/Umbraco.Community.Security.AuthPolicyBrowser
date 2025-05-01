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

@customElement("auth-policy-browser-policy-filter")
export class AuthPolicyBrowserPolicyFilterElement extends UmbLitElement {
  #authPolicyBrowserContext?: AuthPolicyBrowserContext;

  @queryAll("#policy-selector > uui-checkbox")
  private _policySelectorCheckboxes!: NodeListOf<UUICheckboxElement>;

  @state()
  private _policyFilter: string[] = [];

  @state()
  private _policies: string[] = [];

  constructor() {
    super();

    this.consumeContext(AUTH_POLICY_BROWSER_CONTEXT, (instance) => {
      this.#authPolicyBrowserContext = instance;

      // Get unique policy names from actions
      this.observe(this.#authPolicyBrowserContext.allActions, (actions) => {
        this._policies = [
          ...new Set(
            actions?.flatMap((x) =>
              x.controllerPolicies.concat(x.actionPolicies),
            ),
          ),
        ];
        this._policies.sort();
      });

      // Watch for filter changes in context
      this.observe(
        this.#authPolicyBrowserContext.policyFilter,
        (policyFilter) => {
          this._policyFilter = policyFilter ?? [];
        },
      );
    });
  }

  render() {
    const label =
      this._policyFilter.length === 0
        ? "All"
        : this._policyFilter.length <= 3
          ? this._policyFilter.map(
              (policy) =>
                html` <span class="policy-selector__selected-policy"
                  >${policy}</span
                >`,
            )
          : "Multiple selected";
    return html`
      <umb-dropdown label="Select policies">
        <span slot="label"> Policy: ${label} </span>
        ${this.#renderPolicySelector()}
      </umb-dropdown>
    `;
  }

  #renderPolicySelector() {
    return html`
      <div id="policy-selector" @change=${this.#updateQueryString}>
        <uui-checkbox
          .checked=${this._policyFilter.includes("None")}
          value="None"
          label="None"
        >
          <uui-tag color="warning">None</uui-tag>
        </uui-checkbox>
        ${this._policies.map(
          (policy) => html`
            <uui-checkbox
              .checked=${this._policyFilter.includes(policy)}
              .value=${policy}
              label="${policy}"
            >
              <uui-tag>${policy}</uui-tag>
            </uui-checkbox>
          `,
        )}
        <uui-button @click=${this.#selectAllPolicies}> Select all </uui-button>
        <uui-button @click=${this.#deselectAllPolicies}>
          Deselect all
        </uui-button>
      </div>
    `;
  }

  // Get values from checkboxes and set them in the query string
  #updateQueryString() {
    const policies = Array.from(this._policySelectorCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    let q = query();

    if (policies.length) {
      q = { ...q, policies: policies.join(",") };
    } else {
      delete q.policies;
    }

    // Reset to first page when filter changes
    q.page = "1";

    window.history.pushState({}, "", `${path()}?${toQueryString(q)}`);
  }

  #selectAllPolicies() {
    this._policySelectorCheckboxes.forEach(
      (checkbox) => (checkbox.checked = true),
    );
    this.#updateQueryString();
  }

  #deselectAllPolicies() {
    this._policySelectorCheckboxes.forEach(
      (checkbox) => (checkbox.checked = false),
    );
    this.#updateQueryString();
  }

  static override styles = [
    css`
      #policy-selector {
        display: flex;
        flex-direction: column;
        gap: var(--uui-size-space-3);
        padding: var(--uui-box-default-padding, var(--uui-size-space-5, 18px));
        max-height: 50vh;
        overflow-y: auto;
      }

      .policy-selector__selected-policy {
        font-weight: 600;
      }

      .policy-selector__selected-policy:not(:last-of-type)::after {
        content: ", ";
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "auth-policy-browser-policy-filter": AuthPolicyBrowserPolicyFilterElement;
  }
}
