(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/Shared/ConfirmationModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConfirmationModal",
    ()=>ConfirmationModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const ConfirmationModal = ({ isOpen, title, message, confirmLabel = "Confirm", cancelLabel = "Cancel", isDanger = false, validationString, onConfirm, onCancel })=>{
    _s();
    const [inputValue, setInputValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Reset input when modal opens
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConfirmationModal.useEffect": ()=>{
            if (isOpen) {
                setInputValue('');
            }
        }
    }["ConfirmationModal.useEffect"], [
        isOpen
    ]);
    const isConfirmDisabled = validationString ? inputValue !== validationString : false;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 z-50 flex items-center justify-center p-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    onClick: onCancel,
                    className: "absolute inset-0 bg-charcoal-950/80 backdrop-blur-sm"
                }, void 0, false, {
                    fileName: "[project]/src/components/Shared/ConfirmationModal.tsx",
                    lineNumber: 44,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        scale: 0.95,
                        opacity: 0,
                        y: 10
                    },
                    animate: {
                        scale: 1,
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        scale: 0.95,
                        opacity: 0,
                        y: 10
                    },
                    className: "relative w-full max-w-sm bg-charcoal-900 border border-charcoal-800 rounded-2xl shadow-2xl p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onCancel,
                            className: "absolute top-4 right-4 text-charcoal-500 hover:text-slate-300 transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/src/components/Shared/ConfirmationModal.tsx",
                                lineNumber: 63,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/Shared/ConfirmationModal.tsx",
                            lineNumber: 59,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `w-12 h-12 rounded-full flex items-center justify-center mb-4 ${isDanger ? 'bg-danger-500/10 text-danger-500' : 'bg-accent-500/10 text-accent-500'}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Shared/ConfirmationModal.tsx",
                                        lineNumber: 70,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Shared/ConfirmationModal.tsx",
                                    lineNumber: 67,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-bold text-slate-100 mb-2",
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Shared/ConfirmationModal.tsx",
                                    lineNumber: 73,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-charcoal-400 mb-6",
                                    children: message
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Shared/ConfirmationModal.tsx",
                                    lineNumber: 74,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                validationString && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full mb-6 text-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-medium text-charcoal-400 mb-1.5 ml-1",
                                            children: [
                                                "Type ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-200 font-bold",
                                                    children: [
                                                        '"',
                                                        validationString,
                                                        '"'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/Shared/ConfirmationModal.tsx",
                                                    lineNumber: 79,
                                                    columnNumber: 26
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " to confirm:"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Shared/ConfirmationModal.tsx",
                                            lineNumber: 78,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: inputValue,
                                            onChange: (e)=>setInputValue(e.target.value),
                                            className: "w-full px-3 py-2 bg-charcoal-950 border border-charcoal-700 rounded-lg text-slate-200 text-sm focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all placeholder-charcoal-600",
                                            placeholder: validationString,
                                            autoFocus: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Shared/ConfirmationModal.tsx",
                                            lineNumber: 81,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Shared/ConfirmationModal.tsx",
                                    lineNumber: 77,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3 w-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: onCancel,
                                            className: "flex-1 py-2.5 px-4 rounded-xl border border-charcoal-700 text-charcoal-300 hover:bg-charcoal-800 hover:text-white transition-colors text-sm font-medium",
                                            children: cancelLabel
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Shared/ConfirmationModal.tsx",
                                            lineNumber: 93,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: onConfirm,
                                            disabled: isConfirmDisabled,
                                            className: `flex-1 py-2.5 px-4 rounded-xl text-white shadow-lg transition-all text-sm font-medium ${isDanger ? 'bg-danger-600 hover:bg-danger-500 shadow-danger-900/20 disabled:bg-charcoal-700 disabled:text-charcoal-500 disabled:shadow-none' : 'bg-accent-600 hover:bg-accent-500 shadow-accent-900/20 disabled:bg-charcoal-700 disabled:text-charcoal-500 disabled:shadow-none'}`,
                                            children: confirmLabel
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Shared/ConfirmationModal.tsx",
                                            lineNumber: 99,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Shared/ConfirmationModal.tsx",
                                    lineNumber: 92,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Shared/ConfirmationModal.tsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Shared/ConfirmationModal.tsx",
                    lineNumber: 53,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Shared/ConfirmationModal.tsx",
            lineNumber: 42,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/Shared/ConfirmationModal.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ConfirmationModal, "g3WCsqcvSc9WB7w4du2ucRdqd7Y=");
_c = ConfirmationModal;
var _c;
__turbopack_context__.k.register(_c, "ConfirmationModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Shared/InputModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InputModal",
    ()=>InputModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pen.js [app-client] (ecmascript) <export default as Edit2>");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const InputModal = ({ isOpen, title, initialValue, confirmLabel = "Save", cancelLabel = "Cancel", onConfirm, onCancel })=>{
    _s();
    const [value, setValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialValue);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InputModal.useEffect": ()=>{
            if (isOpen) setValue(initialValue);
        }
    }["InputModal.useEffect"], [
        isOpen,
        initialValue
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 z-50 flex items-center justify-center p-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    onClick: onCancel,
                    className: "absolute inset-0 bg-charcoal-950/80 backdrop-blur-sm"
                }, void 0, false, {
                    fileName: "[project]/src/components/Shared/InputModal.tsx",
                    lineNumber: 34,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        scale: 0.95,
                        opacity: 0,
                        y: 10
                    },
                    animate: {
                        scale: 1,
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        scale: 0.95,
                        opacity: 0,
                        y: 10
                    },
                    className: "relative w-full max-w-sm bg-charcoal-900 border border-charcoal-800 rounded-2xl shadow-2xl p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onCancel,
                            className: "absolute top-4 right-4 text-charcoal-500 hover:text-slate-300 transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/src/components/Shared/InputModal.tsx",
                                lineNumber: 52,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/Shared/InputModal.tsx",
                            lineNumber: 48,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-charcoal-800 text-slate-300",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Shared/InputModal.tsx",
                                        lineNumber: 57,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Shared/InputModal.tsx",
                                    lineNumber: 56,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-bold text-slate-100 mb-6",
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Shared/InputModal.tsx",
                                    lineNumber: 60,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full mb-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: value,
                                        onChange: (e)=>setValue(e.target.value),
                                        className: "w-full px-3 py-2 bg-charcoal-950 border border-charcoal-700 rounded-lg text-slate-200 text-sm focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all placeholder-charcoal-600",
                                        autoFocus: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Shared/InputModal.tsx",
                                        lineNumber: 63,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Shared/InputModal.tsx",
                                    lineNumber: 62,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3 w-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: onCancel,
                                            className: "flex-1 py-2.5 px-4 rounded-xl border border-charcoal-700 text-charcoal-300 hover:bg-charcoal-800 hover:text-white transition-colors text-sm font-medium",
                                            children: cancelLabel
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Shared/InputModal.tsx",
                                            lineNumber: 73,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>onConfirm(value),
                                            disabled: !value.trim(),
                                            className: "flex-1 py-2.5 px-4 rounded-xl text-white shadow-lg bg-accent-600 hover:bg-accent-500 shadow-accent-900/20 disabled:bg-charcoal-700 disabled:text-charcoal-500 disabled:shadow-none transition-all text-sm font-medium",
                                            children: confirmLabel
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Shared/InputModal.tsx",
                                            lineNumber: 79,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Shared/InputModal.tsx",
                                    lineNumber: 72,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Shared/InputModal.tsx",
                            lineNumber: 55,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Shared/InputModal.tsx",
                    lineNumber: 42,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Shared/InputModal.tsx",
            lineNumber: 33,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/Shared/InputModal.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(InputModal, "tWiMN+R1KrlPc+I/v9D+hnPBFtc=");
_c = InputModal;
var _c;
__turbopack_context__.k.register(_c, "InputModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sidebar",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panels$2d$top$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/panels-top-left.js [app-client] (ecmascript) <export default as Layout>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileBox$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-box.js [app-client] (ecmascript) <export default as FileBox>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pen.js [app-client] (ecmascript) <export default as Edit2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Shared$2f$ConfirmationModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Shared/ConfirmationModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Shared$2f$InputModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Shared/InputModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
const Sidebar = ({ workspaces, currentWorkspaceId, onSelectWorkspace, sessions, currentSessionId, onNewChat, onSelectSession, onDeleteSession, onRenameSession, onLogout, onOpenSwitchModal, isOpen, isDarkMode, onToggleTheme })=>{
    _s();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [renameSessionId, setRenameSessionId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const sidebarVariants = {
        open: {
            width: "320px",
            opacity: 1,
            x: 0
        },
        closed: {
            width: "0px",
            opacity: 0,
            x: -50
        }
    };
    // Group Sessions by Date
    const groupedSessions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Sidebar.useMemo[groupedSessions]": ()=>{
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const lastWeek = new Date(today);
            lastWeek.setDate(lastWeek.getDate() - 7);
            const groups = {
                'Today': [],
                'Yesterday': [],
                'Previous 7 Days': [],
                'Older': []
            };
            // Sort descending by activity
            const sorted = [
                ...sessions
            ].sort({
                "Sidebar.useMemo[groupedSessions].sorted": (a, b)=>{
                    const aTime = a.messages.length > 0 ? a.messages[a.messages.length - 1].timestamp : a.createdAt;
                    const bTime = b.messages.length > 0 ? b.messages[b.messages.length - 1].timestamp : b.createdAt;
                    return bTime - aTime;
                }
            }["Sidebar.useMemo[groupedSessions].sorted"]);
            const filtered = sorted.filter({
                "Sidebar.useMemo[groupedSessions].filtered": (s)=>s.title.toLowerCase().includes(searchQuery.toLowerCase())
            }["Sidebar.useMemo[groupedSessions].filtered"]);
            filtered.forEach({
                "Sidebar.useMemo[groupedSessions]": (session)=>{
                    const date = new Date(session.messages.length > 0 ? session.messages[session.messages.length - 1].timestamp : session.createdAt);
                    if (date.toDateString() === today.toDateString()) {
                        groups['Today'].push(session);
                    } else if (date.toDateString() === yesterday.toDateString()) {
                        groups['Yesterday'].push(session);
                    } else if (date > lastWeek) {
                        groups['Previous 7 Days'].push(session);
                    } else {
                        groups['Older'].push(session);
                    }
                }
            }["Sidebar.useMemo[groupedSessions]"]);
            return groups;
        }
    }["Sidebar.useMemo[groupedSessions]"], [
        sessions,
        searchQuery
    ]);
    const activeWorkspace = workspaces.find((w)=>w.id === currentWorkspaceId);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: "wait",
                children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: "closed",
                    animate: "open",
                    exit: "closed",
                    variants: sidebarVariants,
                    transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                    },
                    className: "h-full flex z-30 overflow-hidden relative shadow-xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-[72px] h-full bg-gray-100 dark:bg-charcoal-950 border-r border-gray-200 dark:border-charcoal-800 flex flex-col items-center py-4 gap-3 shrink-0 z-40",
                            children: [
                                workspaces.map((ws)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onSelectWorkspace(ws.id),
                                        className: `group relative w-10 h-10 rounded-xl flex items-center justify-center transition-all ${currentWorkspaceId === ws.id ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/20' : 'bg-white dark:bg-charcoal-800 text-charcoal-500 dark:text-charcoal-400 hover:bg-accent-100 dark:hover:bg-charcoal-700'}`,
                                        title: ws.title,
                                        children: [
                                            ws.symbol ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-sm",
                                                children: ws.symbol
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                lineNumber: 141,
                                                columnNumber: 38
                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                lineNumber: 141,
                                                columnNumber: 95
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            currentWorkspaceId === ws.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent-500 rounded-r-full"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                lineNumber: 144,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute left-14 bg-charcoal-900/80 backdrop-blur-xl border border-white/10 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-50 transition-all duration-200 shadow-xl scale-95 group-hover:scale-100 origin-left",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold block text-sm mb-0.5",
                                                        children: ws.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                        lineNumber: 148,
                                                        columnNumber: 29
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    ws.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block font-normal text-[10px] opacity-70 max-w-[180px] truncate",
                                                        children: ws.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                        lineNumber: 149,
                                                        columnNumber: 48
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                lineNumber: 147,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, ws.id, true, {
                                        fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                        lineNumber: 131,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>router.push('/workspaces'),
                                    className: "w-10 h-10 rounded-xl bg-transparent border-2 border-dashed border-charcoal-300 dark:border-charcoal-700 text-charcoal-400 hover:border-accent-500 hover:text-accent-500 flex items-center justify-center transition-all mt-2",
                                    title: "Manage Workspaces",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                        lineNumber: 159,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                    lineNumber: 154,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-auto flex flex-col gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: onToggleTheme,
                                            className: "w-10 h-10 rounded-xl bg-transparent hover:bg-gray-200 dark:hover:bg-charcoal-800 text-charcoal-500 flex items-center justify-center transition-all",
                                            children: isDarkMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                lineNumber: 167,
                                                columnNumber: 39
                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                lineNumber: 167,
                                                columnNumber: 60
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                            lineNumber: 163,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setIsLogoutModalOpen(true),
                                            className: "w-10 h-10 rounded-xl bg-transparent hover:bg-red-50 dark:hover:bg-red-900/20 text-charcoal-500 hover:text-red-500 flex items-center justify-center transition-all",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                lineNumber: 173,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                            lineNumber: 169,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                    lineNumber: 162,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                            lineNumber: 129,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 h-full bg-gray-50 dark:bg-charcoal-900 flex flex-col overflow-hidden border-r border-gray-200 dark:border-charcoal-800",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 border-b border-gray-200 dark:border-charcoal-800 shrink-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-8 h-8 rounded-lg bg-gradient-to-br from-accent-500 to-red-600 flex items-center justify-center text-white shadow-lg shadow-accent-500/20",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                        size: 20,
                                                        strokeWidth: 2.5
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                        lineNumber: 186,
                                                        columnNumber: 29
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                    className: "text-xl font-bold text-slate-800 dark:text-white tracking-tight",
                                                    children: "WorkPai"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                            lineNumber: 184,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-px bg-gray-200 dark:bg-charcoal-800 mb-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                            lineNumber: 193,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "font-bold text-slate-800 dark:text-slate-100 truncate mb-1 text-sm",
                                            children: activeWorkspace?.title || 'Select Workspace'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                            lineNumber: 195,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        activeWorkspace?.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-charcoal-500 dark:text-charcoal-400 line-clamp-2 mb-3 leading-relaxed",
                                            children: activeWorkspace.description
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                            lineNumber: 200,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-3",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-charcoal-500 uppercase tracking-wider font-semibold",
                                                children: "Chat History"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                lineNumber: 206,
                                                columnNumber: 26
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                            lineNumber: 205,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: onNewChat,
                                            disabled: !currentWorkspaceId,
                                            className: "w-full flex items-center justify-center gap-2 px-3 py-2 bg-accent-600 hover:bg-accent-500 text-white rounded-lg shadow-md shadow-accent-900/10 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                    lineNumber: 216,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "New Chat"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                    lineNumber: 217,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                            lineNumber: 211,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                    lineNumber: 181,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-charcoal-300 dark:scrollbar-thumb-charcoal-700 space-y-4",
                                    children: [
                                        !currentWorkspaceId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center py-10 px-4 text-charcoal-500 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                    size: 24,
                                                    className: "mx-auto mb-2 opacity-50"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                    lineNumber: 242,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Please select a workspace from the left rail."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                            lineNumber: 241,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)) : Object.entries(groupedSessions).map(([group, groupSessions])=>groupSessions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "px-3 py-1 text-[10px] font-bold text-charcoal-400 uppercase tracking-wider mb-1",
                                                        children: group
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                        lineNumber: 249,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-0.5",
                                                        children: groupSessions.map((session)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                onClick: ()=>onSelectSession(session.id),
                                                                className: `group relative flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all ${currentSessionId === session.id ? 'bg-white dark:bg-charcoal-800 text-slate-900 dark:text-slate-100 shadow-sm border-l-2 border-accent-500' : 'text-slate-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-charcoal-800/50 border-l-2 border-transparent'}`,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                                        size: 14,
                                                                        className: currentSessionId === session.id ? 'text-accent-500' : 'text-charcoal-400'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                                        lineNumber: 263,
                                                                        columnNumber: 49
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "min-w-0 flex-1",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm font-medium truncate pr-6",
                                                                            children: session.title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                                            lineNumber: 265,
                                                                            columnNumber: 53
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                                        lineNumber: 264,
                                                                        columnNumber: 49
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: `absolute right-1 flex items-center bg-gradient-to-l from-white via-white to-transparent dark:from-charcoal-800 dark:via-charcoal-800 dark:to-transparent pl-4 py-1 ${currentSessionId === session.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`,
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: (e)=>{
                                                                                    e.stopPropagation();
                                                                                    setRenameSessionId(session.id);
                                                                                },
                                                                                className: "p-1 hover:text-slate-900 dark:hover:text-white transition-colors",
                                                                                title: "Rename",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                                                                                    size: 12
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                                                    lineNumber: 275,
                                                                                    columnNumber: 57
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                                                lineNumber: 270,
                                                                                columnNumber: 53
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: (e)=>onDeleteSession(session.id, e),
                                                                                className: "p-1 hover:text-red-500 transition-colors",
                                                                                title: "Delete",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                                    size: 12
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                                                    lineNumber: 282,
                                                                                    columnNumber: 57
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                                                lineNumber: 277,
                                                                                columnNumber: 53
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                                        lineNumber: 269,
                                                                        columnNumber: 49
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, session.id, true, {
                                                                fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                                lineNumber: 254,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0)))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                        lineNumber: 252,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, group, true, {
                                                fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                lineNumber: 248,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))),
                                        currentWorkspaceId && Object.values(groupedSessions).every((g)=>g.length === 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center py-8 text-charcoal-400 text-xs italic",
                                            children: "No chats in this workspace yet."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                            lineNumber: 293,
                                            columnNumber: 26
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                    lineNumber: 239,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3 border-t border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-900/50 space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>router.push('/workspaces'),
                                            className: "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-charcoal-600 dark:text-charcoal-400 hover:bg-white dark:hover:bg-charcoal-800 hover:text-slate-900 dark:hover:text-white transition-all text-sm group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panels$2d$top$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__["Layout"], {
                                                    size: 16,
                                                    className: "group-hover:text-accent-500 transition-colors"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                    lineNumber: 305,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Workspaces"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                    lineNumber: 306,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                            lineNumber: 301,
                                            columnNumber: 22
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>router.push('/generated'),
                                            className: "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-charcoal-600 dark:text-charcoal-400 hover:bg-white dark:hover:bg-charcoal-800 hover:text-slate-900 dark:hover:text-white transition-all text-sm group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileBox$3e$__["FileBox"], {
                                                    size: 16,
                                                    className: "group-hover:text-accent-500 transition-colors"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                    lineNumber: 312,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Generated Contents"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                    lineNumber: 313,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                            lineNumber: 308,
                                            columnNumber: 22
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>router.push('/settings'),
                                            className: "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-charcoal-600 dark:text-charcoal-400 hover:bg-white dark:hover:bg-charcoal-800 hover:text-slate-900 dark:hover:text-white transition-all text-sm group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                                    size: 16,
                                                    className: "group-hover:text-accent-500 transition-colors"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                    lineNumber: 319,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Settings"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                                    lineNumber: 320,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                            lineNumber: 315,
                                            columnNumber: 22
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                                    lineNumber: 300,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                            lineNumber: 179,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                    lineNumber: 120,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Shared$2f$ConfirmationModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfirmationModal"], {
                isOpen: isLogoutModalOpen,
                title: "Sign Out",
                message: "Are you sure you want to sign out?",
                confirmLabel: "Sign Out",
                isDanger: false,
                onConfirm: ()=>{
                    setIsLogoutModalOpen(false);
                    onLogout();
                },
                onCancel: ()=>setIsLogoutModalOpen(false)
            }, void 0, false, {
                fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                lineNumber: 328,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Shared$2f$InputModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InputModal"], {
                isOpen: !!renameSessionId,
                title: "Rename Chat",
                initialValue: sessions.find((s)=>s.id === renameSessionId)?.title || '',
                confirmLabel: "Rename",
                onConfirm: (newTitle)=>{
                    if (renameSessionId) {
                        onRenameSession(renameSessionId, newTitle);
                        setRenameSessionId(null);
                    }
                },
                onCancel: ()=>setRenameSessionId(null)
            }, void 0, false, {
                fileName: "[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx",
                lineNumber: 341,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_s(Sidebar, "vIsyGo/LH+Ei62SsLRcdJoIbnPI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContextSidebar",
    ()=>ContextSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/link.js [app-client] (ecmascript) <export default as Link>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-client] (ecmascript) <export default as SlidersHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const ContextSidebar = ({ isOpen, contextItems = [], similarityThreshold, onUpdateThreshold, onRemoveItem, onToggleActive })=>{
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('documents');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                width: 0,
                opacity: 0
            },
            animate: {
                width: 300,
                opacity: 1
            },
            exit: {
                width: 0,
                opacity: 0
            },
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            },
            className: "h-full bg-gray-50 dark:bg-charcoal-900 border-l border-gray-200 dark:border-charcoal-800 flex flex-col flex-shrink-0 z-20 overflow-hidden transition-colors duration-200",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center border-b border-gray-200 dark:border-charcoal-800",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setActiveTab('documents'),
                            className: `flex-1 py-4 text-sm font-medium text-center transition-colors border-b-2 ${activeTab === 'documents' ? 'border-accent-500 text-slate-800 dark:text-slate-100' : 'border-transparent text-charcoal-500 dark:text-charcoal-400 hover:text-slate-600 dark:hover:text-slate-300'}`,
                            children: "Context"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                            lineNumber: 43,
                            columnNumber: 14
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setActiveTab('settings'),
                            className: `flex-1 py-4 text-sm font-medium text-center transition-colors border-b-2 ${activeTab === 'settings' ? 'border-accent-500 text-slate-800 dark:text-slate-100' : 'border-transparent text-charcoal-500 dark:text-charcoal-400 hover:text-slate-600 dark:hover:text-slate-300'}`,
                            children: "Vector Settings"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                            lineNumber: 53,
                            columnNumber: 14
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                    lineNumber: 42,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto p-4 space-y-6",
                    children: activeTab === 'documents' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xs font-semibold text-charcoal-500 dark:text-charcoal-400 uppercase tracking-wider mb-3",
                                        children: "Active Context"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                        lineNumber: 70,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-charcoal-400 mb-2",
                                        children: "Select files to include in this chat session."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                        lineNumber: 71,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    contextItems.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center py-8 text-charcoal-500 text-sm border-2 border-dashed border-charcoal-200 dark:border-charcoal-700 rounded-xl",
                                        children: [
                                            "No documents indexed in this workspace. ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                                lineNumber: 75,
                                                columnNumber: 65
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            ' Go to "Workspaces" to manage files.'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                        lineNumber: 74,
                                        columnNumber: 23
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: contextItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 p-3 bg-white dark:bg-charcoal-800 rounded-lg border border-gray-200 dark:border-charcoal-700 shadow-sm group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative flex items-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            checked: item.isActive !== false,
                                                            onChange: ()=>onToggleActive(item.id),
                                                            className: "w-4 h-4 rounded border-gray-300 text-accent-600 focus:ring-accent-500 cursor-pointer"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                                            lineNumber: 84,
                                                            columnNumber: 33
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                                        lineNumber: 83,
                                                        columnNumber: 30
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    item.type === 'link' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__["Link"], {
                                                        size: 16,
                                                        className: "text-blue-500 dark:text-blue-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                                        lineNumber: 92,
                                                        columnNumber: 54
                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                        size: 16,
                                                        className: "text-orange-500 dark:text-orange-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                                        lineNumber: 92,
                                                        columnNumber: 124
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: `text-sm truncate transition-colors ${item.isActive !== false ? 'text-slate-700 dark:text-slate-200' : 'text-charcoal-400 line-through'}`,
                                                                children: item.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                                                lineNumber: 94,
                                                                columnNumber: 32
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[10px] text-charcoal-400 flex items-center gap-1",
                                                                children: [
                                                                    item.status === 'indexed' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "w-1.5 h-1.5 rounded-full bg-green-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                                                        lineNumber: 98,
                                                                        columnNumber: 64
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    item.status.toUpperCase()
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                                                lineNumber: 97,
                                                                columnNumber: 32
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                                        lineNumber: 93,
                                                        columnNumber: 30
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, item.id, true, {
                                                fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                                lineNumber: 80,
                                                columnNumber: 28
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                        lineNumber: 78,
                                        columnNumber: 23
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                lineNumber: 69,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                            lineNumber: 68,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-sm font-medium text-slate-700 dark:text-slate-200 flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                                        lineNumber: 114,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "Similarity Threshold"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                                lineNumber: 113,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-mono bg-gray-200 dark:bg-charcoal-800 px-2 py-1 rounded text-accent-600 dark:text-accent-400",
                                                children: similarityThreshold.toFixed(2)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                                lineNumber: 117,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                        lineNumber: 112,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "range",
                                        min: "0",
                                        max: "1",
                                        step: "0.05",
                                        value: similarityThreshold,
                                        onChange: (e)=>onUpdateThreshold(parseFloat(e.target.value)),
                                        className: "w-full h-1.5 bg-gray-200 dark:bg-charcoal-700 rounded-lg appearance-none cursor-pointer accent-accent-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                        lineNumber: 119,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-charcoal-500 dark:text-charcoal-400 mt-2",
                                        children: "Higher values force stricter matching for document retrieval."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                        lineNumber: 128,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                lineNumber: 111,
                                columnNumber: 18
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 bg-gray-100 dark:bg-charcoal-800/50 rounded-lg border border-gray-200 dark:border-charcoal-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2",
                                        children: "Vector Database Status"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                        lineNumber: 134,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 text-xs text-green-600 dark:text-green-400",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                size: 12,
                                                className: "animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                                lineNumber: 136,
                                                columnNumber: 24
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "System Ready"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                                lineNumber: 137,
                                                columnNumber: 24
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                        lineNumber: 135,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 grid grid-cols-2 gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-white dark:bg-charcoal-900 p-2 rounded border border-gray-200 dark:border-charcoal-800",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block text-[10px] text-charcoal-500 dark:text-charcoal-400",
                                                        children: "Vectors"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                                        lineNumber: 141,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-mono text-slate-700 dark:text-slate-200",
                                                        children: "14,205"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                                        lineNumber: 142,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                                lineNumber: 140,
                                                columnNumber: 24
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-white dark:bg-charcoal-900 p-2 rounded border border-gray-200 dark:border-charcoal-800",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block text-[10px] text-charcoal-500 dark:text-charcoal-400",
                                                        children: "Dimension"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                                        lineNumber: 145,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-mono text-slate-700 dark:text-slate-200",
                                                        children: "1536"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                                        lineNumber: 146,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                                lineNumber: 144,
                                                columnNumber: 24
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                        lineNumber: 139,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                                lineNumber: 133,
                                columnNumber: 18
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                        lineNumber: 110,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
                    lineNumber: 65,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
            lineNumber: 34,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ContextSidebar, "PQnTxC9+Rl3/xiGIfiCynnFl++Q=");
_c = ContextSidebar;
var _c;
__turbopack_context__.k.register(_c, "ContextSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Shared/Toast.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toast",
    ()=>Toast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const Toast = ({ message, type = 'success', subMessage, onClose, duration = 4000 })=>{
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Toast.useEffect": ()=>{
            if (message) {
                const timer = setTimeout({
                    "Toast.useEffect.timer": ()=>{
                        onClose();
                    }
                }["Toast.useEffect.timer"], duration);
                return ({
                    "Toast.useEffect": ()=>clearTimeout(timer)
                })["Toast.useEffect"];
            }
        }
    }["Toast.useEffect"], [
        message,
        duration,
        onClose
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                y: -20,
                x: 0
            },
            animate: {
                opacity: 1,
                y: 0,
                x: 0
            },
            exit: {
                opacity: 0,
                y: -20,
                x: 0
            },
            className: "fixed top-24 right-6 z-50 flex flex-col gap-1 p-4 rounded-xl shadow-2xl border backdrop-blur-xl transition-colors duration-200 bg-white/90 dark:bg-charcoal-900/95 border-gray-200 dark:border-charcoal-700 min-w-[320px] max-w-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `mt-0.5 shrink-0 ${type === 'success' ? 'text-green-500' : type === 'error' ? 'text-red-500' : 'text-accent-500'}`,
                            children: [
                                type === 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Shared/Toast.tsx",
                                    lineNumber: 40,
                                    columnNumber: 38
                                }, ("TURBOPACK compile-time value", void 0)),
                                type === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Shared/Toast.tsx",
                                    lineNumber: 41,
                                    columnNumber: 36
                                }, ("TURBOPACK compile-time value", void 0)),
                                type === 'info' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Shared/Toast.tsx",
                                    lineNumber: 42,
                                    columnNumber: 35
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Shared/Toast.tsx",
                            lineNumber: 36,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 mr-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-bold text-slate-800 dark:text-slate-100",
                                    children: message
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Shared/Toast.tsx",
                                    lineNumber: 45,
                                    columnNumber: 16
                                }, ("TURBOPACK compile-time value", void 0)),
                                subMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-charcoal-500 dark:text-charcoal-400 mt-1 leading-relaxed",
                                    children: subMessage
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Shared/Toast.tsx",
                                    lineNumber: 47,
                                    columnNumber: 18
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Shared/Toast.tsx",
                            lineNumber: 44,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "p-1 -mt-1 -mr-2 hover:bg-gray-100 dark:hover:bg-charcoal-800 rounded-lg text-charcoal-400 transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/components/Shared/Toast.tsx",
                                lineNumber: 51,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/Shared/Toast.tsx",
                            lineNumber: 50,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Shared/Toast.tsx",
                    lineNumber: 35,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        width: "100%"
                    },
                    animate: {
                        width: "0%"
                    },
                    transition: {
                        duration: duration / 1000,
                        ease: "linear"
                    },
                    className: `h-0.5 mt-2 rounded-full ${type === 'success' ? 'bg-green-500/50' : type === 'error' ? 'bg-red-500/50' : 'bg-accent-500/50'}`
                }, void 0, false, {
                    fileName: "[project]/src/components/Shared/Toast.tsx",
                    lineNumber: 55,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Shared/Toast.tsx",
            lineNumber: 29,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/Shared/Toast.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Toast, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = Toast;
var _c;
__turbopack_context__.k.register(_c, "Toast");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Role",
    ()=>Role
]);
var Role = /*#__PURE__*/ function(Role) {
    Role["USER"] = "user";
    Role["MODEL"] = "model";
    Role["SYSTEM"] = "system";
    return Role;
}({});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/geminiService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "streamChatResponse",
    ()=>streamChatResponse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@google/genai/dist/web/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types.ts [app-client] (ecmascript)");
