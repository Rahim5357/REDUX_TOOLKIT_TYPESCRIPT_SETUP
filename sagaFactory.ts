import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
import endpointApi from "../api/axiosInterceptors";
import { ActionTypesFactory } from "./actionFactory";
import mockApi from "../api/mockApi";
import { showToast } from "../components/toastProvider/ToastProvider";
import { responseError } from "./responseError";
import sanitizeParams from "./sanitizeParams";

// Factory function to create reusable Redux-Saga workers
// Handles API calls, success/failure actions, and optional toast messages
export const sagaFactory = (
  actionTypes: ReturnType<typeof ActionTypesFactory>, // Generated action types
  actionReducer: any,                                // Slice actions
  method: string,                                   // HTTP method (get, post, etc.)
  api: string,                                      // API endpoint
  data: any,                                        // Payload or request body
  message: boolean = false,                         // Enable/disable toast messages
  includeParams: boolean = false,                   // Whether to include params explicitly
  headers?: any,                                    // Optional headers
) => {
  // Return a saga generator function
  return function* () {

    // Check if API is an absolute URL (used for mock APIs)
    const isAbsoluteUrl =
      api.startsWith("http://") || api.startsWith("https://");

    // Choose correct axios instance
    const instance = isAbsoluteUrl ? mockApi : endpointApi;

    let res: AxiosResponse<any> | null = null;
    let params: any = undefined;

    // Extract and sanitize query params if required
    if (data?.params && includeParams) {
      params = sanitizeParams(data.params);
      delete data.params;
    }

    try {
      // Handle request based on HTTP method
      if (
        method === "post" ||
        method === "put" ||
        method === "patch" ||
        method === "delete"
      ) {
        res = yield call(instance[method], api, data, { headers, params });
      } else {
        // Default GET request
        res = yield call(instance.get, api, {
          headers,
          params: sanitizeParams(data),
        });
      }

      // Handle successful response
      if (res && res.status < 400) {
        yield put(actionReducer[`${actionTypes.SUCCESS}`](res.data));

        // Show success toast if enabled
        if (message && res?.data?.status === true) {
          showToast(`${res?.data?.message}`, "success");
        }
      } 
      // Handle API-level failure response
      else {
        yield put(
          actionReducer[`${actionTypes.FAILED}`](res?.data || "Unknown error"),
        );

        if (message && res?.data?.status === false) {
          showToast(`${res?.data?.message}`, "error");
        }
      }
    } catch (err: unknown) {
      // Handle network or unexpected errors
      const { message: errorMessage, data: errorData } = responseError(err);

      yield put(actionReducer[`${actionTypes.FAILED}`](errorData));

      console.error("Call Endpoint API Error:", {
        err,
        errorData,
        errorMessage,
      });

      // Show error toast if message exists
      if (errorMessage) {
        showToast(errorMessage, "error");
      }
    }
  };
};





import { takeEvery } from "redux-saga/effects";
import { sagaFactory } from "../../../utils/sagaFactory";
import apis from "../../../api/apis";
import { configsAction } from "./action";
import { commonAction, CONFIGS_REQUEST } from "./commonSlice";

// Type definition for CONFIGS_REQUEST action payload
interface ConfigsRequestAction {
  payload?: any;
}

// Worker saga
// Executes when CONFIGS_REQUEST action is dispatched
function* configApi(action: ConfigsRequestAction) {
  // Invoke the generic sagaFactory with configs-specific details
  yield sagaFactory(
    configsAction,     // Action types (REQUEST, SUCCESS, FAILED, etc.)
    commonAction,      // Reducer actions
    "get",             // HTTP method
    apis.getConfig,    // API endpoint
    action.payload     // Request payload
  )();
}

// Watcher saga
// Listens for CONFIGS_REQUEST actions
function* commonSaga() {
  yield takeEvery(CONFIGS_REQUEST, configApi);
}

// Export root saga
export default commonSaga;
