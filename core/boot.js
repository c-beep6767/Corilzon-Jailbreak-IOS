/* =========================================================
   CORILZON PWA BOOT
========================================================= */

let corilzonBootRunning = false;


/* =========================================================
   WAIT
========================================================= */

function corilzonWait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}


/* =========================================================
   PWA / IOS BLACK THEME
========================================================= */

function corilzonSetBlackTheme() {

    document.documentElement.style.backgroundColor =
        "#000000";

    document.body.style.backgroundColor =
        "#000000";

    document.documentElement.style.overflow =
        "hidden";

    document.body.style.overflow =
        "hidden";


    /* theme-color */

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


    /* iOS PWA status bar */

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
        "black-translucent"
    );
}


/* =========================================================
   FULLSCREEN BOOT OVERLAY
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

        /*
           Disegna anche dietro le safe areas
           della PWA.
        */

        padding-top: env(safe-area-inset-top, 0px) !important;
        padding-bottom: env(safe-area-inset-bottom, 0px) !important;
        padding-left: env(safe-area-inset-left, 0px) !important;
        padding-right: env(safe-area-inset-right, 0px) !important;
    `;


    document.body.appendChild(screen);

    return screen;
}


/* =========================================================
   SCREEN CONTENT
========================================================= */

function setBootScreen(screen, html) {
    screen.innerHTML = html;
}


/* =========================================================
   1 — NERO IMMEDIATO
========================================================= */

async function blackPhase(screen) {

    setBootScreen(
        screen,
        ""
    );

    await corilzonWait(1000);
}


/* =========================================================
   2 — APPLE PER 2 SECONDI
========================================================= */

async function firstApplePhase(screen) {

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


    await corilzonWait(2000);
}


/* =========================================================
   3 — KERNEL VELOCE
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

            box-sizing:border-box;

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

        "[CORILZON] Booting...",
        "[BOOT] Initializing bootloader",
        "[BOOT] Checking hardware",
        "[BOOT] Checking memory",
        "[BOOT] Checking storage",
        "[BOOT] Developer Mode: ACTIVE",
        "[BOOT] Installer: COMPLETE",

        "[KERNEL] Loading kernel",
        "[KERNEL] Initializing memory manager",
        "[KERNEL] Initializing process manager",
        "[KERNEL] Initializing filesystem",
        "[KERNEL] Mounting system volume",
        "[KERNEL] Loading drivers",
        "[KERNEL] Loading services",

        "[SYSTEM] Starting userspace",
        "[SYSTEM] Checking integrity",
        "[SYSTEM] Verifying packages",
        "[SYSTEM] Preparing system",
        "[SYSTEM] Update environment ready",

        "[CORILZON] Continuing boot..."
    ];


    /*
       Kernel volutamente rapido.
    */

    for (const line of lines) {

        const row =
            document.createElement("div");

        row.textContent =
            line;

        output.appendChild(row);

        await corilzonWait(55);
    }


    await corilzonWait(500);
}


/* =========================================================
   4 — NERO
========================================================= */

async function secondBlackPhase(screen) {

    setBootScreen(
        screen,
        ""
    );

    await corilzonWait(1000);
}


/* =========================================================
   5 — APPLE + BARRA BIANCA
========================================================= */

async function finalApplePhase(screen) {

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


            <div style="
                width:55%;
                max-width:340px;

                height:5px;

                background:#333;

                border-radius:10px;

                overflow:hidden;
            ">

                <div
                    id="corilzonFinalBar"
                    style="
                        width:0%;

                        height:100%;

                        background:#fff;

                        border-radius:10px;
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
   FINE
========================================================= */

async function finishCorilzonBoot() {

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


    window.location.href =
        "./index.html";
}


/* =========================================================
   BOOT PRINCIPALE
========================================================= */

async function runCorilzonBoot() {

    if (corilzonBootRunning) {
        return;
    }

    corilzonBootRunning = true;


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
       Nero prima di qualsiasi altra schermata.
    */

    corilzonSetBlackTheme();


    const screen =
        createCorilzonBootScreen();


    /*
       SEQUENZA:

       Nero
       ↓
       Apple 2 sec
       ↓
       Kernel veloce
       ↓
       Nero
       ↓
       Apple + barra
    */

    await blackPhase(screen);

    await firstApplePhase(screen);

    await kernelPhase(screen);

    await secondBlackPhase(screen);

    await finalApplePhase(screen);

    await finishCorilzonBoot();
}


/* =========================================================
   INSTALLER → BOOT
========================================================= */

window.addEventListener(
    "corilzon-installer-complete",
    function() {

        setTimeout(
            function() {

                runCorilzonBoot();

            },
            50
        );
    }
);


/*
   NON avviare il boot automaticamente qui.
   Deve partire solo dall'Installer al 100%.
*/