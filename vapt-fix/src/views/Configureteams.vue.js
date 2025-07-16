import Stepper from '../components/Stepper.vue';
import Vue3Select from 'vue3-select';
import 'vue3-select/dist/vue3-select.css';
export default (await import('vue')).defineComponent({
    name: 'LocationView',
    components: {
        Stepper,
        Vue3Select
    },
    data() {
        return {
            activeTab: 'internal-technical',
            teamData: {
                'internal-technical': [
                    { role: 'Security Analyst', email: 'email@company.com', location: 'Greece' },
                    { role: 'Network Engineer', email: 'email@company.com', location: 'Greece' },
                    { role: 'Network Engineer', email: 'email@company.com', location: 'Greece' },
                    { role: 'Network Engineer', email: 'email@company.com', location: 'Greece' },
                    { role: 'Network Engineer', email: 'email@company.com', location: 'Greece' },
                ],
                'internal-management': [
                    { role: 'Manager', email: 'manager@company.com', location: 'USA' },
                ],
                'external-technical': [
                    { role: 'External Engineer', email: 'eng@vendor.com', location: 'Germany' },
                ],
                'external-management': [
                    { role: 'Vendor Manager', email: 'vendor@company.com', location: 'France' },
                ]
            },
            showPopover: false
        };
    },
    methods: {
        setActive(tab) {
            this.activeTab = tab;
        }
    },
    methods: {
        setActive(tab) {
            this.activeTab = tab;
        },
    },
});
const __VLS_ctx = {};
const __VLS_componentsOption = {
    Stepper,
    Vue3Select
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "bg-light" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "container-fluid" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-lg-2" },
});
const __VLS_0 = {}.Stepper;
/** @type {[typeof __VLS_components.Stepper, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-lg-10 my-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "container-fluid welcome-bg py-5 px-5" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-1 d-flex justify-content-center align-items-center mb-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({
    src: "../assets/images/waving-hand.png",
    alt: "",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-11" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "fw-semibold welcome-head" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "welcome-subhead" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "row mt-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-lg-12 add-users py-4 px-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-1 d-flex justify-content-center align-items-center location-icon" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
    ...{ class: "bi bi-person-fill fs-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-lg-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h5, __VLS_intrinsicElements.h5)({
    ...{ class: "fw-semibold" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "d-flex justify-content-start align-items-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-muted location-subtext" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "position-relative" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mb-3 ms-3" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.showPopover = true;
        } },
    src: "../assets/images/info.png",
    alt: "Info",
    ...{ class: "info-icon" },
});
if (__VLS_ctx.showPopover) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "custom-popover shadow-sm" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "popover-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.showPopover))
                    return;
                __VLS_ctx.showPopover = false;
            } },
        ...{ class: "close-btn" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "mb-0" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "popover-arrow" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "row mb-5 pb-5" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-md-3 border-end px-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "bg-light p-2 fw-semibold" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mt-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({
    ...{ class: "text-muted d-block mb-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
    ...{ class: "list-unstyled" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.setActive('internal-technical');
        } },
    ...{ class: (['team-tab', __VLS_ctx.activeTab === 'internal-technical' ? 'active' : '']) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.setActive('internal-management');
        } },
    ...{ class: (['team-tab', __VLS_ctx.activeTab === 'internal-management' ? 'active' : '']) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({
    ...{ class: "text-muted d-block mt-4 mb-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
    ...{ class: "list-unstyled" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.setActive('external-technical');
        } },
    ...{ class: (['team-tab', __VLS_ctx.activeTab === 'external-technical' ? 'active' : '']) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.setActive('external-management');
        } },
    ...{ class: (['team-tab', __VLS_ctx.activeTab === 'external-management' ? 'active' : '']) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-md-9" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
    ...{ class: "table align-middle fixed-table table-borderless" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({
    ...{ class: "table-light" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    ...{ class: "col-role" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    ...{ class: "col-member" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    ...{ class: "col-location" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
for (const [member, index] of __VLS_getVForSourceType((__VLS_ctx.teamData[__VLS_ctx.activeTab]))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
        key: (index),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "col-role" },
    });
    (member.role);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "col-member" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "input-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "email",
        ...{ class: "form-control rounded-input-form" },
        placeholder: (member.email),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "input-group-text bg-white border-start-0" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
        ...{ class: "bi bi-chevron-down" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "col-location" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        ...{ class: "form-select rounded-input-form" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({});
    (member.location);
}
/** @type {__VLS_StyleScopedClasses['bg-light']} */ ;
/** @type {__VLS_StyleScopedClasses['container-fluid']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['col-lg-2']} */ ;
/** @type {__VLS_StyleScopedClasses['col-lg-10']} */ ;
/** @type {__VLS_StyleScopedClasses['my-3']} */ ;
/** @type {__VLS_StyleScopedClasses['container-fluid']} */ ;
/** @type {__VLS_StyleScopedClasses['welcome-bg']} */ ;
/** @type {__VLS_StyleScopedClasses['py-5']} */ ;
/** @type {__VLS_StyleScopedClasses['px-5']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['col-1']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-content-center']} */ ;
/** @type {__VLS_StyleScopedClasses['align-items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['col-11']} */ ;
/** @type {__VLS_StyleScopedClasses['fw-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['welcome-head']} */ ;
/** @type {__VLS_StyleScopedClasses['welcome-subhead']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['col-lg-12']} */ ;
/** @type {__VLS_StyleScopedClasses['add-users']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['col-1']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-content-center']} */ ;
/** @type {__VLS_StyleScopedClasses['align-items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['location-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['bi']} */ ;
/** @type {__VLS_StyleScopedClasses['bi-person-fill']} */ ;
/** @type {__VLS_StyleScopedClasses['fs-4']} */ ;
/** @type {__VLS_StyleScopedClasses['col-lg-4']} */ ;
/** @type {__VLS_StyleScopedClasses['fw-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-content-start']} */ ;
/** @type {__VLS_StyleScopedClasses['align-items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['location-subtext']} */ ;
/** @type {__VLS_StyleScopedClasses['position-relative']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['ms-3']} */ ;
/** @type {__VLS_StyleScopedClasses['info-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-popover']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['popover-content']} */ ;
/** @type {__VLS_StyleScopedClasses['close-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-0']} */ ;
/** @type {__VLS_StyleScopedClasses['popover-arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['col-md-3']} */ ;
/** @type {__VLS_StyleScopedClasses['border-end']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-light']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['fw-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['d-block']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['list-unstyled']} */ ;
/** @type {__VLS_StyleScopedClasses['team-tab']} */ ;
/** @type {__VLS_StyleScopedClasses['team-tab']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['d-block']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['list-unstyled']} */ ;
/** @type {__VLS_StyleScopedClasses['team-tab']} */ ;
/** @type {__VLS_StyleScopedClasses['team-tab']} */ ;
/** @type {__VLS_StyleScopedClasses['col-md-9']} */ ;
/** @type {__VLS_StyleScopedClasses['table']} */ ;
/** @type {__VLS_StyleScopedClasses['align-middle']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed-table']} */ ;
/** @type {__VLS_StyleScopedClasses['table-borderless']} */ ;
/** @type {__VLS_StyleScopedClasses['table-light']} */ ;
/** @type {__VLS_StyleScopedClasses['col-role']} */ ;
/** @type {__VLS_StyleScopedClasses['col-member']} */ ;
/** @type {__VLS_StyleScopedClasses['col-location']} */ ;
/** @type {__VLS_StyleScopedClasses['col-role']} */ ;
/** @type {__VLS_StyleScopedClasses['col-member']} */ ;
/** @type {__VLS_StyleScopedClasses['input-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-input-form']} */ ;
/** @type {__VLS_StyleScopedClasses['input-group-text']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['border-start-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bi']} */ ;
/** @type {__VLS_StyleScopedClasses['bi-chevron-down']} */ ;
/** @type {__VLS_StyleScopedClasses['col-location']} */ ;
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-input-form']} */ ;
var __VLS_dollars;
let __VLS_self;
