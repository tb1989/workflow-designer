<template>
    <label class="radio">
        <input :id="id" class="hidden radio-input" type="radio" :name="name" :value="value" v-model="status"/>
        <i class="icon-font radio-icon"></i>
    </label>
</template>
<script>
export default {
  name: "radio",
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    id: String,
    name: String,
    value: [String, Number, Object],
    disabled: { type: Boolean, default: false },
    checked: [String, Number, Object]
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
.radio {
  & {
    vertical-align: middle;
    cursor: pointer;
    display: inline-block;
    width: 22px;
    height: 22px;
    line-height: 22px;
  }
  &-icon {
    display: inline-block;
    height: 22px;
    position: relative;
    font-size: 22px;
  }
  &-input + i::before {
    position: absolute;
    content: "\f43d";
    color: @text-light-color;
    transition: cubic-bezier(0.55, 0.01, 0.55, 1) color 0.2s;
  }
  &-input + i::after {
    position: absolute;
    transform: scale(1);
    opacity: 0;
    content: "\f12f";
    color: @main-color;
    transition: cubic-bezier(0.55, 0.01, 0.55, 1) transform 0.2s,
      cubic-bezier(0.55, 0.01, 0.55, 1) opacity 0.2s;
  }
  &-input:checked + i::before {
    color: @main-color;
  }
  &-input:checked + i::after {
    transform: scale(.5);
    opacity: 1;
  }
}
</style>