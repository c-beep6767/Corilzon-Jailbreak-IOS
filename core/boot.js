/* =========================================================
   CORILZON BOOT
   Sequenza:
   100% Installer
        ↓
   SCHERMO NERO
        ↓
    2 secondi
        ↓
   KERNEL
        ↓
   SCHERMO NERO
        ↓
    + BARRA BIANCA
        ↓
   FINE
========================================================= */

let corilzonBootRunning = false;


/* =========================================================
   UTILITY
========================================================= */

function corilzonWait(ms) {

    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
}


/* =========================================================
   TEMA NERO
========================================================= */

function corilzonSetBlackTheme() {

    document.documentElement.style.background =
        "#000000";

    document.body.style.background =
        "#000000";

    document.documentElement.style.overflow =
        "hidden";

    document.body.style.overflow =
        "hidden";


    let theme =
        document.querySelector(
            'meta[name="theme-color"]'
        );

    if (!theme) {

        theme =
            document.createElement("meta");

        theme.name =
            "theme-color";

        document.head.appendChild(theme);
    }

    theme.setAttribute(
        "content",
        "#000000"
    );


    /*
       Imposta lo stile della Status Bar
       quando iOS/PWA lo permette.
    */

    let status =
        document.querySelector(
            'meta[name="apple-mobile-web-app-status-bar-style"]'
        );

    if (!status) {

        status =
            document.createElement("meta");

        status.name =
            "apple-mobile-web-app-status-bar-style";

        document.head.appendChild(status);
    }

    status.setAttribute(
        "content",
        "black"
    );
}


/* =========================================================
   CREA SCHERMATA FULLSCREEN
========================================================= */

function createCorilzonBootScreen() {

    const old =
        document.getElementById(
            "corilzonBootScreen"
        );

    if (old) {
        old.remove();
    }


    const screen =
        document.createElement("div");

    screen.id =
        "corilzonBootScreen";


    /*
       L'overlay copre tutto il contenuto
       della pagina.
    */

    screen.style.cssText = `
        position: fixed !important;

        inset: 0 !important;

        width: 100vw !important;
        height: 100vh !important;
        height: 100dvh !important;

        min-width: 100vw !important;
        min-height: 100vh !important;
        min-height: 100dvh !important;

        margin: 0 !important;
        padding: 0 !important;

        background: #000000 !important;

        color: #ffffff !important;

        overflow: hidden !important;

        z-index: 2147483647 !important;

        display: block !important;

        border: 0 !important;
        border-radius: 0 !important;

        box-sizing: border-box !important;

        font-family:
            -apple-system,
            BlinkMacSystemFont,
            "SF Pro Display",
            "Helvetica Neue",
            Arial,
            sans-serif !important;
    `;


    document.body.appendChild(screen);

    return screen;
}


/* =========================================================
   CAMBIA CONTENUTO
========================================================= */

function setBootScreen(screen, html) {

    screen.innerHTML = html;
}


/* =========================================================
   FASE 1
   NERO COMPLETO
========================================================= */

async function blackPhase(screen) {

    setBootScreen(
        screen,
        ""
    );


    /*
       Colpo nero immediato.
    */

    await corilzonWait(1200);
}


/* =========================================================
   FASE 2
   APPLE — 2 SECONDI
========================================================= */

async function appleFirstPhase(screen) {

    setBootScreen(
        screen,

        `
        <div style="
            position:absolute;
            inset:0;

            width:100%;
            height:100%;

            background:#000;

            display:flex;

            align-items:center;
            justify-content:center;

            margin:0;
            padding:0;
        ">

            <div style="
                color:#fff;

                font-size:92px;

                line-height:1;

                font-family:
                    -apple-system,
                    BlinkMacSystemFont,
                    sans-serif;
            ">
                
            </div>

        </div>
        `
    );


    /*
       Mela visibile per ESATTAMENTE
       circa 2 secondi.
    */

    await corilzonWait(2000);
}


/* =========================================================
   FASE 3
   KERNEL VELOCE
========================================================= */

async function kernelPhase(screen) {

    setBootScreen(
        screen,

        `
        <div style="
            position:absolute;
            inset:0;

            width:100%;
            height:100%;

            background:#000;

            color:#fff;

            margin:0;
            padding:14px;

            overflow:hidden;

            text-align:left;

            font-family:
                ui-monospace,
                SFMono-Regular,
                Menlo,
                Monaco,
                Consolas,
                monospace;

            font-size:9px;

            line-height:1.35;

            box-sizing:border-box;
        ">

            <div id="corilzonKernelOutput"></div>

        </div>
        `
    );


    const output =
        screen.querySelector(
            "#corilzonKernelOutput"
        );


    const lines = [

        "[CORILZON] Booting system...",
        "[BOOT] Initializing bootloader",
        "[BOOT] Checking hardware",
        "[BOOT] Checking memory",
        "[BOOT] Checking storage",
        "[BOOT] Developer Mode: ACTIVE",
        "[BOOT] Installer: COMPLETE",
        "[KERNEL] Loading kernel...",
        "[KERNEL] Initializing memory manager",
        "[KERNEL] Initializing process manager",
        "[KERNEL] Initializing filesystem",
        "[KERNEL] Mounting system volume",
        "[KERNEL] Loading drivers",
        "[KERNEL] Loading system services",
        "[KERNEL] Starting userspace",
        "[SYSTEM] Checking system integrity",
        "[SYSTEM] Verifying packages",
        "[SYSTEM] Preparing system update",
        "[SYSTEM] Update environment ready",
        "[CORILZON] Boot sequence continuing..."

    ];


    /*
       Kernel molto veloce.
       Le righe vengono stampate rapidamente.
    */

    for (const line of lines) {

        const row =
            document.createElement("div");

        row.textContent =
            line;

        output.appendChild(row);

        await corilzonWait(55);
    }


    /*
       Piccola pausa finale.
    */

    await corilzonWait(500);
}


