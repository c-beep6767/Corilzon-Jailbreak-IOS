/* =========================================================
   CORILZON BOOT / UPDATE SIMULATION
========================================================= */

let corilzonBootRunning = false;


/* =========================================================
   UTILITY
========================================================= */

function corilzonWait(milliseconds) {

    return new Promise(function(resolve) {

        setTimeout(resolve, milliseconds);

    });
}


/* =========================================================
   STATUS BAR / THEME
========================================================= */

function corilzonSetBlackSystemTheme() {

    /*
       Cambia il colore della barra di sistema quando
       l'ambiente web/PWA lo permette.

       Non crea una Status Bar finta.
    */

    let theme =
        document.querySelector(
            'meta[name="theme-color"]'
        );

    if (!theme) {

        theme =
            document.createElement("meta");

        theme.name = "theme-color";

        document.head.appendChild(theme);
    }

    theme.setAttribute(
        "content",
        "#000000"
    );


    let appleStatus =
        document.querySelector(
            'meta[name="apple-mobile-web-app-status-bar-style"]'
        );

    if (!appleStatus) {

        appleStatus =
            document.createElement("meta");

        appleStatus.name =
            "apple-mobile-web-app-status-bar-style";

        document.head.appendChild(
            appleStatus
        );
    }

    appleStatus.setAttribute(
        "content",
        "black"
    );


    document.documentElement.style.background =
        "#000000";

    document.body.style.background =
        "#000000";

    document.body.style.overflow =
        "hidden";

    document.documentElement.style.overflow =
        "hidden";
}


/* =========================================================
   FULLSCREEN OVERLAY
========================================================= */

function createCorilzonBootScreen() {

    let existing =
        document.getElementById(
            "corilzonBootScreen"
        );

    if (existing) {

        existing.remove();
    }


    const screen =
        document.createElement("div");

    screen.id =
        "corilzonBootScreen";


    /*
       IMPORTANTISSIMO:

       inset:0
       100vw
       100dvh
       z-index massimo

       La pagina viene completamente coperta.
    */

    screen.style.cssText = `
        position: fixed !important;

        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;

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

        display: flex !important;
        align-items: center !important;
        justify-content: center !important;

        border: 0 !important;
        border-radius: 0 !important;

        color: #fff !important;

        font-family:
            -apple-system,
            BlinkMacSystemFont,
            "SF Pro Display",
            "Helvetica Neue",
            Arial,
            sans-serif !important;

        box-sizing: border-box !important;
    `;


    document.body.appendChild(screen);

    return screen;
}


/* =========================================================
   SCREEN CONTENT
========================================================= */

function corilzonScreenHTML(screen, html) {

    screen.innerHTML = html;
}


/* =========================================================
   PHASE 1
   PURE BLACK
========================================================= */

async function corilzonBlackPhase(screen) {

    corilzonScreenHTML(
        screen,
        ""
    );

    await corilzonWait(5000);
}


/* =========================================================
   PHASE 2
   RECOVERY
========================================================= */

async function corilzonRecoveryPhase(screen) {

    corilzonScreenHTML(
        screen,

        `
        <div style="
            width:100%;
            height:100%;
            background:#000;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            text-align:center;
        ">

            <div style="
                font-size:76px;
                line-height:1;
                margin-bottom:55px;
                color:#fff;
            ">
                
            </div>

            <div style="
                font-size:38px;
                font-weight:600;
                margin-bottom:24px;
                color:#fff;
            ">
                Recovery
            </div>

            <div style="
                font-size:25px;
                color:#999;
                margin-bottom:8px;
            ">
                Corilzon System Update
            </div>

            <div style="
                font-size:25px;
                color:#999;
            ">
                Preparing device...
            </div>

        </div>
        `
    );


    await corilzonWait(10000);
}


/* =========================================================
   PHASE 3
   SMALL KERNEL TEXT
========================================================= */

