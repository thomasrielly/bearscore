import { hasInjectionContext, inject, version, toRef as toRef$1, isRef, defineAsyncComponent, getCurrentScope, onScopeDispose, unref, ref, computed, defineComponent, withDirectives, h, Suspense, vShow, Transition, provide, shallowReactive, watch, nextTick, useSSRContext, resolveComponent, createVNode, resolveDynamicComponent, mergeProps, withCtx, renderSlot, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, withAsyncContext, createApp, effectScope, reactive, watchEffect, getCurrentInstance, readonly, customRef, onErrorCaptured, onServerPrefetch, shallowRef, isReadonly, isShallow, isReactive, toRaw, render } from 'vue';
import { $ as $fetch, k as klona, a as defu, b as defuFn, h as hasProtocol, j as joinURL, p as parseURL, e as parseQuery, f as createHooks, c as createError$1, w as withQuery, i as isScriptProtocol, g as withTrailingSlash, l as withoutTrailingSlash, s as sanitizeStatusCode, m as isSamePath, t as toRouteMatcher, n as createRouter$1 } from '../routes/api/fetchData.mjs';
import { b as baseURL } from '../routes/renderer.mjs';
import { getActiveHead } from 'unhead';
import { defineHeadPlugin, composableNames } from '@unhead/shared';
import { useRoute as useRoute$1, RouterView, createMemoryHistory, createRouter, START_LOCATION } from 'vue-router';
import { ssrRenderVNode, ssrRenderSlot, ssrRenderTeleport, ssrRenderSlotInner, ssrRenderSuspense, ssrRenderClass, ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { Icon as Icon$1 } from '@iconify/vue/dist/offline';
import { addAPIProvider, loadIcon } from '@iconify/vue';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'consola/core';
import 'mongoose';
import 'node:fs';
import 'node:url';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';

function createContext$1(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers$1.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers$1.delete(onLeave);
      }
    }
  };
}
function createNamespace$1(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext$1({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis$1 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey$2 = "__unctx__";
const defaultNamespace = _globalThis$1[globalKey$2] || (_globalThis$1[globalKey$2] = createNamespace$1());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey$1 = "__unctx_async_handlers__";
const asyncHandlers$1 = _globalThis$1[asyncHandlersKey$1] || (_globalThis$1[asyncHandlersKey$1] = /* @__PURE__ */ new Set());

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
const nuxtAppCtx = /* @__PURE__ */ getContext("nuxt-app", {
  asyncContext: false
});
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.11.2";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: reactive({
      data: {},
      state: {},
      once: /* @__PURE__ */ new Set(),
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    runWithContext: (fn) => nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn)),
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
      nuxtApp.ssrContext._payloadReducers = {};
      nuxtApp.payload.path = nuxtApp.ssrContext.url;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a, _b;
  const resolvedPlugins = [];
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    var _a2;
    const unresolvedPluginsForThisPlugin = ((_a2 = plugin2.dependsOn) == null ? void 0 : _a2.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.includes(name))) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.push(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin2.parallel) {
        parallels.push(promise.catch((e) => errors.push(e)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) && ((_b = plugin2.env) == null ? void 0 : _b.islands) === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
// @__NO_SIDE_EFFECTS__
function tryUseNuxtApp() {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || nuxtAppCtx.tryUse();
  return nuxtAppInstance || null;
}
// @__NO_SIDE_EFFECTS__
function useNuxtApp() {
  const nuxtAppInstance = /* @__PURE__ */ tryUseNuxtApp();
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return (/* @__PURE__ */ useNuxtApp()).$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
function defineAppConfig(config) {
  return config;
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a;
  return (_a = /* @__PURE__ */ useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, (/* @__PURE__ */ useNuxtApp())._route);
  }
  return (/* @__PURE__ */ useNuxtApp())._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if ((/* @__PURE__ */ useNuxtApp())._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : withQuery(to.path || "/", to.query || {}) + (to.hash || "");
  const isExternal = (options == null ? void 0 : options.external) || hasProtocol(toPath, { acceptRelative: true });
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const protocol = parseURL(toPath).protocol;
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(/"/g, "%22");
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: location2 }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options == null ? void 0 : options.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef$1((/* @__PURE__ */ useNuxtApp()).payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const error2 = useError();
    if (false)
      ;
    error2.value = error2.value || nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const clearError = async (options = {}) => {
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  const error = useError();
  nuxtApp.callHook("app:error:cleared", options);
  if (options.redirect) {
    await useRouter().replace(options.redirect);
  }
  error.value = null;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
version.startsWith("3");
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        return [k, resolveUnrefHeadInput(v, k)];
      })
    );
  }
  return root;
}
defineHeadPlugin({
  hooks: {
    "entries:resolve": function(ctx) {
      for (const entry2 of ctx.entries)
        entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
    }
  }
});
const headSymbol = "usehead";
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey$1 = "__unhead_injection_handler__";
function setHeadInjectionHandler(handler) {
  _global[globalKey$1] = handler;
}
function injectHead() {
  if (globalKey$1 in _global) {
    return _global[globalKey$1]();
  }
  const head = inject(headSymbol);
  if (!head && "production" !== "production")
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || getActiveHead();
}
function useHead(input, options = {}) {
  const head = options.head || injectHead();
  if (head) {
    if (!head.ssr)
      return clientUseHead(head, input, options);
    return head.push(input, options);
  }
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry2 = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry2.patch(e);
  });
  getCurrentInstance();
  return entry2;
}
const coreComposableNames = [
  "injectHead"
];
({
  "@unhead/vue": [...coreComposableNames, ...composableNames]
});
const unhead_0jW0njCamp = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    setHeadInjectionHandler(
      // need a fresh instance of the nuxt app to avoid parallel requests interfering with each other
      () => (/* @__PURE__ */ useNuxtApp()).vueApp._context.provides.usehead
    );
    nuxtApp.vueApp.use(head);
  }
});
function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
_globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey$1 = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  const state = toRef$1(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const cfg0 = defineAppConfig({
  nuxtIcon: {},
  nui: {},
  tairo: {
    title: "SaaS Bear",
    sidebar: {
      toolbar: {
        showNavBurger: true,
        tools: [
          {
            component: "DemoThemeToggle",
            props: {
              disableTransitions: true
            }
          },
          {
            component: "DemoToolbarNotifications"
          },
          {
            component: "DemoToolbarLanguage"
          },
          {
            component: "DemoToolbarAccountMenu"
          }
        ]
      },
      circularMenu: {
        enabled: true,
        tools: [
          {
            component: "DemoThemeToggle",
            props: {
              class: "ms-auto",
              disableTransitions: true,
              inverted: true
            }
          },
          {
            component: "DemoCircularMenuLanguage"
          },
          {
            component: "DemoCircularMenuNotifications"
          },
          {
            component: "DemoCircularMenuActivity"
          }
        ]
      },
      navigation: {
        logo: {
          component: "TairoLogo",
          props: { class: "text-primary-600 h-6" }
        },
        items: [
          {
            title: "Search",
            icon: { name: "ph:magnifying-glass-duotone", class: "w-5 h-5" },
            click: () => {
              const isOpen = useState("search-open", () => false);
              isOpen.value = true;
            },
            position: "end"
          },
          {
            title: "My Account",
            component: "DemoAccountMenu",
            position: "end"
          }
        ]
      }
    },
    collapse: {
      toolbar: {
        enabled: true,
        showTitle: true,
        showNavBurger: true,
        tools: [
          {
            component: "DemoThemeToggle"
          },
          {
            component: "DemoToolbarLanguage"
          },
          {
            component: "DemoToolbarNotifications"
          },
          {
            component: "DemoToolbarActivity"
          },
          {
            component: "DemoToolbarAccountMenu"
          }
        ]
      },
      circularMenu: {
        enabled: true,
        tools: [
          {
            component: "DemoThemeToggle",
            props: {
              class: "ms-auto",
              disableTransitions: true,
              inverted: true
            }
          },
          {
            component: "DemoCircularMenuLanguage"
          },
          {
            component: "DemoCircularMenuNotifications"
          },
          {
            component: "DemoCircularMenuActivity"
          }
        ]
      },
      navigation: {
        enabled: true,
        header: {
          component: "DemoCollapseNavigationHeader"
        },
        footer: {
          component: "DemoCollapseNavigationFooter"
        },
        items: [
          {
            name: "Dashboards",
            icon: { name: "ph:sidebar-duotone", class: "w-5 h-5" },
            activePath: "/dashboards",
            children: [
              {
                name: "Personal v1",
                to: "/dashboards",
                icon: { name: "ph:coffee-duotone", class: "w-4 h-4" }
              },
              {
                name: "Personal v2",
                to: "/dashboards/personal-2",
                icon: { name: "ph:chart-pie-slice-duotone", class: "w-4 h-4" }
              },
              {
                name: "Personal v3",
                to: "/dashboards/personal-3",
                icon: { name: "ph:cactus-duotone", class: "w-4 h-4" }
              },
              {
                name: "Analytics",
                to: "/dashboards/analytics",
                icon: { name: "ph:gauge-duotone", class: "w-4 h-4" }
              },
              {
                name: "Stocks",
                to: "/dashboards/stocks",
                icon: { name: "ph:coin-duotone", class: "w-4 h-4" }
              },
              {
                name: "Sales",
                to: "/dashboards/sales",
                icon: { name: "ph:shopping-cart-duotone", class: "w-4 h-4" }
              }
            ]
          },
          {
            name: "Layouts",
            icon: { name: "ph:app-window-duotone", class: "w-5 h-5" },
            activePath: "/layouts",
            children: [
              {
                name: "List view v1",
                to: "/layouts",
                icon: { name: "ph:list-bullets-duotone", class: "w-4 h-4" }
              },
              {
                name: "Flex list v1",
                to: "/layouts/flex-list-1",
                icon: { name: "ph:list-checks-duotone", class: "w-4 h-4" }
              },
              {
                name: "Table list v1",
                to: "/layouts/table-list-1",
                icon: { name: "ph:table-duotone", class: "w-4 h-4" }
              },
              {
                name: "Card grid v1",
                to: "/layouts/card-grid-1",
                icon: { name: "ph:circles-four-duotone", class: "w-4 h-4" }
              }
            ]
          },
          {
            name: "Projects",
            icon: { name: "ph:suitcase-duotone", class: "w-5 h-5" },
            activePath: "/layouts/projects/",
            children: [
              {
                name: "Projects",
                to: "/layouts/projects/project-list-3",
                icon: { name: "ph:leaf-duotone", class: "w-4 h-4" }
              },
              {
                name: "Project Details",
                to: "/layouts/projects/details",
                icon: {
                  name: "ph:note-duotone",
                  class: "w-4 h-4"
                }
              },
              {
                name: "Kanban Board",
                to: "/layouts/projects/board",
                icon: { name: "ph:circles-four-duotone", class: "w-4 h-4" }
              }
            ]
          },
          {
            name: "Auth",
            icon: { name: "ph:lock-duotone", class: "w-5 h-5" },
            activePath: "/layouts/projects/",
            children: [
              {
                name: "Login",
                to: "/auth",
                icon: { name: "ph:fingerprint-duotone", class: "w-4 h-4" }
              },
              {
                name: "Signup",
                to: "/auth/signup-1",
                icon: {
                  name: "ph:plus-circle-duotone",
                  class: "w-4 h-4"
                }
              },
              {
                name: "Recover",
                to: "/auth",
                icon: { name: "ph:lightning-duotone", class: "w-4 h-4" }
              }
            ]
          },
          {
            name: "Widgets",
            icon: { name: "ph:nut-duotone", class: "w-5 h-5" },
            activePath: "/dashboards/widgets",
            children: [
              {
                name: "UI Widgets",
                to: "/dashboards/widgets",
                icon: { name: "ph:square-half-duotone", class: "w-4 h-4" }
              },
              {
                name: "Creative Widgets",
                to: "/dashboards/widgets/creative",
                icon: {
                  name: "ph:square-half-bottom-duotone",
                  class: "w-4 h-4"
                }
              },
              {
                name: "List Widgets",
                to: "/dashboards/widgets/list",
                icon: { name: "ph:square-half-duotone", class: "w-4 h-4" }
              }
            ]
          },
          {
            name: "Divider",
            divider: true
          },
          {
            name: "Charts",
            icon: { name: "ph:chart-pie-slice-duotone", class: "w-5 h-5" },
            to: "/dashboards/charts"
          },
          {
            name: "Wizard",
            icon: { name: "ph:magic-wand-duotone", class: "w-5 h-5" },
            to: "/wizard"
          },
          {
            name: "Messaging",
            icon: { name: "ph:chats-circle-duotone", class: "w-5 h-5" },
            to: "/dashboards/messaging"
          },
          {
            name: "Customize",
            icon: { name: "ph:drop-half-bottom-duotone", class: "w-5 h-5" },
            click: () => {
              const isSwitcherOpen = useState("switcher-open", () => false);
              isSwitcherOpen.value = true;
            },
            position: "end"
          }
        ]
      }
    },
    topnav: {
      navigation: {
        enabled: true,
        logo: {
          component: "TairoLogo",
          props: { class: "text-primary-600 h-10 w-10" }
        },
        header: {
          component: "DemoTopnavWorkspaceDropdown"
        },
        items: [
          {
            name: "Home",
            icon: { name: "ph:gauge-duotone", class: "w-6 h-6" },
            activePath: "/",
            to: "/"
          },
          {
            name: "Solutions",
            icon: { name: "ph:suitcase-duotone", class: "w-6 h-6" },
            activePath: "/layouts/projects/project-list-3",
            to: "/layouts/projects/project-list-3"
          },
          {
            name: "Pricing",
            icon: { name: "ph:users-duotone", class: "w-6 h-6" },
            activePath: "/layouts/flex-list-1",
            to: "/layouts/flex-list-1"
          },
          {
            name: "Resources",
            icon: { name: "ph:note-duotone", class: "w-6 h-6" },
            activePath: "/layouts/table-list-3",
            to: "/layouts/table-list-3"
          }
        ]
      },
      circularMenu: {
        enabled: false,
        tools: [
          {
            component: "DemoThemeToggle",
            props: {
              class: "ms-auto",
              disableTransitions: true,
              inverted: true
            }
          },
          {
            component: "DemoCircularMenuLanguage"
          },
          {
            component: "DemoCircularMenuNotifications"
          },
          {
            component: "DemoCircularMenuActivity"
          }
        ]
      },
      toolbar: {
        enabled: true,
        showTitle: false,
        tools: [
          {
            component: "DemoThemeToggle",
            props: {
              disableTransitions: true
            }
          },
          {
            component: "DemoToolbarNotifications"
          },
          {
            component: "DemoAccountMenu",
            props: {
              horizontal: true
            }
          }
        ]
      },
      footer: {
        enabled: true,
        logoSeparator: {
          component: "TairoLogo",
          props: { class: "text-primary-500 h-5 w-5" }
        },
        logo: {
          component: "TairoLogoText",
          props: {
            class: "text-muted-300 ltablet:mx-0 mx-auto h-4 transition-all duration-200 lg:mx-0"
          }
        },
        copyright: {
          name: "🐻 SaaS Bear",
          to: "https://www.sassybear.ai",
          since: "2024"
        },
        links: [
          {
            name: "Home",
            to: "/"
          },
          {
            name: "Solutions",
            to: "/solutions"
          },
          {
            name: "Pricing",
            to: "/pricing"
          },
          {
            name: "Resources",
            to: "/resources"
          }
        ]
      }
    },
    panels: [
      {
        name: "language",
        position: "right",
        component: "DemoPanelLanguage"
      },
      {
        name: "activity",
        position: "right",
        component: "DemoPanelActivity"
      },
      {
        name: "search",
        position: "left",
        component: "DemoPanelSearch"
      },
      {
        name: "task",
        position: "right",
        component: "DemoPanelTask"
      }
    ],
    error: {
      logo: {
        component: "img",
        props: {
          src: "/img/illustrations/system/404-1.svg",
          class: "relative z-20 w-full max-w-lg mx-auto"
        }
      }
    }
  }
});
const cfg1 = {
  tairo: {
    sidebar: {
      circularMenu: {
        enabled: false,
        tools: []
      },
      toolbar: {
        enabled: true,
        showTitle: true,
        showNavBurger: false,
        tools: []
      },
      navigation: {
        enabled: true,
        startOpen: true,
        logo: {
          component: "TairoLogo",
          props: { class: "text-primary-600 h-10" }
        },
        items: []
      }
    }
  }
};
const cfg2 = {
  tairo: {
    collapse: {
      navigation: {
        enabled: true,
        header: {
          component: ""
        },
        footer: {
          component: ""
        },
        items: []
      },
      circularMenu: {
        enabled: true,
        tools: []
      },
      toolbar: {
        enabled: true,
        showTitle: false,
        showNavBurger: false,
        tools: []
      }
    }
  }
};
const cfg3 = {
  tairo: {
    topnav: {
      navigation: {
        enabled: true,
        logo: {
          component: "TairoLogo",
          props: { class: "text-primary-500 h-10 w-10" }
        },
        header: {
          component: void 0
        },
        items: []
      },
      circularMenu: {
        enabled: true,
        tools: []
      },
      toolbar: {
        enabled: true,
        showTitle: false,
        tools: []
      },
      footer: {
        enabled: false,
        logoSeparator: {
          component: "TairoLogo",
          props: { class: "text-primary-500 h-7 w-7" }
        },
        logo: {
          component: "TairoLogoText",
          props: {
            class: "text-muted-300 ltablet:mx-0 mx-auto h-4 transition-all duration-200 lg:mx-0"
          }
        },
        copyright: {
          name: "",
          to: "",
          since: ""
        },
        links: []
      }
    }
  }
};
const cfg4 = {
  tairo: {
    title: "Tairo",
    error: {
      logo: {
        component: "TairoLogo",
        props: { class: "text-primary-500 mx-auto h-40 p-6" }
      }
    },
    panels: []
  },
  toaster: {
    duration: 6e3,
    dismissible: false,
    theme: {
      maxToasts: 1,
      containerClass: [
        "fixed",
        "inset-0",
        "pointer-events-none",
        "p-4",
        "flex",
        "flex-col",
        "overflow-hidden",
        "z-[200]",
        "items-start",
        "gap-2",
        "space-y-3"
      ],
      wrapperClass: [
        "pointer-events-auto",
        "focus:outline-none",
        "rounded",
        "outline-slate-300",
        "outline-offset-2",
        "focus:outline",
        "focus:outline-2",
        "focus-within:outline",
        "focus-within:outline-2"
      ],
      transition: {
        enterActiveClass: "transition duration-300 ease-out",
        enterFromClass: "transform translate-y-full opacity-0",
        enterToClass: "transform translate-y-0 opacity-100",
        leaveActiveClass: "transition duration-200 ease-in",
        leaveFromClass: "transform translate-y-0 opacity-100",
        leaveToClass: "transform translate-y-full opacity-0"
      }
    }
  }
};
const cfg5 = {
  nui: {
    // #region base
    BaseAccordion: {
      action: "dot",
      color: "default",
      dotColor: "primary",
      rounded: "sm"
    },
    BaseAvatar: {
      color: "muted",
      rounded: "full",
      size: "sm"
    },
    BaseAvatarGroup: {
      limit: 4,
      size: "sm"
    },
    BaseBreadcrumb: {
      color: "primary"
    },
    BaseButton: {
      color: "default",
      rounded: "sm",
      size: "md",
      variant: "solid"
    },
    BaseButtonAction: {
      color: "default",
      rounded: "sm"
    },
    BaseButtonClose: {
      color: "default",
      rounded: "full",
      size: "sm"
    },
    BaseButtonGroup: {},
    BaseButtonIcon: {
      color: "default",
      rounded: "sm",
      size: "md"
    },
    BaseCard: {
      color: "default",
      rounded: "sm"
    },
    BaseDropdown: {
      buttonColor: "default",
      color: "default",
      placement: "bottom-start",
      rounded: "sm",
      size: "md",
      variant: "button"
    },
    BaseDropdownDivider: {},
    BaseDropdownItem: {
      color: "primary",
      contrast: "default",
      rounded: "sm"
    },
    BaseHeading: {
      as: "p",
      lead: "normal",
      size: "xl",
      weight: "semibold"
    },
    BaseIconBox: {
      color: "default",
      rounded: "sm",
      size: "xs",
      variant: "solid"
    },
    BaseKbd: {
      color: "default",
      rounded: "sm",
      size: "sm"
    },
    BaseLink: {},
    BaseList: {},
    BaseListItem: {},
    BaseMessage: {
      color: "default",
      rounded: "sm",
      defaultIcons: {
        muted: "akar-icons:info-fill",
        "muted-contrast": "akar-icons:info-fill",
        default: "akar-icons:info-fill",
        "default-contrast": "akar-icons:info-fill",
        info: "akar-icons:info-fill",
        success: "carbon:checkmark-filled",
        warning: "ci:warning",
        danger: "ph:warning-octagon-fill",
        primary: "akar-icons:info-fill"
      }
    },
    BasePagination: {
      color: "primary",
      rounded: "sm"
    },
    BaseParagraph: {
      as: "p",
      lead: "normal",
      size: "md",
      weight: "normal"
    },
    BasePlaceholderPage: {
      imageSize: "xs"
    },
    BasePlaceload: {},
    BaseProgress: {
      color: "primary",
      contrast: "default",
      rounded: "full",
      size: "sm"
    },
    BaseProgressCircle: {
      color: "primary"
    },
    BaseProse: {
      rounded: "none"
    },
    BaseSnack: {
      color: "default",
      size: "md"
    },
    BaseTabs: {
      color: "primary",
      justify: "start",
      type: "tabs"
    },
    BaseTabSlider: {
      color: "default",
      justify: "start",
      rounded: "lg",
      size: "md"
    },
    BaseTag: {
      color: "default",
      rounded: "lg",
      size: "md",
      variant: "solid"
    },
    BaseText: {
      lead: "normal",
      size: "md",
      weight: "normal"
    },
    BaseThemeSwitch: {
      disableTransitions: false
    },
    BaseThemeToggle: {
      disableTransitions: false
    },
    // #endregion
    // #region form
    BaseAutocomplete: {
      contrast: "default",
      i18n: {
        empty: "Nothing found.",
        pending: "Loading ..."
      },
      rounded: "sm",
      size: "md"
    },
    BaseAutocompleteItem: {
      rounded: "sm"
    },
    BaseCheckbox: {
      color: "default",
      rounded: "sm"
    },
    BaseCheckboxAnimated: {
      color: "primary"
    },
    BaseCheckboxHeadless: {},
    BaseFullscreenDropfile: {
      color: "primary"
    },
    BaseInput: {
      contrast: "default",
      rounded: "sm",
      size: "md"
    },
    BaseInputFile: {
      contrast: "default",
      rounded: "sm",
      size: "md",
      i18n: {
        empty: "No file chosen",
        invalid: "Invalid file selected",
        multiple: "{count} files selected"
      }
    },
    BaseInputFileHeadless: {},
    BaseInputNumber: {
      contrast: "default",
      rounded: "sm",
      size: "md"
    },
    BaseInputHelpText: {
      color: "default"
    },
    BaseListbox: {
      contrast: "default",
      placement: "bottom-start",
      rounded: "sm",
      size: "md"
    },
    BaseListboxItem: {},
    BaseRadio: {
      color: "default"
    },
    BaseRadioHeadless: {},
    BaseSelect: {
      contrast: "default",
      rounded: "sm",
      size: "md"
    },
    BaseSwitchBall: {
      color: "primary"
    },
    BaseSwitchThin: {
      color: "primary"
    },
    BaseTextarea: {
      contrast: "default",
      rounded: "sm",
      size: "md"
    },
    BaseTreeSelect: {},
    BaseTreeSelectItem: {
      rounded: "sm"
    }
    // #endregion
  }
};
const inlineConfig = {
  "nuxt": {
    "buildId": "53000625-b389-4bcc-a236-7ca7439f1dee"
  }
};
const __appConfig = /* @__PURE__ */ defuFn(cfg0, cfg1, cfg2, cfg3, cfg4, cfg5, inlineConfig);
function useAppConfig() {
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  if (!nuxtApp._appConfig) {
    nuxtApp._appConfig = klona(__appConfig);
  }
  return nuxtApp._appConfig;
}
const appLayoutTransition = false;
const appPageTransition = false;
const appKeepalive = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
async function getRouteRules(url) {
  {
    const _routeRulesMatcher = toRouteMatcher(
      createRouter$1({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(url).reverse());
  }
}
const _routes = [
  {
    name: "company-id",
    path: "/company/:id()",
    meta: {},
    alias: [],
    redirect: void 0 ,
    component: () => import('./_id_-jNIXcYyG.mjs').then((m) => m.default || m)
  },
  {
    name: "index",
    path: "/",
    meta: {},
    alias: [],
    redirect: void 0 ,
    component: () => import('./index-BppERJYn.mjs').then((m) => m.default || m)
  },
  {
    name: "reviews-id",
    path: "/reviews/:id()",
    meta: {},
    alias: [],
    redirect: void 0 ,
    component: () => import('./_id_-Zo91IvdU.mjs').then((m) => m.default || m)
  }
];
const _wrapIf = (component, props, slots) => {
  props = props === true ? {} : props;
  return { default: () => {
    var _a;
    return props ? h(component, props, slots) : (_a = slots.default) == null ? void 0 : _a.call(slots);
  } };
};
function generateRouteKey(route) {
  const source = (route == null ? void 0 : route.meta.key) ?? route.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => {
      var _a, _b;
      return comp.components && comp.components.default === ((_b = (_a = from.matched[index]) == null ? void 0 : _a.components) == null ? void 0 : _b.default);
    }
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    var _a;
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const behavior = ((_a = useRouter().options) == null ? void 0 : _a.scrollBehaviorType) ?? "auto";
    let position = savedPosition || void 0;
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (!position && from && to && routeAllowsScrollToTop !== false && isChangingPage(to, from)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
      }
      return false;
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await new Promise((resolve2) => setTimeout(resolve2, 0));
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  useRouter();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  {
    return result;
  }
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {};
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a, _b, _c;
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history = ((_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes = ((_b = routerOptions.routes) == null ? void 0 : _b.call(routerOptions, _routes)) ?? _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a2, _b2, _c2, _d;
      if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d = (_c2 = from.matched[0]) == null ? void 0 : _c2.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key]
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if ((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      var _a2, _b2;
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext)) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules(to.path));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b2 = namedMiddleware[entry2]) == null ? void 0 : _b2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          const result = await nuxtApp.runWithContext(() => middleware(to, from));
          {
            if (result === false || result instanceof Error) {
              const error2 = result || createError$1({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`
              });
              await nuxtApp.runWithContext(() => showError(error2));
              return false;
            }
          }
          if (result === true) {
            continue;
          }
          if (result || result === false) {
            return result;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    useError();
    router.afterEach(async (to, _from, failure) => {
      delete nuxtApp._processingMiddleware;
      if (failure) {
        await nuxtApp.callHook("page:loading:end");
      }
      if ((failure == null ? void 0 : failure.type) === 4) {
        return;
      }
      if (to.matched.length === 0) {
        await nuxtApp.runWithContext(() => showError(createError$1({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      } else if (to.fullPath !== initialURL && (to.redirectedFrom || !isSamePath(to.fullPath, initialURL))) {
        await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function definePayloadReducer(name, reduce) {
  {
    (/* @__PURE__ */ useNuxtApp()).ssrContext._payloadReducers[name] = reduce;
  }
}
const reducers = {
  NuxtError: (data) => isNuxtError(data) && data.toJSON(),
  EmptyShallowRef: (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  EmptyRef: (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  ShallowRef: (data) => isRef(data) && isShallow(data) && data.value,
  ShallowReactive: (data) => isReactive(data) && isShallow(data) && toRaw(data),
  Ref: (data) => isRef(data) && data.value,
  Reactive: (data) => isReactive(data) && toRaw(data)
};
const revive_payload_server_VNG7Uq1L4W = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const reducer in reducers) {
      definePayloadReducer(reducer, reducers[reducer]);
    }
  }
});
const LazyDemoAccountMenu = defineAsyncComponent(() => import('./DemoAccountMenu-C0Plw7G-.mjs').then((r) => r["default"] || r.default || r));
const LazyDemoCircularMenuActivity = defineAsyncComponent(() => import('./DemoCircularMenuActivity-DjSySIxY.mjs').then((r) => r["default"] || r.default || r));
const LazyDemoCircularMenuLanguage = defineAsyncComponent(() => import('./DemoCircularMenuLanguage-DaYd3wuZ.mjs').then((r) => r["default"] || r.default || r));
const LazyDemoCircularMenuNotifications = defineAsyncComponent(() => import('./DemoCircularMenuNotifications-CRsA0J60.mjs').then((r) => r["default"] || r.default || r));
const LazyDemoCollapseNavigationFooter = defineAsyncComponent(() => import('./DemoCollapseNavigationFooter-C7gLClDL.mjs').then((r) => r["default"] || r.default || r));
const LazyDemoCollapseNavigationHeader = defineAsyncComponent(() => import('./DemoCollapseNavigationHeader-C-hLSKKf.mjs').then((r) => r["default"] || r.default || r));
const LazyDemoPanelAccount = defineAsyncComponent(() => import('./DemoPanelAccount-DtpS3JhE.mjs').then((r) => r["default"] || r.default || r));
const LazyDemoPanelActivity = defineAsyncComponent(() => import('./DemoPanelActivity-ByOsqXWz.mjs').then((r) => r["default"] || r.default || r));
const LazyDemoPanelCard = defineAsyncComponent(() => import('./DemoPanelCard-PiqJAhpF.mjs').then((r) => r["default"] || r.default || r));
const LazyDemoPanelInvest = defineAsyncComponent(() => import('./DemoPanelInvest-Bs-4Da96.mjs').then((r) => r["default"] || r.default || r));
const LazyDemoPanelLanguage = defineAsyncComponent(() => import('./DemoPanelLanguage-DsX8I8lN.mjs').then((r) => r["default"] || r.default || r));
const LazyDemoPanelSearch = defineAsyncComponent(() => import('./DemoPanelSearch-BiNtkjQB.mjs').then((r) => r["default"] || r.default || r));
const LazyDemoPanelTask = defineAsyncComponent(() => import('./DemoPanelTask-CiQWSRlb.mjs').then((r) => r["default"] || r.default || r));
const LazyDemoSubsidebarDashboards = defineAsyncComponent(() => import('./DemoSubsidebarDashboards-CSKsjhWO.mjs').then((r) => r["default"] || r.default || r));
const LazyDemoSubsidebarLayouts = defineAsyncComponent(() => import('./DemoSubsidebarLayouts-bzHTR4S4.mjs').then((r) => r["default"] || r.default || r));
const LazyDemoThemeToggle = defineAsyncComponent(() => import('./DemoThemeToggle-KyEa1J5z.mjs').then((r) => r["default"] || r.default || r));
const LazyDemoToolbarAccountMenu = defineAsyncComponent(() => import('./DemoToolbarAccountMenu-CnQAvoM0.mjs').then((r) => r["default"] || r.default || r));
const LazyDemoToolbarActivity = defineAsyncComponent(() => import('./DemoToolbarActivity-u-U29Qbd.mjs').then((r) => r["default"] || r.default || r));
const LazyDemoToolbarCustomize = defineAsyncComponent(() => import('./DemoToolbarCustomize-BkgghkqF.mjs').then((r) => r["default"] || r.default || r));
const LazyDemoToolbarLanguage = defineAsyncComponent(() => import('./DemoToolbarLanguage-BCzGC44W.mjs').then((r) => r["default"] || r.default || r));
const LazyDemoToolbarNotifications = defineAsyncComponent(() => import('./DemoToolbarNotifications-CdcNwHY6.mjs').then((r) => r["default"] || r.default || r));
const LazyDemoToolbarSearch = defineAsyncComponent(() => import('./DemoToolbarSearch-CugTm9cS.mjs').then((r) => r["default"] || r.default || r));
const LazyDemoTopnavWorkspaceDropdown = defineAsyncComponent(() => import('./DemoTopnavWorkspaceDropdown-CgtqYS5Q.mjs').then((r) => r["default"] || r.default || r));
const LazyTairoLogo = defineAsyncComponent(() => import('./TairoLogo-ByXlo29i.mjs').then((r) => r["default"] || r.default || r));
const LazyTairoLogoText = defineAsyncComponent(() => import('./TairoLogoText-Cm7Cfo6T.mjs').then((r) => r["default"] || r.default || r));
const LazyTairoToaster = defineAsyncComponent(() => import('./TairoToaster-BgwNWx2d.mjs').then((r) => r["default"] || r.default || r));
const LazyTairoTocAnchor = defineAsyncComponent(() => import('./TairoTocAnchor-BHzc7zOV.mjs').then((r) => r["default"] || r.default || r));
const LazyIcon = defineAsyncComponent(() => Promise.resolve().then(function() {
  return Icon;
}).then((r) => r["default"] || r.default || r));
const LazyIconCSS = defineAsyncComponent(() => import('./IconCSS-CF9fsVpn.mjs').then((r) => r["default"] || r.default || r));
const lazyGlobalComponents = [
  ["DemoAccountMenu", LazyDemoAccountMenu],
  ["DemoCircularMenuActivity", LazyDemoCircularMenuActivity],
  ["DemoCircularMenuLanguage", LazyDemoCircularMenuLanguage],
  ["DemoCircularMenuNotifications", LazyDemoCircularMenuNotifications],
  ["DemoCollapseNavigationFooter", LazyDemoCollapseNavigationFooter],
  ["DemoCollapseNavigationHeader", LazyDemoCollapseNavigationHeader],
  ["DemoPanelAccount", LazyDemoPanelAccount],
  ["DemoPanelActivity", LazyDemoPanelActivity],
  ["DemoPanelCard", LazyDemoPanelCard],
  ["DemoPanelInvest", LazyDemoPanelInvest],
  ["DemoPanelLanguage", LazyDemoPanelLanguage],
  ["DemoPanelSearch", LazyDemoPanelSearch],
  ["DemoPanelTask", LazyDemoPanelTask],
  ["DemoSubsidebarDashboards", LazyDemoSubsidebarDashboards],
  ["DemoSubsidebarLayouts", LazyDemoSubsidebarLayouts],
  ["DemoThemeToggle", LazyDemoThemeToggle],
  ["DemoToolbarAccountMenu", LazyDemoToolbarAccountMenu],
  ["DemoToolbarActivity", LazyDemoToolbarActivity],
  ["DemoToolbarCustomize", LazyDemoToolbarCustomize],
  ["DemoToolbarLanguage", LazyDemoToolbarLanguage],
  ["DemoToolbarNotifications", LazyDemoToolbarNotifications],
  ["DemoToolbarSearch", LazyDemoToolbarSearch],
  ["DemoTopnavWorkspaceDropdown", LazyDemoTopnavWorkspaceDropdown],
  ["TairoLogo", LazyTairoLogo],
  ["TairoLogoText", LazyTairoLogoText],
  ["TairoToaster", LazyTairoToaster],
  ["TairoTocAnchor", LazyTairoTocAnchor],
  ["Icon", LazyIcon],
  ["IconCSS", LazyIconCSS]
];
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components",
  setup(nuxtApp) {
    for (const [name, component] of lazyGlobalComponents) {
      nuxtApp.vueApp.component(name, component);
      nuxtApp.vueApp.component("Lazy" + name, component);
    }
  }
});
const preference = "system";
const plugin_server_VKCMYhKKy0 = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  var _a;
  const colorMode = ((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) ? ref({}) : useState("color-mode", () => reactive({
    preference,
    value: preference,
    unknown: true,
    forced: false
  })).value;
  const htmlAttrs = {};
  {
    useHead({ htmlAttrs });
  }
  useRouter().afterEach((to) => {
    const forcedColorMode = to.meta.colorMode;
    if (forcedColorMode && forcedColorMode !== "system") {
      colorMode.value = htmlAttrs["data-color-mode-forced"] = forcedColorMode;
      colorMode.forced = true;
    } else if (forcedColorMode === "system") {
      console.warn("You cannot force the colorMode to system at the page level.");
    }
  });
  nuxtApp.provide("colorMode", colorMode);
});
function createEventBus() {
  const queue = {};
  function on(name, callback) {
    queue[name] = queue[name] || [];
    queue[name].push(callback);
  }
  function off(name, callback) {
    if (queue[name]) {
      for (let i = 0; i < queue[name].length; i++) {
        if (queue[name][i] === callback) {
          queue[name].splice(i, 1);
          break;
        }
      }
    }
  }
  function emit(name, ...args) {
    if (queue[name]) {
      queue[name].forEach((callback) => {
        callback(...args);
      });
    }
  }
  return {
    queue,
    on,
    off,
    emit
  };
}
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function toValue(r) {
  return typeof r === "function" ? r() : unref(r);
}
const isClient = false;
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
const notNullish = (val) => val != null;
const toString = Object.prototype.toString;
const isObject = (val) => toString.call(val) === "[object Object]";
const noop = () => {
};
const isIOS = /* @__PURE__ */ getIsIOS();
function getIsIOS() {
  var _a, _b;
  return isClient && ((_a = void 0) == null ? void 0 : _a.userAgent) && (/iP(ad|hone|od)/.test((void 0).navigator.userAgent) || ((_b = void 0) == null ? void 0 : _b.maxTouchPoints) > 2 && /iPad|Macintosh/.test(void 0));
}
function getLifeCycleTarget(target) {
  return target || getCurrentInstance();
}
function toRef(...args) {
  if (args.length !== 1)
    return toRef$1(...args);
  const r = args[0];
  return typeof r === "function" ? readonly(customRef(() => ({ get: r, set: noop }))) : ref(r);
}
function tryOnBeforeMount(fn, sync = true, target) {
  const instance = getLifeCycleTarget(target);
  if (instance)
    ;
  else if (sync)
    fn();
  else
    nextTick(fn);
}
function tryOnBeforeUnmount(fn, target) {
  getLifeCycleTarget(target);
}
function tryOnMounted(fn, sync = true, target) {
  const instance = getLifeCycleTarget();
  if (instance)
    ;
  else if (sync)
    fn();
  else
    nextTick(fn);
}
function useNinjaPausableTimeout(callback, timeout) {
  const pausedAt = ref(0);
  const startedAt = ref(0);
  const remaining = ref(0);
  let timer;
  function stop() {
    if (!timer) {
      return;
    }
    clearTimeout(timer);
    timer = void 0;
  }
  function start() {
    pausedAt.value = 0;
    startedAt.value = Date.now();
    remaining.value = timeout ?? 0;
    stop();
    timer = setTimeout(callback, remaining.value);
  }
  function pause() {
    if (!startedAt.value || pausedAt.value) {
      return;
    }
    stop();
    pausedAt.value = Date.now();
  }
  function resume() {
    if (!pausedAt.value) {
      return;
    }
    stop();
    remaining.value -= pausedAt.value - startedAt.value;
    startedAt.value = Date.now();
    pausedAt.value = 0;
    timer = setTimeout(callback, remaining.value);
  }
  tryOnBeforeUnmount();
  return {
    pausedAt,
    startedAt,
    remaining,
    start,
    stop,
    pause,
    resume
  };
}
function useNinjaToasterContainer(_theme) {
  const theme = toRef(_theme);
  const container = ref(null);
  const containerId = computed(() => {
    var _a;
    return ((_a = theme.value) == null ? void 0 : _a.containerId) ?? "nt-container";
  });
  tryOnBeforeMount(() => {
    var _a;
    container.value = (void 0).getElementById(containerId.value);
    if (!container.value) {
      container.value = (void 0).createElement("div");
      container.value.id = containerId.value;
      (void 0).body.appendChild(container.value);
    }
    if ((_a = theme.value) == null ? void 0 : _a.containerClass) {
      container.value.className = Array.isArray(theme.value.containerClass) ? theme.value.containerClass.join(" ") : theme.value.containerClass;
    }
  });
  return {
    container,
    containerId
  };
}
const NinjaToasterStateKey = Symbol.for(
  "NinjaToasterState"
);
function createNinjaToasterState(state) {
  provide(NinjaToasterStateKey, state);
}
function useNinjaToasterState() {
  const state = inject(NinjaToasterStateKey);
  if (!state) {
    throw new Error("NinjaToasterState is not provided");
  }
  return state;
}
function useNinjaToasterProgress() {
  const state = useNinjaToasterState();
  const now = ref(Date.now());
  const endAt = computed(() => {
    return state.timer.startedAt.value + state.timer.remaining.value;
  });
  const closeIn = computed(() => {
    return now.value - endAt.value;
  });
  const percent = computed(() => {
    if (!state.duration) {
      return 0;
    }
    const ratio = 1 - Math.max(0, Math.abs(closeIn.value)) / state.duration;
    return Math.round(ratio * 1e3) / 1e3;
  });
  tryOnMounted(() => {
    setInterval(() => {
      if (!state.isHovered.value) {
        now.value = Date.now();
      }
    }, 16);
  });
  tryOnBeforeUnmount();
  return {
    percent,
    endAt,
    closeIn
  };
}
function createRenderQueue() {
  const queue = [];
  let timer;
  function add(item) {
    queue.push(item);
    if (!timer) {
      timer = setTimeout(next, 100);
    }
    return () => {
      remove(item);
    };
  }
  function remove(item) {
    const index = queue.indexOf(item);
    if (index !== -1) {
      queue.splice(index, 1);
    }
  }
  function clear() {
    queue.length = 0;
    if (timer) {
      clearTimeout(timer);
      timer = void 0;
    }
  }
  function next() {
    if (timer) {
      clearTimeout(timer);
      timer = void 0;
    }
    const firstElement = queue[0];
    if (!firstElement) {
      return;
    }
    if (!firstElement.until()) {
      timer = setTimeout(next, 100);
      return;
    }
    queue.shift();
    firstElement.callback();
    if (queue.length > 0) {
      timer = setTimeout(next, 100);
    }
  }
  return {
    add,
    remove,
    clear
  };
}
const NinjaToaster = defineComponent({
  name: "NinjaToaster",
  props: {
    content: {
      type: [String, Number, Object, Function],
      required: true
    },
    duration: {
      type: Number,
      default: 5e3
    },
    theme: {
      type: Object,
      default: () => ({})
    },
    dismissible: {
      type: Boolean,
      default: true
    },
    pauseOnHover: {
      type: Boolean,
      default: true
    },
    queues: {
      type: Map,
      default: () => /* @__PURE__ */ new Map()
    },
    events: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["close", "click", "show"],
  setup(props, { emit }) {
    const theme = computed(() => {
      return defu(props.theme ?? {}, {
        containerClass: [],
        wrapperClass: [],
        containerId: "nt-container",
        maxToasts: Infinity,
        transition: void 0
      });
    });
    const { container, containerId } = useNinjaToasterContainer(theme);
    const timer = useNinjaPausableTimeout(() => {
      close();
    }, props.duration);
    const isHovered = ref(false);
    const isActive = ref(false);
    const unqueue = ref();
    const rootElement = ref();
    let queue;
    if (props.queues.has(containerId.value)) {
      queue = props.queues.get(containerId.value);
    } else {
      queue = createRenderQueue();
      props.queues.set(containerId.value, queue);
    }
    const content = computed(() => {
      return typeof props.content === "function" ? props.content() : props.content;
    });
    function toggleTimer(pause) {
      if (!props.pauseOnHover) {
        return;
      }
      if (pause) {
        timer.pause();
        return;
      }
      timer.resume();
    }
    function stopTimer() {
      var _a;
      timer.stop();
      (_a = unqueue.value) == null ? void 0 : _a.call(unqueue);
    }
    function close() {
      stopTimer();
      isActive.value = false;
    }
    function onMouseover() {
      isHovered.value = true;
      toggleTimer(true);
    }
    function onMouseleave() {
      isHovered.value = false;
      toggleTimer(false);
    }
    function onFocus() {
      isHovered.value = true;
      toggleTimer(true);
    }
    function onBlur() {
      isHovered.value = false;
      toggleTimer(false);
    }
    function onClick(event) {
      emit("click", event);
      if (props.dismissible) {
        close();
      }
    }
    function onKeydown(event) {
      if (event.target !== event.currentTarget) {
        return;
      }
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }
      event.preventDefault();
      onClick(event);
    }
    function onAfterLeave(el) {
      var _a, _b, _c, _d, _e, _f, _g;
      emit("close");
      if (typeof ((_b = (_a = theme.value) == null ? void 0 : _a.transition) == null ? void 0 : _b.onAfterLeave) === "function") {
        (_c = theme.value) == null ? void 0 : _c.transition.onAfterLeave(el);
      }
      if (typeof ((_d = rootElement.value) == null ? void 0 : _d.remove) !== "undefined") {
        (_e = rootElement.value) == null ? void 0 : _e.remove();
      } else {
        (_g = (_f = rootElement.value) == null ? void 0 : _f.parentNode) == null ? void 0 : _g.removeChild(rootElement.value);
      }
    }
    createNinjaToasterState({
      timer,
      duration: props.duration,
      isHovered,
      isActive,
      click: onClick,
      close
    });
    return () => {
      var _a, _b, _c;
      const wrapper = withDirectives(
        h(
          "div",
          {
            role: "alert",
            tabindex: 0,
            class: theme.value && Array.isArray((_a = theme.value) == null ? void 0 : _a.wrapperClass) ? theme.value.wrapperClass.join(" ") : (_b = theme.value) == null ? void 0 : _b.wrapperClass,
            onMouseover,
            onMouseleave,
            onFocus,
            onBlur,
            onKeydown,
            onClick
          },
          h(Suspense, null, content.value)
        ),
        [[vShow, isActive.value]]
      );
      return h(
        Transition,
        {
          ref: rootElement,
          ...((_c = theme.value) == null ? void 0 : _c.transition) || {},
          onAfterLeave
        },
        () => wrapper
      );
    };
  }
});
function createElement() {
  {
    return null;
  }
}
function mountWithContext(app, component, props) {
  const el = createElement();
  if (el) {
    const vNode = h(component, props);
    if (app && app._context) {
      vNode.appContext = app._context;
    }
    render(vNode, el);
  }
}
function ensureClassesArray(theme) {
  if ((theme == null ? void 0 : theme.containerClass) && !Array.isArray(theme.containerClass)) {
    theme.containerClass = [theme.containerClass];
  }
  if ((theme == null ? void 0 : theme.wrapperClass) && !Array.isArray(theme.wrapperClass)) {
    theme.wrapperClass = [theme.wrapperClass];
  }
}
function createNinjaToaster(createProps = {}) {
  const events = createEventBus();
  const queues = /* @__PURE__ */ new Map();
  function showComponent(name, {
    props,
    children,
    options
  }) {
    const content = () => h(resolveComponent(name), props, children);
    return show({
      ...options,
      content
    });
  }
  function show(options) {
    var _a;
    const appConfigProps = (_a = useAppConfig()) == null ? void 0 : _a.toaster;
    const app = (/* @__PURE__ */ useNuxtApp()).vueApp;
    const userProps = typeof options === "string" || typeof options === "number" || typeof options === "function" ? { content: options } : options;
    ensureClassesArray(userProps == null ? void 0 : userProps.theme);
    ensureClassesArray(createProps == null ? void 0 : createProps.theme);
    ensureClassesArray(appConfigProps == null ? void 0 : appConfigProps.theme);
    const props = defu(
      userProps,
      createProps,
      appConfigProps
    );
    return new Promise((resolve) => {
      mountWithContext(app, NinjaToaster, {
        ...props,
        events,
        queues,
        onShow: (toast) => {
          resolve(toast);
          if (props.onShow) {
            props.onShow(toast);
          }
        }
      });
      {
        resolve({
          el: null,
          close: () => {
          }
        });
      }
    });
  }
  function clearAll() {
    events.emit("clear");
    queues.forEach((queue) => {
      queue.clear();
    });
    queues.clear();
  }
  function clear(theme) {
    var _a;
    const containerId = typeof theme === "string" ? theme : theme.containerId ?? "nt-container";
    events.emit(`clear-${containerId}`);
    if (queues.has(containerId)) {
      (_a = queues.get(containerId)) == null ? void 0 : _a.clear();
    }
  }
  return {
    show,
    showComponent,
    clearAll,
    clear
  };
}
const plugin_8ZQh7hY0br = /* @__PURE__ */ defineNuxtPlugin(() => {
  return {
    provide: {
      nt: createNinjaToaster()
    }
  };
});
const directives_yBPzJQtdia = /* @__PURE__ */ defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.vueApp.directive("focus", {
    mounted(el, { value }) {
      console.log("v-focus?", value);
      if (value === false) {
        return;
      }
      if (el && el.tabIndex === -1) {
        const focusable = el.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable) {
          focusable.focus();
        }
        return;
      }
      el.focus();
    }
  });
});
const plugins = [
  unhead_0jW0njCamp,
  plugin,
  revive_payload_server_VNG7Uq1L4W,
  components_plugin_KR1HBZs4kY,
  plugin_server_VKCMYhKKy0,
  plugin_8ZQh7hY0br,
  directives_yBPzJQtdia
];
const layouts = {
  default: () => import('./default-RaQ5eBDa.mjs').then((m) => m.default || m),
  sidebar: () => import('./sidebar-C_zpEQnB.mjs').then((m) => m.default || m),
  collapse: () => import('./collapse-D79yPw3h.mjs').then((m) => m.default || m),
  topnav: () => import('./topnav-DeQtRPwl.mjs').then((m) => m.default || m),
  empty: () => import('./empty-CkglS_yC.mjs').then((m) => m.default || m)
};
const LayoutLoader = defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  async setup(props, context) {
    const LayoutComponent = await layouts[props.name]().then((r) => r.default || r);
    return () => h(LayoutComponent, props.layoutProps, context.slots);
  }
});
const __nuxt_component_0$1 = defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    },
    fallback: {
      type: [String, Object],
      default: null
    }
  },
  setup(props, context) {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const route = injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      let layout2 = unref(props.name) ?? route.meta.layout ?? "default";
      if (layout2 && !(layout2 in layouts)) {
        if (props.fallback) {
          layout2 = unref(props.fallback);
        }
      }
      return layout2;
    });
    const layoutRef = ref();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route.meta.layoutTransition ?? appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => h(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          default: () => h(
            LayoutProvider,
            {
              layoutProps: mergeProps(context.attrs, { ref: layoutRef }),
              key: layout.value || void 0,
              name: layout.value,
              shouldProvide: !props.name,
              hasTransition: !!transitionProps
            },
            context.slots
          )
        })
      }).default();
    };
  }
});
const LayoutProvider = defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        isCurrent: (route) => name === (route.meta.layout ?? "default")
      });
    }
    return () => {
      var _a, _b;
      if (!name || typeof name === "string" && !(name in layouts)) {
        return (_b = (_a = context.slots).default) == null ? void 0 : _b.call(_a);
      }
      return h(
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
function defaultEstimatedProgress(duration, elapsed) {
  const completionPercentage = elapsed / duration * 100;
  return 2 / Math.PI * 100 * Math.atan(completionPercentage / 50);
}
function createLoadingIndicator(opts = {}) {
  const { duration = 2e3, throttle = 200, hideDelay = 500, resetDelay = 400 } = opts;
  opts.estimatedProgress || defaultEstimatedProgress;
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  const progress = ref(0);
  const isLoading = ref(false);
  const start = () => set(0);
  function set(at = 0) {
    if (nuxtApp.isHydrating) {
      return;
    }
    if (at >= 100) {
      return finish();
    }
    progress.value = at < 0 ? 0 : at;
    if (throttle && false) {
      setTimeout(() => {
        isLoading.value = true;
      }, throttle);
    } else {
      isLoading.value = true;
    }
  }
  function finish(opts2 = {}) {
    progress.value = 100;
    if (opts2.force) {
      progress.value = 0;
      isLoading.value = false;
    }
  }
  function clear() {
  }
  let _cleanup = () => {
  };
  return {
    _cleanup,
    progress: computed(() => progress.value),
    isLoading: computed(() => isLoading.value),
    start,
    set,
    finish,
    clear
  };
}
function useLoadingIndicator(opts = {}) {
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  const indicator = nuxtApp._loadingIndicator = nuxtApp._loadingIndicator || createLoadingIndicator(opts);
  return indicator;
}
const __nuxt_component_1$1 = defineComponent({
  name: "NuxtLoadingIndicator",
  props: {
    throttle: {
      type: Number,
      default: 200
    },
    duration: {
      type: Number,
      default: 2e3
    },
    height: {
      type: Number,
      default: 3
    },
    color: {
      type: [String, Boolean],
      default: "repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)"
    },
    estimatedProgress: {
      type: Function,
      required: false
    }
  },
  setup(props, { slots, expose }) {
    const { progress, isLoading, start, finish, clear } = useLoadingIndicator({
      duration: props.duration,
      throttle: props.throttle,
      estimatedProgress: props.estimatedProgress
    });
    expose({
      progress,
      isLoading,
      start,
      finish,
      clear
    });
    return () => h("div", {
      class: "nuxt-loading-indicator",
      style: {
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        pointerEvents: "none",
        width: "auto",
        height: `${props.height}px`,
        opacity: isLoading.value ? 1 : 0,
        background: props.color || void 0,
        backgroundSize: `${100 / progress.value * 100}% auto`,
        transform: `scaleX(${progress.value}%)`,
        transformOrigin: "left",
        transition: "transform 0.1s, height 0.4s, opacity 0.4s",
        zIndex: 999999
      }
    }, slots);
  }
});
const RouteProvider = defineComponent({
  props: {
    vnode: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key]
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const __nuxt_component_2$1 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, expose }) {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const pageRef = ref();
    const forkRoute = inject(PageRouteSymbol, null);
    let previousPageKey;
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    let vnode;
    const done = nuxtApp.deferHydration();
    if (props.pageKey) {
      watch(() => props.pageKey, (next, prev) => {
        if (next !== prev) {
          nuxtApp.callHook("page:loading:start");
        }
      });
    }
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            done();
            return;
          }
          const key = generateRouteKey$1(routeProps, props.pageKey);
          if (!nuxtApp.isHydrating && !hasChildrenRoutes(forkRoute, routeProps.route, routeProps.Component) && previousPageKey === key) {
            nuxtApp.callHook("page:loading:end");
          }
          previousPageKey = key;
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          const keepaliveConfig = props.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive;
          vnode = _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              keepaliveConfig,
              h(Suspense, {
                suspensible: true,
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).then(() => nuxtApp.callHook("page:loading:end")).finally(done));
                }
              }, {
                default: () => {
                  const providerVNode = h(RouteProvider, {
                    key: key || void 0,
                    vnode: routeProps.Component,
                    route: routeProps.route,
                    renderKey: key || void 0,
                    trackRootNodes: hasTransition,
                    vnodeRef: pageRef
                  });
                  return providerVNode;
                }
              })
            )
          ).default();
          return vnode;
        }
      });
    };
  }
});
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: prop.onAfterLeave ? toArray(prop.onAfterLeave) : void 0
  }));
  return defu(..._props);
}
function hasChildrenRoutes(fork, newRoute, Component) {
  if (!fork) {
    return false;
  }
  const index = newRoute.matched.findIndex((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === (Component == null ? void 0 : Component.type);
  });
  return index < newRoute.matched.length - 1;
}
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    const app = useAppConfig();
    useHead({
      titleTemplate: (titleChunk) => {
        var _a, _b;
        return titleChunk ? `${titleChunk} - ${(_a = app.tairo) == null ? void 0 : _a.title}` : `${(_b = app.tairo) == null ? void 0 : _b.title}`;
      },
      htmlAttrs: {
        lang: "en",
        dir: "ltr"
      },
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/img/favicon.png"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0$1;
      const _component_NuxtLoadingIndicator = __nuxt_component_1$1;
      const _component_NuxtPage = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_NuxtLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLoadingIndicator, { color: "rgb(var(--color-primary-500))" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLoadingIndicator, { color: "rgb(var(--color-primary-500))" }),
              createVNode(_component_NuxtPage)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  function resolveTrailingSlashBehavior(to, resolve) {
    if (!to || options.trailingSlash !== "append" && options.trailingSlash !== "remove") {
      return to;
    }
    if (typeof to === "string") {
      return applyTrailingSlashBehavior(to, options.trailingSlash);
    }
    const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
    const resolvedPath = {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: applyTrailingSlashBehavior(path, options.trailingSlash)
    };
    return resolvedPath;
  }
  return defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const config = /* @__PURE__ */ useRuntimeConfig();
      const to = computed(() => {
        const path = props.to || props.href || "";
        return resolveTrailingSlashBehavior(path, router.resolve);
      });
      const isAbsoluteUrl = computed(() => typeof to.value === "string" && hasProtocol(to.value, { acceptRelative: true }));
      const hasTarget = computed(() => props.target && props.target !== "_self");
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (hasTarget.value) {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || isAbsoluteUrl.value;
      });
      const prefetched = ref(false);
      const el = void 0;
      const elRef = void 0;
      return () => {
        var _a, _b;
        if (!isExternal.value) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            if (prefetched.value) {
              routerLinkProps.class = props.prefetchedClass || options.prefetchedClass;
            }
            routerLinkProps.rel = props.rel || void 0;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const href = typeof to.value === "object" ? ((_a = router.resolve(to.value)) == null ? void 0 : _a.href) ?? null : to.value && !props.external && !isAbsoluteUrl.value ? resolveTrailingSlashBehavior(joinURL(config.app.baseURL, to.value), router.resolve) : to.value || null;
        const target = props.target || null;
        const rel = firstNonUndefined(
          // converts `""` to `null` to prevent the attribute from being added as empty (`rel=""`)
          props.noRel ? "" : props.rel,
          options.externalRelAttribute,
          /*
          * A fallback rel of `noopener noreferrer` is applied for external links or links that open in a new tab.
          * This solves a reverse tabnapping security flaw in browsers pre-2021 as well as improving privacy.
          */
          isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : ""
        ) || null;
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          const navigate = () => navigateTo(href, { replace: props.replace, external: props.external });
          return slots.default({
            href,
            navigate,
            get route() {
              if (!href) {
                return void 0;
              }
              const url = parseURL(href);
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href
              };
            },
            rel,
            target,
            isExternal: isExternal.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { ref: el, href, rel, target }, (_b = slots.default) == null ? void 0 : _b.call(slots));
      };
    }
  });
}
const __nuxt_component_1 = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function applyTrailingSlashBehavior(to, trailingSlash) {
  const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
  const hasProtocolDifferentFromHttp = hasProtocol(to) && !to.startsWith("http");
  if (hasProtocolDifferentFromHttp) {
    return to;
  }
  return normalizeFn(to, true);
}
const iconCollections = ["fluent-emoji-high-contrast", "material-symbols-light", "cryptocurrency-color", "icon-park-outline", "icon-park-twotone", "fluent-emoji-flat", "emojione-monotone", "streamline-emojis", "heroicons-outline", "simple-line-icons", "material-symbols", "flat-color-icons", "icon-park-solid", "pepicons-pencil", "heroicons-solid", "pepicons-print", "cryptocurrency", "pixelarticons", "system-uicons", "bitcoin-icons", "devicon-plain", "entypo-social", "token-branded", "grommet-icons", "vscode-icons", "pepicons-pop", "svg-spinners", "fluent-emoji", "simple-icons", "circle-flags", "medical-icon", "icomoon-free", "majesticons", "radix-icons", "humbleicons", "fa6-regular", "emojione-v1", "skill-icons", "academicons", "healthicons", "fluent-mdl2", "teenyicons", "ant-design", "gravity-ui", "akar-icons", "lets-icons", "streamline", "fa6-brands", "file-icons", "game-icons", "foundation", "fa-regular", "mono-icons", "iconamoon", "zondicons", "mdi-light", "eos-icons", "gridicons", "icon-park", "heroicons", "fa6-solid", "meteocons", "arcticons", "dashicons", "fa-brands", "websymbol", "fontelico", "mingcute", "flowbite", "marketeq", "bytesize", "guidance", "openmoji", "emojione", "nonicons", "brandico", "flagpack", "fa-solid", "fontisto", "si-glyph", "pepicons", "iconoir", "tdesign", "clarity", "octicon", "codicon", "pajamas", "formkit", "line-md", "twemoji", "noto-v1", "fxemoji", "devicon", "raphael", "flat-ui", "topcoat", "feather", "tabler", "carbon", "lucide", "memory", "mynaui", "circum", "fluent", "nimbus", "entypo", "icons8", "subway", "vaadin", "solar", "basil", "typcn", "charm", "prime", "quill", "logos", "token", "covid", "maki", "gala", "mage", "ooui", "noto", "unjs", "flag", "iwwa", "zmdi", "bpmn", "mdi", "ion", "uil", "bxs", "cil", "uiw", "uim", "uit", "uis", "jam", "oui", "bxl", "cib", "cbi", "cif", "gis", "map", "geo", "fad", "eva", "wpf", "whh", "ic", "ph", "ri", "bi", "bx", "gg", "ci", "ep", "fe", "mi", "f7", "ei", "wi", "la", "fa", "oi", "et", "el", "ls", "vs", "il", "ps"];
function resolveIconName(name = "") {
  let prefix;
  let provider = "";
  if (name[0] === "@" && name.includes(":")) {
    provider = name.split(":")[0].slice(1);
    name = name.split(":").slice(1).join(":");
  }
  if (name.startsWith("i-")) {
    name = name.replace(/^i-/, "");
    for (const collectionName of iconCollections) {
      if (name.startsWith(collectionName)) {
        prefix = collectionName;
        name = name.slice(collectionName.length + 1);
        break;
      }
    }
  } else if (name.includes(":")) {
    const [_prefix, _name] = name.split(":");
    prefix = _prefix;
    name = _name;
  }
  return {
    provider,
    prefix: prefix || "",
    name: name || ""
  };
}
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "Icon",
  __ssrInlineRender: true,
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: ""
    }
  },
  async setup(__props) {
    let __temp, __restore;
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const appConfig = useAppConfig();
    const props = __props;
    watch(() => {
      var _a;
      return (_a = appConfig.nuxtIcon) == null ? void 0 : _a.iconifyApiOptions;
    }, () => {
      var _a, _b, _c, _d, _e, _f;
      if (!((_b = (_a = appConfig.nuxtIcon) == null ? void 0 : _a.iconifyApiOptions) == null ? void 0 : _b.url))
        return;
      try {
        new URL(appConfig.nuxtIcon.iconifyApiOptions.url);
      } catch (e) {
        console.warn("Nuxt Icon: Invalid custom Iconify API URL");
        return;
      }
      if ((_d = (_c = appConfig.nuxtIcon) == null ? void 0 : _c.iconifyApiOptions) == null ? void 0 : _d.publicApiFallback) {
        addAPIProvider("custom", {
          resources: [(_e = appConfig.nuxtIcon) == null ? void 0 : _e.iconifyApiOptions.url],
          index: 0
        });
        return;
      }
      addAPIProvider("", {
        resources: [(_f = appConfig.nuxtIcon) == null ? void 0 : _f.iconifyApiOptions.url]
      });
    }, { immediate: true });
    const state = useState("icons", () => ({}));
    const isFetching = ref(false);
    const iconName = computed(() => {
      var _a, _b;
      if ((_b = (_a = appConfig.nuxtIcon) == null ? void 0 : _a.aliases) == null ? void 0 : _b[props.name]) {
        return appConfig.nuxtIcon.aliases[props.name];
      }
      return props.name;
    });
    const resolvedIcon = computed(() => resolveIconName(iconName.value));
    const iconKey = computed(() => [resolvedIcon.value.provider, resolvedIcon.value.prefix, resolvedIcon.value.name].filter(Boolean).join(":"));
    const icon = computed(() => {
      var _a;
      return (_a = state.value) == null ? void 0 : _a[iconKey.value];
    });
    const component = computed(() => {
      var _a;
      return (_a = nuxtApp.vueApp) == null ? void 0 : _a.component(iconName.value);
    });
    const sSize = computed(() => {
      var _a, _b, _c;
      if (!props.size && typeof ((_a = appConfig.nuxtIcon) == null ? void 0 : _a.size) === "boolean" && !((_b = appConfig.nuxtIcon) == null ? void 0 : _b.size)) {
        return void 0;
      }
      const size = props.size || ((_c = appConfig.nuxtIcon) == null ? void 0 : _c.size) || "1em";
      if (String(Number(size)) === size) {
        return `${size}px`;
      }
      return size;
    });
    const className = computed(() => {
      var _a;
      return ((_a = appConfig == null ? void 0 : appConfig.nuxtIcon) == null ? void 0 : _a.class) ?? "icon";
    });
    async function loadIconComponent() {
      var _a;
      if (component.value) {
        return;
      }
      if (!((_a = state.value) == null ? void 0 : _a[iconKey.value])) {
        isFetching.value = true;
        state.value[iconKey.value] = await loadIcon(resolvedIcon.value).catch(() => void 0);
        isFetching.value = false;
      }
    }
    watch(iconName, loadIconComponent);
    !component.value && ([__temp, __restore] = withAsyncContext(() => loadIconComponent()), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      if (isFetching.value) {
        _push(`<span${ssrRenderAttrs(mergeProps({
          class: className.value,
          style: { width: sSize.value, height: sSize.value }
        }, _attrs))} data-v-ca9947e1></span>`);
      } else if (icon.value) {
        _push(ssrRenderComponent(unref(Icon$1), mergeProps({
          icon: icon.value,
          class: className.value,
          width: sSize.value,
          height: sSize.value
        }, _attrs), null, _parent));
      } else if (component.value) {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(component.value), mergeProps({
          class: className.value,
          width: sSize.value,
          height: sSize.value
        }, _attrs), null), _parent);
      } else {
        _push(`<span${ssrRenderAttrs(mergeProps({
          class: className.value,
          style: { fontSize: sSize.value, lineHeight: sSize.value, width: sSize.value, height: sSize.value }
        }, _attrs))} data-v-ca9947e1>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, () => {
          _push(`${ssrInterpolate(__props.name)}`);
        }, _push, _parent);
        _push(`</span>`);
      }
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/nuxt-icon@0.6.10_nuxt@3.11.2_vue@3.4.21/node_modules/nuxt-icon/dist/runtime/Icon.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-ca9947e1"]]);
const Icon = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: __nuxt_component_2
});
const nativeComponent = ["img", "div"];
function resolveComponentOrNative(component) {
  if (nativeComponent.includes(component))
    return component;
  return resolveComponent(component);
}
function useSidebar() {
  const app = useAppConfig();
  const route = useRoute();
  const sidebars = computed(() => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    if (((_c = (_b = (_a = app.tairo) == null ? void 0 : _a.sidebar) == null ? void 0 : _b.navigation) == null ? void 0 : _c.enabled) === false || ((_g = (_f = (_e = (_d = app.tairo) == null ? void 0 : _d.sidebar) == null ? void 0 : _e.navigation) == null ? void 0 : _f.items) == null ? void 0 : _g.length) === 0) {
      return [];
    }
    return (_j = (_i = (_h = app.tairo) == null ? void 0 : _h.sidebar) == null ? void 0 : _i.navigation) == null ? void 0 : _j.items;
  });
  const currentName = useState("sidebar-name", () => "");
  const isOpen = useState("sidebar-open", () => void 0);
  const hasSubsidebar = computed(() => {
    var _a;
    return (_a = sidebars.value) == null ? void 0 : _a.some((sidebar) => {
      var _a2;
      return (_a2 = sidebar.subsidebar) == null ? void 0 : _a2.component;
    });
  });
  const current = computed(() => {
    var _a;
    if (!currentName.value) {
      return void 0;
    }
    return (_a = sidebars.value) == null ? void 0 : _a.find(({ title }) => title === currentName.value);
  });
  function toggle() {
    var _a, _b;
    if (!currentName.value && !isOpen.value) {
      if (!((_b = (_a = sidebars.value) == null ? void 0 : _a[0]) == null ? void 0 : _b.title)) {
        return;
      }
      currentName.value = sidebars.value[0].title;
    }
    isOpen.value = !isOpen.value;
  }
  function close(unselect = false) {
    isOpen.value = false;
    if (unselect) {
      currentName.value = "";
    }
  }
  function open(name) {
    currentName.value = name;
    isOpen.value = true;
  }
  function detect() {
    var _a, _b, _c, _d;
    if (!((_c = (_b = (_a = app.tairo) == null ? void 0 : _a.sidebar) == null ? void 0 : _b.navigation) == null ? void 0 : _c.startOpen)) {
      isOpen.value = false;
      return;
    }
    const item = (_d = sidebars.value) == null ? void 0 : _d.find(
      (bar) => (bar == null ? void 0 : bar.activePath) && route.fullPath.startsWith(bar.activePath)
    );
    if (item) {
      currentName.value = item.title;
      {
        isOpen.value = Boolean(currentName.value);
      }
    }
  }
  function setup() {
    {
      detect();
      return;
    }
  }
  return {
    sidebars,
    hasSubsidebar,
    current,
    currentName,
    isOpen,
    toggle,
    close,
    open,
    detect,
    setup
  };
}
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "TairoSidebarNavigationItem",
  __ssrInlineRender: true,
  props: {
    sidebar: {}
  },
  setup(__props) {
    const props = __props;
    const { currentName, isOpen } = useSidebar();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      const _component_Icon = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex h-16 w-full items-center justify-center" }, _attrs))}><span>${ssrInterpolate(props.sidebar.order)}</span>`);
      if (props.sidebar.component) {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(("resolveComponentOrNative" in _ctx ? _ctx.resolveComponentOrNative : unref(resolveComponentOrNative))(props.sidebar.component)), props.sidebar.props, null), _parent);
      } else if (props.sidebar.to && props.sidebar.icon) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: props.sidebar.to,
          class: "text-muted-400 flex size-12 items-center justify-center rounded-2xl transition-colors duration-300",
          "data-nui-tooltip-position": "right",
          "data-nui-tooltip": props.sidebar.title
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, props.sidebar.icon, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Icon, props.sidebar.icon, null, 16)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (props.sidebar.icon) {
        _push(`<button type="button" class="${ssrRenderClass([
          unref(currentName) === props.sidebar.title ? "bg-primary-100 text-primary-500 dark:bg-primary-500/10" : "text-muted-400",
          "flex size-12 items-center justify-center rounded-2xl transition-colors duration-300"
        ])}" data-nui-tooltip-position="right"${ssrRenderAttr("data-nui-tooltip", props.sidebar.title)}>`);
        _push(ssrRenderComponent(_component_Icon, props.sidebar.icon, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/tairo-layout-sidebar/components/TairoSidebarNavigationItem.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "TairoSidebarNavigationPanel",
  __ssrInlineRender: true,
  props: {
    subsidebar: { type: Boolean, default: true }
  },
  setup(__props) {
    const props = __props;
    const { isOpen, current } = useSidebar();
    const subsidebarEnabled = computed(() => {
      var _a, _b;
      return Boolean(
        props.subsidebar !== false && ((_b = (_a = current.value) == null ? void 0 : _a.subsidebar) == null ? void 0 : _b.component)
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(subsidebarEnabled)) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: [
            "border-muted-200 dark:border-muted-700 dark:bg-muted-800 pointer-events-auto relative z-10 h-full w-[220px] border-r bg-white transition-all duration-300",
            unref(isOpen) ? "" : "rtl:translate-x-[calc(100%_+_80px)] translate-x-[calc(-100%_-_80px)]"
          ]
        }, _attrs))}>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, () => {
          var _a, _b, _c, _d, _e;
          if ((_b = (_a = unref(current)) == null ? void 0 : _a.subsidebar) == null ? void 0 : _b.component) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(("resolveComponentOrNative" in _ctx ? _ctx.resolveComponentOrNative : unref(resolveComponentOrNative))((_c = unref(current).subsidebar) == null ? void 0 : _c.component)), {
              key: (_e = (_d = unref(current)) == null ? void 0 : _d.subsidebar) == null ? void 0 : _e.component
            }, null), _parent);
          } else {
            _push(`<!---->`);
          }
        }, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/tairo-layout-sidebar/components/TairoSidebarNavigationPanel.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "TairoSidebarNavigation",
  __ssrInlineRender: true,
  props: {
    subsidebar: { type: Boolean, default: true },
    expanded: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { isOpen, sidebars } = useSidebar();
    const startSidebars = computed(
      () => {
        var _a;
        return (_a = sidebars.value) == null ? void 0 : _a.filter(
          (sidebar) => !sidebar.position || sidebar.position === "start"
        );
      }
    );
    const endSidebars = computed(
      () => {
        var _a;
        return (_a = sidebars.value) == null ? void 0 : _a.filter((sidebar) => sidebar.position === "end");
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TairoSidebarNavigationItem = _sfc_main$f;
      const _component_TairoSidebarNavigationPanel = _sfc_main$e;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pointer-events-none fixed start-0 top-0 z-[60] flex h-full xl:z-10" }, _attrs))}><div class="${ssrRenderClass([
        unref(isOpen) ? "" : "-translate-x-full rtl:translate-x-full xl:translate-x-0 rtl:xl:-translate-x-0",
        "border-muted-200 dark:border-muted-700 dark:bg-muted-800 pointer-events-auto relative z-20 flex h-full w-[80px] flex-col border-r bg-white transition-all duration-300"
      ])}">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`<div>`);
      ssrRenderSlot(_ctx.$slots, "top", {}, null, _push, _parent);
      _push(`<!--[-->`);
      ssrRenderList(unref(startSidebars), (item) => {
        _push(ssrRenderComponent(_component_TairoSidebarNavigationItem, {
          key: item.title,
          sidebar: item
        }, null, _parent));
      });
      _push(`<!--]--></div><div class="mt-auto"><!--[-->`);
      ssrRenderList(unref(endSidebars), (item) => {
        _push(ssrRenderComponent(_component_TairoSidebarNavigationItem, {
          key: item.title,
          sidebar: item
        }, null, _parent));
      });
      _push(`<!--]-->`);
      ssrRenderSlot(_ctx.$slots, "end", {}, null, _push, _parent);
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_TairoSidebarNavigationPanel, {
        subsidebar: props.subsidebar
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/tairo-layout-sidebar/components/TairoSidebarNavigation.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "TairoSidebarBurger",
  __ssrInlineRender: true,
  setup(__props) {
    const { isOpen, toggle } = useSidebar();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "button",
        class: "flex size-10 items-center justify-center"
      }, _attrs))}><div class="${ssrRenderClass([unref(isOpen) ? "scale-90" : "", "relative size-5"])}"><span class="${ssrRenderClass([
        unref(isOpen) ? "-rotate-45 rtl:rotate-45 max-w-[75%] top-1" : "top-0.5",
        "bg-primary-500 absolute block h-0.5 w-full transition-all duration-300"
      ])}"></span><span class="${ssrRenderClass([unref(isOpen) ? "opacity-0 translate-x-4 rtl:-translate-x-4" : "", "bg-primary-500 absolute top-1/2 block h-0.5 w-full max-w-[50%] transition-all duration-300"])}"></span><span class="${ssrRenderClass([
        unref(isOpen) ? "rotate-45 rtl:-rotate-45 max-w-[75%] bottom-1" : "bottom-0",
        "bg-primary-500 absolute block h-0.5 w-full transition-all duration-300"
      ])}"></span></div></button>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/tairo-layout-sidebar/components/TairoSidebarBurger.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
