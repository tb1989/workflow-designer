<template>
  <component :is="tag" class="draggable" @mousedown="beginDrag($event)" draggable="false">
    <slot></slot>
  </component>
</template>
<script>
export default {
  name: "draggable",
  props: {
    tag: { type: String, default: "div" },
    left: { type: Number },
    top: { type: Number }
  },
  data() {
    return {
      status: false,
      orgLeft: this.left,
      orgTop: this.top,
      x: 0,
      y: 0
    };
  },
  methods: {
    beginDrag(e) {
      if (!this.status) {
        this.status = true;
        this.x = e.clientX;
        this.y = e.clientY;
        this.orgLeft = this.left;
        this.orgTop = this.top;
        window.addEventListener("mousemove", this.drag);
        window.addEventListener("mouseup", this.endDrag);
        this.$emit("beginDrag", e);
      }
    },
    drag(e) {
      if (this.status) {
        this.$emit("drag", {
          x: this.orgLeft - this.x + e.clientX,
          y: this.orgTop - this.y + e.clientY
        });
      }
    },
    endDrag(e) {
      if (this.status) {
        this.status = false;
        this.$emit("endDrag", { x: this.orgLeft - this.x + e.clientX, y: this.orgTop - this.y + e.clientY });
      }
      window.removeEventListener("mousemove", this.drag);
      window.removeEventListener("mouseup", this.endDrag);
    }
  }
};
</script>