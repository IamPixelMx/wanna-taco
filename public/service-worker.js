try {
  self['workbox:core:5.1.3'] && _();
} catch (e) {}
const e = (e, ...t) => {
  let s = e;
  return t.length > 0 && (s += ' :: ' + JSON.stringify(t)), s;
};
class t extends Error {
  constructor(t, s) {
    super(e(t, s)), (this.name = t), (this.details = s);
  }
}
try {
  self['workbox:routing:5.1.3'] && _();
} catch (e) {}
const s = e => (e && 'object' == typeof e ? e : { handle: e });
class n {
  constructor(e, t, n = 'GET') {
    (this.handler = s(t)), (this.match = e), (this.method = n);
  }
}
class i extends n {
  constructor(e, t, s) {
    super(
      ({ url: t }) => {
        const s = e.exec(t.href);
        if (s && (t.origin === location.origin || 0 === s.index)) return s.slice(1);
      },
      t,
      s,
    );
  }
}
const a = e =>
  new URL(String(e), location.href).href.replace(new RegExp('^' + location.origin), '');
class c {
  constructor() {
    this.t = new Map();
  }
  get routes() {
    return this.t;
  }
  addFetchListener() {
    self.addEventListener('fetch', e => {
      const { request: t } = e,
        s = this.handleRequest({ request: t, event: e });
      s && e.respondWith(s);
    });
  }
  addCacheListener() {
    self.addEventListener('message', e => {
      if (e.data && 'CACHE_URLS' === e.data.type) {
        const { payload: t } = e.data,
          s = Promise.all(
            t.urlsToCache.map(e => {
              'string' == typeof e && (e = [e]);
              const t = new Request(...e);
              return this.handleRequest({ request: t });
            }),
          );
        e.waitUntil(s), e.ports && e.ports[0] && s.then(() => e.ports[0].postMessage(!0));
      }
    });
  }
  handleRequest({ request: e, event: t }) {
    const s = new URL(e.url, location.href);
    if (!s.protocol.startsWith('http')) return;
    const { params: n, route: i } = this.findMatchingRoute({ url: s, request: e, event: t });
    let a,
      c = i && i.handler;
    if ((!c && this.s && (c = this.s), c)) {
      try {
        a = c.handle({ url: s, request: e, event: t, params: n });
      } catch (e) {
        a = Promise.reject(e);
      }
      return (
        a instanceof Promise &&
          this.i &&
          (a = a.catch(n => this.i.handle({ url: s, request: e, event: t }))),
        a
      );
    }
  }
  findMatchingRoute({ url: e, request: t, event: s }) {
    const n = this.t.get(t.method) || [];
    for (const i of n) {
      let n;
      const a = i.match({ url: e, request: t, event: s });
      if (a)
        return (
          (n = a),
          ((Array.isArray(a) && 0 === a.length) ||
            (a.constructor === Object && 0 === Object.keys(a).length) ||
            'boolean' == typeof a) &&
            (n = void 0),
          { route: i, params: n }
        );
    }
    return {};
  }
  setDefaultHandler(e) {
    this.s = s(e);
  }
  setCatchHandler(e) {
    this.i = s(e);
  }
  registerRoute(e) {
    this.t.has(e.method) || this.t.set(e.method, []), this.t.get(e.method).push(e);
  }
  unregisterRoute(e) {
    if (!this.t.has(e.method))
      throw new t('unregister-route-but-not-found-with-method', { method: e.method });
    const s = this.t.get(e.method).indexOf(e);
    if (!(s > -1)) throw new t('unregister-route-route-not-registered');
    this.t.get(e.method).splice(s, 1);
  }
}
let r;
const o = () => (r || ((r = new c()), r.addFetchListener(), r.addCacheListener()), r);
const h = {
    googleAnalytics: 'googleAnalytics',
    precache: 'precache-v2',
    prefix: 'workbox',
    runtime: 'runtime',
    suffix: 'undefined' != typeof registration ? registration.scope : '',
  },
  u = e => [h.prefix, e, h.suffix].filter(e => e && e.length > 0).join('-'),
  l = e => e || u(h.precache),
  f = e => e || u(h.runtime);
