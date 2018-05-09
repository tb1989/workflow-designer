<template>
  <div class='tab flex-column'>
    <div class='tab-head'>
      <div :style='headStyle'>
        <ul class='tab-head-ul flex'>
          <slot name='head'></slot>
        </ul>
        <div class='tab-head-line' :style='lineStyle'></div>
      </div>
    </div>
    <div class='tab-body'>
      <slot name="body"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tab',
  props: {
    current: { type: Number, default: 0 },
    headStyle: { type: Object }
  },
  data() {
    return { indexes: [] };
  },
  computed: {
    lineStyle() {
      return {
        width: 100 / this.indexes.length + '%',
        transform:
          'translate(' + this.indexes.indexOf(this.current) * 100 + '%,0)'
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
      this.$emit('tab', val);
    }
  }
};
</script>
<style lang='less'>
@import url('../../less/variables.less');
.tab {
  & {
    width: 100%;
  }
  &-head {
    & {
      color: @text-light-color;
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
