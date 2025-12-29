# react-store-light

A **minimal reactive state manager** for small React projects.
Designed to be **simple, lightweight (< 2 KB)**, and easy to reason about.

No providers. No context. No boilerplate.

---

## ✨ Features

* 🧠 **Observer-based state updates**
  Components automatically re-render when a subscribed value changes.

* ⚛️ **Works with React hooks**
  Built around a simple `useStore(key)` hook.

* 📦 **No Context / Provider required**
  No wrapping your app, no extra layers.

* 🪶 **Zero dependencies** (except React)
  Nothing extra in your bundle.

* 🧩 **Fully typed with TypeScript**
  Strong typing for keys and values out of the box.

* 🔌 **Can be used from JavaScript projects**
  TypeScript is optional — works perfectly in plain JS.

* 🗂 **Supports multiple independent stores**
  Create as many stores as you need — each one is fully isolated.

* 🚀 **Tiny bundle size**
  Size minified files < 2Kb.

---

## 📦 Installation

```bash
npm install react-store-light
```

or

```bash
pnpm add react-store-light
```

---

## 🚀 Quick Start

```ts
import { createStore } from "react-store-light";

const store = createStore({
  count: 0,
  theme: "light",
});
```

### Using the store in React

```tsx
function Counter() {
  const count = store.useStore("count");

  return (
    <button onClick={() => store.set("count", count + 1)}>
      Count: {count}
    </button>
  );
}
```

---

## 🔍 Reading and updating values outside React

```ts
const currentCount = store.get("count");

store.set("count", currentCount + 1);
```

---

## 🔔 Listening to changes (side effects)

Listeners are useful for reacting to state changes without triggering renders
(e.g. syncing to `localStorage`, logging, analytics).

```ts
store.addListener("count", (key, value) => {
  console.log(`${key} changed to`, value);
});

store.removeListener("count", listener);
```

---

## 🗂 Multiple Stores Example

```ts
const authStore = createStore({
  isAuthenticated: false,
});

const settingsStore = createStore({
  theme: "dark",
});
```

Each store is completely independent and has its own state and subscriptions.

---

## 🧠 Design Goals

* Minimal API surface
* Predictable behavior
* No hidden magic
* Easy to delete if the project grows 🙂

This library is intentionally **not** a replacement for Redux, Zustand, or Jotai.
It is meant for **small projects** where you want simple shared state without overhead.

---

## 📄 License

MIT

---

## 👤 Author

**Denis Kurochkin**

