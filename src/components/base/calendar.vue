<template>
    <div class="calendar">
        <div class="calendar-head">
          <div class="calendar-head-top" :class="{'calendar-head-active':type=='year'}" @click="type='year'">{{this.date.getFullYear()}}</div>
          <div class="calendar-head-bottom" :class="{'calendar-head-active':type=='day'}" @click="type='day'">{{getFullNum(valueDate.getMonth()+1)}}-{{getFullNum(valueDate.getDate())}}&nbsp;星期{{weekNames[valueDate.getDay()]}}</div>
        </div>
        <div class="calendar-body">
          <div class="calendar-toolbar" v-show="type=='day'">
            <div class="calendar-toolbar-side"><button class="button button-icon button-icon-m relative simple-ripple" @click="page(false)">&#xf141</button></div>
            <div class="calendar-toolbar-middle flex1">{{this.date.getFullYear()}}-{{getFullNum(date.getMonth()+1)}}</div>
            <div class="calendar-toolbar-side"><button class="button button-icon button-icon-m relative simple-ripple" @click="page(true)">&#xf142</button></div>
          </div>
          <ul class="calendar-day-ul" v-show="type=='day'">
            <li class="calendar-day-li-week" v-for="(item,index) in weekNames" v-if="index>0" :key="index" v-text="item"></li>
            <li class="calendar-day-li-disabled" v-for="(item,index) in prevMonthDays" :key="'prev'+index" v-text="item"></li>
            <li class="calendar-day-li" v-for="(item,index) in currentMonthDays" :key="'current'+index"
            :class="{'calendar-day-li-current':date.getFullYear()==new Date().getFullYear()&&date.getMonth()==new Date().getMonth()&&new Date().getDate()==item,'calendar-day-li-selected':valueDate.getFullYear()==date.getFullYear()&&valueDate.getMonth()==date.getMonth()&&valueDate.getDate()==item}"
            @click="pick(item)">
              <div class="calendar-day-li-circle"></div>
              <span class="calendar-day-li-text" v-text="item"></span>
            </li>
            <li class="calendar-day-li-disabled" v-for="(item,index) in nextMonthDays " :key=" 'next'+index " v-text="item "></li>
          </ul>
          <ul class="calendar-year-ul" v-show="type=='year'">
            <li class="calendar-year-li" v-for="(item,index) in 25 " :key=" 'year'+index " :class="{'calendar-year-li-selected':valueDate.getFullYear()==date.getFullYear()-13+item} " v-text="date.getFullYear()-13+item " @click="pickYear(date.getFullYear()-13+item) "></li>
          </ul>
        </div>
        <slot name="foot"></slot>
      </div>
