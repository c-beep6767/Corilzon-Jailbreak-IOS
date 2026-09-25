"use strict";

/*
 * =========================================================
 * CORILZON BOOT SIMULATION
 * =========================================================
 *
 * Simulazione grafica/web.
 *
 * NON modifica realmente iOS.
 */

let corilzonBootRunning = false;


/* =========================================================
   UTILITY
========================================================= */

function bootWait(milliseconds) {

    return new Promise(function(resolve) {

        window.setTimeout(
            resolve,
            milliseconds
        );

    });
}


/* =========================================================
   BOOT SCREEN
========================================================= */

function getBootScreen() {

    let screen =
        document.getElementById(
            "corilzonBootScreen"
        );

    if (!screen) {

        screen =
            document.createElement("div");

        screen.id =
            "corilzonBootScreen";

        screen.style.position =
            "fixed";

        screen.style.inset =
            "0";

        screen.style.width =
            "100vw";

        screen.style.height =
            "100vh";

        screen.style.height =
            "100dvh";

        screen.style.background =
            "#000";

        screen.style.zIndex =
            "2147483647";

        screen.style.overflow =
            "hidden";

        screen.style.margin =
            "0";

        screen.style.padding =
            "0";

        screen.style.display =
            "none";

        document.body.appendChild(
            screen
        );
    }

    return screen;
}


function activateBootScreen() {

    const screen =
        getBootScreen();

    /*
     * Nasconde completamente l'interfaccia
     * sottostante.
     */

    document.documentElement.style.background =
        "#000";

    document.body.style.background =
        "#000";

    document.body.style.overflow =
        "hidden";

    screen.style.display =
        "block";

    screen.innerHTML = "";

    /*
     * Tentativo di fullscreen dell'elemento.
     * Se il browser/app non lo permette,
     * la simulazione rimane comunque
     * fixed a tutto schermo.
     */

    try {

        if (
            document.fullscreenEnabled &&
            !document.fullscreenElement &&
            screen.requestFullscreen
        ) {

            const result =
                screen.requestFullscreen();

            if (
                result &&
                typeof result.catch ===
                "function"
            ) {

                result.catch(
                    function() {}
                );
            }
        }

    } catch (error) {}
}


function deactivateBootScreen() {

    const screen =
        getBootScreen();

    screen.style.display =
        "none";

    screen.innerHTML =
        "";

    document.body.style.overflow =
        "";

    document.body.style.background =
        "";

    document.documentElement.style.background =
        "";

    try {

        if (
            document.fullscreenElement &&
            document.exitFullscreen
        ) {

            const result =
                document.exitFullscreen();

            if (
                result &&
                typeof result.catch ===
                "function"
            ) {

                result.catch(
                    function() {}
                );
            }
        }

    } catch (error) {}
}


/* =========================================================
   PURE BLACK
========================================================= */

async function showBootBlack(duration) {

    const screen =
        getBootScreen();

    screen.innerHTML = `
        <div
            style="
                position:absolute;
                inset:0;
                background:#000;
            ">
        </div>
    `;

    await bootWait(
        duration
    );
}


/* =========================================================
   RECOVERY / iTUNES
========================================================= */

async function showRecoveryScreen() {

    const screen =
        getBootScreen();

    screen.innerHTML = `
        <div
            style="
                position:absolute;
                inset:0;
                background:#000;
                color:#fff;
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:center;
                text-align:center;
                font-family:-apple-system,
                             BlinkMacSystemFont,
                             Arial,
                             sans-serif;
            ">

            <div
                style="
                    font-size:52px;
                    margin-bottom:24px;
                ">
                
            </div>

            <div
                style="
                    font-size:18px;
                    font-weight:600;
                    margin-bottom:8px;
                ">
                Recovery
            </div>

            <div
                style="
                    color:#aaa;
                    font-size:13px;
                    line-height:1.45;
                    max-width:280px;
                ">
                Corilzon System Update
                <br>
                Preparing device...
            </div>

        </div>
    `;

    await bootWait(12000);
}


/* =========================================================
   KERNEL
========================================================= */

function kernelLine() {

    const services = [
        "boot",
        "kernel",
        "launchd",
        "sandbox",
        "filesystem",
        "display",
        "network",
        "security",
        "storage",
        "audio",
        "bluetooth",
        "usb",
        "userinterface",
        "installer",
        "services"
    ];

    const service =
        services[
            Math.floor(
                Math.random() *
                services.length
            )
        ];

    const hex =
        Math.floor(
            Math.random() *
            0xffffffff
        )
        .toString(16)
        .padStart(8, "0");

    const messages = [
        "initializing",
        "loading",
        "checking",
        "starting",
        "mounting",
        "ready",
        "ok",
        "completed",
        "verifying"
    ];

    const message =
        messages[
            Math.floor(
                Math.random() *
                messages.length
            )
        ];

    return (
        "[" +
        performance.now()
            .toFixed(3) +
        "] " +
        service +
        ": " +
        message +
        " 0x" +
        hex
    );
}