/* =========================================================
   FASE 4
   NERO COMPLETO
========================================================= */

async function secondBlackPhase(screen) {

    setBootScreen(
        screen,
        ""
    );


    /*
       Torna completamente nero
       prima della mela finale.
    */

    await corilzonWait(1500);
}


/* =========================================================
   FASE 5
   APPLE + BARRA BIANCA
========================================================= */

async function appleLoadingPhase(screen) {

    setBootScreen(
        screen,

        `
        <div style="
            position:absolute;
            inset:0;

            width:100%;
            height:100%;

            background:#000;

            display:flex;

            flex-direction:column;

            align-items:center;
            justify-content:center;

            margin:0;
            padding:0;

            box-sizing:border-box;
        ">


            <!-- APPLE -->

            <div style="
                color:#fff;

                font-size:88px;

                line-height:1;

                margin-bottom:75px;

                font-family:
                    -apple-system,
                    BlinkMacSystemFont,
                    sans-serif;
            ">
                
            </div>


            <!-- BARRA -->

            <div style="
                width:55%;

                max-width:340px;

                height:5px;

                background:#333;

                border-radius:10px;

                overflow:hidden;

                margin:0;
                padding:0;
            ">

                <div
                    id="corilzonFinalBar"
                    style="
                        width:0%;

                        height:100%;

                        background:#fff;

                        border-radius:10px;

                        margin:0;
                        padding:0;
                    "
                ></div>

            </div>

        </div>
        `
    );


    const bar =
        screen.querySelector(
            "#corilzonFinalBar"
        );


    /*
       Barra finale:
       circa 12 secondi.
    */

    const duration =
        12000;

    const start =
        Date.now();


    while (true) {

        const elapsed =
            Date.now() - start;


        let progress =
            (elapsed / duration) * 100;


        if (progress > 100) {
            progress = 100;
        }


        if (bar) {

            bar.style.width =
                progress + "%";
        }


        if (progress >= 100) {
            break;
        }


        await corilzonWait(50);
    }


    await corilzonWait(1000);
}


/* =========================================================
   FINE BOOT
========================================================= */

async function finishCorilzonBoot(screen) {

    try {

        if (
            typeof simulatePowerOn ===
            "function"
        ) {

            simulatePowerOn();
        }

    } catch (error) {

        console.warn(
            "Corilzon power-on error:",
            error
        );
    }


    try {

        if (
            typeof clearCorilzonBootRequest ===
            "function"
        ) {

            clearCorilzonBootRequest();
        }

    } catch (error) {

        console.warn(
            "Corilzon boot flag error:",
            error
        );
    }


    await corilzonWait(700);


    /*
       Ritorno alla schermata principale.
    */

    window.location.href =
        "./index.html";
}


/* =========================================================
   AVVIO DEL BOOT
========================================================= */

async function runCorilzonBoot() {

    if (corilzonBootRunning) {
        return;
    }


    corilzonBootRunning = true;


    /*
       Consuma la richiesta di boot.
    */

    try {

        if (
            typeof consumeCorilzonBoot ===
            "function"
        ) {

            consumeCorilzonBoot();
        }

    } catch (error) {

        console.warn(
            "Corilzon boot state error:",
            error
        );
    }


    /*
       Nero immediato.
    */

    corilzonSetBlackTheme();


    /*
       Crea l'overlay.
    */

    const screen =
        createCorilzonBootScreen();


    /*
       SEQUENZA DEFINITIVA
    */

    await blackPhase(screen);

    await appleFirstPhase(screen);

    await kernelPhase(screen);

    await secondBlackPhase(screen);

    await appleLoadingPhase(screen);

    await finishCorilzonBoot(screen);
}


/* =========================================================
   INSTALLER → BOOT
========================================================= */

window.addEventListener(
    "corilzon-installer-complete",
    function() {

        /*
           Questo evento viene eseguito
           quando l'Installer arriva al 100%.
        */

        setTimeout(
            function() {

                runCorilzonBoot();

            },
            50
        );
    }
);


/* =========================================================
   IMPORTANTISSIMO
=========================================================

   NON chiamare:

       startCorilzonBootIfNeeded();

   automaticamente qui.

   Il boot deve partire solamente
   dall'Installer al 100%.
========================================================= */