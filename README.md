# 🧩 Reusable Redux Architecture (Action · Reducer · Saga Factories)

This project follows a **factory-based Redux + Redux-Saga architecture** to reduce boilerplate and enforce consistency when handling API-driven state.

The setup is built around **three core utilities**:

1. Action Types Factory  
2. Reducer Factory  
3. Saga Factory  

Together, they provide a scalable and maintainable pattern for managing async API flows.

---

## 1️⃣ Action Types Factory (`actionFactory.ts`)

### Purpose
Generates a standardized set of Redux action type constants dynamically using a single name.

### What it Solves
- Avoids hardcoding action type strings
- Ensures consistent naming across the application
- Makes action creation reusable for multiple modules

### Example Usage
```ts
export const configsAction = ActionTypesFactory("configs");




## 🧱 Reducer Factory (`reducerFactory.ts`)

The `reducerFactory` is a reusable utility built on top of **Redux Toolkit’s `createSlice`**.  
It dynamically generates reducers and actions for handling common asynchronous API states.

---

### 🎯 Purpose

- Standardize reducer logic for API-driven state
- Eliminate repetitive boilerplate across features
- Enforce consistent state shape and behavior

---

### 🛠 What It Handles

Each generated reducer manages the following states:

- **REQUEST** → Starts loading, clears errors  
- **SUCCESS** → Stores API response, stops loading  
- **FAILED** → Stores error information  
- **RESET** → Resets state to initial values  
- **STORE** → Stores data without triggering loading  

---

### 📦 State Structure

```ts
{
  loading: boolean;
  data: any;
  error: string | null;
}






