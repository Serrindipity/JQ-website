console.log(42)
const body = document.body
const scrollFadeStart = 300;
const scrollFadeEnd = 800;
const initialOpacity = 1;

function updateBackgroundOpacity() {
    const scrollPosition = window.scrollY
    let newOpacity = initialOpacity;
    if (scrollPosition > scrollFadeStart) {
        newOpacity = 1 - ((scrollPosition - scrollFadeStart) / (scrollFadeEnd - scrollFadeStart))
    }
    body.style.opacity = newOpacity.toFixed(2)
}

window.addEventListener('scroll', updateBackgroundOpacity);
updateBackgroundOpacity();