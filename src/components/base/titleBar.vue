<template>
<div class="title-bar">
  <div class="title-bar-left">
    <slot name="left"></slot>
  </div>
  <div class="title-bar-title flex1">
    <slot>
      <span v-text="title"></span>
    </slot>
  </div>
  <div class="title-bar-right">
    <slot name="right"></slot>
  </div>
</div>
</template>
<script>
export default {
  name: "titleBar",
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="less">
@import url("../../less/variables.less");
.title-bar {
  & {
    display: flex;
    color: #fff;
    box-sizing: border-box;
    height: 62px;
    line-height: 62px;
    padding: 0 8px;
    width: 100%;
    background-color: @main-color;
    font-weight: 500;
    box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);
  }
  &-title {
    flex: 1;
    font-size: @font-size-xl;
    padding: 0 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>