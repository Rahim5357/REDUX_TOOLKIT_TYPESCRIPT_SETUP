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
