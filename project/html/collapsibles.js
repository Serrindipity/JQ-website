
document.addEventListener("DOMContentLoaded", () => {
    const collapsibles = document.querySelectorAll('.collapsible');
    collapsibles.forEach((collapsible) => {
        const button = collapsible.querySelector('.collapseButton');
        const content = collapsible.querySelector('.collapsibleContent');
        content.classList.toggle('collapsed');

        button.addEventListener('click', () => {
            const contentHeight = content.scrollHeight;
            if (content.classList.contains('collapsed')) {
                content.style.maxHeight = contentHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
            content.classList.toggle('collapsed');
        })
    })
});