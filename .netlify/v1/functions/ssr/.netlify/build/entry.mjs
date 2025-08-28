import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_Cz7Oj1q_.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/admin/aktivität.astro.mjs');
const _page3 = () => import('./pages/admin/botlinks.astro.mjs');
const _page4 = () => import('./pages/admin/einstellungen.astro.mjs');
const _page5 = () => import('./pages/admin/mail.astro.mjs');
const _page6 = () => import('./pages/admin/notizen.astro.mjs');
const _page7 = () => import('./pages/admin/pakete.astro.mjs');
const _page8 = () => import('./pages/admin/stats.astro.mjs');
const _page9 = () => import('./pages/admin.astro.mjs');
const _page10 = () => import('./pages/agency/join.astro.mjs');
const _page11 = () => import('./pages/agency/_agencyid_/models/_creatorid_.astro.mjs');
const _page12 = () => import('./pages/agency/_agencyid_/models.astro.mjs');
const _page13 = () => import('./pages/agency.astro.mjs');
const _page14 = () => import('./pages/api/profile/get.astro.mjs');
const _page15 = () => import('./pages/api/profile/update.astro.mjs');
const _page16 = () => import('./pages/app/profile.astro.mjs');
const _page17 = () => import('./pages/cpplattform.astro.mjs');
const _page18 = () => import('./pages/dashboard/vipbot-einstellungen.astro.mjs');
const _page19 = () => import('./pages/dashboard.astro.mjs');
const _page20 = () => import('./pages/dashboard-agentur.astro.mjs');
const _page21 = () => import('./pages/dashboard-model.astro.mjs');
const _page22 = () => import('./pages/kontakt.astro.mjs');
const _page23 = () => import('./pages/preise.astro.mjs');
const _page24 = () => import('./pages/register.astro.mjs');
const _page25 = () => import('./pages/vault.astro.mjs');
const _page26 = () => import('./pages/vipbot.astro.mjs');
const _page27 = () => import('./pages/weare.astro.mjs');
const _page28 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/admin/aktivität.astro", _page2],
    ["src/pages/admin/botlinks.astro", _page3],
    ["src/pages/admin/einstellungen.astro", _page4],
    ["src/pages/admin/mail.astro", _page5],
    ["src/pages/admin/notizen.astro", _page6],
    ["src/pages/admin/pakete/index.astro", _page7],
    ["src/pages/admin/stats.astro", _page8],
    ["src/pages/admin/index.astro", _page9],
    ["src/pages/agency/join.astro", _page10],
    ["src/pages/agency/[agencyId]/models/[creatorId].astro", _page11],
    ["src/pages/agency/[agencyId]/models.astro", _page12],
    ["src/pages/agency/index.astro", _page13],
    ["src/pages/api/profile/get.ts", _page14],
    ["src/pages/api/profile/update.ts", _page15],
    ["src/pages/app/profile.astro", _page16],
    ["src/pages/cpplattform.astro", _page17],
    ["src/pages/dashboard/vipbot-einstellungen.astro", _page18],
    ["src/pages/dashboard/index.astro", _page19],
    ["src/pages/dashboard-agentur.astro", _page20],
    ["src/pages/dashboard-model.astro", _page21],
    ["src/pages/kontakt.astro", _page22],
    ["src/pages/preise.astro", _page23],
    ["src/pages/register.astro", _page24],
    ["src/pages/vault.astro", _page25],
    ["src/pages/vipbot.astro", _page26],
    ["src/pages/weare.astro", _page27],
    ["src/pages/index.astro", _page28]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "ce364ea2-0e46-41f2-b945-0c23051408d6"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
