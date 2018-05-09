<template>
    <dropdown class="dropdown-list" :value="value" :display="display" ref="base">
      <i class="icon-font dropdown-icon" slot="icon">&#xf140</i>
      <ul slot="body" class="dropdown-list-ul">
        <li v-for="(option,index) in options"
        :key="index"
        :class="{'dropdown-list-option-active':option.value==value}"
        class="simple-ripple"
        v-text="option.text"
        @click="select(option.value)"></li>
      </ul>
    </dropdown>
</template>
<script>
import dropdown from "./dropdown";
export default {
  name: "dropdownList",
  components: {
    dropdown
  },
  props: {
    value: { default: "" },
    options: { type: Array, default: [] }
  },
  data() {
    return { status: false };
  },
  computed: {
    display() {
      var arr = this.options.filter(a => a.value == this.value);
      if (arr.length > 0) {
        return arr[0].text;
      } else {
        return "";
      }
    }
  },
  methods: {
    select(val) {
      this.$emit("input", val);
      this.$refs.base.collapse();
    }
  }
};
</script>
<style lang="less">
@import url("../../less/variables.less");
.dropdown-list > .dropdown-panel {
  width: 100%;
}
.dropdown-list-ul {
  width: 100%;
  padding: 8px 0;
  background: #fff;
  border-radius: 2px;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 320px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647),
    0 1px 4px rgba(0, 0, 0, 0.117647);
}
.dropdown-list-ul > li {
  height: 32px;
  line-height: 32px;
  padding: 0 16px;
  transition: cubic-bezier(0.55, 0.01, 0.55, 1) background-color 0.2s;
}
.dropdown-list-option-active {
  color: @main-color;
}
.dropdown-list-ul > li:hover {
  background-color: @middle-gray;
}
.dropdown-list-icon-active {
  transform: rotate(180);
}
</style>
