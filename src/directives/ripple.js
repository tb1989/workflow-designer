const ripple = {
  show(e, el, binding) {
    var rippleContainer = document.createElement('span');
    rippleContainer.className = 'ripple-container';
    const offset = el.getBoundingClientRect()
    rippleContainer.style.left = offset.left + 'px';
    rippleContainer.style.top = offset.top + 'px';
    rippleContainer.style.width = offset.width + 'px';
    rippleContainer.style.height = offset.height + 'px';
    document.body.appendChild(rippleContainer);
    var ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.background = '#fff';
    ripple.style.width = offset.width * 2 + 'px';
    ripple.style.height = offset.width * 2 + 'px';
    ripple.style.left = e.x - offset.left - offset.width + 'px';
    ripple.style.top = e.y - offset.top - offset.width + 'px';
    rippleContainer.appendChild(ripple);
    ripple.addEventListener('animationend', e => { rippleContainer.remove(); el.ripple = false });
  }
}
const bind = (el, binding, vnode) => {
  el.addEventListener('click', e => ripple.show(e, el, binding));
}
const unbind = (el, binding) => {
  el.removeEventListener('click', e => ripple.show(e, el, binding));
}
export default {
  bind: bind,
  unbind: unbind
}