async function corilzonKernelPhase(screen) {

    corilzonScreenHTML(
        screen,

        `
        <div style="
            position:absolute;
            inset:0;
            background:#000;
            color:#fff;
            font-family:
                ui-monospace,
                SFMono-Regular,
                Menlo,
                Monaco,
                Consolas,
                monospace;
            font-size:10px;
            line-height:1.35;
            padding:18px;
            text-align:left;
            overflow:hidden;
        ">

            <div id="corilzonKernelText"></div>

        </div>
        `
    );


    const output =
        screen.querySelector(
            "#corilzonKernelText"
        );


    const lines = [

        "[CORILZON] bootloader starting...",
        "[CORILZON] checking system state",
        "[CORILZON] developer mode: active",
        "[CORILZON] installer: completed",
        "[CORILZON] verifying filesystem",
        "[CORILZON] mounting system volume",
        "[CORILZON] loading kernel",
        "[CORILZON] loading drivers",
        "[CORILZON] loading services",
        "[CORILZON] preparing update environment",
        "[CORILZON] checking package database",
        "[CORILZON] checking system integrity",
        "[CORILZON] preparing userspace",
        "[CORILZON] initializing storage",
        "[CORILZON] initializing network services",
        "[CORILZON] initializing security services",
        "[CORILZON] starting update process",
        "[CORILZON] system update stage 1",
        "[CORILZON] system update stage 2",
        "[CORILZON] system update stage 3",
        "[CORILZON] boot environment ready"

    ];


    for (let i = 0; i < lines.length; i++) {

        const line =
            document.createElement("div");

        line.textContent =
            lines[i];

        output.appendChild(line);

        await corilzonWait(650);
    }


    await corilzonWait(2500);
}


/* =========================================================
   PHASE 4
   MOUNTAIN / DOG INSTALLATION
========================================================= */

async function corilzonMountainPhase(screen) {

    corilzonScreenHTML(
        screen,

        `
        <div style="
            position:absolute;
            inset:0;
            background:#000;
            overflow:hidden;
        ">

            <!-- cielo -->

            <div style="
                position:absolute;
                left:0;
                top:0;
                width:100%;
                height:65%;
                background:#000;
            "></div>


            <!-- montagna sinistra -->

            <div style="
                position:absolute;
                left:-15%;
                bottom:25%;
                width:80%;
                height:45%;
                background:#111;
                clip-path:polygon(
                    0 100%,
                    48% 0,
                    100% 100%
                );
            "></div>


            <!-- montagna destra -->

            <div style="
                position:absolute;
                right:-20%;
                bottom:25%;
                width:90%;
                height:50%;
                background:#151515;
                clip-path:polygon(
                    0 100%,
                    55% 0,
                    100% 100%
                );
            "></div>


            <!-- terreno -->

            <div style="
                position:absolute;
                left:0;
                right:0;
                bottom:0;
                height:27%;
                background:#050505;
            "></div>


            <!-- cane stilizzato -->

            <div style="
                position:absolute;
                left:50%;
                bottom:29%;
                transform:translateX(-50%);
                width:105px;
                height:70px;
            ">

                <div style="
                    position:absolute;
                    width:70px;
                    height:45px;
                    left:20px;
                    top:15px;
                    background:#ddd;
                    border-radius:45% 55% 40% 40%;
                "></div>

                <div style="
                    position:absolute;
                    width:38px;
                    height:38px;
                    left:0;
                    top:3px;
                    background:#ddd;
                    border-radius:50%;
                "></div>

                <div style="
                    position:absolute;
                    width:16px;
                    height:25px;
                    left:2px;
                    top:-8px;
                    background:#bbb;
                    transform:rotate(-25deg);
                    border-radius:70% 20% 20% 20%;
                "></div>

                <div style="
                    position:absolute;
                    width:7px;
                    height:7px;
                    left:23px;
                    top:16px;
                    background:#000;
                    border-radius:50%;
                "></div>

                <div style="
                    position:absolute;
                    width:45px;
                    height:8px;
                    left:40px;
                    bottom:0;
                    background:#ddd;
                    border-radius:50%;
                "></div>

            </div>


            <!-- testo -->

            <div style="
                position:absolute;
                left:0;
                right:0;
                bottom:9%;
                text-align:center;
                color:#fff;
                font-size:15px;
                font-family:
                    -apple-system,
                    BlinkMacSystemFont,
                    sans-serif;
            ">

                Installing Corilzon System

                <div
                    id="corilzonInstallPercent"
                    style="
                        margin-top:8px;
                        color:#999;
                        font-size:13px;
                    "
                >
                    0%
                </div>

            </div>

        </div>
        `
    );


    const percent =
        screen.querySelector(
            "#corilzonInstallPercent"
        );


    /*
       Questa fase dura circa 2 minuti e mezzo.
       Il valore sale lentamente.
    */

    const duration =
        150000;

    const start =
        Date.now();


    while (true) {

        const elapsed =
            Date.now() - start;

        let progress =
            Math.floor(
                (elapsed / duration) * 100
            );

        if (progress > 100) {
            progress = 100;
        }


        if (percent) {

            percent.textContent =
                progress + "%";
        }


        if (progress >= 100) {
            break;
        }


        await corilzonWait(500);
    }


    await corilzonWait(3000);
}


