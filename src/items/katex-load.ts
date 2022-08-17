window.addEventListener('DOMContentLoaded', (ev) => {
  const mathElements = document.querySelectorAll('.math');
  mathElements.forEach(element => {
    element.innerHTML = katex.renderToString(element.innerHTML, {throwOnError: false});
  });
});