function d(e) {
  e.then(() => {});
}
const w = new Set();
class p {
  constructor(e, t, { onupgradeneeded: s, onversionchange: n } = {}) {
    (this.o = null), (this.h = e), (this.u = t), (this.l = s), (this.p = n || (() => this.close()));
  }
  get db() {
    return this.o;
  }
  async open() {
    if (!this.o)
      return (
        (this.o = await new Promise((e, t) => {
          let s = !1;
          setTimeout(() => {
            (s = !0), t(new Error('The open request was blocked and timed out'));
          }, this.OPEN_TIMEOUT);
          const n = indexedDB.open(this.h, this.u);
          (n.onerror = () => t(n.error)),
            (n.onupgradeneeded = e => {
              s
                ? (n.transaction.abort(), n.result.close())
                : 'function' == typeof this.l && this.l(e);
            }),
            (n.onsuccess = () => {
              const t = n.result;
              s ? t.close() : ((t.onversionchange = this.p.bind(this)), e(t));
            });
        })),
        this
      );
  }
  async getKey(e, t) {
    return (await this.getAllKeys(e, t, 1))[0];
  }
  async getAll(e, t, s) {
    return await this.getAllMatching(e, { query: t, count: s });
  }
  async getAllKeys(e, t, s) {
    return (await this.getAllMatching(e, { query: t, count: s, includeKeys: !0 })).map(e => e.key);
  }
  async getAllMatching(
    e,
    { index: t, query: s = null, direction: n = 'next', count: i, includeKeys: a = !1 } = {},
  ) {
    return await this.transaction([e], 'readonly', (c, r) => {
      const o = c.objectStore(e),
        h = t ? o.index(t) : o,
        u = [],
        l = h.openCursor(s, n);
      l.onsuccess = () => {
        const e = l.result;
        e ? (u.push(a ? e : e.value), i && u.length >= i ? r(u) : e.continue()) : r(u);
      };
    });
  }
  async transaction(e, t, s) {
    return (
      await this.open(),
      await new Promise((n, i) => {
        const a = this.o.transaction(e, t);
        (a.onabort = () => i(a.error)), (a.oncomplete = () => n()), s(a, e => n(e));
      })
    );
  }
  async g(e, t, s, ...n) {
    return await this.transaction([t], s, (s, i) => {
      const a = s.objectStore(t),
        c = a[e].apply(a, n);
      c.onsuccess = () => i(c.result);
    });
  }
  close() {
    this.o && (this.o.close(), (this.o = null));
  }
}
p.prototype.OPEN_TIMEOUT = 2e3;
const y = {
  readonly: ['get', 'count', 'getKey', 'getAll', 'getAllKeys'],
  readwrite: ['add', 'put', 'clear', 'delete'],
};
for (const [e, t] of Object.entries(y))
  for (const s of t)
    s in IDBObjectStore.prototype &&
      (p.prototype[s] = async function (t, ...n) {
        return await this.g(s, t, e, ...n);
      });
