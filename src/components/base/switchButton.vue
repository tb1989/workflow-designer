<template>
<label class="switch-button">
    <input :id="id" class="hidden switch-button-input" type="checkbox" :name="name" :value="value" v-model="status"/>
    <span></span>
</label>
</template>
<script>
export default {
  name: "switchButton",
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    id: String,
    name: String,
    value: [String,Number,Object],
    disabled: { type: Boolean, default: false },
    checked: [Array, Boolean]
  },
  data() {
    return {};
  },
  computed: {
    status: {
      get() {
        return this.checked;
      },
      set(val) {
        this.$emit("change", val);
      }
    }
  }
};
</script>
<style lang="less">
@import url("../../less/variables.less");
.switch-button {
  & {
    vertical-align: middle;
    height: 14px;
    line-height: 14px;
  }
  &-input {
    & + span {
      width: 36px;
      height: 14px;
      position: relative;
      background-color: @dark-gray;
      box-sizing: border-box;
      border-radius: 14px;
      display: inline-block;
      transition: cubic-bezier(.55,.01,.55,1) box-shadow .25s,cubic-bezier(.55,.01,.55,1) background-color .5s;

    }
    & + span::before {
      content: "";
      width: 20px;
      height: 20px;
      position: absolute;
      top: -3px;
      left: 0;
      border-radius: 100%;
      background-color: #fff;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
      transition: left 0.2s;
    }
    &:checked + span {
      background-color: @main-color-light;
    }
    &:checked + span::before {
      left: 16px;
      background-color: @main-color;
    }
  }
}
</style>

