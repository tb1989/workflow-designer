<template>
  <span class="textbox" :class="className">
      <input class="textbox-input" type="text" v-bind="$attrs" v-on="$listeners"
      :id="$attrs.id" 
      :name="$attrs.name" 
      :class="{'textbox-input-active':active&&!contrl,'textbox-input-contrl':contrl}"
      />
      <div class="textbox-line" :class="lineClass"></div>
  </span>
</template>
<script>
export default {
  name: 'textbox',
  props: {
    className: {
      type: [String, Array],
      default() {
        return ['textbox-common', 'textbox-m'];
      }
    },
    lineClass: { type: String, default: 'textbox-line-main' },
    active: { type: Boolean, default: false },
    contrl: { type: Boolean, default: true }
  }
};
</script>
<style lang="less">
@import url("../../less/variables.less");
.textbox {
  & {
    display: inline-block;
    position: relative;
  }
  &-line {
    &{
    height: 2px;
    width: 100%;
    margin-top: -2px;
    transform: scale(0, 1);
    transition: cubic-bezier(0.55, 0.01, 0.55, 1) transform 0.25s;
  }
    &-main{
      background-color: @main-color;
    }
    &-sec{
      background-color: @sec-color;
    }
    &-white{
      background-color: #fff;
    }
    &-black{
      background-color: #000;
    }
  }
  & > .textbox-input {
    background: none;
    border: none;
    box-sizing: border-box;
  }
  & > .textbox-input-active + &-line,
  & > .textbox-input-contrl:focus + &-line {
    transform: scale(1, 1);
  }
  &-m > .textbox-input {
    height: 32px;
    font-size: @font-size-m;
    width: 100%;
  }
  &-common > .textbox-input {
    border-bottom: solid 2px @middle-gray;
  }
}
</style>
