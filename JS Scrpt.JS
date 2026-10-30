

// ==========================================
// AQUAPURE WATER REFILLING STATION
// MIDTERM PRACTICAL EXAMINATION
// ==========================================

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);


// ==========================================
// B1: DARK MODE WITH LOCAL STORAGE
// ==========================================

const darkModeToggle = document.getElementById("darkModeToggle");
const htmlElement = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem("aquapure-theme");

if (savedTheme === "dark") {
    htmlElement.classList.add("dark");
}

function updateThemeButton() {

    const isDark = htmlElement.classList.contains("dark");

    darkModeToggle.textContent = isDark
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";

    darkModeToggle.setAttribute("aria-pressed", String(isDark));

}

updateThemeButton();

darkModeToggle.addEventListener("click", function () {

    // Required dark mode functionality
    htmlElement.classList.toggle("dark");

    const isDark = htmlElement.classList.contains("dark");

    localStorage.setItem(
        "aquapure-theme",
        isDark ? "dark" : "light"
    );

    updateThemeButton();

});


// ==========================================
// D1-D3: GSAP PAGE LOAD INTRO
// ==========================================

const motionSettings = gsap.matchMedia();

motionSettings.add(
    "(prefers-reduced-motion: no-preference)",
    function () {

        // power3.out provides a smooth and natural entrance.
        const introTimeline = gsap.timeline({
            paused: true,

            defaults: {
                duration: 0.45,
                ease: "power3.out"
            }
        });

        introTimeline
            .from("#heroTag", {
                opacity: 0,
                y: 25
            })

            .from("#heroTitle", {
                opacity: 0,
                y: 40
            }, "-=0.25")

            .from("#heroText", {
                opacity: 0,
                y: 25
            }, "-=0.25")

            .from("#heroButtons > *", {
                opacity: 0,
                y: 20,
                stagger: 0.10
            }, "-=0.20")

            .from("#heroVisual", {
                opacity: 0,
                scale: 0.92
            }, "<");

        // Play animation when page loads
        introTimeline.play();

        // D3: Replay Intro Button
        const replayButton = document.getElementById("replayBtn");

        replayButton.addEventListener("click", function () {
            introTimeline.restart();
        });

        // Clean up event listener and timeline
        return function () {
            introTimeline.kill();
            replayButton.removeEventListener("click", replayIntro);
        };

        function replayIntro() {
            introTimeline.restart();
        }

    }
);


// ==========================================
// E1-E3: SCROLLTRIGGER ANIMATIONS
// ==========================================

const scrollSettings = gsap.matchMedia();

scrollSettings.add(
    "(prefers-reduced-motion: no-preference)",
    function () {

        // E1: Reveal every section below the hero
        gsap.utils.toArray(".reveal").forEach(function (section) {

            gsap.fromTo(
                section,

                {
                    opacity: 0,
                    y: 35
                },

                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",

                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

        });


        // E2: Scroll progress bar with scrub
        gsap.to("#progressBar", {

            width: "100%",
            ease: "none",

            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.3
            }

        });

    }
);


// ==========================================
// CONTACT FORM
// Layout only - no backend required
// ==========================================

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    alert("Thank you for contacting AquaPure Water Refilling Station!");

    contactForm.reset();

});