async function showKernelScreen() {

    const screen =
        getBootScreen();

    screen.innerHTML = `
        <div
            style="
                position:absolute;
                inset:0;
                background:#000;
                color:#fff;
                font-family:monospace;
                font-size:8px;
                line-height:1.25;
                padding:7px 8px;
                overflow:hidden;
                text-align:left;
                white-space:pre;
            "
            id="corilzonKernelText">
        </div>
    `;

    const output =
        document.getElementById(
            "corilzonKernelText"
        );

    /*
     * Circa 2 minuti e 30 secondi.
     *
     * Il testo rimane piccolo e
     * nell'angolo superiore sinistro.
     */

    const duration =
        150000;

    const start =
        performance.now();

    let lastFrame =
        start;

    while (
        performance.now() -
        start <
        duration
    ) {

        const now =
            performance.now();

        if (
            now -
            lastFrame >=
            120
        ) {

            lastFrame =
                now;

            const fragment =
                document.createDocumentFragment();

            for (
                let i = 0;
                i < 2;
                i++
            ) {

                const line =
                    document.createElement(
                        "div"
                    );

                line.textContent =
                    kernelLine();

                fragment.appendChild(
                    line
                );
            }

            output.appendChild(
                fragment
            );

            /*
             * Mantiene la visualizzazione
             * concentrata nella parte superiore.
             */

            const maxLines =
                90;

            while (
                output.children.length >
                maxLines
            ) {

                output.removeChild(
                    output.firstChild
                );
            }

            lastFrame =
                now;
        }

        await new Promise(
            function(resolve) {
                requestAnimationFrame(
                    resolve
                );
            }
        );
    }
}


/* =========================================================
   SECOND BLACK
========================================================= */

async function showSecondBlack() {

    const screen =
        getBootScreen();

    screen.innerHTML = `
        <div
            style="
                position:absolute;
                inset:0;
                background:#000;
            ">
        </div>
    `;

    await bootWait(7000);
}


/* =========================================================
   APPLE SCREEN
========================================================= */

async function showAppleScreen() {

    const screen =
        getBootScreen();

    screen.innerHTML = `
        <div
            style="
                position:absolute;
                inset:0;
                background:#000;
                display:flex;
                align-items:center;
                justify-content:center;
            ">

            <div
                style="
                    color:#fff;
                    font-family:Arial,sans-serif;
                    font-size:76px;
                    line-height:1;
                ">
                
            </div>

        </div>
    `;

    await bootWait(5000);
}


/* =========================================================
   LOADING BAR
========================================================= */

async function showLoadingScreen() {

    const screen =
        getBootScreen();

    screen.innerHTML = `
        <div
            style="
                position:absolute;
                inset:0;
                background:#000;
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:center;
            ">

            <div
                style="
                    color:#fff;
                    font-family:Arial,sans-serif;
                    font-size:70px;
                    margin-bottom:45px;
                ">
                
            </div>

            <div
                style="
                    width:min(260px,62vw);
                    height:5px;
                    border-radius:20px;
                    background:#333;
                    overflow:hidden;
                ">

                <div
                    id="corilzonBootProgress"
                    style="
                        width:0%;
                        height:100%;
                        background:#fff;
                    ">
                </div>

            </div>

        </div>
    `;

    const progress =
        document.getElementById(
            "corilzonBootProgress"
        );

    const duration =
        18000;

    const start =
        performance.now();

    return new Promise(
        function(resolve) {

            function frame(now) {

                const percentage =
                    Math.min(
                        1,
                        (now - start) /
                        duration
                    );

                progress.style.width =
                    (percentage * 100) +
                    "%";

                if (
                    percentage <
                    1
                ) {

                    requestAnimationFrame(
                        frame
                    );

                } else {

                    resolve();
                }
            }

            requestAnimationFrame(
                frame
            );
        }
    );
}


/* =========================================================
   FINISH
========================================================= */

async function finishCorilzonBoot() {

    /*
     * Salva che il boot è stato eseguito.
     */

    if (
        typeof setCorilzonState ===
        "function"
    ) {

        setCorilzonState(
            "lastBootReason",
            "completed"
        );
    }

    await bootWait(1000);

    /*
     * Per la simulazione web torniamo alla
     * pagina principale di Corilzon.
     */

    window.location.href =
        "./index.html";
}


/* =========================================================
   COMPLETE BOOT
========================================================= */

async function runCorilzonBoot(reason) {

    if (corilzonBootRunning) {
        return;
    }

    corilzonBootRunning =
        true;

    activateBootScreen();

    /*
     * 1. Nero totale
     */

    await showBootBlack(
        8000
    );

    /*
     * 2. Recovery
     */

    await showRecoveryScreen();

    /*
     * 3. Kernel lungo
     */

    await showKernelScreen();

    /*
     * 4. Nero
     */

    await showSecondBlack();

    /*
     * 5. Apple
     */

    await showAppleScreen();

    /*
     * 6. Barra bianca
     */

    await showLoadingScreen();

    /*
     * 7. Fine
     */

    await finishCorilzonBoot();
}


/* =========================================================
   PUBLIC START
========================================================= */

function startCorilzonBoot(reason) {

    if (corilzonBootRunning) {
        return;
    }

    runCorilzonBoot(
        reason || "manual"
    );
}


/*
 * =========================================================
 * IMPORTANTISSIMO
 * =========================================================
 *
 * NON facciamo:
 *
 * startCorilzonBootIfNeeded()
 *
 * all'apertura di index.html.
 *
 * Il boot viene avviato dall'Installer
 * quando arriva al 100%.
 */