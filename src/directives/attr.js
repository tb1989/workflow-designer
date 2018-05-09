export default {
    inserted(el, binding, vnode) {
        for (let key in binding.value) {
            el.setAttribute(key, binding.value[key]);
        }
    }
}