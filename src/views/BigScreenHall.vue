<template>
  <div id="container">
    <header>
      <h1>营业厅运营监测平台</h1>
    </header>

    <div id="main-wrap">
      <main id="main">
        <!--样式里的l,m,r,t,b分别代表左，中，右，上，下-->
        <div class="l">
          <div class="l-t">
            <!-- 城南 -->
            <hall-box :hallBoxDatas="chenNan"></hall-box>
          </div>
          <div class="l-b">
            <!-- 城北 -->
            <hall-box :hallBoxDatas="chenBei"></hall-box>
          </div>
        </div>
        <div class="m">
          <div class="map-wrap">
            <span class="hot-map-tit">南京市热力图分布</span>
            <baidu-map
              :center="center"
              :zoom="zoom"
              :mapStyle="mapStyle"
              :scroll-wheel-zoom="true"
              class="baidu-map"
            >
              <bml-heatmap
                :data="heatMapData"
                :max="1"
                :radius="5"
                :gradient="gradient"
              ></bml-heatmap>
              <bm-polyline
                :path="polylinePath"
                stroke-color="#41cfed"
                :stroke-opacity="0.8"
                :stroke-weight="3"
              ></bm-polyline>
              <!-- <bml-marker-clusterer :averageCenter="true"> -->
              <!-- <bm-marker
                v-for="marker of markers"
                :position="{ lng: marker.lng, lat: marker.lat }"
              ></bm-marker> -->
              <!-- </bml-marker-clusterer> -->
            </baidu-map>
            <!-- <div id="baiduMapImp" class="baidu-map" ref="allmap"></div> -->
          </div>
        </div>

        <div class="r">
          <div class="r-t">
            <hall-box :hallBoxDatas="yuHua"></hall-box>
          </div>
          <div class="r-b">
            <hall-box :hallBoxDatas="qiXia"></hall-box>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import "@/assets/css/common.css";
import "@/assets/css/hall.css";

import axios from "axios";
import { BmlHeatmap } from "vue-baidu-map";
import HallBox from "@/components/HallBox";
import { getRatio } from "@/assets/js/flexibleScreen.js";