try {
  self['workbox:expiration:5.1.3'] && _();
} catch (e) {}
const g = e => {
  const t = new URL(e, location.href);
  return (t.hash = ''), t.href;
};
class m {
  constructor(e) {
    (this.m = e), (this.o = new p('workbox-expiration', 1, { onupgradeneeded: e => this.v(e) }));
  }
  v(e) {
    const t = e.target.result.createObjectStore('cache-entries', { keyPath: 'id' });
    t.createIndex('cacheName', 'cacheName', { unique: !1 }),
      t.createIndex('timestamp', 'timestamp', { unique: !1 }),
      (async e => {
        await new Promise((t, s) => {
          const n = indexedDB.deleteDatabase(e);
          (n.onerror = () => {
            s(n.error);
          }),
            (n.onblocked = () => {
              s(new Error('Delete blocked'));
            }),
            (n.onsuccess = () => {
              t();
            });
        });
      })(this.m);
  }
  async setTimestamp(e, t) {
    const s = { url: (e = g(e)), timestamp: t, cacheName: this.m, id: this.q(e) };
    await this.o.put('cache-entries', s);
  }
  async getTimestamp(e) {
    return (await this.o.get('cache-entries', this.q(e))).timestamp;
  }
  async expireEntries(e, t) {
    const s = await this.o.transaction('cache-entries', 'readwrite', (s, n) => {
        const i = s.objectStore('cache-entries').index('timestamp').openCursor(null, 'prev'),
          a = [];
        let c = 0;
        i.onsuccess = () => {
          const s = i.result;
          if (s) {
            const n = s.value;
            n.cacheName === this.m &&
              ((e && n.timestamp < e) || (t && c >= t) ? a.push(s.value) : c++),
              s.continue();
          } else n(a);
        };
      }),
      n = [];
    for (const e of s) await this.o.delete('cache-entries', e.id), n.push(e.url);
    return n;
  }
  q(e) {
    return this.m + '|' + g(e);
  }
}
class b {
  constructor(e, t = {}) {
    (this.R = !1),
      (this._ = !1),
      (this.U = t.maxEntries),
      (this.j = t.maxAgeSeconds),
      (this.m = e),
      (this.L = new m(e));
  }
  async expireEntries() {
    if (this.R) return void (this._ = !0);
    this.R = !0;
    const e = this.j ? Date.now() - 1e3 * this.j : 0,
      t = await this.L.expireEntries(e, this.U),
      s = await self.caches.open(this.m);
    for (const e of t) await s.delete(e);
    (this.R = !1), this._ && ((this._ = !1), d(this.expireEntries()));
  }
  async updateTimestamp(e) {
    await this.L.setTimestamp(e, Date.now());
  }
  async isURLExpired(e) {
    if (this.j) {
      return (await this.L.getTimestamp(e)) < Date.now() - 1e3 * this.j;
    }
    return !1;
  }
  async delete() {
    (this._ = !1), await this.L.expireEntries(1 / 0);
  }
}
const v = (e, t) => e.filter(e => t in e),
  q = async ({ request: e, mode: t, plugins: s = [] }) => {
    const n = v(s, 'cacheKeyWillBeUsed');
    let i = e;
    for (const e of n)
      (i = await e.cacheKeyWillBeUsed.call(e, { mode: t, request: i })),
        'string' == typeof i && (i = new Request(i));
    return i;
  },
  R = async ({ cacheName: e, request: t, event: s, matchOptions: n, plugins: i = [] }) => {
    const a = await self.caches.open(e),
      c = await q({ plugins: i, request: t, mode: 'read' });
    let r = await a.match(c, n);
    for (const t of i)
      if ('cachedResponseWillBeUsed' in t) {
        const i = t.cachedResponseWillBeUsed;
        r = await i.call(t, {
          cacheName: e,
          event: s,
          matchOptions: n,
          cachedResponse: r,
          request: c,
        });
      }
    return r;
  },
  x = async ({
    cacheName: e,
    request: s,
    response: n,
    event: i,
    plugins: c = [],
    matchOptions: r,
  }) => {
    const o = await q({ plugins: c, request: s, mode: 'write' });
    if (!n) throw new t('cache-put-with-no-response', { url: a(o.url) });
    const h = await (async ({ request: e, response: t, event: s, plugins: n = [] }) => {
      let i = t,
        a = !1;
      for (const t of n)
        if ('cacheWillUpdate' in t) {
          a = !0;
          const n = t.cacheWillUpdate;
          if (((i = await n.call(t, { request: e, response: i, event: s })), !i)) break;
        }
      return a || (i = i && 200 === i.status ? i : void 0), i || null;
    })({ event: i, plugins: c, response: n, request: o });
    if (!h) return;
    const u = await self.caches.open(e),
      l = v(c, 'cacheDidUpdate'),
      f = l.length > 0 ? await R({ cacheName: e, matchOptions: r, request: o }) : null;
    try {
      await u.put(o, h);
    } catch (e) {
      throw (
        ('QuotaExceededError' === e.name &&
          (await (async function () {
            for (const e of w) await e();
          })()),
        e)
      );
    }
    for (const t of l)
      await t.cacheDidUpdate.call(t, {
        cacheName: e,
        event: i,
        oldResponse: f,
        newResponse: h,
        request: o,
      });
  },
  U = R,
  j = async ({ request: e, fetchOptions: s, event: n, plugins: i = [] }) => {
    if (
      ('string' == typeof e && (e = new Request(e)), n instanceof FetchEvent && n.preloadResponse)
    ) {
      const e = await n.preloadResponse;
      if (e) return e;
    }
    const a = v(i, 'fetchDidFail'),
      c = a.length > 0 ? e.clone() : null;
    try {
      for (const t of i)
        if ('requestWillFetch' in t) {
          const s = t.requestWillFetch,
            i = e.clone();
          e = await s.call(t, { request: i, event: n });
        }
    } catch (e) {
      throw new t('plugin-error-request-will-fetch', { thrownError: e });
    }
    const r = e.clone();
    try {
      let t;
      t = 'navigate' === e.mode ? await fetch(e) : await fetch(e, s);
      for (const e of i)
        'fetchDidSucceed' in e &&
          (t = await e.fetchDidSucceed.call(e, { event: n, request: r, response: t }));
      return t;
    } catch (e) {
      for (const t of a)
        await t.fetchDidFail.call(t, {
          error: e,
          event: n,
          originalRequest: c.clone(),
          request: r.clone(),
        });
      throw e;
    }
  };
