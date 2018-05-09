<template>
  <div class="workflow-canvas flex">
    <div class="workflow-canvas-side flex1 flex flex-justify-content">
      <div class="workflow-canvas-toolbar paper">
        <button class="button workflow-canvas-toolbar-button workflow-canvas-toolbar-button-human simple-ripple" @click="humanAdd"></button>
        <button class="button workflow-canvas-toolbar-button workflow-canvas-toolbar-button-linkline simple-ripple" @click="linklineAdd"></button>
        <button class="button workflow-canvas-toolbar-button workflow-canvas-toolbar-button-human simple-ripple"></button>
        <button class="button workflow-canvas-toolbar-button workflow-canvas-toolbar-button-human simple-ripple"></button>
        <button class="button workflow-canvas-toolbar-button workflow-canvas-toolbar-button-human simple-ripple"></button>
        <button class="button workflow-canvas-toolbar-button workflow-canvas-toolbar-button-human simple-ripple"></button>
      </div>
    </div>
    <div class="workflow-canvas-main paper flex0auto" tabindex="0">
      <svg class="workflow-canvas-main-svg" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <marker id="linkline-arrow" markerWidth="10" markerHeight="16" refX="10" orient="auto" viewBox='0, -5, 10, 10' markerUnits="strokeWidth">
            <path d="M0 -4 L0 4 L10 0"></path>
          </marker>
          <marker id="linkline-arrow-selected" markerWidth="10" markerHeight="16" refX="10" orient="auto" viewBox='0, -5, 10, 10' markerUnits="strokeWidth">
            <path d="M0 -4 L0 4 L10 0"></path>
          </marker>
        </defs>
        <linkline v-for="(obj,index) in test2" :key="index" :obj="obj" @endDrag="linklineEndDrag($event,obj)" />
      </svg>
      <human v-for="(obj,index) in test1" :key="index" :obj="obj"></human>
    </div>
    <div class="workflow-canvas-side flex1">
      <div class="workflow-canvas-property paper">
        <tab :current="propertyCurrent">
          <template slot="head">
            <tab-head-item :index="1">流程属性</tab-head-item>
            <tab-head-item :index="2">节点属性</tab-head-item>
          </template>
          <template slot="body">
            <tab-body-item :index="1" style="padding-top:12px">
              <form-item label="流程名称">
                <textbox placeholder="流程名称" />
              </form-item>
              <form-item label="流程别名">
                <textbox placeholder="流程别名" />
              </form-item>
              <form-item label="流程类别">
                <dropdown-list :options="test6" v-model="test7" />
              </form-item>
              <form-item label="是否支持手机办公">
                <div class="flex">
                  <div class="flex1" v-text="test8?'是':'否'"></div>
                  <div class="flex1 text-align-right">
                    <switch-button v-model="test8" />
                  </div>
                </div>
                <hr class="hr" />
              </form-item>
              <form-item label="附件模板">
                <div class="flex">
                  <div class="flex1">共1个模板</div>
                  <div class="flex1 text-align-right">
                    <button class="button button-flat button-m simple-ripple" @click="toggleAttachmentDialog(true)">编辑</button>
                  </div>
                </div>
                <hr class="hr" />
              </form-item>
            </tab-body-item>
            <tab-body-item :index="2">
            </tab-body-item>
          </template>
        </tab>
      </div>
    </div>
    <dialog-box :show="test9" @close="test9=false" width="65%">
      <span slot="head">附件模板</span>
      <div slot="body">
        <grid :columns="test10.columns" :data="test10.data" />
      </div>
      <div slot="foot" class="text-align-right">
        <button class="button button-flat button-m simple-ripple" @click="toggleAttachmentDialog(false)">确定</button>
      </div>
    </dialog-box>
  </div>
</template>
<script>
import tab from "../base/tab";
import tabHeadItem from "../base/tabHeadItem";
import tabBodyItem from "../base/tabBodyItem";
import formItem from "../base/formItem";
import textbox from "../base/textbox"
import dropdownList from "../base/dropdownList"
import switchButton from "../base/switchButton"
import dialogBox from "../base/dialogBox"
import grid from "../base/grid"

