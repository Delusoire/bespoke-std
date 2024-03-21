import { capitalize } from "../../deps.js";
import { findBy } from "/hooks/util.js";
// ! Clean this file
const exposeReactComponents = ({ require, chunks, modules, exports, exportedFunctions, exportedMemos, exportedForwardRefs }, React, Platform)=>{
    const exportedFCs = exportedFunctions;
    const Menus = Object.fromEntries(exportedMemos.flatMap((m)=>{
        const str = m.type.toString();
        const match = str.match(/value:"([\w-]+)"/);
        const name = match?.[1] ?? "";
        const type = {
            album: "Album",
            show: "PodcastShow",
            artist: "Artist",
            track: "Track"
        }[name];
        return type ? [
            [
                type,
                m
            ]
        ] : [];
    }));
    const Cards = Object.assign({
        Default: findBy('"card-click-handler"')(exportedFCs),
        Hero: findBy('"herocard-click-handler"')(exportedFCs),
        CardImage: findBy("isHero", "withWaves")(exportedFCs)
    }, Object.fromEntries(exports.flatMap((m)=>{
        try {
            const str = m.toString();
            const match = str.match(/featureIdentifier:"(.+?)"/);
            if (!match) return [];
            const name = match[1];
            return [
                [
                    capitalize(name),
                    m
                ]
            ];
        } catch (e) {
            return [];
        }
    }).concat([
        [
            "Profile",
            exportedMemos.find((m)=>m.type.toString().includes(`featureIdentifier:"profile"`))
        ]
    ])));
    const [ContextMenuModuleID] = chunks.find(([_, v])=>v.toString().includes("toggleContextMenu"));
    const [playlistMenuChunkID] = chunks.find(([, v])=>v.toString().includes('value:"playlist"') && v.toString().includes("canView") && v.toString().includes("permissions"));
    const RemoteConfigProviderComponent = findBy("resolveSuspense", "configuration")(exportedFCs);
    const Slider = exportedFCs.find((m)=>m.toString().includes("onStepBackward") && !m.toString().includes("volume"));
    const exportedMemoFRefs = exportedMemos.filter((m)=>m.type.$$typeof === Symbol.for("react.forward_ref"));
    const Nav = exportedMemoFRefs.find((m)=>m.type.render.toString().includes("navigationalRoot"));
    const NavTo = exportedMemoFRefs.find((m)=>m.type.render.toString().includes("pageId"));
    const { InstrumentedRedirect } = modules.find((e)=>e.InstrumentedRedirect);
    return {
        SnackbarProvider: findBy("enqueueSnackbar called with invalid argument")(exportedFunctions),
        SettingColumn: findBy("setSectionFilterMatchQueryValue", "filterMatchQuery")(exportedFCs),
        SettingText: findBy("textSubdued", "dangerouslySetInnerHTML")(exportedFCs),
        SettingToggle: findBy("condensed", "onSelected")(exportedFCs),
        IconComponent: findBy("$iconColor", 'role:"img"')(exportedFCs),
        Text: exportedForwardRefs.find((m)=>m.render.toString().includes("paddingBottom") && m.render.toString().includes("className")),
        TextComponent: exports.find((m)=>m.h1 && m.render),
        ContextMenu: Object.values(require(ContextMenuModuleID))[0],
        RightClickMenu: findBy("action", "open", "trigger", "right-click")(exportedFCs),
        ConfirmDialog: findBy("isOpen", "shouldCloseOnEsc", "onClose")(exportedFCs),
        Tooltip: findBy("hover-or-focus", "tooltip")(exportedFCs),
        Menu: findBy("getInitialFocusElement", "children")(exportedFCs),
        MenuItem: findBy("handleMouseEnter", "onClick")(exportedFCs),
        MenuItemSubMenu: findBy("subMenuIcon")(exportedFCs),
        Slider,
        Nav,
        NavTo,
        RemoteConfigProvider: ({ configuration = Platform.getRemoteConfiguration(), children })=>React.createElement(RemoteConfigProviderComponent, {
                configuration
            }, children),
        PanelHeader: exportedFCs.find((m)=>m.toString().includes("panel") && m.toString().includes("actions")),
        PanelContent: findBy((m)=>m.render.toString().includes("scrollBarContainer"))(exportedForwardRefs) || findBy("scrollBarContainer")(exportedFCs),
        PanelSkeleton: findBy("label", "aside")(exportedFCs) || findBy((m)=>m.render.toString().includes("section"))(exportedForwardRefs),
        ButtonPrimary: findBy((m)=>m.displayName === "ButtonPrimary")(exportedForwardRefs),
        ButtonSecondary: findBy((m)=>m.displayName === "ButtonSecondary")(exportedForwardRefs),
        ButtonTertiary: findBy((m)=>m.displayName === "ButtonTertiary")(exportedForwardRefs),
        Snackbar: {
            wrapper: findBy("encore-light-theme", "elevated")(exportedFCs),
            simpleLayout: findBy("leading", "center", "trailing")(exportedFCs),
            ctaText: findBy("ctaText")(exportedFCs),
            styledImage: findBy("placeholderSrc")(exportedFCs)
        },
        Chip: findBy((m)=>m.render.toString().includes("Chip") && !m.render.toString().includes("ChipClear"))(exportedForwardRefs),
        ChipClear: findBy((m)=>m.render.toString().includes("ChipClear"))(exportedForwardRefs),
        FilterBox: exportedMemos.find((f)=>f.type.toString().includes("filterBoxApiRef")),
        ScrollableContainer: findBy("scrollLeft", "showButtons")(exportedFunctions),
        ScrollableText: findBy("scrollLeft", "pauseAtEndEdgeDurationMs")(exportedFunctions),
        Toggle: findBy("onSelected", 'type:"checkbox"')(exportedFCs),
        Router: findBy("navigationType", "static")(exportedFCs),
        Routes: findBy(/\([a-zA-Z_\$][\w\$]*\)\{let\{children:[a-zA-Z_\$][\w\$]*,location:[a-zA-Z_\$][\w\$]*\}=[a-zA-Z_\$][\w\$]*/)(exportedFCs),
        Route: findBy(/^function [a-zA-Z_\$][\w\$]*\([a-zA-Z_\$][\w\$]*\)\{\(0,[a-zA-Z_\$][\w\$]*\.[a-zA-Z_\$][\w\$]*\)\(\!1\)\}$/)(exportedFCs),
        StoreProvider: findBy("notifyNestedSubs", "serverState")(exportedFCs),
        Cards,
        Menus,
        PlaylistMenu: Object.values(require(playlistMenuChunkID)).find((m)=>typeof m === "function" || typeof m === "object"),
        GenericModal: findBy("GenericModal")(exportedFCs),
        Tracklist: exportedMemos.find((f)=>f.type.toString().includes("nrValidItems")),
        TracklistRow: exportedMemos.find((f)=>f.type.toString().includes("track-icon")),
        TracklistColumnsContextProvider: findBy("columnType")(exportedFunctions),
        InstrumentedRedirect
    };
};
const exposeURI = ({ require, chunks })=>{
    const [URIModuleID] = chunks.find(([id, v])=>v.toString().includes("Invalid Spotify URI!") && Object.keys(require(id)).length > 1);
    const URIModule = require(URIModuleID);
    const [Types, ...vs] = Object.values(URIModule);
    const TypesKeys = Object.keys(Types);
    const isTestFn = (fn)=>TypesKeys.some((t)=>fn.toString().includes(`${t}}`));
    const isCreateFn = (fn)=>TypesKeys.some((t)=>fn.toString().includes(`${t},`));
    const CaseLikeThis = (s)=>s.split("_").map(capitalize).join("");
    const fnsByType = Object.groupBy(vs, (fn)=>isTestFn(fn) ? "test" : isCreateFn(fn) ? "create" : undefined);
    const is = Object.fromEntries(fnsByType.test.map((fn)=>[
            CaseLikeThis(fn.toString().match(/([\w_\d]{2,})\}/)[1]),
            fn
        ]));
    const create = Object.fromEntries(fnsByType.create.map((fn)=>[
            CaseLikeThis(fn.toString().match(/([\w_\d]{2,})\,/)[1]),
            fn
        ]));
    const uniqueFns = fnsByType[undefined];
    const findAndExcludeBy = (...strings)=>{
        const i = uniqueFns.findIndex((f)=>strings.every((str)=>f.toString().includes(str)));
        return uniqueFns.splice(i, 1)[0];
    };
    const isSameIdentity = findAndExcludeBy("PLAYLIST");
    const urlEncode = findAndExcludeBy(".URI");
    const idToHex = findAndExcludeBy("22===");
    const hexToId = findAndExcludeBy("32===");
    const from = findAndExcludeBy("allowedTypes");
    const fromString = findAndExcludeBy("Argument `uri` must be a string.");
    return {
        Types,
        isSameIdentity,
        urlEncode,
        idToHex,
        hexToId,
        from,
        fromString,
        is: Object.assign(is, {
            PlaylistV1OrV2: uniqueFns[0]
        }),
        create
    };
};
const exposeWebpack = ()=>{
    const require = globalThis.webpackChunkclient_web.push([
        [
            Symbol()
        ],
        {},
        (re)=>re
    ]);
    const chunks = Object.entries(require.m);
    const modules = chunks.map(([id])=>require(id));
    const exports = modules.filter((module)=>typeof module === "object").flatMap((module)=>{
        try {
            return Object.values(module);
        } catch (_) {}
    }).filter(Boolean);
    // biome-ignore lint/complexity/noBannedTypes: ffs
    const isFunction = (obj)=>typeof obj === "function";
    const exportedFunctions = exports.filter(isFunction);
    const exportedReactObjects = Object.groupBy(exports, (x)=>x.$$typeof);
    const exportedContexts = exportedReactObjects[Symbol.for("react.context")];
    const exportedForwardRefs = exportedReactObjects[Symbol.for("react.forward_ref")];
    const exportedMemos = exportedReactObjects[Symbol.for("react.memo")];
    return {
        require,
        chunks,
        modules,
        exports,
        exportedFunctions,
        exportedContexts,
        exportedForwardRefs,
        exportedMemos
    };
};
const exposeReactRouter = ({ require, chunks })=>{
    const [ReactRouterModuleID] = chunks.find(([_, v])=>v.toString().includes("React Router"));
    const ReactRouterModule = Object.values(require(ReactRouterModuleID));
    // https://github.com/remix-run/react-router/blob/main/packages/react-router/lib/hooks.tsx#L131
    const useMatch = findBy("let{pathname:", /\(([a-zA-Z_\$][\w\$]*),([a-zA-Z_\$][\w\$]*)\)\),\[\2,\1\]/)(ReactRouterModule);
    return {
        useMatch
    };
};
const exposeReactFlipToolkit = ({ exportedFunctions })=>{
    const Flipper = exportedFunctions.find((m)=>m.prototype?.getSnapshotBeforeUpdate);
    const Flipped = exportedFunctions.find((m)=>m.displayName === "Flipped");
    return {
        Flipper,
        Flipped
    };
};
const exposeReact = ({ modules })=>{
    const ReactJSX = modules.find((m)=>m.jsx);
    const ReactDOM = modules.find((m)=>m.createRoot);
    const ReactDOMServer = modules.find((m)=>m.renderToString);
    return {
        ReactJSX,
        ReactDOM,
        ReactDOMServer
    };
};
const exposeSpotifyReactHooks = ({ exportedFunctions })=>{
    const DragHandler = findBy("dataTransfer", "data-dragging")(exportedFunctions);
    const useExtractedColor = exportedFunctions.find((m)=>m.toString().includes("extracted-color") || m.toString().includes("colorRaw") && m.toString().includes("useEffect"));
    return {
        DragHandler,
        useExtractedColor
    };
};
const exposeReactQuery = ({ require, chunks, modules, exportedFunctions })=>{
    const [infiniteQueryChunkID] = chunks.find(([_, v])=>v.toString().includes("fetchPreviousPage") && v.toString().includes("getOptimisticResult"));
    const QueryClient = findBy("defaultMutationOptions")(exportedFunctions);
    const PersistQueryClientProvider = findBy("persistOptions")(exportedFunctions);
    const QueryClientProvider = findBy("use QueryClientProvider")(exportedFunctions);
    const notifyManager = modules.find((m)=>m.setBatchNotifyFunction);
    const useMutation = findBy("mutateAsync")(exportedFunctions);
    const useQuery = findBy(/^function [a-zA-Z_\$][\w\$]*\(([a-zA-Z_\$][\w\$]*),([a-zA-Z_\$][\w\$]*)\)\{return\(0,[a-zA-Z_\$][\w\$]*\.[a-zA-Z_\$][\w\$]*\)\(\1,[a-zA-Z_\$][\w\$]*\.[a-zA-Z_\$][\w\$]*,\2\)\}$/)(exportedFunctions);
    const useQueryClient = findBy("client", "Provider", "mount")(exportedFunctions);
    const useSuspenseQuery = findBy("throwOnError", "suspense", "enabled")(exportedFunctions);
    const useInfiniteQuery = Object.values(require(infiniteQueryChunkID)).find((m)=>typeof m === "function");
    return {
        QueryClient,
        PersistQueryClientProvider,
        QueryClientProvider,
        notifyManager,
        useMutation,
        useQuery,
        useQueryClient,
        useSuspenseQuery,
        useInfiniteQuery
    };
};
const exposeClassnames = ({ require, chunks })=>{
    const [classnamesModuleID] = chunks.find(([_, v])=>v.toString().includes("[native code]") && !v.toString().includes("<anonymous>"));
    const classnames = require(classnamesModuleID);
    return {
        classnames
    };
};
const exposeMousetrap = ({ modules })=>{
    const Mousetrap = modules.find((m)=>m.addKeycodes);
    return {
        Mousetrap
    };
};
const exposeSnackbar = ({ exportedFunctions })=>{
    const useSnackbar = findBy(/^function\(\)\{return\(0,[a-zA-Z_\$][\w\$]*\.useContext\)\([a-zA-Z_\$][\w\$]*\)\}$/)(exportedFunctions);
    const enqueueCustomSnackbar = findBy("enqueueCustomSnackbar", "headless")(exportedFunctions);
    return {
        useSnackbar,
        enqueueCustomSnackbar
    };
};
const exposeSpotifyReactContexts = ({ exportedContexts })=>{
    const FilterContext = exportedContexts.find((c)=>c._currentValue2?.setFilter);
    return {
        FilterContext
    };
};
// TODO: extract functions
export function expose({ Snackbar, Platform, React }) {
    const webpack = exposeWebpack();
    const { exports, exportedFunctions } = webpack;
    const useContextMenuState = findBy("useContextMenuState")(exportedFunctions);
    const Color = Object.assign(findBy("static fromHex")(exportedFunctions), {
        CSSFormat: exports.find((m)=>m.RGBA)
    });
    const _reservedPanelIds = exports.find((m)=>m.BuddyFeed);
    const Locale = exports.find((m)=>m.getTranslations);
    const createUrlLocale = findBy("has", "baseName", "language")(exportedFunctions);
    const imageAnalysis = findBy(/\![a-zA-Z_\$][\w\$]*\.isFallback|\{extractColor/)(exportedFunctions);
    const fallbackPreset = exports.find((m)=>m.colorDark);
    const extractColorPreset = async (image)=>{
        const analysis = await imageAnalysis(Platform.getGraphQLLoader(), image);
        for (const result of analysis){
            if ("isFallback" in result === false) {
                result.isFallback = fallbackPreset === result; // Why ?
            }
        }
        return analysis;
    };
    const getPlayContext = findBy("referrerIdentifier", "usePlayContextItem")(exportedFunctions);
    const InternalPropetyMap = exports.find((o)=>o.Builder);
    return {
        webpack,
        ReactRouter: exposeReactRouter(webpack),
        ...exposeReact(webpack),
        ReactFlipToolkit: exposeReactFlipToolkit(webpack),
        getPlayContext,
        useContextMenuState,
        ...exposeClassnames(webpack),
        Color,
        ReactComponents: exposeReactComponents(webpack, React, Platform),
        SpotifyReactHooks: exposeSpotifyReactHooks(webpack),
        SpotifyReactContexts: exposeSpotifyReactContexts(webpack),
        ReactQuery: exposeReactQuery(webpack),
        ...exposeSnackbar(webpack),
        _reservedPanelIds,
        ...exposeMousetrap(webpack),
        Locale,
        createUrlLocale,
        Snackbar: Object.assign(Snackbar, exposeSnackbar(webpack)),
        URI: exposeURI(webpack),
        extractColorPreset,
        InternalPropetyMap
    };
}
