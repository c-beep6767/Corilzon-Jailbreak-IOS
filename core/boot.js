/*
 * COLIRZON BOOT.JS
 *
 * IMPORTANTE:
 * Questo script NON avvia il boot automaticamente.
 *
 * Per avviarlo da settings.html / installer:
 *
 *     startColirzonBoot();
 *
 * Chiamalo SOLO quando l'installazione raggiunge il 100%.
 */

(() => {

    const APPLE_TIME = 2000;       // 2 secondi
    const KERNEL_TIME = 120000;    // 120 secondi
    const FINAL_BAR_TIME = 5000;   // 5 secondi

    let bootStarted = false;

    window.startColirzonBoot = function () {

        // Evita che il boot venga avviato due volte
        if (bootStarted) return;
        bootStarted = true;

        // =====================================================
        // CONTENITORE PRINCIPALE
        // =====================================================

        const boot = document.createElement("div");

        boot.id = "colirzon-boot";

        Object.assign(boot.style, {
            position: "fixed",
            inset: "0",
            width: "100vw",
            height: "100dvh",
            margin: "0",
            padding: "0",
            background: "#000",
            overflow: "hidden",
            zIndex: "2147483647",
            boxSizing: "border-box"
        });

        document.body.appendChild(boot);


        // =====================================================
        // FASE 1 — SCHERMO NERO + APPLE
        // =====================================================

        const apple = document.createElement("div");

        Object.assign(apple.style, {
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: "72px",
            lineHeight: "1",
            userSelect: "none"
        });

        apple.textContent = "";

        boot.appendChild(apple);


        // Dopo 2 secondi → kernel
        setTimeout(() => {

            apple.remove();

            startKernel();

        }, APPLE_TIME);


        // =====================================================
        // FASE 2 — KERNEL
        // =====================================================

        function startKernel() {

            const kernel = document.createElement("div");

            kernel.id = "colirzon-kernel";

            Object.assign(kernel.style, {
                position: "absolute",

                // PICCOLO ANGOLO SUPERIORE SINISTRO
                left: "12px",
                top: "12px",

                width: "46vw",
                height: "32vh",

                padding: "4px",

                boxSizing: "border-box",

                overflow: "hidden",

                background: "transparent",

                color: "#fff",

                fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",

                fontSize: "9px",

                lineHeight: "10px",

                whiteSpace: "pre",

                textAlign: "left",

                userSelect: "none",

                pointerEvents: "none"
            });

            boot.appendChild(kernel);


            // ---------------------------------------------
            // DATI DEL KERNEL
            // ---------------------------------------------

            const modules = [
                "COLIRZON KERNEL",
                "BOOT CORE",
                "MEMORY MANAGER",
                "PROCESS MANAGER",
                "STORAGE DRIVER",
                "NETWORK DRIVER",
                "DISPLAY DRIVER",
                "FILESYSTEM",
                "FERTENCH FS",
                "SECURITY MODULE",
                "SYSTEM SERVICES",
                "DEVICE MANAGER",
                "USERSPACE",
                "INSTALLER",
                "BOOT SERVICES"
            ];


            const chars =
                "0123456789" +
                "ABCDEF" +
                "abcdef" +
                "_-+=/:;<>[]{}()" +
                " ";


            function randomHex(length) {

                let result = "";

                const hex = "0123456789ABCDEF";

                for (let i = 0; i < length; i++) {
                    result += hex[
                        Math.floor(Math.random() * hex.length)
                    ];
                }

                return result;
            }


            function randomAddress() {

                return "0x" + randomHex(8);
            }


            function randomLine() {

                const type = Math.floor(Math.random() * 7);

                switch (type) {

                    case 0:
                        return "[COLIRZON] " +
                            modules[
                                Math.floor(Math.random() * modules.length)
                            ] +
                            " ........ OK";

                    case 1:
                        return "[KERNEL] address=" +
                            randomAddress() +
                            " status=READY";

                    case 2:
                        return "[MEM] block=" +
                            randomAddress() +
                            " size=" +
                            Math.floor(Math.random() * 4096) +
                            "KB";

                    case 3:
                        return "[DRV] load(" +
                            modules[
                                Math.floor(Math.random() * modules.length)
                            ] +
                            ") -> " +
                            randomAddress();

                    case 4:
                        return "[SYS] task=" +
                            Math.floor(Math.random() * 99999) +
                            " pid=" +
                            Math.floor(Math.random() * 9999);

                    case 5:
                        return "[FS] /system/" +
                            randomHex(5) +
                            "/" +
                            randomHex(8) +
                            " mounted";

                    default: {

                        let line = "";

                        const length =
                            45 + Math.floor(Math.random() * 50);

                        for (let i = 0; i < length; i++) {

                            line += chars[
                                Math.floor(Math.random() * chars.length)
                            ];

                        }

                        return line;
                    }
                }
            }


            // ---------------------------------------------
            // KERNEL VELOCE
            // ---------------------------------------------

            let running = true;

            function generateKernel() {

                if (!running) return;


                /*
                 * Molte righe per ogni frame.
                 * Questo crea l'effetto di codice
                 * che scende molto velocemente.
                 */

                let output = "";

                for (let i = 0; i < 12; i++) {

                    output += randomLine() + "\n";

                }


                kernel.textContent += output;


                /*
                 * Mantiene il DOM leggero.
                 * Non conserviamo milioni di caratteri
                 * contemporaneamente.
                 */

                const MAX_CHARS = 18000;

                if (kernel.textContent.length > MAX_CHARS) {

                    kernel.textContent =
                        kernel.textContent.slice(-MAX_CHARS);

                }


                requestAnimationFrame(generateKernel);
            }


            generateKernel();


            // ---------------------------------------------
            // 120 SECONDI ESATTI
            // ---------------------------------------------

            setTimeout(() => {

                running = false;

                kernel.remove();

                showFinalApple();

            }, KERNEL_TIME);

        }


        // =====================================================
        // FASE 3 — APPLE + BARRA
        // =====================================================

        function showFinalApple() {

            const finalScreen =
                document.createElement("div");

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


            // APPLE

            const finalApple =
                document.createElement("div");

            Object.assign(finalApple.style, {
                color: "#fff",
                fontFamily:
                    "Arial, Helvetica, sans-serif",
                fontSize: "72px",
                lineHeight: "1",
                marginBottom: "42px",
                userSelect: "none"
            });

            finalApple.textContent = "";

            finalScreen.appendChild(finalApple);


            // ---------------------------------------------
            // SFONDO BARRA
            // ---------------------------------------------

            const barBackground =
                document.createElement("div");

            Object.assign(barBackground.style, {
                width: "190px",
                height: "5px",
                background: "#333",
                borderRadius: "10px",
                overflow: "hidden"
            });

            finalScreen.appendChild(barBackground);


            // ---------------------------------------------
            // BARRA BIANCA
            // ---------------------------------------------

            const bar =
                document.createElement("div");

            Object.assign(bar.style, {
                width: "0%",
                height: "100%",
                background: "#fff",
                borderRadius: "10px"
            });

            barBackground.appendChild(bar);


            // ---------------------------------------------
            // PROGRESSO
            // ---------------------------------------------

            const startTime = performance.now();

            function updateBar(now) {

                const elapsed =
                    now - startTime;

                let progress =
                    elapsed / FINAL_BAR_TIME;

                if (progress > 1) {
                    progress = 1;
                }

                bar.style.width =
                    (progress * 100) + "%";


                if (progress < 1) {

                    requestAnimationFrame(updateBar);

                } else {

                    setTimeout(() => {

                        finishBoot();

                    }, 500);

                }

            }

            requestAnimationFrame(updateBar);

        }


        // =====================================================
        // FASE 4 — FINE BOOT
        // =====================================================

        function finishBoot() {

            boot.remove();

            /*
             * Se Colirzon ha già una funzione per aprire
             * la schermata principale, viene utilizzata.
             */

            if (
                typeof window.startColirzon ===
                "function"
            ) {

                window.startColirzon();

            }

        }

    };

})();