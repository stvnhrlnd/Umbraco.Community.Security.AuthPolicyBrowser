import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import {
  css,
  customElement,
  html,
  property,
} from "@umbraco-cms/backoffice/external/lit";

import { ActionInfo } from "../../../api";

@customElement("auth-policy-browser-allow-anonymous-tag")
export class AuthPolicyBrowserAllowAnonymousTagElement extends UmbLitElement {
  @property({ type: Object })
  actionInfo: ActionInfo | undefined = undefined;

  render() {
    if (this.actionInfo === undefined) {
      return "";
    }

    if (
      this.actionInfo.controllerAllowAnonymous &&
      this.actionInfo.actionAllowAnonymous
    ) {
      return html`<uui-tag color="warning"
        >Yes (controller and action)</uui-tag
      >`;
    } else if (this.actionInfo.controllerAllowAnonymous) {
      return html`<uui-tag color="warning">Yes (controller)</uui-tag>`;
    } else if (this.actionInfo.actionAllowAnonymous) {
      return html`<uui-tag color="warning">Yes (action)</uui-tag>`;
    } else {
      return html`<uui-tag color="positive">No</uui-tag>`;
    }
  }

  static override styles = [
    css`
      .auth-policy-browser-policy-list {
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        row-gap: var(--uui-size-space-1);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "auth-policy-browser-allow-anonymous-tag": AuthPolicyBrowserAllowAnonymousTagElement;
  }
}
