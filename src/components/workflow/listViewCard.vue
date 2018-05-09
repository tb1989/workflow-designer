<template>
    <div class="list-view-card">
      <div class="list-view-card-head"></div>
      <div class="list-view-card-foot"></div>
    </div>
</template>
<script>
export default {
  name: "tab",
  props: {
    current: { type: Number, default: 0 },
    headWidth: { type: String, default: "100%" }
  },
  data() {
    return { indexes: [] };
  },
  computed: {
    lineStyle() {
      return {
        width: 100 / this.indexes.length + "%",
        transform:
          "translate(" + this.indexes.indexOf(this.current) * 100 + "%,0)"
      };
    }
  },
  methods: {
    insert(index) {
      if (this.indexes.indexOf(index) < 0) {
        this.indexes.push(index);
      }
    },
    tab(val) {
      this.$emit("tab", val);
    }
  }
};
</script>
<style lang="less">
@import url("../../less/variables.less");
.list-view-card {
  & {
    width: 100%;
  }
  &-head {
    & {
      background: @main-color;
      color: #fff;
      box-shadow: 0px 2px 5px rgba(0,0,0,.12);
    }
    &-ul {
      justify-content: center;
      flex: 0 0 auto;
    }
    &-line {
      margin-top: -2px;
      height: 2px;
      background: @sec-color;
      transition: cubic-bezier(0.55, 0.01, 0.55, 1) transform 0.25s;
    }
  }
}
</style>
