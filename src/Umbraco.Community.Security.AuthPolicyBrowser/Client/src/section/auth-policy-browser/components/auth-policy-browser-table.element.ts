import {
  UmbTableColumn,
  UmbTableConfig,
  UmbTableItem,
} from "@umbraco-cms/backoffice/components";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import {
  css,
  customElement,
  html,
  state,
} from "@umbraco-cms/backoffice/external/lit";
import { path, query, toQueryString } from "@umbraco-cms/backoffice/router";
import {
  UMB_MODAL_MANAGER_CONTEXT,
  UmbModalManagerContext,
} from "@umbraco-cms/backoffice/modal";
import { UUIPaginationElement } from "@umbraco-cms/backoffice/external/uui";

import { ActionInfo } from "../../../api";
import AuthPolicyBrowserContext, {
  AUTH_POLICY_BROWSER_CONTEXT,
} from "../../../context/auth-policy-browser.context";
import { ACTION_INFO_MODAL } from "../modals/auth-policy-browser-action-info-modal.element";
import { DEFAULT_PAGE_SIZE } from "../../../constants";

@customElement("auth-policy-browser-table")
export class AuthPolicyBrowserTableElement extends UmbLitElement {
  #authPolicyBrowserContext?: AuthPolicyBrowserContext;
  #modalManagerContext?: UmbModalManagerContext;

  @state()
  private _tableConfig: UmbTableConfig = {
    allowSelection: false,
    hideIcon: true,
  };

  @state()
  private _tableColumns: UmbTableColumn[] = [
    {
      name: "Action",
      alias: "action",
    },
    {
      name: "Policies",
      alias: "policies",
    },
    {
      name: "Allow Anonymous",
      alias: "allowAnonymous",
    },
    {
      name: "",
      alias: "info",
    },
  ];

  @state()
  private _tableItems: UmbTableItem[] = [];

  @state()
  private _actionsTotal = 0;

  @state()
  private _pageSize = DEFAULT_PAGE_SIZE;

  @state()
  private _currentPage = 1;

  @state()
  private _totalPages = 1;

  constructor() {
    super();

    this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (instance) => {
      this.#modalManagerContext = instance;
    });

    this.consumeContext(AUTH_POLICY_BROWSER_CONTEXT, (instance) => {
      this.#authPolicyBrowserContext = instance;

      // Regenerate table items when actions in the context change
      this.observe(
        this.#authPolicyBrowserContext.filteredActionsPage,
        (items) => this.#createTableItems(items),
      );
      this.observe(
        this.#authPolicyBrowserContext.filteredActionsTotal,
        (total) => {
          this._actionsTotal = total ?? 0;
          this._totalPages = Math.ceil(this._actionsTotal / this._pageSize);
        },
      );
      this.observe(
        this.#authPolicyBrowserContext.currentPage,
        (currentPage) => (this._currentPage = currentPage ?? 1),
      );
      this.observe(
        this.#authPolicyBrowserContext.pageSize,
        (pageSize) => (this._pageSize = pageSize ?? DEFAULT_PAGE_SIZE),
      );
    });
  }

  render() {
    return html`
      ${this._tableItems.length === 0
        ? html`<uui-box>
            <em>No actions matching your search criteria.</em>
          </uui-box>`
        : html`
            <umb-table
              .config=${this._tableConfig}
              .columns=${this._tableColumns}
              .items=${this._tableItems}
            >
            </umb-table>
            ${this.#renderPagination()}
          `}
    `;
  }

  #createTableItems(items: ActionInfo[] | undefined) {
    if (!items) {
      return;
    }

    this._tableItems = items.map((item, index) => {
      return {
        id: index.toString(),
        data: [
          {
            columnAlias: "action",
            value: this.#renderActionInfo(item),
          },
          {
            columnAlias: "policies",
            value: html`
              <div style="padding-block: var(--uui-size-space-1);">
                <auth-policy-browser-policy-list
                  .policies=${item.controllerPolicies.concat(
                    item.actionPolicies,
                  )}
                >
                </auth-policy-browser-policy-list>
              </div>
            `,
          },
          {
            columnAlias: "allowAnonymous",
            value: html`
              <auth-policy-browser-allow-anonymous-tag .actionInfo=${item}>
              </auth-policy-browser-allow-anonymous-tag>
            `,
          },
          {
            columnAlias: "info",
            value: this.#renderInfoButton(item),
          },
        ],
      };
    });
  }

  #openActionInfoModal(actionInfo: ActionInfo) {
    this.#modalManagerContext?.open(this, ACTION_INFO_MODAL, {
      data: {
        actionInfo: actionInfo,
      },
    });
  }

  #renderInfoButton(actionInfo: ActionInfo) {
    return html`
      <uui-button
        label="View details"
        @click=${() => this.#openActionInfoModal(actionInfo)}
        compact
      >
        <uui-icon name="info"></uui-icon>
      </uui-button>
    `;
  }

  // Update page number in query string
  #onPageChange(event: Event): void {
    const current = (event.target as UUIPaginationElement).current;
    let q = query();
    q.page = current.toString();
    window.history.pushState({}, "", `${path()}?${toQueryString(q)}`);
  }

  #renderPagination() {
    if (!this._actionsTotal) return "";
    if (this._totalPages <= 1) return "";

    return html` <div id="auth-policy-browser-pagination">
      <uui-pagination
        .total=${this._totalPages}
        .current=${this._currentPage}
        @change="${this.#onPageChange}"
      >
      </uui-pagination>
    </div>`;
  }

  #renderActionInfo(actionInfo: ActionInfo) {
    // TODO: Get rid of inline styles?
    return html`
      <div style="padding-block: var(--uui-size-space-3);">
        <div>
          <strong>
            <code>${actionInfo.controllerName}.${actionInfo.actionName}</code>
          </strong>
        </div>
        <div>
          <small style="margin-block-end: var(--uui-size-space-1);">
            <code>${actionInfo.assemblyName}</code>
          </small>
        </div>
        <div>${actionInfo.template}</div>
      </div>
    `;
  }

  static override styles = [
    css`
      #auth-policy-browser-pagination {
        margin-block-start: var(--uui-size-space-6);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "auth-policy-browser-table": AuthPolicyBrowserTableElement;
  }
}
