let curSection = 'development';
const initHome = () => {
    const bodyEl = document.querySelector('body.page-home');
    const hexaOuterEl = document.querySelector('.outer-hexagon');
    bodyEl.addEventListener('mouseover', ({ target }) => {
        if (target.matches('section') === true) {
            if (target.classList[0] !== curSection) {
                hexaOuterEl.classList.remove(curSection);
                curSection = target.classList[0];
                hexaOuterEl.classList.add(curSection);
            }
        }
        if (target.matches('img') === true) {
            if (curSection !== 'contact') {
                hexaOuterEl.classList.remove(curSection);
                curSection = 'contact';
                hexaOuterEl.classList.add(curSection);
            }
        }
    });

    bodyEl.addEventListener('click', ({ target }) => {
            bodyEl.classList.add('page-transition');
            bodyEl.classList.add('page-about-transition');
            // alert('ok');
    });
}

window.onload = initHome;