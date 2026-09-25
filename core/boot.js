/* =========================================================
   CORILZON BOOT
   Boot simulato veloce dopo l'Installer
========================================================= */

let corilzonBootRunning = false;


/* =========================================================
   UTILITY
========================================================= */

function corilzonWait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


/* =========================================================
   TEMA NERO
========================================================= */

function corilzonSetBlackTheme() {

    let theme =
        document.querySelector('meta[name="theme-color"]');

    if (!theme) {
        theme = document.createElement("meta");
        theme.name = "theme-color";
        document.head.appendChild(theme);
    }

    theme.setAttribute("content", "#000000");


    let status =
        document.querySelector(
            'meta[name="apple-mobile-web-app-status-bar-style"]'
        );

    if (!status) {
        status = document.createElement("meta");
        status.name =
            "apple-mobile-web-app-status-bar-style";
        document.head.appendChild(status);
    }

    status.setAttribute(
        "content",
        "black-translucent"
    );


    document.documentElement.style.background = "#000";
    document.body.style.background = "#000";

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
}


/* =========================================================
   FULLSCREEN BOOT SCREEN
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
        min-height: 100dvh !important;

        margin: 0 !important;
        padding: 0 !important;

        background: #000 !important;

        overflow: hidden !important;

        z-index: 2147483647 !important;

        display: block !important;

        color: #fff !important;

        font-family:
            -apple-system,
            BlinkMacSystemFont,
            "SF Pro Display",
            "Helvetica Neue",
            Arial,
            sans-serif !important;

        box-sizing: border-box !important;

        border: 0 !important;
        border-radius: 0 !important;
    `;


    document.body.appendChild(screen);

    return screen;
}


/* =========================================================
   SCREEN HTML
========================================================= */

function setBootScreen(screen, html) {
    screen.innerHTML = html;
}


/* =========================================================
   1 — COLPO NERO
========================================================= */

async function blackScreen(screen) {

    /*
       Appena parte l'Installer:
       tutto diventa immediatamente nero.
    */

    setBootScreen(
        screen,
        ""
    );

    await corilzonWait(1800);
}


/* =========================================================
   2 — KERNEL VELOCE
========================================================= */

async function kernelScreen(screen) {

    setBootScreen(
        screen,

        `
        <div style="
            position:absolute;
            inset:0;
            background:#000;
            color:#fff;

            padding:16px;

            font-family:
                ui-monospace,
                SFMono-Regular,
                Menlo,
                Monaco,
                Consolas,
                monospace;

            font-size:9px;
            line-height:1.35;

            text-align:left;

            overflow:hidden;
        ">

            <div id="kernelOutput"></div>

        </div>
        `
    );


    const output =
        screen.querySelector(
            "#kernelOutput"
        );


    const lines = [

        "[CORILZON] Booting...",
        "[BOOT] Initializing boot environment",
        "[BOOT] Developer Mode: ACTIVE",
        "[BOOT] Installer: COMPLETE",
        "[KERNEL] Loading kernel",
        "[KERNEL] Checking memory",
        "[KERNEL] Checking filesystem",
        "[KERNEL] Mounting system",
        "[KERNEL] Loading drivers",
        "[KERNEL] Loading services",
        "[KERNEL] Starting userspace",
        "[SYSTEM] Preparing update",
        "[SYSTEM] Verifying packages",
        "[SYSTEM] Verifying system",
        "[SYSTEM] Update environment ready",
        "[CORILZON] Continuing boot..."
    ];


    /*
       Molto veloce:
       le righe scorrono rapidamente.
    */

    for (const line of lines) {

        const row =
            document.createElement("div");

        row.textContent =
            line;

        output.appendChild(row);

        await corilzonWait(75);
    }


    await corilzonWait(500);
}


/* =========================================================
   3 — MONTAGNA VELOCE
========================================================= */

