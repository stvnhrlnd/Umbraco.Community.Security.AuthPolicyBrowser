import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import {
  UmbArrayState,
  UmbNumberState,
  UmbStringState,
} from "@umbraco-cms/backoffice/observable-api";
import { query } from "@umbraco-cms/backoffice/router";

import {
  ActionInfo,
  UmbracoCommunitySecurityAuthPolicyBrowserService,
} from "../api";
import { DEFAULT_PAGE_SIZE } from "../constants";

export const AUTH_POLICY_BROWSER_CONTEXT =
  new UmbContextToken<AuthPolicyBrowserContext>("AuthPolicyBrowserContext");

/**
 * Context API for the Auth Policy Browser extension.
 * @see https://docs.umbraco.com/umbraco-cms/customizing/foundation/working-with-data/context-api
 */
export default class AuthPolicyBrowserContext extends UmbControllerBase {
  #assemblyFilter = new UmbArrayState<string>([], (x) => x);
  public readonly assemblyFilter = this.#assemblyFilter.asObservable();

  #policyFilter = new UmbArrayState<string>([], (x) => x);
  public readonly policyFilter = this.#policyFilter.asObservable();

  #allowAnonymousFilter = new UmbArrayState<string>([], (x) => x);
  public readonly allowAnonymousFilter =
    this.#allowAnonymousFilter.asObservable();

  #searchQuery = new UmbStringState("");
  public readonly searchQuery = this.#searchQuery.asObservable();

  #currentPage = new UmbNumberState(1);
  public readonly currentPage = this.#currentPage.asObservable();

  #pageSize = new UmbNumberState(DEFAULT_PAGE_SIZE);
  public readonly pageSize = this.#pageSize.asObservable();

  #allActions = new UmbArrayState<ActionInfo>([], (x) => x);
  public readonly allActions = this.#allActions.asObservable();

  #filteredActionsPage = new UmbArrayState<ActionInfo>([], (x) => x);
  public readonly filteredActionsPage =
    this.#filteredActionsPage.asObservable();

  #filteredActionsTotal = new UmbNumberState(0);
  public readonly filteredActionsTotal =
    this.#filteredActionsTotal.asObservable();

  /**
   * Get all actions from the backend API.
   * Filtering and pagination happens on the client-side.
   */
  async getActions() {
    const { data, error } =
      await UmbracoCommunitySecurityAuthPolicyBrowserService.getActions();

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      this.#allActions.setValue(data);
      this.filterAndPageActions();
    }
  }

  /**
   * Filter and paginate the actions based on the currently applied filters.
   */
  filterAndPageActions() {
    // Get all actions and current values of filters
    const allActions = this.#allActions.getValue();
    const assemblyFilter = this.#assemblyFilter.getValue();
    const policyFilter = this.#policyFilter.getValue();
    const allowAnonymousFilter = this.#allowAnonymousFilter.getValue();
    const searchQuery = this.#searchQuery.getValue().toLowerCase();

    // Do the filtering
    // TODO: Make this cleaner
    const filteredActions = allActions.filter(
      (x) =>
        (assemblyFilter.length === 0 ||
          assemblyFilter.includes(x.assemblyName)) &&
        (policyFilter.length === 0 ||
          x.controllerPolicies.some((y) => policyFilter.includes(y)) ||
          x.actionPolicies.some((y) => policyFilter.includes(y)) ||
          (policyFilter.includes("None") &&
            x.controllerPolicies.length === 0 &&
            x.actionPolicies.length === 0)) &&
        (allowAnonymousFilter.length === 0 ||
          (allowAnonymousFilter.includes("Yes") &&
            (x.controllerAllowAnonymous || x.actionAllowAnonymous)) ||
          (allowAnonymousFilter.includes("No") &&
            !(x.controllerAllowAnonymous || x.actionAllowAnonymous))) &&
        (searchQuery.length === 0 ||
          x.controllerName.toLowerCase().includes(searchQuery) ||
          x.actionName.toLowerCase().includes(searchQuery) ||
          x.template?.toLowerCase().includes(searchQuery)),
    );

    // Pagination
    const currentPage = this.#currentPage.getValue();
    const pageSize = this.#pageSize.getValue();
    const startIndex = (currentPage - 1) * pageSize;
    const page = filteredActions.slice(startIndex, startIndex + pageSize);

    this.#filteredActionsPage.setValue(page);
    this.#filteredActionsTotal.setValue(filteredActions.length);
  }

  /**
   * Attach event listener for when query string changes.
   */
  override hostConnected() {
    super.hostConnected();
    window.addEventListener("changestate", this.#onChangeState);
    this.#onChangeState();
  }

  /**
   * Remove event listener for when query string changes.
   */
  override hostDisconnected() {
    super.hostDisconnected();
    window.removeEventListener("changestate", this.#onChangeState);
  }

  /**
   * Called when query string changes to filter and paginate the actions.
   */
  #onChangeState = () => {
    const queryObj = query();

    const assemblies = queryObj.assemblies
      ? queryObj.assemblies.split(",")
      : [];
    this.#assemblyFilter.setValue(assemblies);

    const policies = queryObj.policies ? queryObj.policies.split(",") : [];
    this.#policyFilter.setValue(policies);

    const allowAnonymous = queryObj.allowAnonymous
      ? queryObj.allowAnonymous.split(",")
      : [];
    this.#allowAnonymousFilter.setValue(allowAnonymous);

    const searchQuery = queryObj.q ? queryObj.q : "";
    this.#searchQuery.setValue(searchQuery);

    const currentPage = queryObj.page ? Number(queryObj.page) : 1;
    this.#currentPage.setValue(currentPage);

    const pageSize = queryObj.pageSize ? Number(queryObj.pageSize) : 10;
    this.#pageSize.setValue(pageSize);

    // Refresh the actions
    this.filterAndPageActions();
  };
}
