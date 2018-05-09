<template>
    <li class="tab-head-item flex1 simple-ripple relative" :class="{'tab-head-item-active':current}" @click="tab">
        <slot></slot>
    </li>
</template>
<script>
export default {
  name: "tabHeadItem",
  props: {
    index: { type: Number }
  },
  methods: {
    tab() {
      this.$parent.tab(this.index);
    }
  },
  computed: {
    current() {
      return this.$parent.current == this.index;
    }
  },
  mounted() {
    this.$parent.insert(this.index);
  }
};
</script>
<style lang="less">
@import url("../../less/variables.less");
.tab-head-item {
  padding: 12px 5px;
  min-height: 16px;
  text-align: center;
  cursor: pointer;
  transition: color 0.2s;
}
.tab-head-item-active {
  color: @main-color;
}
</style>
