import echarts from "echarts";
import { scale } from "@/assets/js/flexibleScreen.js";
let scaleRatio = scale;
console.log(scaleRatio);
export default function(workerName, workerBusi, domId) {
  // 城南 员工工作量统计表（月度）
  let optionLine = {
    title: {
      text: "员工工作量统计表（月度）",
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
        type: "cross",
        label: {
          backgroundColor: "#6a7985"
        }
      }
    },
    // legend: {
    //     data:['搜索引擎']
    // },

    grid: {
      left: 20 * scaleRatio,
      right: 16 * scaleRatio,
      bottom: 12 * scaleRatio,
      top: 70 * scaleRatio,
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: workerName,
        //             nameTextStyle: {
        // 				color: '#fff',
        // 				fontSize: 8
        // 			},
        axisLabel: {
          interval: 0,
          // rotate:-90,
          formatter: "{value}",
          // formatter:function(val){
          //     return val.split("").join("\n");
          // },
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
    yAxis: [
      {
        type: "value",
        name: "          单位：业务办理笔数",

        nameTextStyle: {
          fontSize: 8 * scaleRatio,
          color: "#6699FF"
          //  width: '100%',
          //  align: 'right'

          //  padding: [3, 4, 5, 600]
        },
        axisLabel: {
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
        name: "",
        type: "line",
        stack: "总量",
        label: {
          normal: {
            show: true,
            position: "top",
            textStyle: {
              fontSize: 8 * scaleRatio,
              color: "#fff"
            }
          }
        },
        symbolSize: 5 * scaleRatio, //拐点大小
        itemStyle: {
          normal: {
            color: "#79DBFF",
            textStyle: {
              fontSize: 30 * scaleRatio
            }
          }
        },
        lineStyle: {
          normal: {
            width: 1
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(73,134,253,1)"
              },
              {
                offset: 1,
                color: "rgba(68,31,172,0.58)"
              }
            ])
          }
        },
        data: workerBusi
      }
    ]
  };
  let charLine = echarts.init(document.getElementById(domId));
  charLine.setOption(optionLine);
}
