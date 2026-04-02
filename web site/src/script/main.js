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

updateNetworkStatus();