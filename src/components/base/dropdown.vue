<template>
    <div class="dropdown">
        <textbox class="dropdown-textbox" :placeholder="placeholder" :value="display" @click="expand" :active="status" :contrl="false"/>
        <input type="hidden" :id="id" :name="name" :value="value" />
        <slot name="icon"></slot>
        <transition name="dropdown">
          <div class="dropdown-panel" v-show="status">
              <slot name="body"></slot>
          </div>
        </transition>
    </div>
</template>
<script>
import textbox from "./textbox";
export default {
  name: "dropdown",
  components: { textbox },
  props: {
    value: { default: "" },
    display: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    id: { type: String, default: "" },
    name: { type: String, default: "" },
    disabled: { type: Boolean, default: false }
  },
  data() {
    return { status: false };
  },
  methods: {
    expand(e) {
      if (!this.disabled) {
        this.status = true;
        window.addEventListener("click", this.collapse);
      }
    },
    collapse(e) {
      if (!e || !(this.$el == e.target || this.$el.contains(e.target))) {
        this.status = false;
        window.removeEventListener("click", this.collapse);
      }
    }
  }
};
</script>
<style lang="less">
@import url("../../less/variables.less");
.dropdown {
  & {
    position: relative;
  }
  &-textbox {
    width: 100%;
  }
  &-icon {
    position: absolute;
    right: 0px;
    top: 0px;
    height: 32px;
    line-height: 32px;
    font-size: 20px;
    color: @text-dark-color;
  }
  &-panel {
    position: absolute;
    left: 0;
    top: 32px;
    margin-top: 2px;
    z-index: 500;
    transition: cubic-bezier(0.55, 0.01, 0.55, 1) transform 0.2s,
      cubic-bezier(0.55, 0.01, 0.55, 1) opacity 0.2s;
    transform-origin: 0% 0%;
  }
  &-enter,&-leave-active {
    transform: scale(1, 0);
    opacity: .2;
  }
}
</style>