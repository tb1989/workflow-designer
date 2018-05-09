<template>
  <g>
    <draggable class="linkline-circle" v-attr="{r:12}" tag="circle" :left="obj.p1_x" :top="obj.p1_y" :style="style1" @drag="drag($event,1)" @endDrag="$emit('endDrag',{point:$event,side:1})" />
    <draggable class="linkline-circle" v-attr="{r:12}" tag="circle" :left="obj.p2_x" :top="obj.p2_y" :style="style2" @drag="drag($event,2)" @endDrag="$emit('endDrag',{point:$event,side:2})" />
    <line class="linkline-line" :x1="obj.p1_x" :y1="obj.p1_y" :x2="obj.p2_x" :y2="obj.p2_y" marker-end="url(#linkline-arrow)" />
    <text class="linkline-text" text-anchor="middle" :x="(obj.p2_x-obj.p1_x)/2+obj.p1_x" :y="(obj.p2_y-obj.p1_y)/2+obj.p1_y" v-text="obj.label"></text>
  </g>
</template>
<script>
import attr from '../../directives/attr';
import draggable from '../base/draggable.vue';
export default {
  name: "linkline",
  directives: { attr },
  components: { draggable },
  props: {
    obj: { type: Object },
    selected: { type: Boolean, default: false }
  },
  data() {
    return {};
  },
  computed: {
    style1() {
      return {
        transform: 'translate(' + this.obj.p1_x + 'px,' + this.obj.p1_y + 'px)'
      };
    },
    style2() {
      return {
        transform: 'translate(' + this.obj.p2_x + 'px,' + this.obj.p2_y + 'px)'
      };
    }
  },
  methods: {
    drag(e, side) {
      this.obj.moveTo(e.x, e.y, side, [879, 879]);
    }
  }
};
</script>
<style lang="less">
@import url("../../less/variables.less");
.linkline-circle,
.linkline-text {
  cursor: pointer;
}
.linkline-line {
  stroke: @text-light-color;
  stroke-width: 1.2;
}
.linkline-text {
  fill: @text-dark-color;
  font-size: 12px;
}
.linkline-circle {
  opacity: 0;
}
</style>
