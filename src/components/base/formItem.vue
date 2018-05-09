<template>
  <div class="form-item">
    <label v-text="label"></label>
    <div class="form-item-content">
        <slot></slot>
    </div>
    <div class="form-item-error" v-text="error"></div>
  </div>
</template>
<script>
export default {
  name: 'formItem',
  props: {
    label: { type: String, default: 0 },
    error:{type:String,default:""}
  }
};
</script>
<style lang="less">
@import url('../../less/variables.less');
.form-item {
    width: 100%;
}
.form-item-content{
    min-height: 36px;
    line-height: 36px;
}
.form-item-content>.textbox{
    width: 100%;
}
.form-item>label{
    display:block;
    margin-bottom: 1px;
    font-size: @font-size-s;
    color: @text-dark-color;
}
.form-item-error{
    font-size: @font-size-s;
    color: red;
    height: 16px;
    line-height: 16px;
}
</style>
