// marked options
marked.use({
    breaks: true,
});

const input = document.querySelector('textarea');
const display = document.querySelector('.display')
const content = document.querySelector('.content');
const button = document.querySelector('button[type="submit"]');


input.addEventListener('input', (event) => {
    event.preventDefault();
    content.innerHTML = marked.parse(input.value);
    adjustFontSize(content)

});
button.addEventListener('click', (event) => {
    event.preventDefault();
    button.innerText = 'Update'
    display.style.display = 'block'
    content.innerHTML = marked.parse(input.value);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    adjustFontSize(content)
});

window.addEventListener('resize', () => {
    adjustFontSize(content);
})

function checkOverflow(el) {
    let curOverflow = el.style.overflow;
    if (!curOverflow || curOverflow === 'visible') {
        el.style.overflow = 'hidden';
    }
    let isOverflowing =
        el.clientWidth < el.scrollWidth ||
        el.clientHeight < el.scrollHeight;
    el.style.overflow = curOverflow;
    return isOverflowing;
}


function adjustFontSize(el) {
    el.style.fontSize = '1em'
    const incrementionRate = 0.05
    let lastSize = 1
    console.log('first size', lastSize)

    while (checkOverflow(el) && lastSize > 0) {
        console.log('DOING A LOOP')
        lastSize = lastSize - incrementionRate;
        console.log('last size', lastSize)
        el.style.fontSize = `${lastSize}em`
    }
}
