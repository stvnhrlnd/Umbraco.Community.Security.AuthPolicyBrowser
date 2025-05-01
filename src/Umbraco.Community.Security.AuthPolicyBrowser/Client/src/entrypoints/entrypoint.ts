/**
 * Backoffice entry point for the Auth Policy Browser extension.
 * @see https://docs.umbraco.com/umbraco-cms/customizing/extending-overview/extension-types/backoffice-entry-point
 */

import {
  UmbEntryPointOnInit,
  UmbEntryPointOnUnload,
} from "@umbraco-cms/backoffice/extension-api";
import { UMB_AUTH_CONTEXT } from "@umbraco-cms/backoffice/auth";

import { client } from "../api";
import AuthPolicyBrowserContext, {
  AUTH_POLICY_BROWSER_CONTEXT,
} from "../context/auth-policy-browser.context";

export const onInit: UmbEntryPointOnInit = (_host, _extensionRegistry) => {
  _host.consumeContext(UMB_AUTH_CONTEXT, async (authContext) => {
    // Get the token info from Umbraco and configure OpenAPI client
    const config = authContext.getOpenApiConfiguration();
    client.setConfig({
      baseUrl: config.base,
      credentials: config.credentials,
    });

    // For every request being made, add the token to the headers.
    // Can't use the setConfig approach above as its set only once and
    // tokens expire and get refreshed.
    client.interceptors.request.use(async (request, _options) => {
      const token = await config.token();
      request.headers.set("Authorization", `Bearer ${token}`);
      return request;
    });
  });

  // Register custom context for the auth policy browser
  _host.provideContext(
    AUTH_POLICY_BROWSER_CONTEXT,
    new AuthPolicyBrowserContext(_host),
  );
};

export const onUnload: UmbEntryPointOnUnload = (
  _host,
  _extensionRegistry,
) => {};
