let bodyEl = null;
let curSection = 'development';
let asideCenterPositions = {};
const initHome = () => {
    bodyEl = document.querySelector('body');
    const hexaOuterEl = document.querySelector('.outer-hexagon');
    const asideEl = document.querySelector('aside');
    const navEl = asideEl.querySelector('nav');

    setAsideCenterPos({ el: asideEl });

    bodyEl.addEventListener('mouseover', ({ target }) => {
        if (target.matches('section') === true) {
            if (target.classList[0] !== curSection) {
                hexaOuterEl.classList.remove(curSection);
                curSection = target.classList[0];
                hexaOuterEl.classList.add(curSection);
            }
        }
        if (target.matches('img') === true && [...bodyEl.classList].includes('page-home')) {
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
                setTimeout(() => {
                    bodyEl.classList.remove('page-transition');
                    bodyEl.classList.remove(`page-${category}-transition`);
                    bodyEl.classList.add(`classic-menu`);
                    bodyEl.classList.add(`page-${category}`);
                }, 1000);
            }, 0);
        }
    });

    navEl.addEventListener('click', ({ target }) => {
        let liEl = null;
        if (target.matches('li') === true) {
            liEl = target;
        }
        if (target.matches('a') === true) {
            liEl = target.closest('li');
        }
        if (target.matches('span') === true) {
            liEl = target.closest('li');
        }
        const nextCategory = liEl.classList[0];
        moveTo({
            category: curSection,
            isReverse: true,
            nextCategory
        }, 1000);
    });

    // TODO
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
};

// TODO
const onResize = () => {
    // setAsidePositions(); but calculated based on its size and the window size
}

const moveTo = ({ category, isReverse = false, nextCategory = null }, delay) => {
    if (isReverse === true ) {
        bodyEl.classList.remove(`page-${category}-transition`);
        bodyEl.classList.remove(`page-${category}`);
        bodyEl.classList.add('page-home');
    } else {
        bodyEl.classList.add(`page-${category}-transition`);
        bodyEl.classList.add(`page-${category}`);
        bodyEl.classList.remove('page-home');
    }
    if (nextCategory !== null) {
        setTimeout(() => {
            console.log('moveTo callback');
            moveTo({ category: nextCategory });
        }, delay);
    }
};

const setAsideCenterPos = ({ el }) => {
    const styles = getComputedStyle(el);
    asideCenterPositions = {
        top: positionToNum(styles.getPropertyValue('top')),
        left: positionToNum(styles.getPropertyValue('left')),
        width: positionToNum(styles.getPropertyValue('width')),
        height: positionToNum(styles.getPropertyValue('height')),
    };
};
const positionToNum = (pos) => {
    return Number(pos.replace('px', ''));
}

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