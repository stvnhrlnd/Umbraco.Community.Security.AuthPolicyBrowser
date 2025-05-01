/**
 * Action information modal for the Auth Policy Browser. Displays detailed
 * information about the action given to it. Currently opened from the
 * table component.
 * @see https://docs.umbraco.com/umbraco-cms/customizing/extending-overview/extension-types/modals
 */

import { customElement, html } from "@umbraco-cms/backoffice/external/lit";
import {
  UmbModalBaseElement,
  UmbModalToken,
} from "@umbraco-cms/backoffice/modal";

import { ActionInfo } from "../../../api";

export interface AuthPolicyBrowserActionInfoModalData {
  actionInfo: ActionInfo;
}

export interface AuthPolicyBrowserActionInfoModalValue {}

export const ACTION_INFO_MODAL = new UmbModalToken<
  AuthPolicyBrowserActionInfoModalData,
  AuthPolicyBrowserActionInfoModalValue
>("Security.Modal.AuthPolicyBrowserActionInfo", {
  modal: {
    type: "sidebar",
    size: "small",
  },
});

@customElement("auth-policy-browser-action-info-modal")
export default class AuthPolicyBrowserActionInfoModalElement extends UmbModalBaseElement<
  AuthPolicyBrowserActionInfoModalData,
  AuthPolicyBrowserActionInfoModalValue
> {
  render() {
    if (this.modalContext === undefined) {
      return html`
        <umb-body-layout headline="Error">
          <p>Modal context is undefined.</p>
          ${this.#renderActionButtons()}
        </umb-body-layout>
      `;
    }

    const actionInfo = this.modalContext.data.actionInfo;
    return html`
      <umb-body-layout
        headline="${actionInfo.controllerName}.${actionInfo.actionName}"
      >
        <h4>Assembly</h4>
        ${actionInfo.assemblyFullName}
        <h4>URL Template</h4>
        ${actionInfo.template || html`<em>None</em>`}
        <h4>Controller Policies</h4>
        <auth-policy-browser-policy-list
          .policies=${actionInfo.controllerPolicies}
        >
        </auth-policy-browser-policy-list>
        <h4>Action Policies</h4>
        <auth-policy-browser-policy-list .policies=${actionInfo.actionPolicies}>
        </auth-policy-browser-policy-list>
        <h4>Allow Anonymous</h4>
        <auth-policy-browser-allow-anonymous-tag .actionInfo=${actionInfo}>
        </auth-policy-browser-allow-anonymous-tag>
        ${this.#renderActionButtons()}
      </umb-body-layout>
    `;
  }

  #onClose() {
    this.modalContext?.reject();
  }

  #renderActionButtons() {
    return html`
      <div slot="actions">
        <uui-button
          .label=${this.localize.term("general_close")}
          @click="${this.#onClose}"
        ></uui-button>
      </div>
    `;
  }
}
