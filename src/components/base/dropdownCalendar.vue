<template>
    <dropdown placeholder="请选择日期" ref="base" :id="id" :name="name" :display="value" :disabled="disabled" :value="value">
      <i class="icon-font dropdown-icon" slot="icon">&#xf678</i>
      <calendar slot="body" v-model="date">
        <div class="dropdown-calendar-foot" slot="foot">
          <button class="button button-common button-m simple-ripple" @click="pick(true)">确定</button>
          <button class="button button-common button-m simple-ripple" @click="pick(false)">取消</button>
        </div>
      </calendar>
    </dropdown>
</template>
<script>
import dropdown from "./dropdown";
import calendar from "./calendar";
export default {
  name: "dropdownCalendar",
  components: {
    dropdown,
    calendar
  },
  props: {
    value: { type: String, default: "" },
    id: { type: String, default: "" },
    name: { type: String, default: "" },
    disabled: { type: Boolean, default: false }
  },
  data() {
    return { date: this.value };
  },
  methods: {
    pick(val) {
      if (val) {
        this.$emit("input", this.date);
      } else {
        this.date = this.value;
      }
      this.$refs.base.collapse();
    }
  }
};
</script>
<style lang="less">
.dropdown-calendar-foot {
  text-align: right;
  padding: 10px;
}
</style>
