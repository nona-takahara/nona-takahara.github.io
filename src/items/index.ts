window.addEventListener('DOMContentLoaded', domContentLoaded);
window.addEventListener('hashchange', onHashChange, false);

function domContentLoaded() {
    const k = document.querySelectorAll('.jsshow');
    k.forEach(v => {
        v.classList.remove('jsshow');
    });
    onHashChange();
}

function onHashChange() {
    const k = document.querySelectorAll('.hideable');
    k.forEach(v => {
        v.classList.toggle('hide', true);
    });

    let elem: NodeListOf<Element>;
    if (!location.hash || location.hash == '#') {
        elem = document.querySelectorAll('.landing');
        document.title = 'こーげんやさい';
    } else {
        elem = document.querySelectorAll(location.hash);
        document.title = (document.querySelector(location.hash + '>h2') as HTMLHeadingElement).innerText + ' | こーげんやさい';
    }

    elem.forEach(v => {
        v.classList.toggle('hide', false);
    });
}