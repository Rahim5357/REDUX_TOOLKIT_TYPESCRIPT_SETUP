// Factory function to dynamically generate Redux action type constants
// This helps avoid hardcoding action strings for every API/module
export const ActionTypesFactory = (actionName: string) => {
  // Convert action name to uppercase to follow Redux action naming conventions
  // Example: "configs" -> "CONFIGS"
  const actionPrefix = actionName ? actionName.toUpperCase() : "";

  // Return a standard set of action types for async flows
  return {
    REQUEST: `${actionPrefix}_REQUEST`, // Dispatched when API call starts
    SUCCESS: `${actionPrefix}_SUCCESS`, // Dispatched when API call succeeds
    FAILED: `${actionPrefix}_FAILURE`,   // Dispatched when API call fails
    RESET: `${actionPrefix}_RESET`,     // Dispatched to reset state (e.g., on unmount)
    STORE: `${actionPrefix}_STORE`,     // Dispatched to store data locally (custom use-case)
  };
};




// Import the ActionTypesFactory utility
import { ActionTypesFactory } from "../../../utils/actionFactory";

// Generate action types specifically for the "configs" module/API
// This will create:
// CONFIGS_REQUEST, CONFIGS_SUCCESS, CONFIGS_FAILED, CONFIGS_RESET, CONFIGS_STORE
export const configsAction = ActionTypesFactory("configs");
