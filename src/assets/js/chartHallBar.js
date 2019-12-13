import echarts from "echarts";
import { scale } from "@/assets/js/flexibleScreen.js";
let scaleRatio = scale;
console.log(scaleRatio);
export default function(counter, self, domId) {
  let optionBar = {
    title: {
      text: "月度自助率统计（月度）",
      x: "center",
      y: "top",
      textStyle: {
        fontSize: 14 * scaleRatio,
        color: "#A2C3FF"
      }
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      left: 20 * scaleRatio,
      padding: [40 * scaleRatio, 0, 0, 0],
      // lineHeight:12,
      // height:10,
      // bottom:0,
      // orient: "vertical",
      orient: "horizontal",
      itemWidth: 6 * scaleRatio,
      itemHeight: 6 * scaleRatio,
      color: "#6699FF",
      data: [
        {
          name: "柜台",
          // 强制设置图形为圆。
          icon: "circle",
          // 设置文本为红色
          textStyle: {
            color: "#6699FF",
            fontSize: 8 * scaleRatio
          }
        },
        {
          name: "自助终端",
          // 强制设置图形为圆。
          icon: "circle",
          // 设置文本为红色
          textStyle: {
            color: "#6699FF",
            fontSize: 8 * scaleRatio
          }
        }
      ]
    },
    color: [
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: "rgba(55,135,255,1) "
        },
        {
          offset: 1,
          color: "rgba(3,56,149,0.58)"
        }
      ]),
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: "rgba(140,74,255,1)"
        },
        {
          offset: 1,
          color: "rgba(44,11,135,0.58)"
        }
      ])
    ],
    grid: {
      left: 20 * scaleRatio,
      right: 20 * scaleRatio,
      bottom: 12 * scaleRatio,
      top: 70 * scaleRatio,
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: ["缴费", "业务办理", "发票打印"],
        axisLabel: {
          show: true,
          // formatter: '{value} ml',
          textStyle: {
            color: "#6699FF",
            fontSize: 8 * scaleRatio
          }
        },
        axisLine: {
          //x轴线
          show: true,
          lineStyle: {
            color: "#1D2A53"
          }
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        show: true,
        axisLabel: {
          show: false,
          // formatter: '{value} ml',
          textStyle: {
            color: "#6699FF",
            fontSize: 8 * scaleRatio
          }
        },

        axisLine: {
          //x轴线
          show: false,
          lineStyle: {
            color: "#1D2A53"
          }
        },
        splitLine: {
          show: true, //X网格线
          lineStyle: {
            //x网格线
            color: "#1D2A53"
          }
        }
      }
    ],
    series: [
      {
        name: "柜台",
        type: "bar",
        barWidth: 20 * scaleRatio,
        data: counter,
        label: {
          show: true,
          position: "top",
          color: "#fff",
          fontSize: 8 * scaleRatio
        }
      },
      {
        name: "自助终端",
        type: "bar",
        barWidth: 20 * scaleRatio,
        stack: "广告",
        data: self,
        label: {
          show: true,
          position: "top",
          color: "#fff",
          fontSize: 8 * scaleRatio
        }
      }
    ]
  };
  let charBar = echarts.init(document.getElementById(domId));
  charBar.setOption(optionBar);
}
