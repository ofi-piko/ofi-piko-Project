import "./mouse.js"
import "./script.js"
import "./rate.js"

import "../components/script/footer.js"
import "../components/script/header.js"
import "../components/script/bot.js"
import "../components/script/register.js"
import "../components/script/wifi.js"

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".page-transition")

    if (container && localStorage.getItem("page-transition") === "true") {
        container.classList.add("fade-in")
        requestAnimationFrame(() => {
            container.classList.remove("fade-in")
        })
        localStorage.removeItem("page-transition")
    }

    document.querySelectorAll("a").forEach(link => {
        if (link.hostname === window.location.hostname) {
            link.addEventListener("click", e => {
                e.preventDefault()
                if (container) container.classList.add("fade-out")
                localStorage.setItem("page-transition", "true")
                setTimeout(() => {
                    window.location.href = link.href
                }, 400)
            })
        }
    })
})


function updateNetworkStatus() {
    const isOnline = navigator.onLine
    localStorage.setItem('networkStatus', isOnline ? 'online' : 'offline')

    if (isOnline) {
        document.documentElement.classList.remove('is-offline')
    } else {
        document.documentElement.classList.add('is-offline')
    }
}

window.addEventListener('online', updateNetworkStatus)
window.addEventListener('offline', updateNetworkStatus)

updateNetworkStatus()

const sections = document.querySelectorAll("main > section");
const footer = document.getElementById("footer");
const header = document.querySelector(".header");

let current = 0;
let isAnimating = false;
let scrollAccumulator = 0;
const SCROLL_THRESHOLD = 120; // ВОТ ЗАДЕРЖКА


// --- INIT ---
function init() {
    sections.forEach(sec => {
        sec.classList.remove("active");
    });

    sections[0].classList.add("active");
    footer.style.display = "none";
}

init();


// --- ПРОВЕРКА ВНУТРЕННЕГО СКРОЛЛА ---
function canScrollInside(section, direction) {
    const scrollable = section.querySelector(".scrollable");
    if (!scrollable) return false;

    if (direction === "down") {
        return scrollable.scrollTop + scrollable.clientHeight < scrollable.scrollHeight - 5;
    } else {
        return scrollable.scrollTop > 5;
    }
}


// --- HEADER ---
function hideHeader() {
    header.style.opacity = "0";
    header.style.transform = "translateY(-100%)";
}

function showHeader() {
    header.style.opacity = "1";
    header.style.transform = "translateY(0)";
}


// --- ПЕРЕКЛЮЧЕНИЕ ---
function changeSection(next) {
    if (next < 0 || next >= sections.length) return;
    if (isAnimating) return;

    isAnimating = true;

    const currentSec = sections[current];
    const nextSec = sections[next];

    currentSec.classList.remove("active");

    setTimeout(() => {
        nextSec.classList.add("active");

        current = next;

        // HEADER
        if (current === 0) {
            showHeader();
        } else {
            hideHeader();
        }

        // FOOTER
        if (current === sections.length - 1) {
            footer.style.display = "block";
        } else {
            footer.style.display = "none";
        }

        setTimeout(() => {
            isAnimating = false;
        }, 600);

    }, 250);
}


// --- SCROLL ---
window.addEventListener("wheel", (e) => {
    if (isAnimating) return;

    const direction = e.deltaY > 0 ? "down" : "up";
    const currentSec = sections[current];

    // если можно скроллить внутри — не переключаем
    if (canScrollInside(currentSec, direction)) return;

    scrollAccumulator += e.deltaY;

    // не сразу
    if (Math.abs(scrollAccumulator) < SCROLL_THRESHOLD) return;

    if (direction === "down") {
        changeSection(current + 1);
    } else {
        changeSection(current - 1);
    }

    scrollAccumulator = 0;
});// пример: клик по кнопкам
document.querySelectorAll('.catBtn')
  .forEach(btn => btn.onclick = () => console.log(btn.dataset.cat));