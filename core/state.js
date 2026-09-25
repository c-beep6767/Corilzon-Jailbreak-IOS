/*
    =========================================================
    COLIRZON CORE - STATE
    Gestione dello stato persistente della simulazione.
    =========================================================
*/

const COLIRZON_STATE_KEY = "colirzon_state_v1";

const DEFAULT_COLIRZON_STATE = {
    jailbreakActive: true,

    developerMode: false,
    installerCompleted: false,

    bootPending: true,

    iosVersion: "27.0",
    corilzonVersion: "1.0.0",

    lastBootReason: "first_jailbreak",

    devicePoweredOff: false
};


/*
    Carica lo stato salvato.
*/

function loadCorilzonState() {

    try {

        const saved =
            localStorage.getItem(COLIRZON_STATE_KEY);

        if (!saved) {

            return {
                ...DEFAULT_COLIRZON_STATE
            };

        }

        const parsed =
            JSON.parse(saved);

        return {
            ...DEFAULT_COLIRZON_STATE,
            ...parsed
        };

    } catch (error) {

        console.error(
            "Errore caricamento stato Colirzon:",
            error
        );

        return {
            ...DEFAULT_COLIRZON_STATE
        };
    }
}


/*
    Stato globale.
*/

let colirzonState =
    loadCorilzonState();


/*
    Salva lo stato.
*/

function saveCorilzonState() {

    localStorage.setItem(
        COLIRZON_STATE_KEY,
        JSON.stringify(colirzonState)
    );
}


/*
    Aggiorna una proprietà.
*/

function setCorilzonState(property, value) {

    colirzonState[property] = value;

    saveCorilzonState();
}


/*
    Attiva Developer Mode.
*/

function enableDeveloperMode() {

    colirzonState.developerMode = true;

    saveCorilzonState();
}


/*
    Completa l'Installer.
*/

function completeCorilzonInstaller() {

    colirzonState.installerCompleted = true;

    /*
        Se Developer Mode è attivo e il jailbreak
        è attivo, il primo boot può partire.
    */

    if (
        colirzonState.developerMode &&
        colirzonState.jailbreakActive
    ) {

        colirzonState.bootPending = true;
        colirzonState.lastBootReason =
            "installer_completed";
    }

    saveCorilzonState();
}


/*
    Richiede un nuovo boot.
*/

function requestCorilzonBoot(reason) {

    colirzonState.bootPending = true;
    colirzonState.lastBootReason = reason;

    saveCorilzonState();
}


/*
    Consuma il boot pendente.

    In questo modo la sequenza non viene
    ripetuta ogni volta che viene aperto Corilzon.
*/

function consumeCorilzonBoot() {

    if (!colirzonState.bootPending) {

        return false;

    }

    colirzonState.bootPending = false;

    saveCorilzonState();

    return true;
}


/*
    Riavvio simulato.
*/

function simulatePowerOff() {

    colirzonState.devicePoweredOff = true;

    requestCorilzonBoot("power_cycle");
}


/*
    Riaccensione simulata.
*/

function simulatePowerOn() {

    colirzonState.devicePoweredOff = false;

    requestCorilzonBoot("power_on");
}


/*
    Aggiornamento iOS simulato.
*/

function simulateIOSUpdate(newVersion) {

    if (!newVersion) {

        return;

    }

    if (
        newVersion !==
        colirzonState.iosVersion
    ) {

        colirzonState.iosVersion =
            newVersion;

        requestCorilzonBoot(
            "ios_update"
        );

    }

    saveCorilzonState();
}


/*
    Aggiornamento Colirzon simulato.
*/

function simulateCorilzonUpdate(newVersion) {

    if (!newVersion) {

        return;

    }

    if (
        newVersion !==
        colirzonState.corilzonVersion
    ) {

        colirzonState.corilzonVersion =
            newVersion;

        requestCorilzonBoot(
            "corilzon_update"
        );

    }

    saveCorilzonState();
}