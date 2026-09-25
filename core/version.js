/*
    =========================================================
    COLIRZON VERSION
    =========================================================
*/

const COLIRZON_CURRENT_VERSION = "1.0.0";
const COLIRZON_IOS_VERSION = "27.0";


function getCorilzonVersion() {

    return COLIRZON_CURRENT_VERSION;
}


function getIOSVersion() {

    return COLIRZON_IOS_VERSION;
}


/*
    Controlla se la versione salvata di Colirzon
    è diversa da quella attuale.
*/

function checkCorilzonVersion() {

    const savedVersion =
        localStorage.getItem(
            "colirzon_last_version"
        );


    if (!savedVersion) {

        localStorage.setItem(
            "colirzon_last_version",
            COLIRZON_CURRENT_VERSION
        );

        return false;
    }


    if (
        savedVersion !==
        COLIRZON_CURRENT_VERSION
    ) {

        localStorage.setItem(
            "colirzon_last_version",
            COLIRZON_CURRENT_VERSION
        );

        return true;
    }


    return false;
}