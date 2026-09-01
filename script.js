// ==========================================
// DESA PUSAKA - SCRIPT.JS
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. NAVBAR SCROLL
    // ==========================================

    const navbar = document.querySelector(".navbar");

    function checkScroll() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll();


    // ==========================================
    // 2. MENU MOBILE
    // ==========================================

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("show");

            // Ubah icon menu
            if (navMenu.classList.contains("show")) {
                menuToggle.innerHTML = "✕";
            } else {
                menuToggle.innerHTML = "☰";
            }
        });


        // Tutup menu setelah klik link
        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("show");
                menuToggle.innerHTML = "☰";
            });
        });
    }


    // ==========================================
    // 3. ANIMASI REVEAL SAAT SCROLL
    // ==========================================

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });


    // ==========================================
    // 4. ANIMASI PARALLAX SEDERHANA
    // ==========================================

    const hero = document.querySelector(".hero");

    if (hero) {

        window.addEventListener("scroll", function () {

            const scrollPosition = window.scrollY;

            const clouds = document.querySelectorAll(".cloud");

            clouds.forEach(function (cloud, index) {

                const speed = 0.02 + (index * 0.01);

                cloud.style.transform =
                    `translateX(${scrollPosition * speed}px)`;

            });

        });

    }


    // ==========================================
    // 5. EFEK HOVER 3D PADA CARD
    // ==========================================

    const cards = document.querySelectorAll(
        ".card, .feature-card, .gallery-item, .video-card"
    );

    cards.forEach(function (card) {

        card.addEventListener("mousemove", function (e) {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -3;

            const rotateY =
                ((x - centerX) / centerX) * 3;

            card.style.transform =
                `perspective(800px)
                 translateY(-6px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;
        });


        card.addEventListener("mouseleave", function () {
            card.style.transform = "";
        });

    });


    // ==========================================
    // 6. LIGHTBOX GALERI
    // ==========================================

    const galleryImages = document.querySelectorAll(
        ".gallery-item img, .preview-gallery img"
    );

    if (galleryImages.length > 0) {

        // Buat lightbox
        const lightbox = document.createElement("div");

        lightbox.className = "lightbox";

        lightbox.innerHTML = `
            <button class="lightbox-close">✕</button>

            <button class="lightbox-prev">‹</button>

            <div class="lightbox-content">
                <img src="" alt="Preview">
            </div>

            <button class="lightbox-next">›</button>
        `;

        document.body.appendChild(lightbox);


        const lightboxImage =
            lightbox.querySelector(".lightbox-content img");

        const closeButton =
            lightbox.querySelector(".lightbox-close");

        const prevButton =
            lightbox.querySelector(".lightbox-prev");

        const nextButton =
            lightbox.querySelector(".lightbox-next");


        let currentImage = 0;


        function showImage(index) {

            if (index < 0) {
                index = galleryImages.length - 1;
            }

            if (index >= galleryImages.length) {
                index = 0;
            }

            currentImage = index;

            lightboxImage.src =
                galleryImages[currentImage].src;

            lightboxImage.alt =
                galleryImages[currentImage].alt || "Galeri Desa Pusaka";

            lightbox.classList.add("show");

            document.body.style.overflow = "hidden";
        }


        function closeLightbox() {

            lightbox.classList.remove("show");

            document.body.style.overflow = "";
        }


        galleryImages.forEach(function (image, index) {

            image.style.cursor = "pointer";

            image.addEventListener("click", function () {
                showImage(index);
            });

        });


        closeButton.addEventListener(
            "click",
            closeLightbox
        );


        prevButton.addEventListener(
            "click",
            function () {
                showImage(currentImage - 1);
            }
        );


        nextButton.addEventListener(
            "click",
            function () {
                showImage(currentImage + 1);
            }
        );


        // Klik area gelap untuk menutup
        lightbox.addEventListener("click", function (e) {

            if (e.target === lightbox) {
                closeLightbox();
            }

        });


        // Keyboard
        document.addEventListener("keydown", function (e) {

            if (!lightbox.classList.contains("show")) {
                return;
            }

            if (e.key === "Escape") {
                closeLightbox();
            }

            if (e.key === "ArrowLeft") {
                showImage(currentImage - 1);
            }

            if (e.key === "ArrowRight") {
                showImage(currentImage + 1);
            }

        });

    }


    // ==========================================
    // 7. TAHUN OTOMATIS
    // ==========================================

    const yearElements =
        document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });


    // ==========================================
    // 8. EFEK KLIK TOMBOL
    // ==========================================

    const buttons =
        document.querySelectorAll(".btn");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            button.classList.add("clicked");

            setTimeout(function () {
                button.classList.remove("clicked");
            }, 300);

        });

    });


    // ==========================================
    // 9. CONSOLE
    // ==========================================

    console.log(
        "🌿 Website Desa Pusaka berhasil dijalankan!"
    );

});