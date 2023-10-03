document.addEventListener("DOMContentLoaded", () => {
    const colors = ['#f0f8ff', '#6495ed', '#000'];
    const body = document.body;

    let lastScrollTop = 0;
    let isScrollingDown = false;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    
        // Function to change the background color based on scroll position from white to dark blue
        function changeBackgroundColorDown() {
            const scrollPercentage = scrollY / maxScroll
            const colorValue = Math.min(255,(scrollPercentage) * 255);
            
            document.body.style.backgroundColor = `rgb(${255-(colorValue*0.95)},${255-(colorValue*0.95)},${255-(colorValue)*0.5}`;
        }
        // Function to change background color from 
        function changeBackgroundColorUp() {
            const scrollPercentage = maxScroll / scrollY

            const colorValue = Math.min(255,(scrollPercentage) * 255);
            
            document.body.style.backgroundColor = `rgb(${colorValue},${colorValue},${255}`;
        }
        function changeTextColor() {
            const threshold = 500
            const threshScrollPercentage = (scrollY - threshold) / (maxScroll - threshold);
            let textColor;
            if (scrollY >= threshold) {
                textColor = `rgb(${threshScrollPercentage * 255}, ${threshScrollPercentage * 255}, ${threshScrollPercentage * 255})`;
            } else {
                textColor = 'black';
            }
            toColor = document.querySelectorAll('.collapsibleContent');
            toColor.forEach(element => {
                element.style.color = textColor;
            })
        }

        // Add a scroll event listener to trigger the color change
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            isScrollingDown = scrollY > lastScrollTop
            if (isScrollingDown) {
                changeBackgroundColorDown()
            } else {
                changeBackgroundColorUp()
            }
            changeTextColor()
        }
        )
});