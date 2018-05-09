<template>
  <transition name="dialog-box">
    <div class="dialog-box" v-show="show" :style="{'z-index':zindex-1}">
      <div class="dialog-box-wrap" @click.self="$emit('close')">
        <div class="dialog-box-main paper" ref="main" :style="{width:width,'z-index':this.zindex}">
          <div class="dialog-box-main-head">
            <slot name="head"></slot>
          </div>
          <div class="dialog-box-main-body">
            <slot name="body"></slot>
          </div>
          <div class="dialog-box-main-foot">
            <slot name="foot"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'dialogBox',
  props: {
    show: { type: Boolean, default: false },
    zindex: { type: Number, default: 999 },
    width: { type: String, default: '500px' },
    height: { type: Number }
  },
  data() { return {} }
};
</script>
<style lang="less">
@import url("../../less/variables.less");
.dialog-box {
  & {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.35);
    display: table;
    transition: cubic-bezier(0.55, 0.01, 0.55, 1) opacity 0.35s;
  }
  &-wrap {
    display: table-cell;
    vertical-align: middle;
  }
  &-main {
    & {
      margin: 0 auto;
      background: #fff;
      transition: cubic-bezier(0.55, 0.01, 0.55, 1) transform 0.35s;
    }
    &-head {
      padding: 22px;
    }
    &-body {
      padding: 0 22px;
    }
    &-foot {
      padding: 16px;
    }
  }
  &-enter,
  &-leave-active {
    opacity: 0;
  }
  &-enter .dialog-box-main,
  &-leave-active .dialog-box-main {
    transform: scale(1.6);
  }
}
</style>
