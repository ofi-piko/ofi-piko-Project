const FULL_SPEED = 120;
// ==================== Социальные иконки ====================


(function initSocialIcons() {
    const socials = document.querySelectorAll('.MySocalMedia img');
    if (!socials.length) return;

    socials.forEach(img => {
        const originalSrc = img.src;
        const hoverSrc = originalSrc.replace(/\.svg(?=[^.]*$)/, '(2).svg');
        
        img.style.transition = 'transform 0.2s ease';
        
        img.addEventListener('mouseenter', () => {
            img.src = hoverSrc;
            img.style.transform = 'scale(1.25)';
        });
        
        img.addEventListener('mouseleave', () => {
            img.src = originalSrc;
            img.style.transform = 'scale(1)';
        });
        img.addEventListener('error', () => {
            if (img.src === hoverSrc) img.src = originalSrc;
        });
    });
})();

// ==================== Видео с принудительным воспроизведением ====================

(function initVideo() {
    const video = document.querySelector('.InfoIcon video');
    const btn = document.querySelector('#toggleSoundBtn');
    
    if (!video || !btn) return;

    video.loop = true;
    video.controls = false;

    const updateButtonText = () => {
        btn.textContent = video.muted ? 'Вкл звук' : 'Выкл звук';
    };
    updateButtonText();

    btn.addEventListener('click', () => {
        video.muted = !video.muted;
        updateButtonText();
    });

    const playVideo = () => {
        video.play().catch(e => console.log('Автовоспроизведение заблокировано:', e));
    };
    playVideo();
    video.addEventListener('pause', playVideo);

    document.addEventListener('click', function once() {
        video.play();
        document.removeEventListener('click', once);
    }, { once: true });
})();

// ==================== Анимация текста (codeOutput) ====================

(function initTextAnimation() {
    const output = document.querySelector("#codeOutput");
    if (!output) return;

    const states = [
        'conole.log',
        'con',
        'console.log("-разработчик',
        'console.log("',
        'console.log("Веб-разработчик & Бекэндер & монтажер)',
        'console.log("Веб-разработчик & Бекэндер & монтажер',
        'console.log("Веб-разработчик & Бекэндер & монтажер")',
        ''
    ];

    let stateIndex = 0;
    let pauseAfterFinal = false;
    const FINAL_STATE_INDEX = 6;

    function animateText() {
        const currentText = output.textContent;
        const targetText = states[stateIndex];

        if (!pauseAfterFinal) {
            if (currentText.length < targetText.length) {
                output.textContent += targetText[currentText.length];
            } else if (currentText.length > targetText.length) {
                output.textContent = currentText.slice(0, -1);
            } else {
                if (stateIndex === FINAL_STATE_INDEX) {
                    pauseAfterFinal = true;
                    setTimeout(() => {
                        pauseAfterFinal = false;
                        stateIndex = (stateIndex + 1) % states.length;
                        animateText();
                    }, 3000);
                    return;
                } else {
                    stateIndex = (stateIndex + 1) % states.length;
                }
            }
        }

        const delay = currentText.length > targetText.length ? FULL_SPEED / 2 : FULL_SPEED;
        setTimeout(animateText, delay);
    }

    animateText();
})();

// ==================== Тайпврайтер при наведении на competency ====================

(function initCompetencyHover() {
    const competencyItems = document.querySelectorAll('.competency');
    if (!competencyItems.length) return;

    const originalTexts = new Map();
    const timers = new Map();

    function clearTimersForElement(el) {
        const elTimers = timers.get(el) || [];
        elTimers.forEach(clearTimeout);
        timers.set(el, []);
    }

    function typeWriterForElement(el, text, index = 0) {
        const codeEl = el.querySelector('code');
        if (!codeEl) return;
        if (index <= text.length) {
            codeEl.textContent = text.slice(0, index);
            const timeout = setTimeout(() => typeWriterForElement(el, text, index + 1), FULL_SPEED);
            const current = timers.get(el) || [];
            current.push(timeout);
            timers.set(el, current);
        }
    }

    competencyItems.forEach(item => {
        const codeEl = item.querySelector('code');
        if (!codeEl) return;
        originalTexts.set(item, codeEl.textContent);
        codeEl.textContent = '';
        codeEl.style.opacity = '0';
    });
    competencyItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            clearTimersForElement(item);
            const codeEl = item.querySelector('code');
            if (codeEl) {
                codeEl.style.opacity = '1';
                const original = originalTexts.get(item);
                typeWriterForElement(item, original);
            }
        });

        item.addEventListener('mouseleave', () => {
            clearTimersForElement(item);
            const codeEl = item.querySelector('code');
            if (codeEl) {
                codeEl.style.opacity = '0';
                codeEl.textContent = '';
            }
        });
    });
})();

// ==================== Получение числа репозиториев с GitHub ====================

