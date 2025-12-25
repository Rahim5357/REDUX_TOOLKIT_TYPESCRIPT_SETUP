import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
import endpointApi from "../api/axiosInterceptors";
import { ActionTypesFactory } from "./actionFactory";
import mockApi from "../api/mockApi";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { showToast } from "../components/toastProvider/ToastProvider";
import { responseError } from "./responseError";
import sanitizeParams from "./sanitizeParams";

export const sagaFactory = (
  actionTypes: ReturnType<typeof ActionTypesFactory>,
  actionReducer: any,
  method: string,
  api: string,
  data: any,
  message: boolean = false,
  includeParams: boolean = false,
  headers?: any,
) => {
  return function* () {
    const isAbsoluteUrl =
      api.startsWith("http://") || api.startsWith("https://");

    const instance = isAbsoluteUrl ? mockApi : endpointApi;

    let res: AxiosResponse<any> | null = null;
    let params: any = undefined;
    if (data?.params && includeParams) {
      params = sanitizeParams(data.params);
      delete data.params;
    }

    try {
      if (
        method === "post" ||
        method === "put" ||
        method === "patch" ||
        method === "delete"
      ) {
        res = yield call(instance[method], api, data, { headers, params });
      } else {
        res = yield call(instance.get, api, {
          headers,
          params: sanitizeParams(data),
        });
      }

      if (res && res.status < 400) {
        yield put(actionReducer[`${actionTypes.SUCCESS}`](res.data));
        if (message && res?.data?.status === true) {
          showToast(`${res?.data?.message}`, "success");
        }
      } else {
        yield put(
          actionReducer[`${actionTypes.FAILED}`](res?.data || "Unknown error"),
        );
        if (message && res?.data?.status === false) {
          showToast(`${res?.data?.message}`, "error");
        }
      }
    } catch (err: unknown) {
      const { message: errorMessage, data: errorData } = responseError(err);
      yield put(actionReducer[`${actionTypes.FAILED}`](errorData));
      console.error("Call Endpoint API Error:", {
        err,
        errorData,
        errorMessage,
      });
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

// Type for the action payload
interface ConfigsRequestAction {
    payload?: any;
}

// Worker saga
function* configApi(action: ConfigsRequestAction) {
    // Call your generic sagaFactory
    yield sagaFactory(
        configsAction,
        commonAction,
        "get",
        apis.getConfig,
        action.payload
    )();
}

// Watcher saga
function* commonSaga() {
    yield takeEvery(CONFIGS_REQUEST, configApi);
}

export default commonSaga;
