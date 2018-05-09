<script>
export default {
  name: "renderComponent",
  props: {
    param: { type: Object, required: false },
    render: { type: Function, required: true }
  },
  render(createElement) {
    return this.render(createElement,this);
  }
};
</script>
