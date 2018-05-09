<template>
  <div id="app" class="flex">
    <nav class="nav flex0auto">
      <div class="nav-head"></div>
      <a class="nav-action simple-ripple">
        <i class="icon-font vertical-align" style="font-size:26px">&#xf2dc</i><span class="vertical-align" style="margin-left:32px">首页</span>
      </a>
      <a class="nav-action action-active simple-ripple">
        <i class="icon-font vertical-align" style="font-size:26px">&#xf751</i><span class="vertical-align" style="margin-left:32px">新建流程</span>
      </a>
    </nav>
    <div class="main flex1">
      <button class="button button-float icon-font simple-ripple" style="position:fixed;right:56px;bottom:56px">&#xf193</button>
      <title-bar title="流程设计器">
        <button slot="left" class="button button-icon button-icon-l vertical-align simple-ripple">&#xf35c</button>
        <div slot="right">
          <button class="button button-icon button-icon-l vertical-align simple-ripple">&#xf349</button>
          <button class="button button-icon button-icon-l vertical-align simple-ripple">&#xf450</button>
          <button class="button button-icon button-icon-l vertical-align simple-ripple">&#xf1d9</button>
        </div>
      </title-bar>
      <tab :current="test2" :headStyle="{width:'520px',margin:'0 auto'}" @tab="test2=$event">
        <template slot="head">
          <tab-head-item :index="1">
            <i class="icon-font" style="font-size:22px">&#xf4aa</i><br/><span class="sec-title">流程图</span></tab-head-item>
          <tab-head-item :index="2">
            <i class="icon-font" style="font-size:22px">&#xf261</i><br/><span class="sec-title">表单</span></tab-head-item>
          <tab-head-item :index="3">
            <i class="icon-font" style="font-size:22px">&#xf631</i><br/><span class="sec-title">组织</span></tab-head-item>
        </template>
        <template slot="body">
          <tab-body-item :index="1">
            <workflow-canvas/>
          </tab-body-item>
          <tab-body-item :index="2">
          </tab-body-item>
          <tab-body-item :index="3">
            <div style="height:56px">
              <radio v-model="test3" :value="1" />
              <radio v-model="test3" :value="2" />
              <radio v-model="test3" :value="3" />
            </div>
            {{test3}}
            <textbox placeholder="请输入" line-color="#ff4081" />
            <switch-button v-model="test1" :value="1"></switch-button>
            <checkbox v-model="test1" :value="2"></checkbox>
            {{test1}}
            <br/>
            <calendar/>
            <br/>
            <dropdown-calendar v-model="test5" />
            <dropdown-list :options="test6" v-model="test7" />
          </tab-body-item>
        </template>
      </tab>
    </div>
  </div>
</template>
<script>
import router from "./router";

import switchButton from "./components/base/switchButton";
import checkbox from "./components/base/checkbox";
import radio from "./components/base/radio";
import dropdownCalendar from "./components/base/dropdownCalendar";
import dropdownList from "./components/base/dropdownList";
import textbox from "./components/base/textbox";

import calendar from "./components/base/calendar";
import titleBar from "./components/base/titleBar";
import tab from "./components/base/tab";
import tabHeadItem from "./components/base/tabHeadItem";
import tabBodyItem from "./components/base/tabBodyItem";

import workflowCanvas from "./components/workflow/workflowCanvas";
export default {
  name: "app",
  components: {
    switchButton,
    checkbox,
    radio,
    dropdownCalendar,
    dropdownList,
    textbox,
    calendar,
    titleBar,
    tab,
    tabHeadItem,
    tabBodyItem,
    workflowCanvas
  },
  data() {
    return {
      test1: [],
      test2: 1,
      test3: 2,
      test5: "2018/3/18",
      test6: [
        { text: "语文", value: 0 },
        { text: "数学", value: 1 },
        { text: "物理", value: 2 },
        { text: "生物", value: 3 },
        { text: "化学", value: 4 },
        { text: "地理", value: 5 }
      ],
      test7: 1
    };
  }
};
</script>
<style lang="less">
@import "./less/main.less";
#app {
  height: 100%;
}
.nav {
  width: 268px;
  background: @light-gray;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12),
    0 1px 4px rgba(0, 0, 0, 0.12);
}
.nav-head {
  background: url("./assets/images/nav-background.jpg");
  background-attachment: fixed;
  height: 168px;
}
</style>