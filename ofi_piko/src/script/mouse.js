const segments = 12
const cursor = document.querySelector('.cursor')

if (cursor) {
    document.body.style.cursor = 'none'
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const dots = [{ el: cursor, x: mouse.x, y: mouse.y }]

    for (let i = 1; i < segments; i++) {
        const dot = document.createElement('div')
        dot.classList.add('cursor-dot')
        dot.style.position = 'fixed'
        dot.style.width = '18px'
        dot.style.height = '18px'
        dot.style.borderRadius = '100%'
        dot.style.background = 'gray'
        dot.style.pointerEvents = 'none'
        dot.style.zIndex = '9999'
        dot.style.opacity = 1 - i / segments
        dot.style.transform = `translate(-50%, -50%) scale(${1 - i / segments})`
        dot.style.willChange = 'left, top'

        document.body.appendChild(dot)
        dots.push({ el: dot, x: mouse.x, y: mouse.y })
    }

    let ticking = false
    window.addEventListener('mousemove', e => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                mouse.x = e.clientX
                mouse.y = e.clientY
                ticking = false
            })
            ticking = true
        }
    })

    function isMobileDevice() {
        const ua = navigator.userAgent;
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(ua);
    }

    const isMobile = isMobileDevice();

    if (isMobile) {
        const cursors = document.querySelectorAll('.cursor-dot, .cursor');
        cursors.forEach(el => el.remove());
        console.log("кастомный курсор удалён так как это моб устройство");
    } else {
        console.log("кастомный курсор активен");
    }

    function animate() {
        let x = mouse.x
        let y = mouse.y

        dots.forEach(dot => {
            dot.x += (x - dot.x) * 0.35
            dot.y += (y - dot.y) * 0.35

            dot.el.style.left = dot.x + 'px'
            dot.el.style.top = dot.y + 'px'

            x = dot.x
            y = dot.y
        })

        requestAnimationFrame(animate)
    }

    animate()
}

