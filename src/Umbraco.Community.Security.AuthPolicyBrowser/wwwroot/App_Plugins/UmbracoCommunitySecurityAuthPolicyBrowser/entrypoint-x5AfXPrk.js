import { UMB_AUTH_CONTEXT as a } from "@umbraco-cms/backoffice/auth";
import { c as o, A as c, a as p } from "./auth-policy-browser.context-DD_t0hww.js";
const l = (e, s) => {
  e.consumeContext(a, async (i) => {
    const t = i.getOpenApiConfiguration();
    o.setConfig({
      baseUrl: t.base,
      credentials: t.credentials
    }), o.interceptors.request.use(async (n, C) => {
      const r = await t.token();
      return n.headers.set("Authorization", `Bearer ${r}`), n;
    });
  }), e.provideContext(
    c,
    new p(e)
  );
}, u = (e, s) => {
};
export {
  l as onInit,
  u as onUnload
};
//# sourceMappingURL=entrypoint-x5AfXPrk.js.map