function useNuiDefaultProperty(properties, component, property) {
  const config = useAppConfig().nui;
  return computed(() => {
    var _a;
    return (properties == null ? void 0 : properties[property]) ?? ((_a = config == null ? void 0 : config[component]) == null ? void 0 : _a[property]);
  });
}
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "BaseHeading",
  __ssrInlineRender: true,
  props: {
    as: { default: void 0 },
    size: { default: void 0 },
    lead: { default: void 0 },
    weight: { default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const as = useNuiDefaultProperty(props, "BaseHeading", "as");
    const lead = useNuiDefaultProperty(props, "BaseHeading", "lead");
    const size = useNuiDefaultProperty(props, "BaseHeading", "size");
    const weight = useNuiDefaultProperty(props, "BaseHeading", "weight");
    const sizes = {
      xs: "nui-heading-xs",
      sm: "nui-heading-sm",
      md: "nui-heading-md",
      lg: "nui-heading-lg",
      xl: "nui-heading-xl",
      "2xl": "nui-heading-2xl",
      "3xl": "nui-heading-3xl",
      "4xl": "nui-heading-4xl",
      "5xl": "nui-heading-5xl",
      "6xl": "nui-heading-6xl",
      "7xl": "nui-heading-7xl",
      "8xl": "nui-heading-8xl",
      "9xl": "nui-heading-9xl"
    };
    const weights = {
      light: "nui-weight-light",
      normal: "nui-weight-normal",
      medium: "nui-weight-medium",
      semibold: "nui-weight-semibold",
      bold: "nui-weight-bold",
      extrabold: "nui-weight-extrabold"
    };
    const leads = {
      none: "nui-lead-none",
      tight: "nui-lead-tight",
      snug: "nui-lead-snug",
      normal: "nui-lead-normal",
      relaxed: "nui-lead-relaxed",
      loose: "nui-lead-loose"
    };
    const classes = computed(() => [
      "nui-heading",
      size.value && sizes[size.value],
      weight.value && weights[weight.value],
      lead.value && leads[lead.value]
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(props.as ? props.as : unref(as)), mergeProps({ class: unref(classes) }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@shuriken-ui+nuxt@3.1.5_nuxt@3.11.2_vue@3.4.21/node_modules/@shuriken-ui/nuxt/components/base/BaseHeading.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "TairoSidebarTools",
  __ssrInlineRender: true,
  setup(__props) {
    const app = useAppConfig();
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-2" }, _attrs))}><!--[-->`);
      ssrRenderList((_c = (_b = (_a = unref(app).tairo) == null ? void 0 : _a.sidebar) == null ? void 0 : _b.toolbar) == null ? void 0 : _c.tools, (tool) => {
        _push(`<!--[-->`);
        if (tool.component) {
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(("resolveComponentOrNative" in _ctx ? _ctx.resolveComponentOrNative : unref(resolveComponentOrNative))(tool.component)), mergeProps({
            key: tool.component
          }, tool.props), null), _parent);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/tairo-layout-sidebar/components/TairoSidebarTools.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "TairoSidebarToolbar",
  __ssrInlineRender: true,
  props: {
    sidebar: { type: Boolean, default: true },
    horizontalScroll: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const app = useAppConfig();
    const { hasSubsidebar } = useSidebar();
    const route = useRoute();
    const showNavBurger = computed(() => {
      var _a, _b, _c;
      return props.sidebar && ((_c = (_b = (_a = app.tairo) == null ? void 0 : _a.sidebar) == null ? void 0 : _b.toolbar) == null ? void 0 : _c.showNavBurger) && hasSubsidebar.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_TairoSidebarBurger = _sfc_main$c;
      const _component_BaseHeading = _sfc_main$b;
      const _component_TairoSidebarTools = _sfc_main$a;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["relative z-[1] mb-5 flex h-16 items-center gap-2", props.horizontalScroll && "pe-4 xl:pe-10"]
      }, _attrs))}>`);
      if (unref(showNavBurger)) {
        _push(ssrRenderComponent(_component_TairoSidebarBurger, { class: "-ms-3" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if ((_c = (_b = (_a = unref(app).tairo) == null ? void 0 : _a.sidebar) == null ? void 0 : _b.toolbar) == null ? void 0 : _c.showTitle) {
        _push(ssrRenderComponent(_component_BaseHeading, {
          as: "h1",
          size: "2xl",
          weight: "light",
          class: "text-muted-800 hidden md:block dark:text-white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                _push2(`${ssrInterpolate(unref(route).meta.title)}`);
              }, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "title", {}, () => [
                  createTextVNode(toDisplayString(unref(route).meta.title), 1)
                ])
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="ms-auto"></div>`);
      _push(ssrRenderComponent(_component_TairoSidebarTools, { class: "h-16" }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/tairo-layout-sidebar/components/TairoSidebarToolbar.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
function usePanels() {
  const app = useAppConfig();
  const panels = computed(
    () => {
      var _a, _b;
      return ((_b = (_a = app.tairo) == null ? void 0 : _a.panels) == null ? void 0 : _b.map((panel) => ({
        ...panel,
        size: panel.size ?? "sm",
        position: panel.position ?? "left",
        overlay: panel.overlay ?? true
      }))) ?? [];
    }
  );
  const currentName = useState("panels-current-name", () => "");
  const transitionFrom = useState("panels-transition-from", () => "left");
  const showOverlay = useState("panels-overlay", () => true);
  const currentProps = useState("panels-current-props", () => ({}));
  const current = computed(() => {
    if (!currentName.value) {
      return void 0;
    }
    return panels.value.find((panel) => panel.name === currentName.value);
  });
  function open(name, props) {
    const panel = panels.value.find(({ name: panelName }) => panelName === name);
    if (panel) {
      transitionFrom.value = panel.position ?? "left";
      currentName.value = panel.name;
      showOverlay.value = !!panel.overlay;
      currentProps.value = defu(props ?? {}, panel.props ?? {});
    }
  }
  function close() {
    currentName.value = "";
  }
  return {
    panels,
    current,
    transitionFrom,
    currentProps,
    showOverlay,
    open,
    close
  };
}
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "TairoPanels",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      panels,
      current,
      transitionFrom,
      currentProps,
      showOverlay,
      open,
      close
    } = usePanels();
    watch(
      [current, showOverlay],
      ([panel, value]) => {
        if ((panel == null ? void 0 : panel.component) && value) {
          (void 0).documentElement.style.overflow = "hidden";
        } else {
          (void 0).documentElement.style.overflow = "";
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        ssrRenderSlotInner(_ctx.$slots, "default", {
          panels: unref(panels),
          current: unref(current),
          transitionFrom: unref(transitionFrom),
          currentProps: unref(currentProps),
          showOverlay: unref(showOverlay),
          open: unref(open),
          close: unref(close)
        }, () => {
          ssrRenderSuspense(_push2, {
            default: () => {
              var _a;
              if ((_a = unref(current)) == null ? void 0 : _a.component) {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(("resolveComponentOrNative" in _ctx ? _ctx.resolveComponentOrNative : unref(resolveComponentOrNative))(unref(current).component)), mergeProps(unref(currentProps), {
                  class: ["xs:max-w-full fixed top-0 z-[100] h-full", [
                    unref(current).position === "left" ? "start-0" : "end-0",
                    unref(current).size === "sm" && "w-96",
                    unref(current).size === "md" && "w-[460px]"
                  ]]
                }), null), _parent);
              } else {
                _push2(`<!---->`);
              }
            },
            _: 1
          });
        }, _push2, _parent, null, true);
        _push2(`<div role="button" tabindex="0" class="${ssrRenderClass([
          unref(current) && unref(showOverlay) ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
          "bg-muted-800/60 fixed start-0 top-0 z-[99] size-full cursor-pointer transition-opacity duration-300"
        ])}"></div>`);
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/tairo/components/TairoPanels.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
function useNinjaWindowScroll() {
  const x = ref(0);
  const y = ref(0);
  return { x, y };
}
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "TairoSidebarCircularMenu",
  __ssrInlineRender: true,
  setup(__props) {
    const { y } = useNinjaWindowScroll();
    const app = useAppConfig();
    const isOpened = ref(false);
    const isScrolled = computed(() => {
      if (y.value < 60) {
        isOpened.value = false;
      }
      return y.value > 60;
    });
    const toolOffsets = [
      "translate-x-[-6.5em] rtl:translate-x-[6.5em] translate-y-[-0.25em]",
      "translate-x-[-5.75em] rtl:translate-x-[5.75em] translate-y-[3em]",
      "translate-x-[-3.15em] rtl:translate-x-[3.15em] translate-y-[5.5em]",
      "translate-x-[0em] translate-y-[6.5em]"
    ];
    const tools = computed(() => {
      var _a, _b, _c, _d;
      return ((_d = (_c = (_b = (_a = app.tairo) == null ? void 0 : _a.sidebar) == null ? void 0 : _b.circularMenu) == null ? void 0 : _c.tools) == null ? void 0 : _d.slice(0, 4)) || [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["after:bg-primary-600 after:shadow-primary-500/50 dark:after:shadow-muted-800/10 fixed end-[1em] top-[0.6em] z-[90] transition-transform duration-300 after:absolute after:end-0 after:top-0 after:block after:size-12 after:rounded-full after:shadow-lg after:transition-transform after:duration-300 after:content-['']", [
          unref(isOpened) ? "after:ease-[cubic-bezier(0.68, 1.55, 0.265, 1)] after:scale-[5.5]" : "",
          unref(isScrolled) ? "" : "-translate-y-24"
        ]]
      }, _attrs))}><button type="button" class="bg-primary-500 shadow-primary-500/50 dark:shadow-muted-800/10 relative z-30 flex size-12 items-center justify-center rounded-full text-white shadow-lg"><span class="${ssrRenderClass([unref(isOpened) ? "scale-90 top-0" : "-top-0.5", "relative block size-3 transition-all duration-300"])}"><span class="${ssrRenderClass([unref(isOpened) ? "-rotate-45 top-1" : "top-0.5", "bg-muted-50 absolute block h-0.5 w-full transition-all duration-300"])}"></span><span class="${ssrRenderClass([unref(isOpened) ? "opacity-0 translate-x-4" : "", "bg-muted-50 absolute top-1/2 block h-0.5 w-full transition-all duration-300"])}"></span><span class="${ssrRenderClass([unref(isOpened) ? "rotate-45 bottom-1.5" : "bottom-0", "bg-muted-50 absolute block h-0.5 w-full transition-all duration-300"])}"></span></span></button><div><!--[-->`);
      ssrRenderList(unref(tools), (tool, idx) => {
        _push(`<!--[-->`);
        if (tool.component) {
          _push(`<div class="${ssrRenderClass([unref(isOpened) ? toolOffsets[idx] : "translate-x-0 translate-y-0", "absolute end-[0.2em] top-[0.2em] z-20 flex items-center justify-center transition-all duration-300"])}">`);
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(("resolveComponentOrNative" in _ctx ? _ctx.resolveComponentOrNative : unref(resolveComponentOrNative))(tool.component)), tool.props, null), _parent);
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/tairo-layout-sidebar/components/TairoSidebarCircularMenu.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "TairoSidebarLayout",
  __ssrInlineRender: true,
  props: {
    sidebar: { type: Boolean, default: true },
    subsidebar: { type: Boolean, default: true },
    toolbar: { type: Boolean, default: true },
    circularMenu: { type: Boolean, default: true },
    horizontalScroll: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const app = useAppConfig();
    const { setup, currentName, isOpen, toggle } = useSidebar();
    setup();
    const sidebarEnabled = computed(() => {
      var _a, _b, _c;
      return ((_c = (_b = (_a = app.tairo) == null ? void 0 : _a.sidebar) == null ? void 0 : _b.navigation) == null ? void 0 : _c.enabled) !== false && props.sidebar !== false;
    });
    const toolbarEnabled = computed(() => {
      var _a, _b, _c;
      return ((_c = (_b = (_a = app.tairo) == null ? void 0 : _a.sidebar) == null ? void 0 : _b.toolbar) == null ? void 0 : _c.enabled) !== false && props.toolbar !== false;
    });
    const circularMenuEnabled = computed(() => {
      var _a, _b, _c;
      return ((_c = (_b = (_a = app.tairo) == null ? void 0 : _a.sidebar) == null ? void 0 : _b.circularMenu) == null ? void 0 : _c.enabled) !== false && props.circularMenu !== false;
    });
    const wrapperClass = computed(() => {
      if (!sidebarEnabled.value) {
        return "bg-muted-100 dark:bg-muted-900 relative min-h-screen w-full overflow-x-hidden px-4 transition-all duration-300 xl:px-10";
      }
      const list = [
        "bg-muted-100 dark:bg-muted-900 relative min-h-screen w-full overflow-x-hidden px-4 transition-all duration-300 xl:px-10"
      ];
      if (isOpen.value) {
        list.push("xl:max-w-[calc(100%_-_300px)] xl:ms-[300px]");
      } else {
        list.push("xl:max-w-[calc(100%_-_80px)] xl:ms-[80px]");
      }
      if (props.horizontalScroll) {
        list.push("!pe-0 xl:!pe-0");
      }
      return list;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TairoSidebarNavigation = _sfc_main$d;
      const _component_NuxtLink = __nuxt_component_1;
      const _component_TairoSidebarToolbar = _sfc_main$9;
      const _component_TairoPanels = _sfc_main$8;
      const _component_TairoSidebarCircularMenu = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-muted-100 dark:bg-muted-900 pb-20" }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "sidebar", {}, () => {
        if (unref(sidebarEnabled)) {
          _push(ssrRenderComponent(_component_TairoSidebarNavigation, {
            subsidebar: props.subsidebar
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              var _a, _b, _c, _d, _e, _f, _g, _h;
              if (_push2) {
                if ((_d = (_c = (_b = (_a = unref(app).tairo) == null ? void 0 : _a.sidebar) == null ? void 0 : _b.navigation) == null ? void 0 : _c.logo) == null ? void 0 : _d.component) {
                  _push2(`<div class="flex h-16 w-full items-center justify-center"${_scopeId}>`);
                  ssrRenderSlot(_ctx.$slots, "logo", {}, () => {
                    _push2(ssrRenderComponent(_component_NuxtLink, {
                      to: "/",
                      class: "flex items-center justify-center"
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2;
                        if (_push3) {
                          ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(
                            ("resolveComponentOrNative" in _ctx ? _ctx.resolveComponentOrNative : unref(resolveComponentOrNative))(
                              (_b2 = (_a2 = unref(app).tairo) == null ? void 0 : _a2.sidebar) == null ? void 0 : _b2.navigation.logo.component
                            )
                          ), (_d2 = (_c2 = unref(app).tairo) == null ? void 0 : _c2.sidebar) == null ? void 0 : _d2.navigation.logo.props, null), _parent3, _scopeId2);
                        } else {
                          return [
                            (openBlock(), createBlock(resolveDynamicComponent(
                              ("resolveComponentOrNative" in _ctx ? _ctx.resolveComponentOrNative : unref(resolveComponentOrNative))(
                                (_f2 = (_e2 = unref(app).tairo) == null ? void 0 : _e2.sidebar) == null ? void 0 : _f2.navigation.logo.component
                              )
                            ), (_h2 = (_g2 = unref(app).tairo) == null ? void 0 : _g2.sidebar) == null ? void 0 : _h2.navigation.logo.props, null, 16))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent2, _scopeId));
                  }, _push2, _parent2, _scopeId);
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
              } else {
                return [
                  ((_h = (_g = (_f = (_e = unref(app).tairo) == null ? void 0 : _e.sidebar) == null ? void 0 : _f.navigation) == null ? void 0 : _g.logo) == null ? void 0 : _h.component) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex h-16 w-full items-center justify-center"
                  }, [
                    renderSlot(_ctx.$slots, "logo", {}, () => [
                      createVNode(_component_NuxtLink, {
                        to: "/",
                        class: "flex items-center justify-center"
                      }, {
                        default: withCtx(() => {
                          var _a2, _b2, _c2, _d2;
                          return [
                            (openBlock(), createBlock(resolveDynamicComponent(
                              ("resolveComponentOrNative" in _ctx ? _ctx.resolveComponentOrNative : unref(resolveComponentOrNative))(
                                (_b2 = (_a2 = unref(app).tairo) == null ? void 0 : _a2.sidebar) == null ? void 0 : _b2.navigation.logo.component
                              )
                            ), (_d2 = (_c2 = unref(app).tairo) == null ? void 0 : _c2.sidebar) == null ? void 0 : _d2.navigation.logo.props, null, 16))
                          ];
                        }),
                        _: 1
                      })
                    ])
                  ])) : createCommentVNode("", true)
                ];
              }
            }),
            _: 3
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<div role="button" tabindex="0" class="${ssrRenderClass([
          unref(isOpen) ? "opacity-50 dark:opacity-75" : "opacity-0 pointer-events-none",
          "bg-muted-800 dark:bg-muted-900 fixed start-0 top-0 z-[59] block size-full transition-opacity duration-300 lg:hidden"
        ])}"></div>`);
      }, _push, _parent);
      _push(`<div class="${ssrRenderClass(unref(wrapperClass))}"><div class="${ssrRenderClass([
        props.horizontalScroll && "mx-auto w-full",
        !props.horizontalScroll && "mx-auto w-full max-w-7xl"
      ])}">`);
      ssrRenderSlot(_ctx.$slots, "toolbar", {}, () => {
        if (unref(toolbarEnabled)) {
          _push(ssrRenderComponent(_component_TairoSidebarToolbar, {
            sidebar: props.sidebar,
            "horizontal-scroll": props.horizontalScroll
          }, {
            title: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                ssrRenderSlot(_ctx.$slots, "toolbar-title", {}, null, _push2, _parent2, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, "toolbar-title")
                ];
              }
            }),
            _: 3
          }, _parent));
        } else {
          _push(`<!---->`);
        }
      }, _push, _parent);
      _push(`<main>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
      _push(ssrRenderComponent(_component_TairoPanels, null, null, _parent));
      if (unref(circularMenuEnabled)) {
        _push(ssrRenderComponent(_component_TairoSidebarCircularMenu, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/tairo-layout-sidebar/components/TairoSidebarLayout.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "BasePlaceholderPage",
  __ssrInlineRender: true,
  props: {
    title: {},
    subtitle: { default: void 0 },
    imageSize: { default: void 0 },
    classes: { default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    const imageSize = useNuiDefaultProperty(
      props,
      "BasePlaceholderPage",
      "imageSize"
    );
    const sizes = {
      xs: "nui-placeholder-xs",
      sm: "nui-placeholder-sm",
      md: "nui-placeholder-md",
      lg: "nui-placeholder-lg",
      xl: "nui-placeholder-xl"
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      const _component_BaseHeading = _sfc_main$b;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["nui-placeholder-page", [unref(imageSize) && sizes[unref(imageSize)], (_a = props.classes) == null ? void 0 : _a.wrapper]]
      }, _attrs))}><div class="${ssrRenderClass([(_b = props.classes) == null ? void 0 : _b.inner, "nui-placeholder-page-inner"])}">`);
      if ("image" in _ctx.$slots) {
        _push(`<div class="${ssrRenderClass([(_c = props.classes) == null ? void 0 : _c.img, "nui-placeholder-page-img"])}">`);
        ssrRenderSlot(_ctx.$slots, "image", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([(_d = props.classes) == null ? void 0 : _d.content, "nui-placeholder-page-content"])}">`);
      _push(ssrRenderComponent(_component_BaseHeading, {
        as: "h4",
        weight: "medium",
        size: "xl",
        class: ["nui-placeholder-page-title", (_e = props.classes) == null ? void 0 : _e.title]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(props.title)}`);
          } else {
            return [
              createTextVNode(toDisplayString(props.title), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (props.subtitle) {
        _push(`<p class="${ssrRenderClass([(_f = props.classes) == null ? void 0 : _f.subtitle, "nui-placeholder-page-subtitle"])}">${ssrInterpolate(props.subtitle)}</p>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@shuriken-ui+nuxt@3.1.5_nuxt@3.11.2_vue@3.4.21/node_modules/@shuriken-ui/nuxt/components/base/BasePlaceholderPage.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "nui-placeload animate-nui-placeload" }, _attrs))}></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@shuriken-ui+nuxt@3.1.5_nuxt@3.11.2_vue@3.4.21/node_modules/@shuriken-ui/nuxt/components/base/BasePlaceload.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender]]);
