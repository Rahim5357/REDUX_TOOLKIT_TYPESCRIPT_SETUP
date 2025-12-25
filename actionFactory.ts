// Dynamic Action Types Factory to generate action types for multiple APIs
export const ActionTypesFactory = (actionName: string) => {
  const actionPrefix = actionName ? actionName?.toUpperCase() : "";
  return {
    REQUEST: `${actionPrefix}_REQUEST`, // Action type for requesting data
    SUCCESS: `${actionPrefix}_SUCCESS`, // Action type for successful API response
    FAILED: `${actionPrefix}_FAILED`, // Action type for API failure
    RESET: `${actionPrefix}_RESET`, // Action type for API reset
    STORE: `${actionPrefix}_STORE`, // Action type for API reset
  };
};

import { ActionTypesFactory } from "../../../utils/actionFactory";
export const configsAction = ActionTypesFactory("configs");
