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
class r {
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
      r = i && i.handler;
    if ((!r && this.s && (r = this.s), r)) {
      try {
        a = r.handle({ url: s, request: e, event: t, params: n });
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
let c;
const o = () => (c || ((c = new r()), c.addFetchListener(), c.addCacheListener()), c);
const u = {
    googleAnalytics: 'googleAnalytics',
    precache: 'precache-v2',
    prefix: 'workbox',
    runtime: 'runtime',
    suffix: 'undefined' != typeof registration ? registration.scope : '',
  },
  h = e => [u.prefix, e, u.suffix].filter(e => e && e.length > 0).join('-'),
  l = e => e || h(u.precache),
  f = e => e || h(u.runtime);
function d(e) {
  e.then(() => {});
}
const w = new Set();
class p {
  constructor(e, t, { onupgradeneeded: s, onversionchange: n } = {}) {
    (this.o = null), (this.u = e), (this.h = t), (this.l = s), (this.p = n || (() => this.close()));
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
          const n = indexedDB.open(this.u, this.h);
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
    return await this.transaction([e], 'readonly', (r, c) => {
      const o = r.objectStore(e),
        u = t ? o.index(t) : o,
        h = [],
        l = u.openCursor(s, n);
      l.onsuccess = () => {
        const e = l.result;
        e ? (h.push(a ? e : e.value), i && h.length >= i ? c(h) : e.continue()) : c(h);
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
        r = a[e].apply(a, n);
      r.onsuccess = () => i(r.result);
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
        let r = 0;
        i.onsuccess = () => {
          const s = i.result;
          if (s) {
            const n = s.value;
            n.cacheName === this.m &&
              ((e && n.timestamp < e) || (t && r >= t) ? a.push(s.value) : r++),
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
      (this.L = t.maxAgeSeconds),
      (this.m = e),
      (this.M = new m(e));
  }
  async expireEntries() {
    if (this.R) return void (this._ = !0);
    this.R = !0;
    const e = this.L ? Date.now() - 1e3 * this.L : 0,
      t = await this.M.expireEntries(e, this.U),
      s = await self.caches.open(this.m);
    for (const e of t) await s.delete(e);
    (this.R = !1), this._ && ((this._ = !1), d(this.expireEntries()));
  }
  async updateTimestamp(e) {
    await this.M.setTimestamp(e, Date.now());
  }
  async isURLExpired(e) {
    if (this.L) {
      return (await this.M.getTimestamp(e)) < Date.now() - 1e3 * this.L;
    }
    return !1;
  }
  async delete() {
    (this._ = !1), await this.M.expireEntries(1 / 0);
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
  x = async ({ cacheName: e, request: t, event: s, matchOptions: n, plugins: i = [] }) => {
    const a = await self.caches.open(e),
      r = await q({ plugins: i, request: t, mode: 'read' });
    let c = await a.match(r, n);
    for (const t of i)
      if ('cachedResponseWillBeUsed' in t) {
        const i = t.cachedResponseWillBeUsed;
        c = await i.call(t, {
          cacheName: e,
          event: s,
          matchOptions: n,
          cachedResponse: c,
          request: r,
        });
      }
    return c;
  },
  R = async ({
    cacheName: e,
    request: s,
    response: n,
    event: i,
    plugins: r = [],
    matchOptions: c,
  }) => {
    const o = await q({ plugins: r, request: s, mode: 'write' });
    if (!n) throw new t('cache-put-with-no-response', { url: a(o.url) });
    const u = await (async ({ request: e, response: t, event: s, plugins: n = [] }) => {
      let i = t,
        a = !1;
      for (const t of n)
        if ('cacheWillUpdate' in t) {
          a = !0;
          const n = t.cacheWillUpdate;
          if (((i = await n.call(t, { request: e, response: i, event: s })), !i)) break;
        }
      return a || (i = i && 200 === i.status ? i : void 0), i || null;
    })({ event: i, plugins: r, response: n, request: o });
    if (!u) return;
    const h = await self.caches.open(e),
      l = v(r, 'cacheDidUpdate'),
      f = l.length > 0 ? await x({ cacheName: e, matchOptions: c, request: o }) : null;
    try {
      await h.put(o, u);
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
        newResponse: u,
        request: o,
      });
  },
  U = x,
  L = async ({ request: e, fetchOptions: s, event: n, plugins: i = [] }) => {
    if (
      ('string' == typeof e && (e = new Request(e)), n instanceof FetchEvent && n.preloadResponse)
    ) {
      const e = await n.preloadResponse;
      if (e) return e;
    }
    const a = v(i, 'fetchDidFail'),
      r = a.length > 0 ? e.clone() : null;
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
    const c = e.clone();
    try {
      let t;
      t = 'navigate' === e.mode ? await fetch(e) : await fetch(e, s);
      for (const e of i)
        'fetchDidSucceed' in e &&
          (t = await e.fetchDidSucceed.call(e, { event: n, request: c, response: t }));
      return t;
    } catch (e) {
      for (const t of a)
        await t.fetchDidFail.call(t, {
          error: e,
          event: n,
          originalRequest: r.clone(),
          request: c.clone(),
        });
      throw e;
    }
  };
try {
  self['workbox:strategies:5.1.3'] && _();
} catch (e) {}
const M = {
  cacheWillUpdate: async ({ response: e }) => (200 === e.status || 0 === e.status ? e : null),
};
let j;
async function C(e, t) {
  const s = e.clone(),
    n = { headers: new Headers(s.headers), status: s.status, statusText: s.statusText },
    i = t ? t(n) : n,
    a = (function () {
      if (void 0 === j) {
        const e = new Response('');
        if ('body' in e)
          try {
            new Response(e.body), (j = !0);
          } catch (e) {
            j = !1;
          }
        j = !1;
      }
      return j;
    })()
      ? s.body
      : await s.blob();
  return new Response(a, i);
}
try {
  self['workbox:precaching:5.1.3'] && _();
} catch (e) {}
function k(e) {
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
class N {
  constructor(e) {
    (this.m = l(e)), (this.j = new Map()), (this.C = new Map()), (this.k = new Map());
  }
  addToCacheList(e) {
    const s = [];
    for (const n of e) {
      'string' == typeof n ? s.push(n) : n && void 0 === n.revision && s.push(n.url);
      const { cacheKey: e, url: i } = k(n),
        a = 'string' != typeof n && n.revision ? 'reload' : 'default';
      if (this.j.has(i) && this.j.get(i) !== e)
        throw new t('add-to-cache-list-conflicting-entries', {
          firstEntry: this.j.get(i),
          secondEntry: e,
        });
      if ('string' != typeof n && n.integrity) {
        if (this.k.has(e) && this.k.get(e) !== n.integrity)
          throw new t('add-to-cache-list-conflicting-integrities', { url: i });
        this.k.set(e, n.integrity);
      }
      if ((this.j.set(i, e), this.C.set(i, a), s.length > 0)) {
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
      r = new Set(a.map(e => e.url));
    for (const [e, t] of this.j) r.has(t) ? n.push(e) : s.push({ cacheKey: t, url: e });
    const c = s.map(({ cacheKey: s, url: n }) => {
      const i = this.k.get(s),
        a = this.C.get(n);
      return this.N({ cacheKey: s, cacheMode: a, event: e, integrity: i, plugins: t, url: n });
    });
    await Promise.all(c);
    return { updatedURLs: s.map(e => e.url), notUpdatedURLs: n };
  }
  async activate() {
    const e = await self.caches.open(this.m),
      t = await e.keys(),
      s = new Set(this.j.values()),
      n = [];
    for (const i of t) s.has(i.url) || (await e.delete(i), n.push(i.url));
    return { deletedURLs: n };
  }
  async N({ cacheKey: e, url: s, cacheMode: n, event: i, plugins: a, integrity: r }) {
    const c = new Request(s, { integrity: r, cache: n, credentials: 'same-origin' });
    let o,
      u = await L({ event: i, plugins: a, request: c });
    for (const e of a || []) 'cacheWillUpdate' in e && (o = e);
    if (!(o ? await o.cacheWillUpdate({ event: i, request: c, response: u }) : u.status < 400))
      throw new t('bad-precaching-response', { url: s, status: u.status });
    u.redirected && (u = await C(u)),
      await R({
        event: i,
        plugins: a,
        response: u,
        request: e === s ? c : new Request(e),
        cacheName: this.m,
        matchOptions: { ignoreSearch: !0 },
      });
  }
  getURLsToCacheKeys() {
    return this.j;
  }
  getCachedURLs() {
    return [...this.j.keys()];
  }
  getCacheKeyForURL(e) {
    const t = new URL(e, location.href);
    return this.j.get(t.href);
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
const V = () => (E || (E = new N()), E);
const T = (e, t) => {
  const s = V().getURLsToCacheKeys();
  for (const n of (function* (
    e,
    { ignoreURLParametersMatching: t, directoryIndex: s, cleanURLs: n, urlManipulation: i } = {},
  ) {
    const a = new URL(e, location.href);
    (a.hash = ''), yield a.href;
    const r = (function (e, t = []) {
      for (const s of [...e.searchParams.keys()])
        t.some(e => e.test(s)) && e.searchParams.delete(s);
      return e;
    })(a, t);
    if ((yield r.href, s && r.pathname.endsWith('/'))) {
      const e = new URL(r.href);
      (e.pathname += s), yield e.href;
    }
    if (n) {
      const e = new URL(r.href);
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
function A(e) {
  K ||
    ((({
      ignoreURLParametersMatching: e = [/^utm_/],
      directoryIndex: t = 'index.html',
      cleanURLs: s = !0,
      urlManipulation: n,
    } = {}) => {
      const i = l();
      self.addEventListener('fetch', a => {
        const r = T(a.request.url, {
          cleanURLs: s,
          directoryIndex: t,
          ignoreURLParametersMatching: e,
          urlManipulation: n,
        });
        if (!r) return;
        let c = self.caches
          .open(i)
          .then(e => e.match(r))
          .then(e => e || fetch(r));
        a.respondWith(c);
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
  D = e => {
    const t = V(),
      s = P.get();
    e.waitUntil(
      t.install({ event: e, plugins: s }).catch(e => {
        throw e;
      }),
    );
  },
  W = e => {
    const t = V();
    e.waitUntil(t.activate());
  };
var S;
self.addEventListener('install', () => self.skipWaiting()),
  self.addEventListener('activate', () => self.clients.claim()),
  (S = {}),
  (function (e) {
    V().addToCacheList(e),
      e.length > 0 && (self.addEventListener('install', D), self.addEventListener('activate', W));
  })([
    {
      url: '_next/static/chunks/13b9e2a62c6e24352119ab1a6ed9ae147dfe046b.5a2c7d173e9e50a5e066.js',
      revision: '122d8a0229b13844e1bbe25f3367d9f3',
    },
    {
      url: '_next/static/chunks/8804ed50.4c419f4b16a96bca7647.js',
      revision: '0f76c6f3cca30e5b890b037c53cdecd9',
    },
    {
      url: '_next/static/chunks/commons.d7c3b0b588519a960fa6.js',
      revision: '9f606518cd624cce65db2d34e830515a',
    },
    {
      url: '_next/static/chunks/d62db05fd2b2541a259f9e4a4cf13358d02cc354.b556e70eae6227219f97.js',
      revision: 'a3e803f1522aa13f30f8e4b325fcd8ff',
    },
    {
      url: '_next/static/chunks/framework.51e69057467e353a84af.js',
      revision: '6a42b1a4a639694bd706b85fedadfe6b',
    },
    {
      url: '_next/static/chunks/styles.65d64fcf9d5928d8b969.js',
      revision: '1b5e3dc40cd80c877df86a76e0a74574',
    },
    {
      url: '_next/static/css/8804ed50.fe07a263.chunk.css',
      revision: '476773ffddd8fad867e411c49a0f3ef4',
    },
    {
      url: '_next/static/runtime/main-373464353e796038973d.js',
      revision: 'b54b0c05f82ed249a41227c492389dae',
    },
    {
      url: '_next/static/runtime/polyfills-be6c50bbb59826a92254.js',
      revision: '0892423ed8589c19acf7365479db3e91',
    },
    {
      url: '_next/static/runtime/webpack-6ef28db84b4c42ad34e9.js',
      revision: '40b4095b5b68a142c856f388ccb756f2',
    },
    {
      url: '_next/static/x_bmXWVxUVukujCViMAMC/_buildManifest.js',
      revision: '9e246291fd7d223a8e32ca2af91d1c98',
    },
    {
      url: '_next/static/x_bmXWVxUVukujCViMAMC/_ssgManifest.js',
      revision: 'abee47769bf307639ace4945f9cfd4ff',
    },
    {
      url: '_next/static/x_bmXWVxUVukujCViMAMC/pages/_app.js',
      revision: '608979fd80e912bd05de10e8334be615',
    },
    {
      url: '_next/static/x_bmXWVxUVukujCViMAMC/pages/_error.js',
      revision: 'c8513510a427404b5c30a842a791d452',
    },
    {
      url: '_next/static/x_bmXWVxUVukujCViMAMC/pages/home.js',
      revision: 'f73f278dc392cec63e67a5b3b6eacd80',
    },
    {
      url: '_next/static/x_bmXWVxUVukujCViMAMC/pages/index.js',
      revision: 'd533dec7c540ff442ba18995d502bda8',
    },
  ]),
  A(S),
  (function (e, s, a) {
    let r;
    if ('string' == typeof e) {
      const t = new URL(e, location.href);
      r = new n(({ url: e }) => e.href === t.href, s, a);
    } else if (e instanceof RegExp) r = new i(e, s, a);
    else if ('function' == typeof e) r = new n(e, s, a);
    else {
      if (!(e instanceof n))
        throw new t('unsupported-route-type', {
          moduleName: 'workbox-routing',
          funcName: 'registerRoute',
          paramName: 'capture',
        });
      r = e;
    }
    o().registerRoute(r);
  })(
    /^https?.*/,
    new (class {
      constructor(e = {}) {
        if (((this.m = f(e.cacheName)), e.plugins)) {
          const t = e.plugins.some(e => !!e.cacheWillUpdate);
          this.V = t ? e.plugins : [M, ...e.plugins];
        } else this.V = [M];
        (this.T = e.networkTimeoutSeconds || 0),
          (this.K = e.fetchOptions),
          (this.A = e.matchOptions);
      }
      async handle({ event: e, request: s }) {
        const n = [];
        'string' == typeof s && (s = new Request(s));
        const i = [];
        let a;
        if (this.T) {
          const { id: t, promise: r } = this.O({ request: s, event: e, logs: n });
          (a = t), i.push(r);
        }
        const r = this.P({ timeoutId: a, request: s, event: e, logs: n });
        i.push(r);
        let c = await Promise.race(i);
        if ((c || (c = await r), !c)) throw new t('no-response', { url: s.url });
        return c;
      }
      O({ request: e, logs: t, event: s }) {
        let n;
        return {
          promise: new Promise(t => {
            n = setTimeout(async () => {
              t(await this.D({ request: e, event: s }));
            }, 1e3 * this.T);
          }),
          id: n,
        };
      }
      async P({ timeoutId: e, request: t, logs: s, event: n }) {
        let i, a;
        try {
          a = await L({ request: t, event: n, fetchOptions: this.K, plugins: this.V });
        } catch (e) {
          i = e;
        }
        if ((e && clearTimeout(e), i || !a)) a = await this.D({ request: t, event: n });
        else {
          const e = a.clone(),
            s = R({ cacheName: this.m, request: t, response: e, event: n, plugins: this.V });
          if (n)
            try {
              n.waitUntil(s);
            } catch (e) {}
        }
        return a;
      }
      D({ event: e, request: t }) {
        return U({
          cacheName: this.m,
          request: t,
          event: e,
          matchOptions: this.A,
          plugins: this.V,
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
              const i = this.W(n),
                a = this.S(s);
              d(a.expireEntries());
              const r = a.updateTimestamp(t.url);
              if (e)
                try {
                  e.waitUntil(r);
                } catch (e) {}
              return i ? n : null;
            }),
              (this.cacheDidUpdate = async ({ cacheName: e, request: t }) => {
                const s = this.S(e);
                await s.updateTimestamp(t.url), await s.expireEntries();
              }),
              (this.I = e),
              (this.L = e.maxAgeSeconds),
              (this.B = new Map()),
              e.purgeOnQuotaError && ((t = () => this.deleteCacheAndMetadata()), w.add(t));
          }
          S(e) {
            if (e === f()) throw new t('expire-custom-caches-only');
            let s = this.B.get(e);
            return s || ((s = new b(e, this.I)), this.B.set(e, s)), s;
          }
          W(e) {
            if (!this.L) return !0;
            const t = this.F(e);
            if (null === t) return !0;
            return t >= Date.now() - 1e3 * this.L;
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