async function mountainScreen(screen) {

    setBootScreen(
        screen,

        `
        <div style="
            position:absolute;
            inset:0;
            background:#000;
            overflow:hidden;
        ">

            <!-- montagna posteriore -->

            <div style="
                position:absolute;
                left:-20%;
                bottom:25%;
                width:85%;
                height:50%;

                background:#111;

                clip-path:polygon(
                    0 100%,
                    48% 0,
                    100% 100%
                );
            "></div>


            <!-- montagna principale -->

            <div style="
                position:absolute;
                right:-20%;
                bottom:20%;
                width:95%;
                height:60%;

                background:#181818;

                clip-path:polygon(
                    0 100%,
                    52% 0,
                    100% 100%
                );
            "></div>


            <!-- neve -->

            <div style="
                position:absolute;
                left:26%;
                bottom:58%;
                width:18%;
                height:12%;

                background:#fff;

                clip-path:polygon(
                    50% 0,
                    0 100%,
                    100% 100%
                );
            "></div>


            <!-- terreno -->

            <div style="
                position:absolute;
                left:0;
                right:0;
                bottom:0;
                height:23%;

                background:#050505;
            "></div>


            <!-- piccolo punto luce -->

            <div style="
                position:absolute;
                left:50%;
                top:25%;

                width:5px;
                height:5px;

                background:#fff;

                border-radius:50%;

                box-shadow:
                    0 0 12px #fff;
            "></div>


            <div style="
                position:absolute;
                left:0;
                right:0;
                bottom:8%;

                text-align:center;

                color:#aaa;

                font-size:12px;
            ">
                Installing Corilzon System
            </div>

        </div>
        `
    );


    /*
       Niente barra 0 → 100.
       La scena appare rapidamente.
    */

    await corilzonWait(4500);
}


/* =========================================================
   4 — NERO
========================================================= */

async function blackAgain(screen) {

    setBootScreen(
        screen,
        ""
    );

    await corilzonWait(1200);
}


/* =========================================================
   5 — APPLE
========================================================= */

async function appleScreen(screen) {

    setBootScreen(
        screen,

        `
        <div style="
            position:absolute;
            inset:0;

            background:#000;

            display:flex;
            align-items:center;
            justify-content:center;

            color:#fff;
        ">

            <div style="
                font-size:92px;
                line-height:1;
            ">
                
            </div>

        </div>
        `
    );


    await corilzonWait(3500);
}


/* =========================================================
   6 — UPDATE / LOADING
========================================================= */

async function loadingScreen(screen) {

    setBootScreen(
        screen,

        `
        <div style="
            position:absolute;
            inset:0;

            background:#000;

            display:flex;
            flex-direction:column;

            align-items:center;
            justify-content:center;
        ">

            <div style="
                color:#fff;

                font-size:76px;

                margin-bottom:70px;
            ">
                
            </div>


            <div style="
                width:52%;
                max-width:320px;

                height:4px;

                background:#333;

                border-radius:10px;

                overflow:hidden;
            ">

                <div
                    id="finalLoadingBar"
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
            "#finalLoadingBar"
        );


    /*
       Caricamento finale breve.
    */

    const duration = 12000;

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


    await corilzonWait(800);
}


/* =========================================================
   FINE
========================================================= */

async function finishCorilzonBoot(screen) {

    try {

        if (typeof simulatePowerOn === "function") {
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
   AVVIO BOOT
========================================================= */

async function runCorilzonBoot() {

    if (corilzonBootRunning) {
        return;
    }


    corilzonBootRunning = true;


    /*
       IMPORTANTE:

       il boot viene consumato qui,
       ma NON viene avviato automaticamente
       quando si apre index.html.
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


    const screen =
        createCorilzonBootScreen();


    /*
       SEQUENZA VELOCE
    */

    await blackScreen(screen);

    await kernelScreen(screen);

    await mountainScreen(screen);

    await blackAgain(screen);

    await appleScreen(screen);

    await loadingScreen(screen);

    await finishCorilzonBoot(screen);
}


/* =========================================================
   BOOT AUTOMATICO SOLO DOPO INSTALLER
========================================================= */

window.addEventListener(
    "corilzon-installer-complete",
    function() {

        /*
           Questo evento viene mandato da
           completeCorilzonInstaller()
           quando la barra dell'Installer
           arriva al 100%.
        */

        setTimeout(
            function() {
                runCorilzonBoot();
            },
            50
        );
    }
);


/*
   NON chiamare:

   startCorilzonBootIfNeeded();

   qui sotto.

   Il boot NON deve partire all'apertura
   di Corilzon.
*/