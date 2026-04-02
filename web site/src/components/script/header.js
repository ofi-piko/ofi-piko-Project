document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    if (!header) return;
    header.innerHTML = `<div class="header__container">
        <div class="header__branding">
            <a href="#" class="header__logo">◈</a>
            <h1 class="header__title">Ofi_piko</h1>
        </div>
        <nav class="header__nav">
            <ul class="header__menu">
                <li><a id="Home section_Home" href="/index.html" class="header__link">Главная</a></li>
                <li><a href="/index.html" id="AboutMe section_AboutMe" class="header__link">Обо мне</a></li>
                <li><a href="/index.html" id="timeline section_timeline" class="header__link">Путь</a></li>
                <li><a id="Cash section_Cash" href="./rate.html" class="header__link">Отзывы</a></li>
                <li><a href="/index.html" id="Project section_Project" class="header__link">Проекты</a></li>
                <li>
                    <a id="Contact_section_Contact" class="header__link">Контакты</a>
                    <div id="contactOverlay" style="display:none;">
                        <ul id="contactMenu">
                            <li>Email: example@mail.com</li>
                            <li>Телефон: +7 999 123-45-67</li>
                            <li>Адрес: Москва, ул. Примерная</li>
                        </ul>
                    </div>
                </li>
            </ul>
        </nav>
        <div class="header__actions">
            <div id="registerModal" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>Регистрация</h2>
                    <form id="registerForm">
                        <input type="text" id="firstName" placeholder="Имя" required>
                        <input type="text" id="lastName" placeholder="Фамилия" required>
                        <input type="tel" id="phone" placeholder="Номер телефона" required pattern="[0-9]{10,15}">
                        <button type="submit">Зарегистрироваться</button>
                    </form>
                </div>
            </div>
            <button class="header__button" id="authButton">Войти/Зарегистрироваться</button>
        </div>
    </div>`;
});