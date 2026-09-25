/* =========================================================
   CORILZON CORE STATE
   Gestione stato della simulazione
========================================================= */

const CORILZON_STATE_KEY = "corilzon_state";

const DEFAULT_CORILZON_STATE = {
    jailbreakActive: false,
    developerMode: false,

    installerCompleted: false,

    /*
       IMPORTANTE:
       false all'avvio.
       Il boot NON deve partire quando si apre Corilzon.
    */
    bootPending: false,

    iosVersion: "27.0",
    corilzonVersion: "1.0.0",

    lastBootReason: "",

    devicePoweredOff: false
};


/* =========================================================
   LOAD
========================================================= */

function loadCorilzonState() {

    try {

        const saved =
            localStorage.getItem(CORILZON_STATE_KEY);

        if (!saved) {

            const initial =
                { ...DEFAULT_CORILZON_STATE };

            localStorage.setItem(
                CORILZON_STATE_KEY,
                JSON.stringify(initial)
            );

            return initial;
        }

        const parsed = JSON.parse(saved);

        return {
            ...DEFAULT_CORILZON_STATE,
            ...parsed
        };

    } catch (error) {

        console.warn(
            "Corilzon State: impossibile leggere lo stato.",
            error
        );

        return {
            ...DEFAULT_CORILZON_STATE
        };
    }
}


/* =========================================================
   SAVE
========================================================= */

function saveCorilzonState(state) {

    try {

        localStorage.setItem(
            CORILZON_STATE_KEY,
            JSON.stringify(state)
        );

    } catch (error) {

        console.warn(
            "Corilzon State: impossibile salvare lo stato.",
            error
        );
    }
}


/* =========================================================
   SET PROPERTY
========================================================= */

function setCorilzonState(property, value) {

    const state = loadCorilzonState();

    state[property] = value;

    saveCorilzonState(state);

    return state;
}


/* =========================================================
   JAILBREAK
========================================================= */

function setJailbreakActive(active) {

    return setCorilzonState(
        "jailbreakActive",
        Boolean(active)
    );
}


/* =========================================================
   DEVELOPER MODE
========================================================= */

function enableDeveloperMode() {

    return setCorilzonState(
        "developerMode",
        true
    );
}


/* =========================================================
   INSTALLER COMPLETED
========================================================= */

function completeCorilzonInstaller() {

    const state = loadCorilzonState();

    state.installerCompleted = true;

    /*
       Il boot viene richiesto SOLO adesso,
       cioè quando l'Installer arriva al 100%.
    */

    state.bootPending = true;

    state.lastBootReason =
        "Corilzon Installer completed";

    state.devicePoweredOff = true;

    saveCorilzonState(state);


    /*
       Avvisa boot.js.

       Questo permette di lasciare settings.html
       completamente invariato.
    */

    try {

        window.dispatchEvent(
            new CustomEvent(
                "corilzon-installer-complete"
            )
        );

    } catch (error) {

        console.warn(
            "Corilzon: impossibile inviare evento installer.",
            error
        );
    }

    return state;
}


/* =========================================================
   REQUEST BOOT
========================================================= */

function requestCorilzonBoot(reason) {

    const state = loadCorilzonState();

    state.bootPending = true;

    state.lastBootReason =
        reason || "manual";

    saveCorilzonState(state);

    return state;
}


/* =========================================================
   CONSUME BOOT REQUEST
========================================================= */

function consumeCorilzonBoot() {

    const state = loadCorilzonState();

    const pending =
        state.bootPending === true;

    if (pending) {

        state.bootPending = false;

        saveCorilzonState(state);
    }

    return pending;
}


/* =========================================================
   POWER OFF
========================================================= */

function simulatePowerOff() {

    const state = loadCorilzonState();

    state.devicePoweredOff = true;

    saveCorilzonState(state);

    return state;
}


/* =========================================================
   POWER ON
========================================================= */

function simulatePowerOn() {

    const state = loadCorilzonState();

    state.devicePoweredOff = false;

    saveCorilzonState(state);

    return state;
}


/* =========================================================
   iOS UPDATE SIMULATION
========================================================= */

function simulateIOSUpdate(newVersion) {

    const state = loadCorilzonState();

    if (newVersion) {

        state.iosVersion =
            String(newVersion);
    }

    state.bootPending = true;

    state.lastBootReason =
        "iOS update";

    state.devicePoweredOff = true;

    saveCorilzonState(state);

    return state;
}


/* =========================================================
   CORILZON UPDATE SIMULATION
========================================================= */

function simulateCorilzonUpdate(newVersion) {

    const state = loadCorilzonState();

    if (newVersion) {

        state.corilzonVersion =
            String(newVersion);
    }

    state.bootPending = true;

    state.lastBootReason =
        "Corilzon update";

    state.devicePoweredOff = true;

    saveCorilzonState(state);

    return state;
}


/* =========================================================
   RESET BOOT FLAG
========================================================= */

function clearCorilzonBootRequest() {

    const state = loadCorilzonState();

    state.bootPending = false;

    saveCorilzonState(state);

    return state;
}