import model from "../../model";
import human from "./human";
import linkline from "./linkline";

export default {
  name: "workflowChart",
  components: {
    tab,
    tabHeadItem,
    tabBodyItem,
    human,
    linkline,
    formItem,
    textbox,
    dropdownList,
    switchButton,
    dialogBox,
    grid
  },
  props: {},
  data() {
    return {
      humanIndex: 2,
      propertyCurrent: 1,
      selectedArray: [],
      test1: [
        new model.Human(1, 50, 100, "测试节点1", "测试节点1", 1, false, "", true, false, []),
        new model.Human(2, 150, 50, "测试节点2", "测试节点2", 2, true, "", false, true, ["1", "2", "3"])
      ],
      test2: [new model.Linkline(1, 15, 15, 55, 55, null, null, 'hahahaha', null)],
      test6: [
        { text: "语文", value: 0 },
        { text: "数学", value: 1 },
        { text: "物理", value: 2 },
        { text: "生物", value: 3 },
        { text: "化学", value: 4 },
        { text: "地理", value: 5 }
      ],
      test7: 1,
      test8: false,
      test9: false,
      test10: {
        columns: [{
          display: '附件名称',
          width: '35%',
          field: 'name',
        }, {
          display: '扩展名',
          width: '15%',
          field: 'ext',
        }, {
          display: '大小限制',
          width: '15%',
          field: 'size',
        }, {
          display: '操作',
          width: '10%',
          field: function (createElement, vm) {
            return createElement('button', {
              'class': "button button-common button-m simple-ripple"
            }, '删除')
          }
        }],
        data: [
          { name: 'test1', ext: '.xls', size: 10 },
          { name: 'test2', ext: '.doc', size: 10 },
          { name: 'test3', ext: '.doc', size: 10 }
        ]
      }
    };
  },
  computed: {},
  methods: {
    humanAdd() {
      this.humanIndex++;
      this.test1.push(new model.Human(1, 50, 100, "测试节点" + this.humanIndex, "测试节点" + this.humanIndex, 1, false, "", true, false, []));
    },
    linklineAdd(){
      this.test2.push(new model.Linkline(1, 15, 15, 55, 55, null, null, 'hahahaha', null));
    },
    linklineEndDrag(e, obj) {
      for (let i = this.test1.length - 1; i >= 0; i--) {
        if (this.test1[i].isCoverPoint(e.point)) {
          obj.addHuman(this.test1[i], e.side);
          obj.adjust();
          return
        }
      }
    },
    toggleAttachmentDialog(val) {
      this.test9 = val;
    }
  }
};
</script>
<style lang="less">
@import url("../../less/variables.less");
.workflow-canvas {
  padding: 10px;
}
.workflow-canvas-side {
  padding: 0 18px;
}
.workflow-canvas-toolbar {
  width: 118px;
  height: 236px;
  background: #fff;
}
.workflow-canvas-toolbar-button {
  width: 56px;
  height: 58px;
  background: no-repeat center;
  background-size: 32px;
}
.workflow-canvas-toolbar-button-human {
  background-image: url("../../assets/images/human-add.svg");
}
.workflow-canvas-toolbar-button-linkline {
  background-image: url("../../assets/images/linkline-add.svg");
}
.workflow-canvas-property {
  padding: 0 12px;
  width: 80%;
  max-width: 228px;
  background: #fff;
}
.workflow-canvas-main {
  box-sizing: border-box;
  position: relative;
  width: 790px;
  height: 790px;
  overflow: hidden;
  margin: auto;
  background: #fff url("../../assets/images/workflow-canvas-grid.svg");
  background-size: 44px;
}
#linkline-arrow {
  fill: @text-dark-color;
}
#linkline-arrow-active {
  fill: @active-color;
}
.workflow-canvas-main-svg {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
