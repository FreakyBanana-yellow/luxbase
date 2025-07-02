import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import 'html-escaper';
import 'clsx';
import { N as NOOP_MIDDLEWARE_HEADER, f as decodeKey } from './chunks/astro/server_DDPzIoUP.mjs';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Anwender/Downloads/luxbase-starter/","adapterName":"","routes":[{"file":"file:///C:/Users/Anwender/Downloads/luxbase-starter/dist/cpplattform/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/cpplattform","isIndex":false,"type":"page","pattern":"^\\/cpplattform\\/?$","segments":[[{"content":"cpplattform","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cpplattform.astro","pathname":"/cpplattform","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/Anwender/Downloads/luxbase-starter/dist/dashboard/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/dashboard","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard.astro","pathname":"/dashboard","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/Anwender/Downloads/luxbase-starter/dist/dashboard-agentur/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/dashboard-agentur","isIndex":false,"type":"page","pattern":"^\\/dashboard-agentur\\/?$","segments":[[{"content":"dashboard-agentur","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard-agentur.astro","pathname":"/dashboard-agentur","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/Anwender/Downloads/luxbase-starter/dist/dashboard-model/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/dashboard-model","isIndex":false,"type":"page","pattern":"^\\/dashboard-model\\/?$","segments":[[{"content":"dashboard-model","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard-model.astro","pathname":"/dashboard-model","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/Anwender/Downloads/luxbase-starter/dist/kontakt/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/kontakt","isIndex":false,"type":"page","pattern":"^\\/kontakt\\/?$","segments":[[{"content":"kontakt","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/kontakt.astro","pathname":"/kontakt","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/Anwender/Downloads/luxbase-starter/dist/preise/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/preise","isIndex":false,"type":"page","pattern":"^\\/preise\\/?$","segments":[[{"content":"preise","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/preise.astro","pathname":"/preise","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/Anwender/Downloads/luxbase-starter/dist/register/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/register","isIndex":false,"type":"page","pattern":"^\\/register\\/?$","segments":[[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/register.astro","pathname":"/register","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/Anwender/Downloads/luxbase-starter/dist/vault/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/vault","isIndex":false,"type":"page","pattern":"^\\/vault\\/?$","segments":[[{"content":"vault","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/vault.astro","pathname":"/vault","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/Anwender/Downloads/luxbase-starter/dist/vipbot/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/vipbot","isIndex":false,"type":"page","pattern":"^\\/vipbot\\/?$","segments":[[{"content":"vipbot","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/vipbot.astro","pathname":"/vipbot","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/Anwender/Downloads/luxbase-starter/dist/weare/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/weare","isIndex":false,"type":"page","pattern":"^\\/weare\\/?$","segments":[[{"content":"weare","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/weare.astro","pathname":"/weare","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/Anwender/Downloads/luxbase-starter/dist/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Anwender/Downloads/luxbase-starter/src/pages/dashboard-agentur.astro",{"propagation":"none","containsHead":true}],["C:/Users/Anwender/Downloads/luxbase-starter/src/pages/dashboard-model.astro",{"propagation":"none","containsHead":true}],["C:/Users/Anwender/Downloads/luxbase-starter/src/pages/cpplattform.astro",{"propagation":"none","containsHead":true}],["C:/Users/Anwender/Downloads/luxbase-starter/src/pages/dashboard.astro",{"propagation":"none","containsHead":true}],["C:/Users/Anwender/Downloads/luxbase-starter/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Anwender/Downloads/luxbase-starter/src/pages/kontakt.astro",{"propagation":"none","containsHead":true}],["C:/Users/Anwender/Downloads/luxbase-starter/src/pages/preise.astro",{"propagation":"none","containsHead":true}],["C:/Users/Anwender/Downloads/luxbase-starter/src/pages/register.astro",{"propagation":"none","containsHead":true}],["C:/Users/Anwender/Downloads/luxbase-starter/src/pages/vault.astro",{"propagation":"none","containsHead":true}],["C:/Users/Anwender/Downloads/luxbase-starter/src/pages/vipbot.astro",{"propagation":"none","containsHead":true}],["C:/Users/Anwender/Downloads/luxbase-starter/src/pages/weare.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/cpplattform@_@astro":"pages/cpplattform.astro.mjs","\u0000@astro-page:src/pages/dashboard@_@astro":"pages/dashboard.astro.mjs","\u0000@astro-page:src/pages/dashboard-agentur@_@astro":"pages/dashboard-agentur.astro.mjs","\u0000@astro-page:src/pages/dashboard-model@_@astro":"pages/dashboard-model.astro.mjs","\u0000@astro-page:src/pages/kontakt@_@astro":"pages/kontakt.astro.mjs","\u0000@astro-page:src/pages/preise@_@astro":"pages/preise.astro.mjs","\u0000@astro-page:src/pages/register@_@astro":"pages/register.astro.mjs","\u0000@astro-page:src/pages/vault@_@astro":"pages/vault.astro.mjs","\u0000@astro-page:src/pages/vipbot@_@astro":"pages/vipbot.astro.mjs","\u0000@astro-page:src/pages/weare@_@astro":"pages/weare.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-manifest":"manifest_BCkYkcSU.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.GiEidQoV.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/file:///C:/Users/Anwender/Downloads/luxbase-starter/dist/cpplattform/index.html","/file:///C:/Users/Anwender/Downloads/luxbase-starter/dist/dashboard/index.html","/file:///C:/Users/Anwender/Downloads/luxbase-starter/dist/dashboard-agentur/index.html","/file:///C:/Users/Anwender/Downloads/luxbase-starter/dist/dashboard-model/index.html","/file:///C:/Users/Anwender/Downloads/luxbase-starter/dist/kontakt/index.html","/file:///C:/Users/Anwender/Downloads/luxbase-starter/dist/preise/index.html","/file:///C:/Users/Anwender/Downloads/luxbase-starter/dist/register/index.html","/file:///C:/Users/Anwender/Downloads/luxbase-starter/dist/vault/index.html","/file:///C:/Users/Anwender/Downloads/luxbase-starter/dist/vipbot/index.html","/file:///C:/Users/Anwender/Downloads/luxbase-starter/dist/weare/index.html","/file:///C:/Users/Anwender/Downloads/luxbase-starter/dist/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"3Kgdbs5LbSVdMofh4irYvld9T+iFhfbgvSZM0OFmFF4=","experimentalEnvGetSecretEnabled":false});

export { manifest };
