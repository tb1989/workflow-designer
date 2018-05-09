<template>
    <label class="checkbox">
        <input :id="id" class="hidden checkbox-input" type="checkbox" :name="name" v-model="status" :value="value"/>
        <i class="icon-font checkbox-icon"></i>
    </label>
</template>
<script>
export default {
  name: "checkbox",
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
.checkbox {
  & {
    vertical-align: middle;
    display: inline-block;
    cursor: pointer;
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
    content: "\f131";
    color: @text-light-color;
  }
  &-input + i::after {
    position: absolute;
    transform: scale(0);
    opacity: 0;
    content: "\f132";
    color: @main-color;
    transition:cubic-bezier(.55,.01,.55,1) transform 0.2s,cubic-bezier(.55,.01,.55,1) opacity 0.2s;
  }
  &-input:checked + i::after {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