</template>
<script>
function getDayCount(year, month) {
  if (
    month == 1 ||
    month == 3 ||
    month == 5 ||
    month == 7 ||
    month == 8 ||
    month == 10 ||
    month == 12
  ) {
    return 31;
  } else if (month == 2) {
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      return 29;
    } else {
      return 28;
    }
  } else {
    return 30;
  }
}
export default {
  name: "calendar",
  props: {
    value: {
      type: String,
      default() {
        var now = new Date();
        return (
          now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate()
        );
      }
    }
  },
  data() {
    var d = new Date(this.value);
    d.setDate(1);
    return {
      date: d,
      weekNames: ["日", "一", "二", "三", "四", "五", "六", "日"],
      monthNames: [
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
        "十二"
      ],
      type: "day"
    };
  },
  methods: {
    page(val) {
      var i = val ? 1 : -1;
      var d = new Date();
      d.setDate(1);
      if (this.type == "year") {
        d.setFullYear(this.date.getFullYear() + 15 * i);
        d.setMonth(this.date.getMonth());
      } else if (this.type == "day") {
        d.setFullYear(this.date.getFullYear());
        d.setMonth(this.date.getMonth() + i);
      }
      this.date = d;
    },
    pickYear(val) {
      this.date.setFullYear(val);
      this.type = "day";
    },
    pick(val) {
      this.$emit(
        "input",
        this.date.getFullYear() + "/" + (this.date.getMonth() + 1) + "/" + val
      );
    },
    getFullNum(val) {
      return val + 1 > 10 ? val : "0" + val;
    }
  },
  computed: {
    valueDate() {
      return new Date(this.value);
    },
    prevMonthDays() {
      var result = [];
      var head = 0;
      var firstDay = this.date.getDay();
      if (firstDay == 0) {
        head = 6;
      } else {
        head = 6 - (7 - firstDay);
      }
      if (head != 0) {
        var pe = getDayCount(this.date.getFullYear(), this.date.getMonth());
        var pb = pe - head + 1;
        for (var i = pb; i <= pe; i++) {
          result.push(i);
        }
      }
      return result;
    },
    nextMonthDays() {
      var result = [];
      var foot = 0;
      var dayCount = getDayCount(
        this.date.getFullYear(),
        this.date.getMonth() + 1
      );
      var lastDay = new Date(
        this.date.getFullYear() +
          "/" +
          (this.date.getMonth() + 1) +
          "/" +
          dayCount
      ).getDay();
      if (lastDay == 0) {
        foot = 0;
      } else {
        foot = 7 - lastDay;
      }
      if (foot != 0) {
        for (var i = 1; i <= foot; i++) {
          result.push(i);
        }
      }
      return result;
    },
    currentMonthDays() {
      var result = [];
      var dayCount = getDayCount(
        this.date.getFullYear(),
        this.date.getMonth() + 1
      );
      for (var i = 1; i <= dayCount; i++) {
        result.push(i);
      }
      return result;
    }
  }
};
</script>
<style lang="less">
@import url("../../less/variables.less");
.calendar {
  & {
    background: white;
    width: 300px;
    box-sizing: border-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    font-size: 12px;
  }
  &-head {
    & {
      position: relative;
      height: 52px;
      background: @main-color;
      color: #fff;
      font-weight: 600;
      padding: 20px;
    }
    &-top {
      font-size: 16px;
      opacity: 0.8;
    }
    &-bottom {
      font-size: 26px;
      opacity: 0.8;
    }
    &-active {
      transition: cubic-bezier(0.55, 0.01, 0.55, 1) opacity 0.25s;
      opacity: 1;
    }
  }
  &-body {
    padding: 0 6px;
    height: 292px;
  }
  &-toolbar {
    height: 40px;
    line-height: 40px;
    display: flex;
    text-align: center;
  }
  &-toolbar-middle {
    font-weight: 500;
    font-size: 15px;
  }
  &-toolbar-side {
    width: 52px;
  }
  &-toolbar-side>button{
    vertical-align: middle;
  }
  &-day {
    &-ul {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      width: 280px;
    }
    &-ul > li {
      text-align: center;
      width: 32px;
      height: 32px;
      padding: 2px 4px;
      line-height: 32px;
    }
    &-li {
      & {
        position: relative;
        cursor: pointer;
      }
      &-circle {
        transform: scale(0);
        background: @main-color-light;
        position: absolute;
        left: 4px;
        top: 2px;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        opacity: 0;
        transition: cubic-bezier(0.55, 0.01, 0.55, 1) transform 0.2s,
          cubic-bezier(0.55, 0.01, 0.55, 1) opacity 0.2s;
      }
      &-text {
        position: relative;
      }
      &-current {
        color: @main-color;
      }
      &-week {
        color: @dark-gray;
        font-weight: 600;
      }
      &-disabled {
        color: @middle-gray;
      }
      &:hover,
      &-selected {
        color: #fff !important;
      }
      &-selected > &-circle,
      &:hover > &-circle {
        opacity: 1;
        transform: scale(1);
      }
      &-selected > &-circle {
        background: @main-color;
      }
    }
  }
  &-year {
    &-ul {
      overflow-y: auto;
      height: 100%;
      box-sizing: border-box;
      overflow-y: auto;
      padding: 16px 0;
      font-size: 16px;
      text-align: center;
    }
    &-li {
      & {
        height: 36px;
        line-height: 36px;
        margin: 2px;
      }
      &-selected {
        color: @main-color;
        font-size: 22px;
        font-weight: 600;
      }
    }
  }
}
</style>


