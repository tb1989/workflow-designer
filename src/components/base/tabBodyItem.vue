<template>
    <div class="tab-body-item" v-show="current">
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: "tabBodyItem",
  props: {
    index: { type: Number, default: 0 }
  },
  computed: {
    current() {
      return this.$parent.current == this.index;
    }
  }
};
</script>
<style>

</style>
