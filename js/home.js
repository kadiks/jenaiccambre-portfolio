let curSection = 'development';
const initHome = () => {
    const bodyEl = document.querySelector('body.page-home');
    const hexaOuterEl = document.querySelector('.outer-hexagon');
    const asideEl = document.querySelector('aside');
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
        // console.log('target', target);
        if (target.matches('section') === true) {
            // console.log('target2', [...target.classList].includes('about'));
            const category = target.getAttribute('data-category');
            const positions = getCategoryPositions({ el: target });
            setHexagonPos({ el: asideEl, category });

            // console.log('positions', positions);

            setCategoryPos({ category, positions });

            setTimeout(() => {
                bodyEl.classList.remove('page-home');
                bodyEl.classList.add('page-transition');
                bodyEl.classList.add(`page-${category}-transition`);
            }, 0);
        }
    });
};

const setCategoryPos = ({ category, positions }) => {
    const el = document.querySelector(`article.${category}`);
    el.style.display = 'flex';
    el.style.top = positions.top;
    el.style.left = positions.left;
    el.style.width = positions.width;
    el.style.height = positions.height;
};

const setHexagonPos = ({ el, category }) => {
    let xProp = 'left';
    let yProp = 'top';
    if (['development', 'writing', 'teaching'].includes(category)) {
        xProp = 'right';
    }
    if (['development', 'photography'].includes(category)) {
        yProp = 'bottom';
    }
    const xPos = getComputedStyle(el).getPropertyValue(xProp);
    const yPos = getComputedStyle(el).getPropertyValue(yProp);
    el.setAttribute('style', `${xProp}: ${xPos}; ${yProp}: ${yPos};`);
};

const getCategoryPositions = ({ el }) => {
    const styles = getComputedStyle(el);
    let top = styles.getPropertyValue('top');
    let left = styles.getPropertyValue('left');
    const width = styles.getPropertyValue('width');
    const height = styles.getPropertyValue('height');

    if (top === 'auto') {
        top = `${el.offsetTop}px`;
    }
    if (left === 'auto') {
        left = `${el.offsetLeft}px`;
    }

    return {
        top,
        left,
        width,
        height
    };
};

window.onload = initHome;