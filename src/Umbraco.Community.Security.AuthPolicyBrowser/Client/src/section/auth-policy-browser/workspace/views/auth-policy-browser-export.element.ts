import {
  html,
  customElement,
  state,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";

import AuthPolicyBrowserContext, {
  AUTH_POLICY_BROWSER_CONTEXT,
} from "../../../../context/auth-policy-browser.context";
import { ActionInfo } from "../../../../api";

/**
 * Auth Policy Browser "Export" workspace view. Displays the action info data
 * in its raw format for copying/exporting.
 */
@customElement("auth-policy-browser-export-view")
export default class AuthPolicyBrowserExportViewElement extends UmbLitElement {
  #authPolicyBrowserContext?: AuthPolicyBrowserContext;

  @state()
  private _actionsJSON: string = "[]";

  constructor() {
    super();

    this.consumeContext(AUTH_POLICY_BROWSER_CONTEXT, (instance) => {
      this.#authPolicyBrowserContext = instance;

      // Regenerate export formats when actions in the context change
      this.observe(this.#authPolicyBrowserContext.allActions, (items) =>
        this.#createExportFormats(items),
      );

      // Get the actions from the API
      this.#authPolicyBrowserContext.getActions();
    });
  }

  render() {
    // TODO: Add loading animation
    return html`
      <umb-body-layout>
        <uui-box headline="JSON">
          <umb-code-block ?copy=${true}>${this._actionsJSON}</umb-code-block>
        </uui-box>
      </umb-body-layout>
    `;
  }

  #createExportFormats(items: ActionInfo[] | undefined) {
    if (!items) {
      return;
    }

    this._actionsJSON = JSON.stringify(items, null, 2);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "auth-policy-browser-export-view": AuthPolicyBrowserExportViewElement;
  }
}
