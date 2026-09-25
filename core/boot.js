/*
    =========================================================
    COLIRZON BOOT ENGINE
    Sequenza di avvio completamente simulata.
    =========================================================
*/


let bootRunning = false;


/*
    Avvia il boot se necessario.
*/

function startCorilzonBootIfNeeded() {

    if (bootRunning) {

        return;

    }


    if (
        typeof colirzonState ===
        "undefined"
    ) {

        return;

    }


    if (!colirzonState.bootPending) {

        return;

    }


    /*
        Il boot viene consumato immediatamente.
        Così non si ripete semplicemente
        ricaricando la pagina.
    */

    consumeCorilzonBoot();

    runCorilzonBoot();
}


/*
    Sequenza completa.
*/

function runCorilzonBoot() {

    bootRunning = true;


    const bootScreen =
        document.getElementById(
            "corilzonBootScreen"
        );


    if (!bootScreen) {

        bootRunning = false;

        return;

    }


    bootScreen.classList.remove(
        "corilzonBootHidden"
    );


    bootScreen.innerHTML = "";


    /*
        FASE 1
        Schermo completamente nero.
    */

    bootScreen.className =
        "corilzonBootScreen corilzonBootBlack";


    wait(1300)
        .then(() => {

            /*
                FASE 2
                Apple / Recovery simulato.
            */

            showRecoveryScreen();

            return wait(1800);

        })
        .then(() => {

            /*
                FASE 3
                Kernel log simulato.
            */

            showKernelScreen();

            return wait(4200);

        })
        .then(() => {

            /*
                FASE 4
                Nero totale.
            */

            showBlackScreen();

            return wait(1500);

        })
        .then(() => {

            /*
                FASE 5
                Apple logo.
            */

            showAppleScreen();

            return wait(1800);

        })
        .then(() => {

            /*
                FASE 6
                Barra di caricamento.
            */

            return showLoadingScreen();

        })
        .then(() => {

            /*
                FASE 7
                Ritorno alla Home.
            */

            finishBoot();

        });

}


/*
    Utility timer.
*/

function wait(milliseconds) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                milliseconds
            )
    );
}


/*
    Recovery / iTunes simulato.
*/

function showRecoveryScreen() {

    const screen =
        document.getElementById(
            "corilzonBootScreen"
        );


    screen.className =
        "corilzonBootScreen corilzonRecovery";


    screen.innerHTML = `

        <div class="recoveryApple">
            
        </div>

        <div class="recoveryTitle">
            iTunes
        </div>

        <div class="recoveryText">
            Recovery Mode
        </div>

        <div class="recoveryLine">
            Connect to computer
        </div>

    `;
}


/*
    Kernel log simulato.
*/

function showKernelScreen() {

    const screen =
        document.getElementById(
            "corilzonBootScreen"
        );


    screen.className =
        "corilzonBootScreen corilzonKernel";


    screen.innerHTML = `

        <div id="kernelOutput"
             class="kernelOutput">
        </div>

    `;


    const output =
        document.getElementById(
            "kernelOutput"
        );


    const lines = [

        "[    0.000000] Corilzon boot environment",
        "[    0.002431] Initializing kernel",
        "[    0.004812] CPU initialization",
        "[    0.008102] Memory subsystem",
        "[    0.011937] Virtual filesystem",
        "[    0.015284] Loading system services",
        "[    0.019402] Starting launch services",
        "[    0.023119] Initializing userspace",
        "[    0.027441] Loading developer environment",
        "[    0.031822] Checking system integrity",
        "[    0.036214] Loading Corilzon environment",
        "[    0.041552] Starting system interface",
        "[    0.047183] Initializing SpringBoard",
        "[    0.052841] Starting application services",
        "[    0.058129] Mounting system volumes",
        "[    0.064733] Loading preferences",
        "[    0.071452] Starting network services",
        "[    0.078923] Starting notification services",
        "[    0.086114] Starting audio services",
        "[    0.094712] Starting graphics services",
        "[    0.103421] Starting user session",
        "[    0.112834] Corilzon initialization complete",
        "[    0.121903] System ready"

    ];


    let index = 0;


    const interval =
        setInterval(() => {

            if (
                index >= lines.length
            ) {

                clearInterval(interval);

                return;

            }


            const line =
                document.createElement(
                    "div"
                );


            line.textContent =
                lines[index];


            output.appendChild(line);


            /*
                Mantiene sempre visibile
                la parte più recente del log.
            */

            output.scrollTop =
                output.scrollHeight;


            index++;

        }, 115);

}


/*
    Nero totale.
*/

function showBlackScreen() {

    const screen =
        document.getElementById(
            "corilzonBootScreen"
        );


    screen.className =
        "corilzonBootScreen corilzonBootBlack";


    screen.innerHTML = "";
}


/*
    Logo Apple simulato.
*/

function showAppleScreen() {

    const screen =
        document.getElementById(
            "corilzonBootScreen"
        );


    screen.className =
        "corilzonBootScreen corilzonApple";


    screen.innerHTML = `

        <div class="appleLogo">
            
        </div>

    `;
}


/*
    Barra di caricamento.
*/

function showLoadingScreen() {

    return new Promise(resolve => {

        const screen =
            document.getElementById(
                "corilzonBootScreen"
            );


        screen.className =
            "corilzonBootScreen corilzonApple";


        screen.innerHTML = `

            <div class="appleLogo">
                
            </div>

            <div class="bootProgress">

                <div id="bootProgressBar">
                </div>

            </div>

        `;


        const bar =
            document.getElementById(
                "bootProgressBar"
            );


        let progress = 0;


        const interval =
            setInterval(() => {

                progress += 2;


                if (progress > 100) {

                    progress = 100;

                }


                bar.style.width =
                    progress + "%";


                if (progress >= 100) {

                    clearInterval(interval);

                    setTimeout(
                        resolve,
                        500
                    );

                }

            }, 45);

    });
}


/*
    Fine del boot.
*/

function finishBoot() {

    const screen =
        document.getElementById(
            "corilzonBootScreen"
        );


    screen.className =
        "corilzonBootScreen corilzonBootHidden";


    screen.innerHTML = "";


    bootRunning = false;


    /*
        Torna alla normale interfaccia
        principale di Corilzon.
    */

    if (
        typeof home ===
        "function"
    ) {

        home();

    }

}