;
;
let genAIInstance = null;
const getGenAI = ()=>{
    if (!genAIInstance) {
        const apiKey = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("API_KEY environment variable is missing.");
        }
        genAIInstance = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GoogleGenAI"]({
            apiKey
        });
    }
    return genAIInstance;
};
const streamChatResponse = async (modelId, history, newMessage, attachments, systemInstruction, onChunk)=>{
    const ai = getGenAI();
    // Construct history for the chat API
    // Note: We filter out failed messages or pure error states before sending
    const chatHistory = history.filter((msg)=>!msg.isError && msg.role !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Role"].SYSTEM) // System instruction is passed separately
    .map((msg)=>{
        const parts = [];
        if (msg.attachments && msg.attachments.length > 0) {
            msg.attachments.forEach((att)=>{
                parts.push({
                    inlineData: {
                        mimeType: att.mimeType,
                        data: att.data
                    }
                });
            });
        }
        if (msg.text) {
            parts.push({
                text: msg.text
            });
        }
        return {
            role: msg.role === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Role"].USER ? 'user' : 'model',
            parts: parts
        };
    });
    const chat = ai.chats.create({
        model: modelId,
        history: chatHistory,
        config: {
            systemInstruction: systemInstruction
        }
    });
    // Prepare current message content
    const currentMessageParts = [];
    attachments.forEach((att)=>{
        currentMessageParts.push({
            inlineData: {
                mimeType: att.mimeType,
                data: att.data
            }
        });
    });
    currentMessageParts.push({
        text: newMessage
    });
    // If we have attachments, we must pass 'contents' structure to sendMessageStream differently if using the generic generateContent,
    // but chat.sendMessageStream handles mixed content fine as a list of parts or a string.
    // The SDK signature for sendMessageStream accepts `string | Part[] | ...`
    // We'll wrap it in the expected format.
    const messagePayload = currentMessageParts.length === 1 && currentMessageParts[0].text ? currentMessageParts[0].text : currentMessageParts;
    try {
        const resultStream = await chat.sendMessageStream({
            message: messagePayload
        });
        let fullText = '';
        for await (const chunk of resultStream){
            const c = chunk;
            if (c.text) {
                fullText += c.text;
                onChunk(fullText);
            }
        }
        return fullText;
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/mockData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DUMMY_GENERATED_FILES",
    ()=>DUMMY_GENERATED_FILES,
    "DUMMY_GENERATED_FOLDERS",
    ()=>DUMMY_GENERATED_FOLDERS,
    "DUMMY_NOTIFICATIONS",
    ()=>DUMMY_NOTIFICATIONS,
    "DUMMY_SESSIONS",
    ()=>DUMMY_SESSIONS,
    "DUMMY_USERS",
    ()=>DUMMY_USERS,
    "DUMMY_WORKSPACES",
    ()=>DUMMY_WORKSPACES
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types.ts [app-client] (ecmascript)");
;
const DUMMY_WORKSPACES = [
    {
        id: 'ws-marketing',
        title: 'Marketing & Brand',
        description: 'Campaign assets, brand guidelines, and Q1 strategy docs.',
        symbol: 'M',
        color: 'bg-red-500',
        createdAt: Date.now() - 10000000,
        similarityThreshold: 0.7,
        systemInstruction: 'You are a senior marketing strategist.',
        folders: [
            {
                id: 'f-mkt-1',
                name: 'Campaigns 2024',
                dateCreated: Date.now() - 500000
            }
        ],
        contextItems: [
            {
                id: 'ctx-mkt-1',
                name: 'Brand_Guidelines_v2.pdf',
                type: 'pdf',
                status: 'indexed',
                dateAdded: Date.now(),
                isActive: true,
                folderId: 'f-mkt-1'
            },
            {
                id: 'ctx-mkt-2',
                name: 'https://competitor.com/pricing',
                type: 'link',
                status: 'indexed',
                dateAdded: Date.now(),
                isActive: true
            }
        ]
    },
    {
        id: 'ws-engineering',
        title: 'Engineering',
        description: 'API documentation, architecture decision records (ADRs), and sprint logs.',
        symbol: 'E',
        color: 'bg-blue-500',
        createdAt: Date.now() - 8000000,
        similarityThreshold: 0.8,
        systemInstruction: 'You are a principal software engineer.',
        folders: [],
        contextItems: [
            {
                id: 'ctx-eng-1',
                name: 'API_Spec_OAS3.yaml',
                type: 'txt',
                status: 'indexed',
                dateAdded: Date.now(),
                isActive: true
            },
            {
                id: 'ctx-eng-2',
                name: 'Migration_Plan_Legacy.pdf',
                type: 'pdf',
                status: 'indexing',
                dateAdded: Date.now(),
                isActive: true
            }
        ]
    },
    {
        id: 'ws-legal',
        title: 'Legal & HR',
        description: 'Contract templates, employee handbook, and compliance docs.',
        symbol: 'L',
        color: 'bg-emerald-500',
        createdAt: Date.now() - 5000000,
        similarityThreshold: 0.85,
        systemInstruction: 'You are a legal assistant. Be precise and cite sources.',
        folders: [
            {
                id: 'f-leg-1',
                name: 'Contracts',
                dateCreated: Date.now() - 200000
            }
        ],
        contextItems: [
            {
                id: 'ctx-leg-1',
                name: 'NDA_Template_2025.docx',
                type: 'pdf',
                status: 'indexed',
                dateAdded: Date.now(),
                isActive: true,
                folderId: 'f-leg-1'
            },
            {
                id: 'ctx-leg-2',
                name: 'Employee_Handbook.pdf',
                type: 'pdf',
                status: 'indexed',
                dateAdded: Date.now(),
                isActive: true
            }
        ]
    }
];
const DUMMY_SESSIONS = [
    // Marketing Chats
    {
        id: 'session-1',
        workspaceId: 'ws-marketing',
        title: 'Q1 Strategy Brainstorm',
        modelId: 'gemini-3-flash-preview',
        createdAt: Date.now() - 900000,
        messages: [
            {
                id: 'msg-1',
                role: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Role"].USER,
                text: 'Based on the brand guidelines, give me 5 tagline ideas for the summer launch.',
                timestamp: Date.now() - 900000
            },
            {
                id: 'msg-2',
                role: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Role"].MODEL,
                text: 'Here are 5 tagline ideas aligned with the "Bold & Human" voice in your guidelines:\n1. *Ignite Your Summer*\n2. *Sunshine, Bottled.*\n3. *Live Loud, Live Warm.*\n4. *The Heat is On.*\n5. *Your Summer, Your Rules.*',
                timestamp: Date.now() - 890000
            }
        ]
    },
    {
        id: 'session-2',
        workspaceId: 'ws-marketing',
        title: 'Competitor Pricing Analysis',
        modelId: 'gemini-3-pro-preview',
        createdAt: Date.now() - 100000000,
        messages: []
    },
    // Engineering Chats
    {
        id: 'session-3',
        workspaceId: 'ws-engineering',
        title: 'API Authentication Error',
        modelId: 'gemini-3-pro-preview',
        createdAt: Date.now() - 300000,
        messages: [
            {
                id: 'msg-eng-1',
                role: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Role"].USER,
                text: 'Why am I getting a 403 on the /users endpoint based on the spec?',
                timestamp: Date.now() - 300000
            }
        ]
    },
    // Legal Chats
    {
        id: 'session-4',
        workspaceId: 'ws-legal',
        title: 'NDA Clause Review',
        modelId: 'gemini-3-flash-preview',
        createdAt: Date.now() - 50000,
        messages: []
    }
];
const DUMMY_USERS = [
    {
        id: 'u-admin',
        name: 'Admin User',
        email: 'admin@local.host',
        role: 'admin',
        status: 'active'
    },
    {
        id: 'u2',
        name: 'Sarah Connor',
        email: 'sarah@skynet.com',
        role: 'editor',
        status: 'active'
    },
    {
        id: 'u3',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'viewer',
        status: 'invited'
    }
];
const DUMMY_GENERATED_FOLDERS = [
    {
        id: 'gf-1',
        name: 'Q1 Reports',
        dateCreated: Date.now() - 2000000,
        isStarred: true
    },
    {
        id: 'gf-2',
        name: 'Media Assets',
        dateCreated: Date.now() - 1000000
    },
    {
        id: 'gf-3',
        name: 'Drafts',
        dateCreated: Date.now() - 500000,
        parentId: 'gf-1'
    },
    {
        id: 'gf-4',
        name: 'Old Archives',
        dateCreated: Date.now() - 9000000,
        isTrashed: true
    }
];
const DUMMY_GENERATED_FILES = [
    {
        id: 'gen-1',
        name: 'Q1_Strategy_Overview.pdf',
        type: 'pdf',
        dateCreated: Date.now() - 1500000,
        size: 2450000,
        snippet: 'Comprehensive overview of Q1 marketing strategies including budget allocation...',
        folderId: 'gf-1',
        isStarred: true,
        ownerId: 'u-admin',
        sharedWith: []
    },
    {
        id: 'gen-2',
        name: 'Competitor_Analysis.docx',
        type: 'docx',
        dateCreated: Date.now() - 800000,
        size: 56000,
        snippet: 'Deep dive into top 3 competitors and their recent product launches...',
        isShared: true,
        ownerId: 'u-admin',
        sharedWith: []
    },
    // File shared WITH the user (owned by someone else)
    {
        id: 'gen-3',
        name: 'Skynet_Protocols_v1.pdf',
        type: 'pdf',
        dateCreated: Date.now() - 20000,
        size: 102400,
        snippet: 'Confidential system protocols for neural net deployment...',
        isShared: true,
        ownerId: 'u2',
        sharedWith: [
            'u-admin'
        ]
    }
];
const DUMMY_NOTIFICATIONS = [
    {
        id: 'n1',
        title: 'File Generated Successfully',
        message: 'Competitor_Analysis.docx is ready for download.',
        type: 'success',
        timestamp: Date.now() - 800000,
        read: false
    },
    {
        id: 'n2',
        title: 'File Generated Successfully',
        message: 'Q1_Strategy_Overview.pdf is ready for download.',
        type: 'success',
        timestamp: Date.now() - 1500000,
        read: true
    },
    {
        id: 'n3',
        title: 'Welcome to WorkPai',
        message: 'Get started by creating your first workspace.',
        type: 'info',
        timestamp: Date.now() - 10000000,
        read: true
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/mockApiService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MockApi",
    ()=>MockApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/v4.js [app-client] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/mockData.ts [app-client] (ecmascript)");
;
;
// Simulate network delay
const delay = (ms)=>new Promise((resolve)=>setTimeout(resolve, ms));
const SESSION_STORAGE_KEY = 'anything_llm_mock_sessions';
const WORKSPACE_STORAGE_KEY = 'anything_llm_mock_workspaces';
const GENERATED_FILES_KEY = 'anything_llm_mock_generated_files';
const GENERATED_FOLDERS_KEY = 'anything_llm_mock_generated_folders';
const NOTIFICATIONS_KEY = 'anything_llm_mock_notifications';
// --- Local Storage Helpers ---
const getLocalWorkspaces = ()=>{
    const stored = localStorage.getItem(WORKSPACE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DUMMY_WORKSPACES"];
};
const setLocalWorkspaces = (ws)=>{
    localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(ws));
};
const getLocalSessions = ()=>{
    const stored = localStorage.getItem(SESSION_STORAGE_KEY);
    return stored ? JSON.parse(stored) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DUMMY_SESSIONS"];
};
const setLocalSessions = (sessions)=>{
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessions));
};
const getLocalGeneratedFiles = ()=>{
    const stored = localStorage.getItem(GENERATED_FILES_KEY);
    return stored ? JSON.parse(stored) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DUMMY_GENERATED_FILES"];
};
const setLocalGeneratedFiles = (files)=>{
    localStorage.setItem(GENERATED_FILES_KEY, JSON.stringify(files));
};
const getLocalGeneratedFolders = ()=>{
    const stored = localStorage.getItem(GENERATED_FOLDERS_KEY);
    return stored ? JSON.parse(stored) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DUMMY_GENERATED_FOLDERS"];
};
const setLocalGeneratedFolders = (folders)=>{
    localStorage.setItem(GENERATED_FOLDERS_KEY, JSON.stringify(folders));
};
const getLocalNotifications = ()=>{
    const stored = localStorage.getItem(NOTIFICATIONS_KEY);
    return stored ? JSON.parse(stored) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DUMMY_NOTIFICATIONS"];
};
const setLocalNotifications = (notes)=>{
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notes));
};
const MockApi = {
    // --- Workspaces ---
    fetchWorkspaces: async ()=>{
        await delay(400);
        return getLocalWorkspaces();
    },
    createWorkspace: async (ws)=>{
        await delay(500);
        const all = getLocalWorkspaces();
        const updated = [
            ...all,
            ws
        ];
        setLocalWorkspaces(updated);
        return ws;
    },
    updateWorkspace: async (ws)=>{
        await delay(300);
        const all = getLocalWorkspaces();
        const updated = all.map((w)=>w.id === ws.id ? ws : w);
        setLocalWorkspaces(updated);
        return ws;
    },
    deleteWorkspace: async (id)=>{
        await delay(500);
        const all = getLocalWorkspaces();
        const updated = all.filter((w)=>w.id !== id);
        setLocalWorkspaces(updated);
        // Cascade delete sessions
        const sessions = getLocalSessions();
        const updatedSessions = sessions.filter((s)=>s.workspaceId !== id);
        setLocalSessions(updatedSessions);
        return true;
    },
    // --- Sessions (Chats) ---
    fetchSessions: async ()=>{
        await delay(300); // Simulate API latency
        return getLocalSessions();
    },
    createSession: async (session)=>{
        await delay(300);
        const sessions = getLocalSessions();
        const newSessions = [
            session,
            ...sessions
        ];
        setLocalSessions(newSessions);
        return session;
    },
    deleteSession: async (id)=>{
        await delay(300);
        const sessions = getLocalSessions();
        const newSessions = sessions.filter((s)=>s.id !== id);
        setLocalSessions(newSessions);
        return true;
    },
    updateSession: async (updatedSession)=>{
        await delay(200); // Faster update for chat feel
        const sessions = getLocalSessions();
        const newSessions = sessions.map((s)=>s.id === updatedSession.id ? updatedSession : s);
        setLocalSessions(newSessions);
        return updatedSession;
    },
    renameSession: async (id, newTitle)=>{
        await delay(300);
        const sessions = getLocalSessions();
        const session = sessions.find((s)=>s.id === id);
        if (session) {
            session.title = newTitle;
            setLocalSessions(sessions); // Save updated array
            return true;
        }
        return false;
    },
    // --- Generated Content (Files & Folders) ---
    fetchGeneratedFiles: async ()=>{
        await delay(600);
        return getLocalGeneratedFiles();
    },
    createGeneratedFile: async (file)=>{
        await delay(1200); // Simulate generation/conversion time
        const files = getLocalGeneratedFiles();
        // Default new file owner to Admin
        const fileWithOwner = {
            ...file,
            ownerId: 'u-admin',
            sharedWith: []
        };
        const newFiles = [
            fileWithOwner,
            ...files
        ];
        setLocalGeneratedFiles(newFiles);
        // TRIGGER NOTIFICATION
        const newNotification = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
            title: 'File Generated Successfully',
            message: `${file.name} is ready for download.`,
            type: 'success',
            timestamp: Date.now(),
            read: false
        };
        const notifications = getLocalNotifications();
        setLocalNotifications([
            newNotification,
            ...notifications
        ]);
        return fileWithOwner;
    },
    toggleFileStar: async (id)=>{
        await delay(200);
        const files = getLocalGeneratedFiles();
        const updated = files.map((f)=>f.id === id ? {
                ...f,
                isStarred: !f.isStarred
            } : f);
        setLocalGeneratedFiles(updated);
        return true;
    },
    shareFile: async (id, userIds)=>{
        await delay(500);
        const files = getLocalGeneratedFiles();
        const updated = files.map((f)=>{
            if (f.id === id) {
                const currentShared = f.sharedWith || [];
                // Add new unique IDs
                const newShared = [
                    ...new Set([
                        ...currentShared,
                        ...userIds
                    ])
                ];
                return {
                    ...f,
                    sharedWith: newShared,
                    isShared: true
                };
            }
            return f;
        });
        setLocalGeneratedFiles(updated);
        return true;
    },
    deleteGeneratedFile: async (id)=>{
        await delay(500);
        const files = getLocalGeneratedFiles();
        const newFiles = files.filter((f)=>f.id !== id);
        setLocalGeneratedFiles(newFiles);
        return true;
    },
    fetchGeneratedFolders: async ()=>{
        await delay(400);
        return getLocalGeneratedFolders();
    },
    createGeneratedFolder: async (folder)=>{
        await delay(300);
        const folders = getLocalGeneratedFolders();
        const newFolders = [
            ...folders,
            folder
        ];
        setLocalGeneratedFolders(newFolders);
        return folder;
    },
    deleteGeneratedFolder: async (id)=>{
        await delay(500);
        // Delete folder
        const folders = getLocalGeneratedFolders();
        const newFolders = folders.filter((f)=>f.id !== id);
        setLocalGeneratedFolders(newFolders);
        // Cascade delete files in that folder
        const files = getLocalGeneratedFiles();
        const newFiles = files.filter((f)=>f.folderId !== id);
        setLocalGeneratedFiles(newFiles);
        return true;
    },
    // --- Notifications ---
    fetchNotifications: async ()=>{
        // Very short delay for notification check
        return getLocalNotifications();
    },
    markNotificationRead: async (id)=>{
        const notes = getLocalNotifications();
        const updated = notes.map((n)=>n.id === id ? {
                ...n,
                read: true
            } : n);
        setLocalNotifications(updated);
    },
    markAllNotificationsRead: async ()=>{
        const notes = getLocalNotifications();
        const updated = notes.map((n)=>({
                ...n,
                read: true
            }));
        setLocalNotifications(updated);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/authService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthService",
    ()=>AuthService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// Mock user data to simulate a database response
const MOCK_USER = {
    id: 'u-admin',
    name: 'Admin User',
    email: 'admin@local.host',
    role: 'admin',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=f97316&color=fff'
};
const storage_auth_name = 'anything_llm_auth';
const storage_token_name = 'auth_token';
const AuthService = {
    login: async (email, password)=>{
        try {
            const baseUrl = ("TURBOPACK compile-time value", "/restapi") || '/restapi';
            const response = await fetch(`${baseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }
            // Keep client-side storage logic for now
            document.cookie = `${storage_token_name}=${data.token}; path=/; max-age=86400; SameSite=Lax`;
            localStorage.setItem(storage_auth_name, 'true');
            return {
                user: data.user,
                token: data.token
            };
        } catch (error) {
            throw new Error(error.message || 'Network error');
        }
    },
    loginWithGoogle: async ()=>{
        try {
            const baseUrl = ("TURBOPACK compile-time value", "/restapi") || '/restapi';
            const response = await fetch(`${baseUrl}/login-google`, {
                method: 'POST'
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Google login failed');
            }
            document.cookie = `${storage_token_name}=${data.token}; path=/; max-age=86400; SameSite=Lax`;
            localStorage.setItem(storage_auth_name, 'true');
            return {
                user: data.user,
                token: data.token
            };
        } catch (error) {
            throw new Error(error.message || 'Google login error');
        }
    },
    loginDemo: async ()=>{
        try {
            const baseUrl = ("TURBOPACK compile-time value", "/restapi") || '/restapi';
            const response = await fetch(`${baseUrl}/login-demo`, {
                method: 'POST'
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Demo login failed');
            }
            document.cookie = `${storage_token_name}=${data.token}; path=/; max-age=86400; SameSite=Lax`;
            localStorage.setItem(storage_auth_name, 'true');
            return {
                user: data.user,
                token: data.token
            };
        } catch (error) {
            throw new Error(error.message || 'Demo login error');
        }
    },
    logout: ()=>{
        document.cookie = `${storage_token_name}=; path=/; max-age=0; SameSite=Lax`;
        localStorage.removeItem(storage_auth_name);
        window.location.href = '/login';
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AVAILABLE_MODELS",
    ()=>AVAILABLE_MODELS,
    "DEFAULT_SYSTEM_INSTRUCTION",
    ()=>DEFAULT_SYSTEM_INSTRUCTION,
    "PLACEHOLDER_QUESTIONS",
    ()=>PLACEHOLDER_QUESTIONS
]);
const AVAILABLE_MODELS = [
    {
        id: 'gemini-3-flash-preview',
        name: 'Gemini 3 Flash',
        description: 'Fastest and most cost-effective model for general tasks.',
        maxOutputTokens: 8192
    },
    {
        id: 'gemini-3-pro-preview',
        name: 'Gemini 3 Pro',
        description: 'Best performing model for complex reasoning and coding.',
        maxOutputTokens: 8192
    },
    {
        id: 'gemini-2.5-flash-image',
        name: 'Gemini 2.5 Flash Image',
        description: 'Specialized for multimodal image tasks.'
    }
];
const DEFAULT_SYSTEM_INSTRUCTION = `You are a helpful, intelligent assistant in the "WorkPai" frontend interface.
Your goal is to provide accurate, concise, and well-formatted answers.
- Use Markdown for formatting.
- If writing code, use syntax highlighting.
- Be friendly but professional.`;
const PLACEHOLDER_QUESTIONS = [
    "Explain quantum entanglement like I'm 5",
    "Write a Python script to scrape a website",
    "Help me plan a marketing strategy for coffee",
    "Analyze this code snippet for bugs"
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(protected)/dashboard/DashboardContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DashboardProvider",
    ()=>DashboardProvider,
    "useDashboard",
    ()=>useDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/v4.js [app-client] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$geminiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/geminiService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/mockApiService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/authService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
const SETTINGS_KEY = 'anything_llm_settings';
const DashboardContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function DashboardProvider({ children }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Layout State
    const [isSidebarOpen, setIsSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isContextOpen, setIsContextOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [toast, setToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isDarkMode, setIsDarkMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // App State
    const [workspaces, setWorkspaces] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentWorkspaceId, setCurrentWorkspaceId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sessions, setSessions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentSessionId, setCurrentSessionId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoadingData, setIsLoadingData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Streaming state
    const [isStreaming, setIsStreaming] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [streamingContent, setStreamingContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Settings
    const [settings, setSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        defaultModelId: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AVAILABLE_MODELS"][0].id,
        systemInstruction: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SYSTEM_INSTRUCTION"],
        temperature: 0.7
    });
    // Theme Toggle
    const toggleTheme = ()=>{
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardProvider.useEffect": ()=>{
            if (document.documentElement.classList.contains('dark')) {
                setIsDarkMode(true);
            } else {
                setIsDarkMode(false);
            }
        }
    }["DashboardProvider.useEffect"], []);
    // Logout Wrapper
    const handleLogout = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthService"].logout();
    };
    // Load Initial Data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardProvider.useEffect": ()=>{
            const fetchData = {
                "DashboardProvider.useEffect.fetchData": async ()=>{
                    setIsLoadingData(true);
                    try {
                        const [fetchedWorkspaces, fetchedSessions] = await Promise.all([
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MockApi"].fetchWorkspaces(),
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MockApi"].fetchSessions()
                        ]);
                        setWorkspaces(fetchedWorkspaces);
                        setSessions(fetchedSessions);
                        let initialWsId = fetchedWorkspaces.length > 0 ? fetchedWorkspaces[0].id : null;
                        setCurrentWorkspaceId(initialWsId);
                        if (initialWsId) {
                            const workspaceSessions = fetchedSessions.filter({
                                "DashboardProvider.useEffect.fetchData.workspaceSessions": (s)=>s.workspaceId === initialWsId
                            }["DashboardProvider.useEffect.fetchData.workspaceSessions"]);
                            if (workspaceSessions.length > 0) {
                                const sorted = workspaceSessions.sort({
                                    "DashboardProvider.useEffect.fetchData.sorted": (a, b)=>b.createdAt - a.createdAt
                                }["DashboardProvider.useEffect.fetchData.sorted"]);
                                setCurrentSessionId(sorted[0].id);
                            } else {
                                setCurrentSessionId(null);
                            }
                        }
                    } catch (err) {
                        console.error("Failed to fetch data", err);
                    } finally{
                        setIsLoadingData(false);
                    }
                }
            }["DashboardProvider.useEffect.fetchData"];
            fetchData();
            const savedSettings = localStorage.getItem(SETTINGS_KEY);
            if (savedSettings) {
                setSettings(JSON.parse(savedSettings));
            }
        }
    }["DashboardProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardProvider.useEffect": ()=>{
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        }
    }["DashboardProvider.useEffect"], [
        settings
    ]);
    // Derived State
    const currentWorkspace = workspaces.find((w)=>w.id === currentWorkspaceId);
    const filteredSessions = sessions.filter((s)=>s.workspaceId === currentWorkspaceId);
    const currentSession = sessions.find((s)=>s.id === currentSessionId);
    const currentContextItems = currentWorkspace?.contextItems || [];
    const updateSessionState = (updatedSession)=>{
        setSessions((prev)=>{
            const filtered = prev.filter((s)=>s.id !== updatedSession.id);
            return [
                updatedSession,
                ...filtered
            ];
        });
    };
    const updateWorkspaceState = (updatedWs)=>{
        setWorkspaces((prev)=>prev.map((w)=>w.id === updatedWs.id ? updatedWs : w));
    };
    const handleSelectWorkspace = (id)=>{
        setCurrentWorkspaceId(id);
        const wsSessions = sessions.filter((s)=>s.workspaceId === id).sort((a, b)=>b.createdAt - a.createdAt);
        if (wsSessions.length > 0) {
            setCurrentSessionId(wsSessions[0].id);
        } else {
            setCurrentSessionId(null);
        }
    };
    const createNewSession = async ()=>{
        if (!currentWorkspaceId) return;
        const newSession = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
            workspaceId: currentWorkspaceId,
            title: 'New Chat',
            messages: [],
            modelId: settings.defaultModelId,
            createdAt: Date.now()
        };
        setSessions((prev)=>[
                newSession,
                ...prev
            ]);
        setCurrentSessionId(newSession.id);
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MockApi"].createSession(newSession);
    };
    const deleteSession = async (id, e)=>{
        e.stopPropagation();
        setSessions((prev)=>prev.filter((s)=>s.id !== id));
        if (currentSessionId === id) {
            const remaining = sessions.filter((s)=>s.id !== id && s.workspaceId === currentWorkspaceId);
            if (remaining.length > 0) setCurrentSessionId(remaining[0].id);
            else setCurrentSessionId(null);
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MockApi"].deleteSession(id);
    };
    const renameSession = async (id, newTitle)=>{
        setSessions((prev)=>prev.map((s)=>s.id === id ? {
                    ...s,
                    title: newTitle
                } : s));
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MockApi"].renameSession(id, newTitle);
    };
    const handleSendMessage = async (text, attachments)=>{
        if (!currentWorkspaceId) return;
        let sessionToUse = currentSession;
        let isNewSession = false;
        if (!sessionToUse) {
            const newId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
            const newSession = {
                id: newId,
                workspaceId: currentWorkspaceId,
                title: text.slice(0, 30) || 'New Chat',
                messages: [],
                modelId: settings.defaultModelId,
                createdAt: Date.now()
            };
            sessionToUse = newSession;
            isNewSession = true;
            setSessions((prev)=>[
                    newSession,
                    ...prev
                ]);
            setCurrentSessionId(newId);
        }
        const session = sessionToUse;
        const userMessage = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
            role: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Role"].USER,
            text: text,
            attachments: attachments,
            timestamp: Date.now()
        };
        const updatedSession = {
            ...session,
            title: session.messages.length === 0 ? text.slice(0, 30) || 'New Chat' : session.title,
            messages: [
                ...session.messages,
                userMessage
            ]
        };
        updateSessionState(updatedSession);
        setIsStreaming(true);
        setStreamingContent('');
        if (isNewSession) await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MockApi"].createSession(updatedSession);
        else await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MockApi"].updateSession(updatedSession);
        try {
            const activeContext = (currentWorkspace?.contextItems || []).filter((item)=>item.isActive !== false);
            const wsSystemInstruction = currentWorkspace?.systemInstruction || settings.systemInstruction;
            const systemWithContext = `${wsSystemInstruction}\n\n[CONTEXT DOCUMENTS FROM WORKSPACE "${currentWorkspace?.title}"]: ${activeContext.map((i)=>i.name).join(', ')}`;
            const responseText = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$geminiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["streamChatResponse"])(session.modelId, updatedSession.messages, text, attachments, systemWithContext, (chunkText)=>{
                setStreamingContent(chunkText);
            });
            const botMessage = {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                role: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Role"].MODEL,
                text: responseText,
                timestamp: Date.now()
            };
            const finalSession = {
                ...updatedSession,
                messages: [
                    ...updatedSession.messages,
                    botMessage
                ]
            };
            updateSessionState(finalSession);
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MockApi"].updateSession(finalSession);
        } catch (error) {
            console.error("Chat error", error);
            const errorMessage = {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                role: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Role"].MODEL,
                text: "System Error: Unable to reach inference endpoint. Please check your API Key.",
                timestamp: Date.now(),
                isError: true
            };
            const errorSession = {
                ...updatedSession,
                messages: [
                    ...updatedSession.messages,
                    errorMessage
                ]
            };
            updateSessionState(errorSession);
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MockApi"].updateSession(errorSession);
        } finally{
            setIsStreaming(false);
            setStreamingContent('');
        }
    };
    const handleGenerateDocument = async (messageId, format)=>{
        const msg = currentSession?.messages.find((m)=>m.id === messageId);
        if (!msg) return;
        const newFile = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
            name: `Generated_${format.toUpperCase()}_${new Date().getTime()}.${format}`,
            type: format,
            dateCreated: Date.now(),
            size: Math.floor(Math.random() * 5000000) + 1024,
            snippet: msg.text.slice(0, 100) + '...'
        };
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MockApi"].createGeneratedFile(newFile);
        setToast({
            message: 'File Generated Successfully',
            type: 'success',
            subMessage: `${newFile.name} has been saved to your Generated Content.`
        });
    };
    const handleRemoveContextItem = async (id)=>{
        if (!currentWorkspace) return;
        const updatedContextItems = currentWorkspace.contextItems.filter((i)=>i.id !== id);
        const updatedWs = {
            ...currentWorkspace,
            contextItems: updatedContextItems
        };
        updateWorkspaceState(updatedWs);
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MockApi"].updateWorkspace(updatedWs);
    };
    const handleToggleContextItemActive = async (id)=>{
        if (!currentWorkspace) return;
        const updatedContextItems = currentWorkspace.contextItems.map((item)=>item.id === id ? {
                ...item,
                isActive: item.isActive === false ? true : false
            } : item);
        const updatedWs = {
            ...currentWorkspace,
            contextItems: updatedContextItems
        };
        updateWorkspaceState(updatedWs);
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MockApi"].updateWorkspace(updatedWs);
    };
    const updateThreshold = (val)=>{
        if (currentWorkspace) {
            const updated = {
                ...currentWorkspace,
                similarityThreshold: val
            };
            updateWorkspaceState(updated);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mockApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MockApi"].updateWorkspace(updated);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DashboardContext.Provider, {
        value: {
            isSidebarOpen,
            setIsSidebarOpen,
            isContextOpen,
            setIsContextOpen,
            isDarkMode,
            toggleTheme,
            toast,
            setToast,
            workspaces,
            currentWorkspaceId,
            setCurrentWorkspaceId,
            sessions,
            currentSessionId,
            setCurrentSessionId,
            isLoadingData,
            isStreaming,
            streamingContent,
            settings,
            setSettings,
            currentWorkspace,
            filteredSessions,
            currentSession,
            currentContextItems,
            handleSelectWorkspace,
            createNewSession,
            deleteSession,
            renameSession,
            handleSendMessage,
            handleGenerateDocument,
            handleRemoveContextItem,
            handleToggleContextItemActive,
            updateThreshold,
            handleLogout
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/app/(protected)/dashboard/DashboardContext.tsx",
        lineNumber: 354,
        columnNumber: 5
    }, this);
}
_s(DashboardProvider, "tESS9g7J8tfziNF4MJDNDgRCYLs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = DashboardProvider;
function useDashboard() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(DashboardContext);
    if (context === undefined) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
}
_s1(useDashboard, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "DashboardProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(protected)/dashboard/layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$dashboard$2f$_components$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(protected)/dashboard/_components/Sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$dashboard$2f$_components$2f$ContextSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(protected)/dashboard/_components/ContextSidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Shared$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Shared/Toast.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$dashboard$2f$DashboardContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(protected)/dashboard/DashboardContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function DashboardShell({ children }) {
    _s();
    const { isSidebarOpen, setIsSidebarOpen, isContextOpen, setIsContextOpen, isDarkMode, toggleTheme, workspaces, currentWorkspaceId, handleSelectWorkspace, filteredSessions, currentSessionId, setCurrentSessionId, createNewSession, deleteSession, renameSession, handleLogout, currentContextItems, currentWorkspace, updateThreshold, handleRemoveContextItem, handleToggleContextItemActive, currentSession, settings, toast, setToast, isLoadingData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$dashboard$2f$DashboardContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboard"])();
    if (isLoadingData) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-charcoal-950 text-accent-500",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-10 h-10 border-4 border-charcoal-200 dark:border-charcoal-800 border-t-accent-500 rounded-full animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(protected)/dashboard/layout.tsx",
                        lineNumber: 28,
                        columnNumber: 12
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-charcoal-500 dark:text-charcoal-400 text-sm animate-pulse",
                        children: "Loading Workspace..."
                    }, void 0, false, {
                        fileName: "[project]/src/app/(protected)/dashboard/layout.tsx",
                        lineNumber: 29,
                        columnNumber: 12
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(protected)/dashboard/layout.tsx",
                lineNumber: 27,
                columnNumber: 10
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(protected)/dashboard/layout.tsx",
            lineNumber: 26,
            columnNumber: 8
        }, this);
    }
    const currentModelName = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AVAILABLE_MODELS"].find((m)=>m.id === (currentSession?.modelId || settings.defaultModelId))?.name;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen w-full overflow-hidden bg-white dark:bg-charcoal-950 transition-colors duration-300",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$dashboard$2f$_components$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sidebar"], {
                workspaces: workspaces,
                currentWorkspaceId: currentWorkspaceId,
                onSelectWorkspace: handleSelectWorkspace,
                sessions: filteredSessions,
                currentSessionId: currentSessionId,
                onNewChat: createNewSession,
                onSelectSession: setCurrentSessionId,
                onDeleteSession: deleteSession,
                onRenameSession: renameSession,
                isOpen: isSidebarOpen,
                onToggle: ()=>setIsSidebarOpen(!isSidebarOpen),
                onLogout: handleLogout,
                onOpenSwitchModal: ()=>{},
                isDarkMode: isDarkMode,
                onToggleTheme: toggleTheme
            }, void 0, false, {
                fileName: "[project]/src/app/(protected)/dashboard/layout.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col min-w-0 bg-white dark:bg-charcoal-900 transition-colors duration-300 relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "h-16 border-b border-gray-200 dark:border-charcoal-800 flex items-center justify-between px-6 shrink-0 bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-md z-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4 min-w-0",
                                children: [
                                    !isSidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsSidebarOpen(true),
                                        className: "p-2 hover:bg-gray-100 dark:hover:bg-charcoal-800 rounded-lg text-charcoal-500 transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-5 h-0.5 bg-current mb-1"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(protected)/dashboard/layout.tsx",
                                                lineNumber: 65,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-5 h-0.5 bg-current mb-1"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(protected)/dashboard/layout.tsx",
                                                lineNumber: 66,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-5 h-0.5 bg-current"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(protected)/dashboard/layout.tsx",
                                                lineNumber: 67,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(protected)/dashboard/layout.tsx",
                                        lineNumber: 61,
                                        columnNumber: 18
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-sm font-bold text-slate-800 dark:text-white truncate",
                                                children: currentSession?.title || 'New Chat'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(protected)/dashboard/layout.tsx",
                                                lineNumber: 71,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] text-accent-600 dark:text-accent-400 font-bold uppercase tracking-widest",
                                                    children: currentModelName || 'Select Model'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(protected)/dashboard/layout.tsx",
                                                    lineNumber: 75,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(protected)/dashboard/layout.tsx",
                                                lineNumber: 74,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(protected)/dashboard/layout.tsx",
                                        lineNumber: 70,
                                        columnNumber: 14
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(protected)/dashboard/layout.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsContextOpen(!isContextOpen),
                                    className: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${isContextOpen ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/20' : 'bg-gray-100 dark:bg-charcoal-800 text-charcoal-500 hover:bg-gray-200 dark:hover:bg-charcoal-700'}`,
                                    children: [
                                        currentContextItems.filter((i)=>i.isActive !== false).length,
                                        " Active Context"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(protected)/dashboard/layout.tsx",
                                    lineNumber: 81,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(protected)/dashboard/layout.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(protected)/dashboard/layout.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-1 overflow-hidden flex flex-col relative",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/app/(protected)/dashboard/layout.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(protected)/dashboard/layout.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$dashboard$2f$_components$2f$ContextSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContextSidebar"], {
                isOpen: isContextOpen,
                contextItems: currentContextItems,
                similarityThreshold: currentWorkspace?.similarityThreshold || 0.7,
                onUpdateThreshold: updateThreshold,
                onRemoveItem: handleRemoveContextItem,
                onToggleActive: handleToggleContextItemActive
            }, void 0, false, {
                fileName: "[project]/src/app/(protected)/dashboard/layout.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Shared$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toast"], {
                message: toast?.message || null,
                type: toast?.type,
                subMessage: toast?.subMessage,
                onClose: ()=>setToast(null)
            }, void 0, false, {
                fileName: "[project]/src/app/(protected)/dashboard/layout.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(protected)/dashboard/layout.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_s(DashboardShell, "rZpOCZ1Jou0WruKLCjEI+5O8Fdw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$dashboard$2f$DashboardContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboard"]
    ];
});
_c = DashboardShell;
function DashboardLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$dashboard$2f$DashboardContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DashboardShell, {
            children: children
        }, void 0, false, {
            fileName: "[project]/src/app/(protected)/dashboard/layout.tsx",
            lineNumber: 117,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(protected)/dashboard/layout.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, this);
}
_c1 = DashboardLayout;
var _c, _c1;
__turbopack_context__.k.register(_c, "DashboardShell");
__turbopack_context__.k.register(_c1, "DashboardLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_5a0d723a._.js.map