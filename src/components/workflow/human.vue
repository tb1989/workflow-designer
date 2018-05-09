<template>
  <draggable class="human" :class="{'human-multi':obj.multiHumain}" :style="style" @drag="drag" :left="obj.left" :top="obj.top">
    <ul class="human-status-ul">
      <li class="human-status-li human-status-li-forced" v-show="obj.forced"></li>
      <li class="human-status-li human-status-li-self-cycle" v-show="obj.selfCycle"></li>
      <li class="human-status-li human-status-li-back" v-show="obj.callback.length>0"></li>
    </ul>
    <span class="human-label" v-text="obj.label"></span>
  </draggable>
</template>
<script>
import draggable from '../base/draggable.vue';
export default {
  name: 'human',
  components: { draggable },
  props: {
    obj: { type: Object },
    selected: { type: Boolean, default: false }
  },
  data() {
    return {};
  },
  computed: {
    style() {
      return {
        width: this.obj.width + 'px',
        height: this.obj.height + 'px',
        transform: 'translate(' + (this.obj.left - this.obj.width / 2) + 'px,' + (this.obj.top - this.obj.height / 2) + 'px)',
        zIndex: this.obj.index + 100
      };
    }
  },
  methods: {
    drag(e) {
      this.obj.moveTo(e.x, e.y, [790, 790]);
      if(this.obj.linkline1){
        this.obj.linkline1.adjust();
      }
      if(this.obj.linkline2){
        this.obj.linkline2.adjust();
      }
    }
  }
};
</script>
<style lang='less'>
@import url("../../less/variables.less");
.human {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background: #fff url("../../assets/images/human-single.svg") no-repeat 2px 2px;
  background-size: 28px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.26), 0 1px 6px rgba(0, 0, 0, 0.26);
  transition: cubic-bezier(0.55, 0.01, 0.55, 1) box-shadow 0.25s;
}
.human:hover {
  box-shadow: 0 3px 18px rgba(0, 0, 0, 0.32), 0 3px 10px rgba(0, 0, 0, 0.32);
}
.human-multi {
  background-image: url("../../assets/images/human-multi.svg");
}
.human-label {
  position: absolute;
  margin-top: 46px;
  width: 80px;
  left: -18px;
  text-align: center;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.26), 0 1px 6px rgba(0, 0, 0, 0.2);
  transition: cubic-bezier(0.55, 0.01, 0.55, 1) text-shadow 0.25s;
}
.human:hover > .human-label {
  text-shadow: 0 8px 16px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.18);
}
.human-status-ul {
  position: absolute;
  right: 0;
  bottom: 1px;
}
.human-status-li {
  width: 14px;
  height: 14px;
}
.human-status-li-self-cycle {
  background: url("../../assets/images/human-circle.svg") no-repeat;
  background-size: 14px;
}
.human-status-li-forced {
  background: url("../../assets/images/human-force.svg") no-repeat;
  background-size: 14px;
}
.human-status-li-back {
  background: url("../../assets/images/human-back.svg") no-repeat;
  background-size: 14px;
}
</style>