(async function updateRepoCount() {
    if (window.innerWidth < 768) return;

    const username = "ofi-piko";
    const url = `https://api.github.com/users/${username}`;
    const targetElement = document.querySelector(".allProject h4");
    if (!targetElement) return;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('GitHub API error');
        const data = await response.json();
        const repoCount = data.public_repos;
        targetElement.textContent = repoCount;
    } catch (err) {
        targetElement.textContent =  err;
    }
})();

// ==================== Фильтр навыков ====================

(function initSkillFilter() {
    const buttons = document.querySelectorAll('.catBtn');
    const skillCards = document.querySelectorAll('.skill-card');
    if (!buttons.length || !skillCards.length) return;

    // Функция применения фильтра
    function filterSkills() {
        const activeCats = [];
        buttons.forEach(btn => {
            if (btn.classList.contains('activeBtn') && btn.dataset.cat) {
                activeCats.push(btn.dataset.cat);
            }
        });

        skillCards.forEach(card => {
            if (activeCats.length === 0) {
                card.style.display = '';
            } else {
                const cardCat = card.dataset.cat;
                card.style.display = activeCats.includes(cardCat) ? '' : 'none';
            }
        });
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('activeBtn');
            filterSkills();
        });
    });

    filterSkills();
})();

// ==================== Iframe и полноэкранный режим ====================

(function initIframeFullscreen() {
    const iframe = document.querySelector('.app-frame');
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    const exitBtn = document.querySelector('.exit-fullscreen-btn');
    const fullscreenBar = document.querySelector('.fullscreen-bar');
    const appMenu = document.querySelector('.app-menu');

    if (!iframe || !fullscreenBtn || !exitBtn || !fullscreenBar || !appMenu) return;

    if (!iframe.src) {
        iframe.src = "https://windows-11-web-ofi.vercel.app/next/all/ru/index.html";
    }

    fullscreenBtn.addEventListener('click', () => {
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) {
            iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) {
            iframe.msRequestFullscreen();
        }
    });

    function handleFullscreenChange() {
        const isIframeFullscreen = document.fullscreenElement === iframe;
        if (isIframeFullscreen) {
            iframe.classList.add('fullscreen');
            fullscreenBar.classList.add('active');
            appMenu.style.visibility = 'hidden';
        } else {
            iframe.classList.remove('fullscreen');
            fullscreenBar.classList.remove('active');
            appMenu.style.visibility = 'visible';
        }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    exitBtn.addEventListener('click', () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    });
})();

// ==================== Плавная прокрутка по клику на пункты меню + Подсветка активного пункта меню при прокрутке ====================
(function initSmoothScroll() {
    const menuItems = [
        { id: "Home section_Home", action: "top" },
        { id: "AboutMe section_AboutMe", section: "#meInfo2" },
        { id: "timeline section_timeline", section: ".timeline" },
        { id: "Project section_Project", section: "#interactiveSkillsMenu" }
    ];

    function scrollToTarget(target) {
        if (target === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const element = document.querySelector(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                console.warn(`Элемент ${target} не найден`);
            }
        }
    }

    menuItems.forEach(item => {
        const button = document.getElementById(item.id);
        if (!button) return;

        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (item.section) {
                scrollToTarget(item.section);
            } else if (item.action === 'top') {
                scrollToTarget('top');
            }
        });
    });
})();


(function initActiveLinkHighlight() {
    const homeLinkId = "Home section_Home";
    const aboutLinkId = "AboutMe section_AboutMe";
    const timelineLinkId = "timeline section_timeline";
    const projectLinkId = "Project section_Project";

    const sections = [
        { selector: "#meInfo", menuId: aboutLinkId },
        { selector: ".timeline", menuId: timelineLinkId },
        { selector: "#interactiveSkillsMenu", menuId: projectLinkId }
    ];

    function highlightActiveLink() {
        const scrollPos = window.scrollY + window.innerHeight / 3;
        let activeFound = false;

        sections.forEach(({ selector, menuId }) => {
            const element = document.querySelector(selector);
            const menuLink = document.getElementById(menuId);
            if (!element || !menuLink) return;

            const elementTop = element.offsetTop;
            const elementBottom = elementTop + element.offsetHeight;

            if (scrollPos >= elementTop && scrollPos < elementBottom) {
                document.querySelectorAll('.header__link').forEach(link => link.classList.remove('active'));
                menuLink.classList.add('active');
                activeFound = true;
            }
        });

        if (!activeFound || window.scrollY < 100) {
            document.querySelectorAll('.header__link').forEach(link => link.classList.remove('active'));
            const homeLink = document.getElementById(homeLinkId);
            if (homeLink) homeLink.classList.add('active');
        }
    }

    window.addEventListener('scroll', highlightActiveLink);
    window.addEventListener('load', highlightActiveLink);
})();

(function initContactOverlay() {
    const contactLink = document.getElementById('Contact_section_Contact');
    const contactOverlay = document.getElementById('contactOverlay');
    if (!contactLink || !contactOverlay) return;

    contactLink.addEventListener('click', () => {
        contactOverlay.style.display = 'block';
    });

    contactOverlay.addEventListener('click', (e) => {
        if (e.target === contactOverlay) {
            contactOverlay.style.display = 'none';
        }
    });
})();