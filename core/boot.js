// COLIRZON BOOT.JS
// Boot PWA: nero → kernel veloce per 120s → Apple + barra

(() => {
    const KERNEL_TIME = 120000; // 120 secondi = 2 minuti

    // Schermata boot
    const boot = document.createElement("div");
    boot.id = "colirzon-boot";

    Object.assign(boot.style, {
        position: "fixed",
        inset: "0",
        width: "100vw",
        height: "100dvh",
        background: "#000",
        color: "#fff",
        overflow: "hidden",
        zIndex: "2147483647",
        fontFamily: "monospace",
        boxSizing: "border-box"
    });

    document.body.appendChild(boot);

    // -------------------------
    // FASE 1: SCHERMO NERO
    // -------------------------

    boot.innerHTML = "";

    // Logo Apple simulato
    const apple = document.createElement("div");

    Object.assign(apple.style, {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        fontFamily: "Arial, sans-serif",
        fontSize: "85px",
        color: "#fff",
        opacity: "0"
    });

    apple.textContent = "";
    boot.appendChild(apple);

    requestAnimationFrame(() => {
        apple.style.transition = "opacity .4s";
        apple.style.opacity = "1";
    });

    // -------------------------
    // DOPO 2 SECONDI → KERNEL
    // -------------------------

    setTimeout(() => {
        apple.remove();
        startKernel();
    }, 2000);


    function startKernel() {

        // Contenitore del kernel
        const kernel = document.createElement("div");

        Object.assign(kernel.style, {
            position: "absolute",
            inset: "0",
            padding: "12px",
            boxSizing: "border-box",
            overflow: "hidden",
            background: "#000",
            color: "#fff",
            fontSize: "11px",
            lineHeight: "13px",
            whiteSpace: "pre",
            textAlign: "left"
        });

        boot.appendChild(kernel);

        const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
            "abcdefghijklmnopqrstuvwxyz" +
            "0123456789" +
            "_-+=/*<>[]{}()";

        const messages = [
            "COLIRZON KERNEL",
            "initializing subsystem",
            "loading memory manager",
            "checking storage",
            "initializing drivers",
            "starting network stack",
            "loading filesystem",
            "mounting FERTENCH FS",
            "initializing display",
            "checking system services",
            "starting userspace",
            "kernel task initialized",
            "system call ready"
        ];

        function randomCodeLine() {
            let line = "";

            // Alcune righe hanno testo riconoscibile
            if (Math.random() < 0.18) {
                line += messages[
                    Math.floor(Math.random() * messages.length)
                ] + "  ";
            }

            // Codice casuale velocissimo
            const length = 55 + Math.floor(Math.random() * 90);

            for (let i = line.length; i < length; i++) {
                line += chars[
                    Math.floor(Math.random() * chars.length)
                ];
            }

            return line;
        }

        let running = true;

        // Generazione molto rapida delle righe
        function generateKernel() {

            if (!running) return;

            // Molte righe per frame = effetto kernel molto veloce
            let output = "";

            for (let i = 0; i < 18; i++) {
                output += randomCodeLine() + "\n";
            }

            kernel.textContent += output;

            // Mantieni soltanto la parte visibile,
            // evitando che il DOM diventi enorme dopo 120 secondi.
            const maxCharacters = 30000;

            if (kernel.textContent.length > maxCharacters) {
                kernel.textContent =
                    kernel.textContent.slice(-maxCharacters);
            }

            requestAnimationFrame(generateKernel);
        }

        generateKernel();

        // -------------------------
        // KERNEL = 120 SECONDI
        // -------------------------

        setTimeout(() => {
            running = false;
            kernel.remove();
            showFinalApple();
        }, KERNEL_TIME);
    }


    // -------------------------
    // FASE FINALE:
    // APPLE + BARRA BIANCA
    // -------------------------

    function showFinalApple() {

        const finalScreen = document.createElement("div");

        Object.assign(finalScreen.style, {
            position: "absolute",
            inset: "0",
            background: "#000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        });

        boot.appendChild(finalScreen);

        const finalApple = document.createElement("div");

        Object.assign(finalApple.style, {
            fontFamily: "Arial, sans-serif",
            fontSize: "85px",
            color: "#fff",
            marginBottom: "45px"
        });

        finalApple.textContent = "";

        finalScreen.appendChild(finalApple);

        // Barra bianca
        const barBackground = document.createElement("div");

        Object.assign(barBackground.style, {
            width: "190px",
            height: "5px",
            borderRadius: "10px",
            background: "#333",
            overflow: "hidden"
        });

        const bar = document.createElement("div");

        Object.assign(bar.style, {
            width: "0%",
            height: "100%",
            background: "#fff",
            borderRadius: "10px",
            transition: "width .15s linear"
        });

        barBackground.appendChild(bar);
        finalScreen.appendChild(barBackground);

        // Caricamento simulato
        let progress = 0;

        const progressTimer = setInterval(() => {

            progress += Math.random() * 3;

            if (progress >= 100) {
                progress = 100;
                clearInterval(progressTimer);

                // Dopo il caricamento puoi avviare
                // la normale interfaccia di Colirzon.
                setTimeout(() => {
                    boot.remove();

                    // Se hai una funzione di avvio dell'interfaccia,
                    // chiamala qui.
                    if (typeof window.startColirzon === "function") {
                        window.startColirzon();
                    }
                }, 500);
            }

            bar.style.width = progress + "%";

        }, 150);
    }

})();