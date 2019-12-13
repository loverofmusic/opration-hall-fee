<template>
  <div class="chart-wrap">
    <h3>
      {{ hallBoxDatas.hallName }}
      <!-- <a href="" style="margin-left: 95%;font-size: 12px;color:#EFEFEF;">监控</a> -->
    </h3>
    <div class="chart-inner">
      <div class="inner-left">
        <div class="left-top">
          <div class="flow-con data-con">
            <div class="data-tit">今日客流量</div>
            <div class="data-num">
              <span class="nbw">{{ hallBoxDatas.todayCountFlow }}</span>
              <span class="subtit">人</span>
            </div>
            <div class="data-compare">
              <div
                class="top"
                :class="[hallBoxDatas.compareRateFlow > 0 ? 'green-up' : 'red-down']"
              >
                <span>{{ hallBoxDatas.compareRateFlow > 0 ? "↑" : "↓" }}</span>
                <span>{{ hallBoxDatas.compareRateFlow | formatAbs | toFixed(1) }}%</span>
              </div>
              <div class="bott">环比</div>
            </div>
          </div>
          <div class="business-con data-con">
            <div class="data-tit">今日业务量</div>
            <div class="data-num">
              <span class="nbw">{{ hallBoxDatas.todayCountBusi }}</span>
              <span class="subtit">笔</span>
            </div>
            <div class="data-compare">
              <div
                class="top"
                :class="[hallBoxDatas.compareRateBusi > 0 ? 'green-up' : 'red-down']"
              >
                <span>{{ hallBoxDatas.compareRateBusi > 0 ? "↑" : "↓" }}</span>
                <span>{{ hallBoxDatas.compareRateBusi | formatAbs | toFixed(1) }}%</span>
              </div>
              <div class="bott">环比</div>
            </div>
          </div>
        </div>
        <div class="left-bottom echart-all" :id="['ec_' + hallBoxDatas.hallId + '_line']"></div>
      </div>
      <div class="inner-right">
        <div :id="['ec_' + hallBoxDatas.hallId + '_pie']" class="right-top echart-all"></div>
        <div class="right-bottom echart-all" :id="['ec_' + hallBoxDatas.hallId + '_bar']"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import echarts from "echarts/lib/echarts";
// 引入柱状图
// import "echarts/lib/chart/bar";
// import "echarts/lib/chart/radar";
// import "echarts/lib/component/legend";
import ChartHallPie from "@/assets/js/chartHallPie";
import ChartHallLine from "@/assets/js/chartHallLine";
import ChartHallBar from "@/assets/js/chartHallBar";
export default {
  props: {
    hallBoxDatas: {
      type: Object,
      required: true
    }
  },
  updated() {
    console.log(this.hallBoxDatas);

    let domIdPie = "ec_" + this.hallBoxDatas.hallId + "_pie";
    let businessList = this.hallBoxDatas.businessList;
    ChartHallPie(businessList, domIdPie);

    let domIdLine = "ec_" + this.hallBoxDatas.hallId + "_line";
    let workerName = this.hallBoxDatas.workerNameList;
    let workerBusi = this.hallBoxDatas.workerCountList;
    ChartHallLine(workerName, workerBusi, domIdLine);

    let domIdBar = "ec_" + this.hallBoxDatas.hallId + "_bar";
    let counter = this.hallBoxDatas.counter;
    let self = this.hallBoxDatas.selfHelp;
    ChartHallBar(counter, self, domIdBar);
  }
};
</script>

<style scoped></style>