/* =========================================================
   PHASE 5
   BLACK AGAIN
========================================================= */

async function corilzonFinalBlackPhase(screen) {

    corilzonScreenHTML(
        screen,
        ""
    );

    await corilzonWait(5000);
}


/* =========================================================
   PHASE 6
   APPLE
========================================================= */

async function corilzonApplePhase(screen) {

    corilzonScreenHTML(
        screen,

        `
        <div style="
            width:100%;
            height:100%;
            background:#000;
            display:flex;
            align-items:center;
            justify-content:center;
            color:#fff;
        ">

            <div style="
                font-size:100px;
                line-height:1;
            ">
                
            </div>

        </div>
        `
    );


    await corilzonWait(8000);
}


/* =========================================================
   PHASE 7
   LOADING BAR
========================================================= */

async function corilzonLoadingPhase(screen) {

    corilzonScreenHTML(
        screen,

        `
        <div style="
            width:100%;
            height:100%;
            background:#000;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
        ">

            <div style="
                color:#fff;
                font-size:82px;
                margin-bottom:80px;
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


    /*
       Barra finale lenta: circa 30 secondi.
    */

    const duration =
        30000;

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


        await corilzonWait(100);
    }


    await corilzonWait(2500);
}


/* =========================================================
   FINISH
========================================================= */

async function finishCorilzonBoot(screen) {

    /*
       Stato finale.
    */

    try {

        simulatePowerOn();

    } catch (error) {

        console.warn(
            "Corilzon: power-on state error",
            error
        );
    }


    try {

        clearCorilzonBootRequest();

    } catch (error) {

        console.warn(
            "Corilzon: boot flag error",
            error
        );
    }


    /*
       Piccola pausa prima del ritorno.
    */

    await corilzonWait(1000);


    /*
       Torna alla pagina principale.
    */

    window.location.href =
        "./index.html";
}


/* =========================================================
   MAIN BOOT
========================================================= */

async function runCorilzonBoot() {

    if (corilzonBootRunning) {
        return;
    }

    corilzonBootRunning = true;


    /*
       Consuma l'eventuale richiesta di boot.
    */

    try {

        consumeCorilzonBoot();

    } catch (error) {

        console.warn(
            "Corilzon: impossibile consumare boot request.",
            error
        );
    }


    /*
       Tema nero.
    */

    corilzonSetBlackSystemTheme();


    /*
       Crea overlay fullscreen.
    */

    const screen =
        createCorilzonBootScreen();


    /*
       Sequenza.
    */

    await corilzonBlackPhase(
        screen
    );

    await corilzonRecoveryPhase(
        screen
    );

    await corilzonKernelPhase(
        screen
    );

    await corilzonMountainPhase(
        screen
    );

    await corilzonFinalBlackPhase(
        screen
    );

    await corilzonApplePhase(
        screen
    );

    await corilzonLoadingPhase(
        screen
    );

    await finishCorilzonBoot(
        screen
    );
}


/* =========================================================
   BOOT IF NEEDED
========================================================= */

function startCorilzonBootIfNeeded() {

    try {

        const pending =
            consumeCorilzonBoot();

        if (pending) {

            runCorilzonBoot();

        }

    } catch (error) {

        console.warn(
            "Corilzon boot check failed:",
            error
        );
    }
}


/* =========================================================
   IMPORTANT:
   L'INSTALLER È L'UNICO PUNTO CHE AVVIA IL BOOT
========================================================= */

window.addEventListener(
    "corilzon-installer-complete",
    function() {

        /*
           Aspettiamo un attimo dopo il 100%,
           poi parte la schermata nera.
        */

        setTimeout(
            function() {

                runCorilzonBoot();

            },
            350
        );
    }
);


/*
   NON mettere qui:

   startCorilzonBootIfNeeded();

   Il boot NON deve partire automaticamente
   quando si apre la pagina.
*/