const useNinjaButton = (properties, {
  // @todo: make this configurable (design tokens)
  externalDefaultRelationship = "noopener noreferrer",
  externalDefaultTarget = "_blank"
} = {}) => {
  const NuxtLink = /* @__PURE__ */ defineNuxtLink({});
  const is = computed(
    () => properties.to ? NuxtLink : properties.href ? "a" : "button"
  );
  const type = computed(() => {
    if (is.value === "button") {
      return properties.type || "button";
    }
    return;
  });
  const external = computed(() => {
    var _a;
    if (typeof properties.to === "string" && properties.to.startsWith("http")) {
      return true;
    } else if (typeof properties.to === "object" && "path" in properties.to && ((_a = properties.to.path) == null ? void 0 : _a.startsWith("http"))) {
      return true;
    }
    return false;
  });
  const relationship = computed(() => {
    if (!external.value) {
      return properties.rel;
    }
    return properties.rel ?? externalDefaultRelationship;
  });
  const target = computed(() => {
    if (!external.value) {
      return properties.target;
    }
    return properties.target ?? externalDefaultTarget;
  });
  const attributes = computed(() => ({
    to: properties.disabled ? void 0 : properties.to,
    href: properties.disabled ? void 0 : properties.href,
    disabled: properties.disabled,
    type: type.value,
    rel: relationship.value,
    target: target.value
  }));
  return {
    attributes,
    is
  };
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "BaseButton",
  __ssrInlineRender: true,
  props: {
    to: { default: void 0 },
    href: { default: void 0 },
    rel: { default: "" },
    target: { default: "" },
    type: { default: void 0 },
    shadow: { default: void 0 },
    badge: { type: Boolean },
    badgePulse: { type: Boolean },
    loading: { type: Boolean },
    disabled: { type: Boolean },
    color: { default: void 0 },
    rounded: { default: void 0 },
    size: { default: void 0 },
    variant: { default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const color = useNuiDefaultProperty(props, "BaseButton", "color");
    const rounded = useNuiDefaultProperty(props, "BaseButton", "rounded");
    const size = useNuiDefaultProperty(props, "BaseButton", "size");
    const variant = useNuiDefaultProperty(props, "BaseButton", "variant");
    const badgeColors = {
      primary: "nui-badge-primary",
      info: "nui-badge-info",
      success: "nui-badge-success",
      warning: "nui-badge-warning",
      danger: "nui-badge-danger",
      none: "",
      default: "",
      "default-contrast": "",
      light: "",
      dark: "",
      black: "",
      muted: "",
      "muted-contrast": ""
    };
    const sizes = {
      sm: "nui-button-sm",
      md: "nui-button-md",
      lg: "nui-button-lg",
      xl: "nui-button-xl"
    };
    const radiuses = {
      none: "",
      sm: "nui-button-rounded-sm",
      md: "nui-button-rounded-md",
      lg: "nui-button-rounded-lg",
      full: "nui-button-rounded-full"
    };
    const variants = {
      solid: "nui-button-solid",
      pastel: "nui-button-pastel",
      outline: "nui-button-outline"
    };
    const colors = {
      none: "",
      default: "nui-button-default",
      "default-contrast": "nui-button-default-contrast",
      primary: "nui-button-primary",
      info: "nui-button-info",
      success: "nui-button-success",
      warning: "nui-button-warning",
      danger: "nui-button-danger",
      muted: "nui-button-muted",
      "muted-contrast": "nui-button-muted-contrast",
      light: "nui-button-light",
      dark: "nui-button-dark",
      black: "nui-button-black"
    };
    const shadows = {
      flat: "nui-button-shadow",
      hover: "nui-button-shadow-hover"
    };
    const classes = computed(() => [
      "nui-button",
      props.loading && "nui-button-loading",
      size.value && sizes[size.value],
      rounded.value && radiuses[rounded.value],
      variant.value && variants[variant.value],
      color.value && colors[color.value],
      props.shadow && shadows[props.shadow]
    ]);
    const { attributes, is } = useNinjaButton(props);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BasePlaceload = __nuxt_component_0;
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(is)), mergeProps(unref(attributes), { class: unref(classes) }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!props.loading) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            } else {
              _push2(ssrRenderComponent(_component_BasePlaceload, { class: "h-4 w-12 rounded" }, null, _parent2, _scopeId));
            }
            if (props.badge) {
              _push2(`<span class="${ssrRenderClass([badgeColors[unref(color)], "nui-button-badge"])}"${_scopeId}>`);
              if (props.badgePulse) {
                _push2(`<span class="nui-button-badge-pulse"${_scopeId}></span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<span class="nui-button-badge-inner"${_scopeId}></span></span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !props.loading ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createBlock(_component_BasePlaceload, {
                key: 1,
                class: "h-4 w-12 rounded"
              })),
              props.badge ? (openBlock(), createBlock("span", {
                key: 2,
                class: ["nui-button-badge", badgeColors[unref(color)]]
              }, [
                props.badgePulse ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "nui-button-badge-pulse"
                })) : createCommentVNode("", true),
                createVNode("span", { class: "nui-button-badge-inner" })
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@shuriken-ui+nuxt@3.1.5_nuxt@3.11.2_vue@3.4.21/node_modules/@shuriken-ui/nuxt/components/base/BaseButton.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TairoError",
  __ssrInlineRender: true,
  props: {
    error: {}
  },
  setup(__props) {
    const props = __props;
    const title = computed(() => {
      var _a, _b;
      if (((_a = props.error) == null ? void 0 : _a.statusCode) === 401) {
        return "Not authorized";
      }
      if (((_b = props.error) == null ? void 0 : _b.statusCode) === 404) {
        return "Page not found";
      }
      return "Oops... Something went wrong";
    });
    const description = computed(() => {
      var _a, _b;
      if (((_a = props.error) == null ? void 0 : _a.statusCode) === 401) {
        return "You are not authorized to access this page.";
      }
      if (((_b = props.error) == null ? void 0 : _b.statusCode) === 404) {
        return "We couldn't find the page you were looking for, please contact a system administrator or try again later.";
      }
      return "An error has occured. If the problem persists, please contact a system administrator or try again later.";
    });
    const app = useAppConfig();
    const handleError = () => clearError({ redirect: "/" });
    ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BasePlaceholderPage = _sfc_main$5;
      const _component_BaseButton = _sfc_main$3;
      const _component_Icon = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pb-16" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_BasePlaceholderPage, {
        title: unref(title),
        subtitle: unref(description),
        "image-size": "md",
        class: "relative !items-end"
      }, {
        image: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
          if (_push2) {
            if ((_c = (_b = (_a = unref(app).tairo) == null ? void 0 : _a.error) == null ? void 0 : _b.logo) == null ? void 0 : _c.component) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(("resolveComponentOrNative" in _ctx ? _ctx.resolveComponentOrNative : unref(resolveComponentOrNative))((_d = unref(app).tairo) == null ? void 0 : _d.error.logo.component)), (_e = unref(app).tairo) == null ? void 0 : _e.error.logo.props, null), _parent2, _scopeId);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              ((_h = (_g = (_f = unref(app).tairo) == null ? void 0 : _f.error) == null ? void 0 : _g.logo) == null ? void 0 : _h.component) ? (openBlock(), createBlock(resolveDynamicComponent(("resolveComponentOrNative" in _ctx ? _ctx.resolveComponentOrNative : unref(resolveComponentOrNative))((_i = unref(app).tairo) == null ? void 0 : _i.error.logo.component)), mergeProps({ key: 0 }, (_j = unref(app).tairo) == null ? void 0 : _j.error.logo.props), null, 16)) : createCommentVNode("", true)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="mt-4"${_scopeId}><div class="text-muted-400/20 dark:text-muted-400/10 absolute inset-x-0 top-1/3 -translate-y-1/2 text-[13rem] font-bold sm:text-[20rem]"${_scopeId}><span${_scopeId}>${ssrInterpolate((_a = props.error) == null ? void 0 : _a.statusCode)}</span></div><div class="mx-auto flex w-full max-w-xs items-center justify-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseButton, {
              rounded: "lg",
              class: "mx-auto !h-12 w-full max-w-[160px] items-center gap-2",
              onClick: handleError
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, { name: "feather:arrow-left" }, null, _parent3, _scopeId2));
                  _push3(` Back to home `);
                } else {
                  return [
                    createVNode(_component_Icon, { name: "feather:arrow-left" }),
                    createTextVNode(" Back to home ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "mt-4" }, [
                createVNode("div", { class: "text-muted-400/20 dark:text-muted-400/10 absolute inset-x-0 top-1/3 -translate-y-1/2 text-[13rem] font-bold sm:text-[20rem]" }, [
                  createVNode("span", null, toDisplayString((_b = props.error) == null ? void 0 : _b.statusCode), 1)
                ]),
                createVNode("div", { class: "mx-auto flex w-full max-w-xs items-center justify-center gap-2" }, [
                  createVNode(_component_BaseButton, {
                    rounded: "lg",
                    class: "mx-auto !h-12 w-full max-w-[160px] items-center gap-2",
                    onClick: handleError
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "feather:arrow-left" }),
                      createTextVNode(" Back to home ")
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/tairo/components/TairoError.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "error",
  __ssrInlineRender: true,
  props: {
    error: {}
  },
  setup(__props) {
    const props = __props;
    const app = useAppConfig();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TairoSidebarLayout = _sfc_main$6;
      const _component_TairoError = _sfc_main$2;
      _push(ssrRenderComponent(_component_TairoSidebarLayout, mergeProps({ sidebar: false }, _attrs), {
        "toolbar-title": withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`${ssrInterpolate((_a = unref(app).tairo) == null ? void 0 : _a.title)}`);
          } else {
            return [
              createTextVNode(toDisplayString((_b = unref(app).tairo) == null ? void 0 : _b.title), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_TairoError, {
              error: props.error
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_TairoError, {
                error: props.error
              }, null, 8, ["error"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/tairo-layout-sidebar/error.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$h), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/nuxt@3.11.2_@unocss+reset@0.59.1_eslint@8.57.0_floating-vue@5.2.2_typescript@5.4.5_unocss@0.59.1_vue-tsc@2.0.12/node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RootComponent = _sfc_main;
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(RootComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error = nuxt.payload.error || createError(error);
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

export { __nuxt_component_2 as _, _sfc_main$b as a, _sfc_main$3 as b, _export_sfc as c, __nuxt_component_0 as d, entry$1 as default, __nuxt_component_1 as e, useRoute as f, _sfc_main$5 as g, usePanels as h, useState as i, useNinjaButton as j, useSidebar as k, isIOS as l, isObject as m, noop as n, tryOnScopeDispose as o, notNullish as p, useAppConfig as q, useNinjaToasterState as r, useNinjaToasterProgress as s, toValue as t, useNuiDefaultProperty as u, resolveIconName as v, useNinjaWindowScroll as w, resolveComponentOrNative as x, _sfc_main$8 as y, _sfc_main$6 as z };
//# sourceMappingURL=server.mjs.map
