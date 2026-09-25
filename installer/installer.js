const installButton =
    document.getElementById("installButton");

const dialog =
    document.getElementById("dialog");

const cancelButton =
    document.getElementById("cancelButton");

const confirmButton =
    document.getElementById("confirmButton");

const status =
    document.getElementById("status");

let deferredPrompt = null;


/*
 * Supporto al prompt PWA
 * quando viene fornito dal browser.
 */
window.addEventListener(
    "beforeinstallprompt",
    event => {

        event.preventDefault();

        deferredPrompt = event;
    }
);


/*
 * Apertura della finestra di conferma.
 */
installButton.addEventListener(
    "click",
    () => {

        dialog.classList.remove("hidden");
    }
);


/*
 * Annullamento.
 */
cancelButton.addEventListener(
    "click",
    () => {

        dialog.classList.add("hidden");
    }
);


/*
 * Conferma installazione.
 */
confirmButton.addEventListener(
    "click",
    async () => {

        dialog.classList.add("hidden");

        if (deferredPrompt) {

            deferredPrompt.prompt();

            const result =
                await deferredPrompt.userChoice;

            if (result.outcome === "accepted") {

                status.textContent =
                    "Colirzon è stato aggiunto.";
            }
            else {

                status.textContent =
                    "Installazione annullata.";
            }

            deferredPrompt = null;

            return;
        }


        /*
         * Safari su iPhone:
         * mostra istruzioni perché una pagina
         * non può richiamare autonomamente
         * il comando di aggiunta alla Home.
         */
        status.innerHTML =
            "Apri il menu Condividi di Safari " +
            "e scegli <b>Aggiungi alla schermata Home</b>.";
    }
);


/*
 * Service Worker.
 */
if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker.register(
                "sw.js"
            ).catch(error => {

                console.log(
                    "Service Worker:",
                    error
                );
            });
        }
    );
}


/*
 * Evento di installazione completata.
 */
window.addEventListener(
    "appinstalled",
    () => {

        status.textContent =
            "Colirzon è stato installato.";
    }
);