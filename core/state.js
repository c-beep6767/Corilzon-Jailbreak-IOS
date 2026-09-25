"use strict";

/*
 * =========================================================
 * CORILZON STATE
 * =========================================================
 *
 * Stato persistente della simulazione.
 *
 * IMPORTANTE:
 * bootPending è FALSE all'avvio.
 *
 * Il boot viene richiesto solamente quando una funzione
 * esplicita, come l'Installer al 100%, lo richiede.
 */

const CORILZON_STATE_KEY = "corilzon_core_state";

const CORILZON_DEFAULT_STATE = {
    jailbreakActive: false,
    developerMode: false,
    installerCompleted: false,

    bootPending: false,
    bootReason: "",

    iosVersion: "27.0",
    corilzonVersion: "1.0.0",

    devicePoweredOff: false,
    lastBootReason: ""
};


function loadCorilzonState() {

    try {

        const saved =
            localStorage.getItem(
                CORILZON_STATE_KEY
            );

        if (!saved) {

            return {
                ...CORILZON_DEFAULT_STATE
            };
        }

        const parsed =
            JSON.parse(saved);

        return {
            ...CORILZON_DEFAULT_STATE,
            ...parsed
        };

    } catch (error) {

        console.warn(
            "Corilzon State: impossibile caricare lo stato.",
            error
        );

        return {
            ...CORILZON_DEFAULT_STATE
        };
    }
}


function saveCorilzonState(state) {

    localStorage.setItem(
        CORILZON_STATE_KEY,
        JSON.stringify(state)
    );
}


function setCorilzonState(property, value) {

    const state =
        loadCorilzonState();

    state[property] =
        value;

    saveCorilzonState(state);

    return state;
}


function enableDeveloperMode() {

    const state =
        loadCorilzonState();

    state.developerMode =
        true;

    saveCorilzonState(state);

    return state;
}


/*
 * =========================================================
 * INSTALLER
 * =========================================================
 *
 * Questa funzione viene chiamata quando la barra
 * dell'Installer arriva al 100%.
 */

function completeCorilzonInstaller() {

    const state =
        loadCorilzonState();

    state.installerCompleted =
        true;

    state.bootPending =
        true;

    state.bootReason =
        "installer";

    state.lastBootReason =
        "installer";

    saveCorilzonState(state);

    return state;
}


/*
 * =========================================================
 * BOOT REQUEST
 * =========================================================
 */

function requestCorilzonBoot(reason) {

    const state =
        loadCorilzonState();

    state.bootPending =
        true;

    state.bootReason =
        reason || "manual";

    state.lastBootReason =
        state.bootReason;

    saveCorilzonState(state);

    return state;
}


function consumeCorilzonBoot() {

    const state =
        loadCorilzonState();

    const pending =
        state.bootPending === true;

    const reason =
        state.bootReason ||
        "unknown";

    state.bootPending =
        false;

    state.bootReason =
        "";

    saveCorilzonState(state);

    return {
        pending,
        reason
    };
}


/*
 * =========================================================
 * POWER SIMULATION
 * =========================================================
 */

function simulatePowerOff() {

    const state =
        loadCorilzonState();

    state.devicePoweredOff =
        true;

    saveCorilzonState(state);

    return state;
}


function simulatePowerOn() {

    const state =
        loadCorilzonState();

    state.devicePoweredOff =
        false;

    state.bootPending =
        true;

    state.bootReason =
        "power-on";

    state.lastBootReason =
        "power-on";

    saveCorilzonState(state);

    return state;
}


/*
 * =========================================================
 * iOS UPDATE SIMULATION
 * =========================================================
 */

function simulateIOSUpdate(newVersion) {

    const state =
        loadCorilzonState();

    if (newVersion) {

        state.iosVersion =
            newVersion;
    }

    state.bootPending =
        true;

    state.bootReason =
        "ios-update";

    state.lastBootReason =
        "ios-update";

    saveCorilzonState(state);

    return state;
}


/*
 * =========================================================
 * CORILZON UPDATE SIMULATION
 * =========================================================
 */

function simulateCorilzonUpdate(newVersion) {

    const state =
        loadCorilzonState();

    if (newVersion) {

        state.corilzonVersion =
            newVersion;
    }

    state.bootPending =
        true;

    state.bootReason =
        "corilzon-update";

    state.lastBootReason =
        "corilzon-update";

    saveCorilzonState(state);

    return state;
}