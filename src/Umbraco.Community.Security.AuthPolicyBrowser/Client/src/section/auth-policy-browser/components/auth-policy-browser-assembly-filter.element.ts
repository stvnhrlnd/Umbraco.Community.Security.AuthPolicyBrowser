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

@customElement("auth-policy-browser-assembly-filter")
export class AuthPolicyBrowserAssemblyFilterElement extends UmbLitElement {
  #authPolicyBrowserContext?: AuthPolicyBrowserContext;

  @queryAll("#assembly-selector > uui-checkbox")
  private _assemblySelectorCheckboxes!: NodeListOf<UUICheckboxElement>;

  @state()
  private _assemblyFilter: string[] = [];

  @state()
  private _assemblies: string[] = [];

  constructor() {
    super();

    this.consumeContext(AUTH_POLICY_BROWSER_CONTEXT, (instance) => {
      this.#authPolicyBrowserContext = instance;

      // Get unique assembly names from actions
      this.observe(this.#authPolicyBrowserContext.allActions, (actions) => {
        this._assemblies = [...new Set(actions?.map((x) => x.assemblyName))];
      });

      // Watch for filter changes in context
      this.observe(
        this.#authPolicyBrowserContext.assemblyFilter,
        (assemblyFilter) => {
          this._assemblyFilter = assemblyFilter ?? [];
        },
      );
    });
  }

  render() {
    const label =
      this._assemblyFilter.length === 0
        ? "All"
        : this._assemblyFilter.length <= 3
          ? this._assemblyFilter.map(
              (assembly) =>
                html` <span class="assembly-selector__selected-assembly"
                  >${assembly}</span
                >`,
            )
          : "Multiple selected";
    return html`
      <umb-dropdown label="Select assemblies">
        <span slot="label" class="assembly-selector__label">
          Assembly: ${label}
        </span>
        ${this.#renderAssemblySelector()}
      </umb-dropdown>
    `;
  }

  #renderAssemblySelector() {
    return html`
      <div id="assembly-selector" @change=${this.#updateQueryString}>
        ${this._assemblies.map(
          (assembly) => html`
            <uui-checkbox
              .checked=${this._assemblyFilter.includes(assembly)}
              .value=${assembly}
              label="${assembly}"
            >
              <small><code>${assembly}</code></small>
            </uui-checkbox>
          `,
        )}
        <uui-button @click=${this.#selectAllAssemblies}>
          Select all
        </uui-button>
        <uui-button @click=${this.#deselectAllAssemblies}>
          Deselect all
        </uui-button>
      </div>
    `;
  }

  // Get values from checkboxes and set them in the query string
  #updateQueryString() {
    const assemblies = Array.from(this._assemblySelectorCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    let q = query();

    if (assemblies.length) {
      q = { ...q, assemblies: assemblies.join(",") };
    } else {
      delete q.assemblies;
    }

    // Reset to first page when filter changes
    q.page = "1";

    window.history.pushState({}, "", `${path()}?${toQueryString(q)}`);
  }

  #selectAllAssemblies() {
    this._assemblySelectorCheckboxes.forEach(
      (checkbox) => (checkbox.checked = true),
    );
    this.#updateQueryString();
  }

  #deselectAllAssemblies() {
    this._assemblySelectorCheckboxes.forEach(
      (checkbox) => (checkbox.checked = false),
    );
    this.#updateQueryString();
  }

  static override styles = [
    css`
      #assembly-selector {
        display: flex;
        flex-direction: column;
        gap: var(--uui-size-space-3);
        padding: var(--uui-box-default-padding, var(--uui-size-space-5, 18px));
        max-height: 50vh;
        overflow-y: auto;
      }

      .assembly-selector__selected-assembly {
        font-weight: 600;
      }

      .assembly-selector__selected-assembly:not(:last-of-type)::after {
        content: ", ";
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "auth-policy-browser-assembly-filter": AuthPolicyBrowserAssemblyFilterElement;
  }
}
