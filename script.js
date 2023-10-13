function ToggleMenu() {
    const menu = document.querySelector('.menu_link')
    const icon = document.querySelector('.hamburger-icon')

    menu.classList.toggle('open')
    icon.classList.toggle('open')
}