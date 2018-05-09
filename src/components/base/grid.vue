<template>
  <table class="grid">
    <thead>
      <tr>
        <th v-for="(column,index) in columns" :key="'columns_'+index" v-text="column.display" :width="column.width">
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,rowIndex) in data" :key="'item_'+rowIndex" @click="rowClick({item,index})">
        <template v-for="(column,colIndex) in columns">
          <td v-if="typeof(column.field)=='string'" :key="'data_'+colIndex" v-text="item[column.field]"></td>
          <td v-else-if="typeof(column.field)=='function'" :key="'data_'+colIndex">
            <render-component :param="{item:item,item:item,column:column}" :render="column.field" />
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>
<script>
import renderComponent from "../base/renderComponent.vue";
export default {
  name: "grid",
  components: { renderComponent },
  props: {
    data: Array,
    columns: Array
  },
  data() {
    return {};
  },
  methods: {
    rowClick(row) {
      this.$emit("rowClick", row);
    }
  }
};
</script>
<style lang="less">
@import url("../../less/variables.less");
.grid {
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;
  background-color: #fff;
}
.grid th {
  text-align: left;
  color: @text-light-color;
}
.grid td {
  border-top: 1px solid @middle-gray;
}
.grid td,
.grid th {
  line-height: 32px;
  box-sizing: border-box;
  padding: 12px 6px;
}
</style>

