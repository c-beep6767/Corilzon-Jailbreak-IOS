/*
    COLIRZON INSTALLER

    Il pulsante INSTALLA prepara l'installazione
    come Web App.

    Su iOS Safari:
    Condividi → Aggiungi alla schermata Home

    La Web App utilizza il manifest per aprire
    direttamente il Jailbreak principale.
*/


const installButton =
    document.getElementById("installButton");

const modal =
    document.getElementById("modal");

const confirmButton =
    document.getElementById("confirmButton");

const cancelButton =
    document.getElementById("cancelButton");

const iosInstructions =
    document.getElementById("iosInstructions");

const closeInstructions =
    document.getElementById("closeInstructions");


let deferredPrompt = null;


/*
    Registrazione Service Worker.
*/

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./sw.js")
            .then(() => {

                console.log(
                    "Colirzon Installer Service Worker attivo"
                );

            })
            .catch(error => {

                console.log(
                    "Service Worker non disponibile:",
                    error
                );

            });

    });

}


/*
    Android / browser compatibili
    con beforeinstallprompt.
*/

window.addEventListener(
    "beforeinstallprompt",
    event => {

        event.preventDefault();

        deferredPrompt = event;

    }
);


/*
    Apertura finestra INSTALLA.
*/

installButton.addEventListener(
    "click",
    () => {

        modal.classList.remove("hidden");

    }
);


/*
    Annulla.
*/

cancelButton.addEventListener(
    "click",
    () => {

        modal.classList.add("hidden");

    }
);


/*
    Continua.
*/

confirmButton.addEventListener(
    "click",
    async () => {

        modal.classList.add("hidden");


        /*
            Se il browser supporta
            beforeinstallprompt,
            utilizziamo il suo dialogo nativo.
        */

        if (deferredPrompt) {

            deferredPrompt.prompt();

            const result =
                await deferredPrompt.userChoice;

            console.log(
                "Installazione:",
                result.outcome
            );

            deferredPrompt = null;

            return;
        }


        /*
            iPhone / iPad.

            Safari non permette a una normale pagina
            web di aprire automaticamente il menu
            "Aggiungi alla schermata Home".
        */

        iosInstructions.classList.remove("hidden");

    }
);


/*
    Chiudi istruzioni iOS.
*/

closeInstructions.addEventListener(
    "click",
    () => {

        iosInstructions.classList.add("hidden");

    }
);


/*
    Se l'app viene già aperta
    come Web App standalone,
    non mostrare nuovamente le istruzioni.
*/

if (
    window.navigator.standalone === true ||
    window.matchMedia("(display-mode: standalone)").matches
) {

    console.log(
        "Colirzon è stato aperto dalla Home."
    );

}