export default {
  components: {
    BmlHeatmap,
    HallBox
  },
  data() {
    return {
      center: { lng: 118.790349, lat: 32.048249 },
      zoom: 10,
      heatMapData: [],
      gradient: {
        "0.2": "rgb(114, 213, 8)",
        "0.3": "rgb(243, 239, 3)",
        "0.6": "rgb(255, 10, 0)"
      },
      polylinePath: [],
      mapStyle: {
        features: ["road", "building", "water", "land"], //隐藏地图上的"poi",
        style: "midnight"
        // styleJson: [
        //   {
        //     featureType: "all",
        //     elementType: "geometry",
        //     stylers: {
        //       hue: "#007fff",
        //       saturation: 89
        //     }
        //   },
        //   {
        //     featureType: "water",
        //     elementType: "all",
        //     stylers: {
        //       color: "#1C2757"
        //     }
        //   }
        // ]
      },
      // 四个厅数据
      chenNan: {},
      chenBei: {},
      yuHua: {},
      qiXia: {},
      // 要合并的5个数组 start
      currentQuanty: [],
      hallBusinessForDayData: [],
      userAnalysis: [],
      impWorkloadCountData: [],
      selfBusinessCountData: [],
      // 要合并的5个数组 end
      // 最终合并的数组
      hallTotalData: [],
      workersList: [],
      flagCount: 0,
      flagCountTotal: 5
    };
  },
  methods: {
    getSortFun(sortByField, order) {
      return function(a, b) {
        if (order == "desc") {
          return a[sortByField] < b[sortByField] ? 1 : -1;
        } else {
          return a[sortByField] > b[sortByField] ? 1 : -1;
        }
      };
    },
    assignArray() {
      if (this.flagCount === this.flagCountTotal) {
        this.hallTotalData = this.userAnalysis.map((item, index) => {
          return {
            ...this.currentQuanty[index],
            ...this.hallBusinessForDayData[index],
            ...item,
            ...this.workersList[index],
            ...this.selfBusinessCountData[index]
          };
          // return Object.assign(
          //   this.currentQuanty[index],
          //   this.hallBusinessForDayData[index],
          //   item,
          //   this.workersList[index],
          //   this.selfBusinessCountData[index]
          // );
        });
        this.chenNan = this.hallTotalData[1];
        this.chenBei = this.hallTotalData[0];
        this.yuHua = this.hallTotalData[3];
        this.qiXia = this.hallTotalData[2];
        console.info(this.hallTotalData);
      }
    },
    loadHeatmap() {
      axios
        .get("/json/hall/getHeatMapData.json")
        .then(response => {
          this.heatMapData = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadPolylinePath() {
      axios({
        url: "/json/map/polylinePath.json",
        method: "GET"
      })
        .then(response => {
          this.polylinePath = response.data.polylinePath;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCurrentQuanty() {
      axios({
        url: "/json/hall/getCurrentQuanty.json",
        method: "GET"
      })
        .then(response => {
          this.currentQuanty = response.data;
          // let yestodayCount = response.data.yestodayCount;
          this.currentQuanty.forEach(e => {
            let compareRateFlow = ((e.todayCount - e.yestodayCount) / e.yestodayCount) * 100;
            e.compareRateFlow = compareRateFlow;
            e.todayCountFlow = e.todayCount;
            // delete e.todayCount;
          });
          // console.log(this.currentQuanty);
          this.flagCount += 1;
          this.assignArray();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getHallBusinessForDayData() {
      axios({
        url: "/json/hall/getHallBusinessForDayData.json",
        method: "GET"
      })
        .then(response => {
          this.hallBusinessForDayData = response.data.content;
          this.hallBusinessForDayData.forEach(e => {
            let compareRateBusi = ((e.todayCount - e.yestodayCount) / e.yestodayCount) * 100;
            e.compareRateBusi = compareRateBusi;
            e.todayCountBusi = e.todayCount;
            // delete e.todayCount;
          });
          // console.log(this.hallBusinessForDayData);
          this.flagCount += 1;
          this.assignArray();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getLtUserAnalysis() {
      axios({
        url: "/json/hall/getLtUserAnalysis.json", // 四个厅的临厅用户行为分析
        method: "GET"
      })
        .then(response => {
          this.userAnalysis = response.data;
          this.userAnalysis.forEach(element => {
            // element 当前厅对象
            element.businessType.forEach(e => {
              e.type = parseInt(e.type);
            });

            // businessType数组 内的对象根据type字段（1，3，13）排序
            element.businessType.sort(this.getSortFun("type"));
            // 给当前厅对象 新增一个数组字段 存储行为分析chart图数据

            let businessList = [];
            element.businessType.forEach(e => {
              businessList.push(e.count);
            });

            element.businessList = businessList;
          });
          // console.log(this.userAnalysis);
          this.flagCount += 1;
          this.assignArray();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getImpWorkloadCountData() {
      axios({
        url: "/json/hall/getImpWorkloadCountData.json", // 四个厅的员工工作量
        method: "GET"
      })
        .then(response => {
          this.workersList = [];
          for (let i = 0; i < 4; i++) {
            let obj = {};
            obj.hallId = i + 1 + "";
            obj.workerNameList = [];
            obj.workerCountList = [];
            this.workersList.push(obj);
          }
          // console.log(workersList);
          this.impWorkloadCountData = response.data;
          // console.log(this.impWorkloadCountData);
          this.impWorkloadCountData.forEach(ele => {
            // console.log(ele);
            this.workersList.forEach(e => {
              if (ele.BUSINESS_HALL_ID == e.hallId) {
                e.workerNameList.push(ele.FULL_NAME);
                e.workerCountList.push(ele.COUNT);
              }
            });
          });
          // console.log(this.workersList);
          this.flagCount += 1;
          this.assignArray();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getSelfBusinessCountData() {
      axios({
        url: "/json/hall/getSelfBusinessCountData.json", // 四个厅的业务自助率
        method: "GET"
      })
        .then(response => {
          this.selfBusinessCountData = response.data;
          // console.log(this.selfBusinessCountData);
          this.flagCount += 1;
          this.assignArray();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.loadHeatmap();
    this.loadPolylinePath();
    this.getCurrentQuanty();
    this.getHallBusinessForDayData();
    this.getLtUserAnalysis();
    this.getImpWorkloadCountData();
    this.getSelfBusinessCountData();
    let $main = document.getElementById("main-wrap");
    getRatio($main);
    // console.log(scale);
  }
};
</script>

<style>
.BMap_cpyCtrl {
  display: none;
}

.anchorBL {
  display: none;
}
.BMap_noprint {
  display: none;
}
.anchorTR {
  display: none;
}

#main-wrap {
  margin: 0 auto;
}
</style>
