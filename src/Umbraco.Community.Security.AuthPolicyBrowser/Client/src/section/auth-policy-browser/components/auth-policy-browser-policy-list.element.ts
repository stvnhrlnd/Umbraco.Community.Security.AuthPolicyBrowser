import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import {
  css,
  customElement,
  html,
  property,
  repeat,
} from "@umbraco-cms/backoffice/external/lit";

@customElement("auth-policy-browser-policy-list")
export class AuthPolicyBrowserPolicyListElement extends UmbLitElement {
  @property({ type: Array })
  policies: string[] = [];

  render() {
    return this.policies.length == 0
      ? html`<uui-tag color="warning">None</uui-tag>`
      : html` <div class="auth-policy-browser-policy-list">
          ${repeat(
            this.policies,
            (policy) => policy,
            (policy) => html` <uui-tag>${policy}</uui-tag> `,
          )}
        </div>`;
  }

  static override styles = [
    css`
      .auth-policy-browser-policy-list {
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        gap: var(--uui-size-space-1);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "auth-policy-browser-policy-list": AuthPolicyBrowserPolicyListElement;
  }
}