try {
  self['workbox:strategies:5.1.3'] && _();
} catch (e) {}
const L = {
  cacheWillUpdate: async ({ response: e }) => (200 === e.status || 0 === e.status ? e : null),
};
let N;
async function M(e, t) {
  const s = e.clone(),
    n = { headers: new Headers(s.headers), status: s.status, statusText: s.statusText },
    i = t ? t(n) : n,
    a = (function () {
      if (void 0 === N) {
        const e = new Response('');
        if ('body' in e)
          try {
            new Response(e.body), (N = !0);
          } catch (e) {
            N = !1;
          }
        N = !1;
      }
      return N;
    })()
      ? s.body
      : await s.blob();
  return new Response(a, i);
}
try {
  self['workbox:precaching:5.1.3'] && _();
} catch (e) {}
function T(e) {
  if (!e) throw new t('add-to-cache-list-unexpected-type', { entry: e });
  if ('string' == typeof e) {
    const t = new URL(e, location.href);
    return { cacheKey: t.href, url: t.href };
  }
  const { revision: s, url: n } = e;
  if (!n) throw new t('add-to-cache-list-unexpected-type', { entry: e });
  if (!s) {
    const e = new URL(n, location.href);
    return { cacheKey: e.href, url: e.href };
  }
  const i = new URL(n, location.href),
    a = new URL(n, location.href);
  return i.searchParams.set('__WB_REVISION__', s), { cacheKey: i.href, url: a.href };
}
class D {
  constructor(e) {
    (this.m = l(e)), (this.N = new Map()), (this.M = new Map()), (this.T = new Map());
  }
  addToCacheList(e) {
    const s = [];
    for (const n of e) {
      'string' == typeof n ? s.push(n) : n && void 0 === n.revision && s.push(n.url);
      const { cacheKey: e, url: i } = T(n),
        a = 'string' != typeof n && n.revision ? 'reload' : 'default';
      if (this.N.has(i) && this.N.get(i) !== e)
        throw new t('add-to-cache-list-conflicting-entries', {
          firstEntry: this.N.get(i),
          secondEntry: e,
        });
      if ('string' != typeof n && n.integrity) {
        if (this.T.has(e) && this.T.get(e) !== n.integrity)
          throw new t('add-to-cache-list-conflicting-integrities', { url: i });
        this.T.set(e, n.integrity);
      }
      if ((this.N.set(i, e), this.M.set(i, a), s.length > 0)) {
        const e = `Workbox is precaching URLs without revision info: ${s.join(
          ', ',
        )}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;
        console.warn(e);
      }
    }
  }
  async install({ event: e, plugins: t } = {}) {
    const s = [],
      n = [],
      i = await self.caches.open(this.m),
      a = await i.keys(),
      c = new Set(a.map(e => e.url));
    for (const [e, t] of this.N) c.has(t) ? n.push(e) : s.push({ cacheKey: t, url: e });
    const r = s.map(({ cacheKey: s, url: n }) => {
      const i = this.T.get(s),
        a = this.M.get(n);
      return this.D({ cacheKey: s, cacheMode: a, event: e, integrity: i, plugins: t, url: n });
    });
    await Promise.all(r);
    return { updatedURLs: s.map(e => e.url), notUpdatedURLs: n };
  }
  async activate() {
    const e = await self.caches.open(this.m),
      t = await e.keys(),
      s = new Set(this.N.values()),
      n = [];
    for (const i of t) s.has(i.url) || (await e.delete(i), n.push(i.url));
    return { deletedURLs: n };
  }
  async D({ cacheKey: e, url: s, cacheMode: n, event: i, plugins: a, integrity: c }) {
    const r = new Request(s, { integrity: c, cache: n, credentials: 'same-origin' });
    let o,
      h = await j({ event: i, plugins: a, request: r });
    for (const e of a || []) 'cacheWillUpdate' in e && (o = e);
    if (!(o ? await o.cacheWillUpdate({ event: i, request: r, response: h }) : h.status < 400))
      throw new t('bad-precaching-response', { url: s, status: h.status });
    h.redirected && (h = await M(h)),
      await x({
        event: i,
        plugins: a,
        response: h,
        request: e === s ? r : new Request(e),
        cacheName: this.m,
        matchOptions: { ignoreSearch: !0 },
      });
  }
  getURLsToCacheKeys() {
    return this.N;
  }
  getCachedURLs() {
    return [...this.N.keys()];
  }
  getCacheKeyForURL(e) {
    const t = new URL(e, location.href);
    return this.N.get(t.href);
  }
  async matchPrecache(e) {
    const t = e instanceof Request ? e.url : e,
      s = this.getCacheKeyForURL(t);
    if (s) {
      return (await self.caches.open(this.m)).match(s);
    }
  }
  createHandler(e = !0) {
    return async ({ request: s }) => {
      try {
        const e = await this.matchPrecache(s);
        if (e) return e;
        throw new t('missing-precache-entry', {
          cacheName: this.m,
          url: s instanceof Request ? s.url : s,
        });
      } catch (t) {
        if (e) return fetch(s);
        throw t;
      }
    };
  }
  createHandlerBoundToURL(e, s = !0) {
    if (!this.getCacheKeyForURL(e)) throw new t('non-precached-url', { url: e });
    const n = this.createHandler(s),
      i = new Request(e);
    return () => n({ request: i });
  }
}
let E;
const k = () => (E || (E = new D()), E);
const A = (e, t) => {
  const s = k().getURLsToCacheKeys();
  for (const n of (function* (
    e,
    { ignoreURLParametersMatching: t, directoryIndex: s, cleanURLs: n, urlManipulation: i } = {},
  ) {
    const a = new URL(e, location.href);
    (a.hash = ''), yield a.href;
    const c = (function (e, t = []) {
      for (const s of [...e.searchParams.keys()])
        t.some(e => e.test(s)) && e.searchParams.delete(s);
      return e;
    })(a, t);
    if ((yield c.href, s && c.pathname.endsWith('/'))) {
      const e = new URL(c.href);
      (e.pathname += s), yield e.href;
    }
    if (n) {
      const e = new URL(c.href);
      (e.pathname += '.html'), yield e.href;
    }
    if (i) {
      const e = i({ url: a });
      for (const t of e) yield t.href;
    }
  })(e, t)) {
    const e = s.get(n);
    if (e) return e;
  }
};
let K = !1;
function S(e) {
  K ||
    ((({
      ignoreURLParametersMatching: e = [/^utm_/],
      directoryIndex: t = 'index.html',
      cleanURLs: s = !0,
      urlManipulation: n,
    } = {}) => {
      const i = l();
      self.addEventListener('fetch', a => {
        const c = A(a.request.url, {
          cleanURLs: s,
          directoryIndex: t,
          ignoreURLParametersMatching: e,
          urlManipulation: n,
        });
        if (!c) return;
        let r = self.caches
          .open(i)
          .then(e => e.match(c))
          .then(e => e || fetch(c));
        a.respondWith(r);
      });
    })(e),
    (K = !0));
}
const O = [],
  P = {
    get: () => O,
    add(e) {
      O.push(...e);
    },
  },
  C = e => {
    const t = k(),
      s = P.get();
    e.waitUntil(
      t.install({ event: e, plugins: s }).catch(e => {
        throw e;
      }),
    );
  },
  I = e => {
    const t = k();
    e.waitUntil(t.activate());
  };
var J;
self.addEventListener('install', () => self.skipWaiting()),
  self.addEventListener('activate', () => self.clients.claim()),
  (J = {}),
  (function (e) {
    k().addToCacheList(e),
      e.length > 0 && (self.addEventListener('install', C), self.addEventListener('activate', I));
  })([
    {
      url: '_next/static/chunks/0b7b90cd.a6cd3275083a88cdbce4.js',
      revision: 'f44f012541c0e50094819fc617be3d9c',
    },
    {
      url: '_next/static/chunks/4c50bdfa2d6fe209cdeae72094bacf8218fb0db4.890d6df2fb53bb19c15d.js',
      revision: '39efe03537923b36f8cf40d88a84dcf9',
    },
    {
      url: '_next/static/chunks/5a98465b935f1b6f1e3cceb9fb59fe72a842395d.966d61492e1e85f981a5.js',
      revision: 'd0a491ef7a54f0bdfb0bcf5ebd0322de',
    },
    {
      url: '_next/static/chunks/8804ed50.58471afdb7a4755dfa0b.js',
      revision: '82a5f5b23ef261ea7bd105e0607e0960',
    },
    {
      url: '_next/static/chunks/commons.d7c3b0b588519a960fa6.js',
      revision: '9f606518cd624cce65db2d34e830515a',
    },
    {
      url: '_next/static/chunks/framework.51e69057467e353a84af.js',
      revision: '6a42b1a4a639694bd706b85fedadfe6b',
    },
    {
      url: '_next/static/chunks/styles.60d57a4c901ce8c9bd99.js',
      revision: '0c13c6a4d3c09efe79c8a87471445218',
    },
    {
      url: '_next/static/css/8804ed50.fe07a263.chunk.css',
      revision: '476773ffddd8fad867e411c49a0f3ef4',
    },
    {
      url: '_next/static/css/styles.120b88b9.chunk.css',
      revision: 'a03b6c21c022d626f763b8852d3f9822',
    },
    {
      url: '_next/static/runtime/main-a8fc49a3b524825bb5dd.js',
      revision: '8f5f38c84282f9592ab8e9252494a19a',
    },
    {
      url: '_next/static/runtime/polyfills-c2b15f9efd069913aaa4.js',
      revision: '5e45f62dfdac2f6f11e0705b32b80ac6',
    },
    {
      url: '_next/static/runtime/webpack-6ef28db84b4c42ad34e9.js',
      revision: '40b4095b5b68a142c856f388ccb756f2',
    },
    {
      url: '_next/static/wsDAJMNcjS0enb7gTXZjp/_buildManifest.js',
      revision: '444a517ea2a1aecd7d43d4fefd6a7173',
    },
    {
      url: '_next/static/wsDAJMNcjS0enb7gTXZjp/_ssgManifest.js',
      revision: 'abee47769bf307639ace4945f9cfd4ff',
    },
    {
      url: '_next/static/wsDAJMNcjS0enb7gTXZjp/pages/_app.js',
      revision: '94dfa424595056520b6800cef79af93a',
    },
    {
      url: '_next/static/wsDAJMNcjS0enb7gTXZjp/pages/_error.js',
      revision: 'd426fb2b5a98031ab594d0ca8c9c20f3',
    },
    {
      url: '_next/static/wsDAJMNcjS0enb7gTXZjp/pages/home.js',
      revision: '278f6a29cd0eb0391a6efe4b5bc9422d',
    },
    {
      url: '_next/static/wsDAJMNcjS0enb7gTXZjp/pages/index.js',
      revision: '8c6740d0dceda3e7eaae0bf46e870596',
    },
    {
      url: '_next/static/wsDAJMNcjS0enb7gTXZjp/pages/map.js',
      revision: '79fc79d4ba796c4ebe18d5e897bcb27e',
    },
  ]),
  S(J),
  (function (e, s, a) {
    let c;
    if ('string' == typeof e) {
      const t = new URL(e, location.href);
      c = new n(({ url: e }) => e.href === t.href, s, a);
    } else if (e instanceof RegExp) c = new i(e, s, a);
    else if ('function' == typeof e) c = new n(e, s, a);
    else {
      if (!(e instanceof n))
        throw new t('unsupported-route-type', {
          moduleName: 'workbox-routing',
          funcName: 'registerRoute',
          paramName: 'capture',
        });
      c = e;
    }
    o().registerRoute(c);
  })(
    /^https?.*/,
    new (class {
      constructor(e = {}) {
        if (((this.m = f(e.cacheName)), e.plugins)) {
          const t = e.plugins.some(e => !!e.cacheWillUpdate);
          this.k = t ? e.plugins : [L, ...e.plugins];
        } else this.k = [L];
        (this.A = e.networkTimeoutSeconds || 0),
          (this.K = e.fetchOptions),
          (this.S = e.matchOptions);
      }
      async handle({ event: e, request: s }) {
        const n = [];
        'string' == typeof s && (s = new Request(s));
        const i = [];
        let a;
        if (this.A) {
          const { id: t, promise: c } = this.O({ request: s, event: e, logs: n });
          (a = t), i.push(c);
        }
        const c = this.P({ timeoutId: a, request: s, event: e, logs: n });
        i.push(c);
        let r = await Promise.race(i);
        if ((r || (r = await c), !r)) throw new t('no-response', { url: s.url });
        return r;
      }
      O({ request: e, logs: t, event: s }) {
        let n;
        return {
          promise: new Promise(t => {
            n = setTimeout(async () => {
              t(await this.C({ request: e, event: s }));
            }, 1e3 * this.A);
          }),
          id: n,
        };
      }
      async P({ timeoutId: e, request: t, logs: s, event: n }) {
        let i, a;
        try {
          a = await j({ request: t, event: n, fetchOptions: this.K, plugins: this.k });
        } catch (e) {
          i = e;
        }
        if ((e && clearTimeout(e), i || !a)) a = await this.C({ request: t, event: n });
        else {
          const e = a.clone(),
            s = x({ cacheName: this.m, request: t, response: e, event: n, plugins: this.k });
          if (n)
            try {
              n.waitUntil(s);
            } catch (e) {}
        }
        return a;
      }
      C({ event: e, request: t }) {
        return U({
          cacheName: this.m,
          request: t,
          event: e,
          matchOptions: this.S,
          plugins: this.k,
        });
      }
    })({
      cacheName: 'offlineCache',
      plugins: [
        new (class {
          constructor(e = {}) {
            var t;
            (this.cachedResponseWillBeUsed = async ({
              event: e,
              request: t,
              cacheName: s,
              cachedResponse: n,
            }) => {
              if (!n) return null;
              const i = this.I(n),
                a = this.J(s);
              d(a.expireEntries());
              const c = a.updateTimestamp(t.url);
              if (e)
                try {
                  e.waitUntil(c);
                } catch (e) {}
              return i ? n : null;
            }),
              (this.cacheDidUpdate = async ({ cacheName: e, request: t }) => {
                const s = this.J(e);
                await s.updateTimestamp(t.url), await s.expireEntries();
              }),
              (this.W = e),
              (this.j = e.maxAgeSeconds),
              (this.B = new Map()),
              e.purgeOnQuotaError && ((t = () => this.deleteCacheAndMetadata()), w.add(t));
          }
          J(e) {
            if (e === f()) throw new t('expire-custom-caches-only');
            let s = this.B.get(e);
            return s || ((s = new b(e, this.W)), this.B.set(e, s)), s;
          }
          I(e) {
            if (!this.j) return !0;
            const t = this.F(e);
            if (null === t) return !0;
            return t >= Date.now() - 1e3 * this.j;
          }
          F(e) {
            if (!e.headers.has('date')) return null;
            const t = e.headers.get('date'),
              s = new Date(t).getTime();
            return isNaN(s) ? null : s;
          }
          async deleteCacheAndMetadata() {
            for (const [e, t] of this.B) await self.caches.delete(e), await t.delete();
            this.B = new Map();
          }
        })({ maxEntries: 200, purgeOnQuotaError: !0 }),
      ],
    }),
    'GET',
  );
