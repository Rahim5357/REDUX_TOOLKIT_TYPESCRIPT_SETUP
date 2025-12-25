🧩 Reusable Redux Architecture (Action · Reducer · Saga Factories)

This project follows a factory-based Redux + Redux-Saga architecture to reduce boilerplate and enforce consistency when handling API-driven state.

The setup is built around three core utilities:

Action Types Factory

Reducer Factory

Saga Factory

Together, they provide a scalable and maintainable pattern for managing async API flows.

1️⃣ Action Types Factory (actionFactory.ts)
Purpose

Generates a standardized set of Redux action type constants dynamically using a single name.

What it Solves

Avoids hardcoding action type strings

Ensures consistent naming across the app

Makes action creation reusable for multiple modules

Example Usage
export const configsAction = ActionTypesFactory("configs");

Generated Action Types
CONFIGS_REQUEST
CONFIGS_SUCCESS
CONFIGS_FAILED
CONFIGS_RESET
CONFIGS_STORE


These action types are used by both reducers and sagas.

2️⃣ Reducer Factory (reducerFactory.ts)
Purpose

Creates reusable Redux Toolkit slices that handle common API states such as loading, success, failure, and reset.

What it Solves

Eliminates repetitive reducer logic

Centralizes async state handling

Keeps reducers consistent across features

State Structure
{
  loading: boolean;
  data: any;
  error: string | null;
}

Example Usage
const configsSlice = reducerFactory("configs", configsAction);

Exports

Actions → commonAction

Reducer → commonReducer

This allows easy integration with Redux store, sagas, and components.

3️⃣ Saga Factory (sagaFactory.ts)
Purpose

Abstracts common API side-effect logic into a reusable Redux-Saga worker.

What it Handles

API calls (GET, POST, PUT, PATCH, DELETE)

Axios instance selection (mock vs real API)

Query param sanitization

Success & failure action dispatching

Centralized error handling

Optional toast notifications

Example Usage in Worker Saga
function* configApi(action) {
  yield sagaFactory(
    configsAction,
    commonAction,
    "get",
    apis.getConfig,
    action.payload
  )();
}

Watcher Saga
function* commonSaga() {
  yield takeEvery(CONFIGS_REQUEST, configApi);
}

🔄 Complete Flow

UI dispatches CONFIGS_REQUEST

Watcher saga listens and triggers worker saga

sagaFactory:

Calls API

Dispatches SUCCESS or FAILED

Reducer (generated via reducerFactory) updates:

loading

data

error

UI reacts automatically via Redux state
