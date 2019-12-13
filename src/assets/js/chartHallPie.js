import echarts from "echarts";
import { scale } from "@/assets/js/flexibleScreen.js";
let scaleRatio = scale;
console.log(scaleRatio);
export default function(businessList, domId) {
  let optionPie = {
    title: {
      text: "临厅用户行为分析（月度）",
      x: "center",
      y: "top",
      textStyle: {
        fontSize: 14 * scaleRatio,
        color: "#A2C3FF"
      }
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    // legend: {
    //     orient: 'vertical',
    //     x: 'left',
    //     data: ['谷歌', '必应', '其他']
    // },
    color: [
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: "rgba(67,215,239,1)"
        },
        {
          offset: 1,
          color: "rgba(43,100,214,1)"
        }
      ]),
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: "rgba(60,43,214,1)"
        },
        {
          offset: 1,
          color: "rgba(110,27,165,1)"
        }
      ]),
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: "rgba(67,136,239,1)"
        },
        {
          offset: 1,
          color: "rgba(38,38,199,1)"
        }
      ])
    ],
    series: [
      {
        name: "数据组成",
        type: "pie",
        // roseType: 'area',
        radius: ["30%", "45%"],
        center: ["50%", "60%"],
        label: {
          normal: {
            // formatter: ' {b|{b}}{c} \n {per|{d}%}  ',
            formatter: " {per|{d}%} \n {b|{b}}  ",
            // backgroundColor: '#eee',
            // borderColor: '#aaa',
            // borderWidth: 1,
            // borderRadius: 4,

            rich: {
              per: {
                color: "#fff",
                fontSize: 14 * scaleRatio,
                // backgroundColor: '#334455',
                padding: [2, 0]
                // borderRadius: 2
              },
              b: {
                color: "#A2C3FF",
                fontSize: 10 * scaleRatio,
                lineHeight: 20 * scaleRatio
              }
            }
          }
        },
        data: [
          {
            value: businessList[0],
            name: "电费缴纳",
            itemStyle: {
              normal: {
                // color: "#ccc",
                borderColor: "#02071E",
                borderWidth: 3 * scaleRatio,
                label: {
                  show: true
                },
                labelLine: {
                  show: true
                }
              },
              emphasis: {
                // color: "#5886f0",
                borderColor: "#02071E",
                borderWidth: 3 * scaleRatio
              }
            }
          },
          {
            value: businessList[1],
            name: "业务办理",
            itemStyle: {
              normal: {
                // color: "#ccc",
                borderColor: "#02071E",
                borderWidth: 3 * scaleRatio,
                label: {
                  show: true
                },
                labelLine: {
                  show: true
                }
              },
              emphasis: {
                // color: "#5886f0",
                borderColor: "#02071E",
                borderWidth: 3 * scaleRatio
              }
            }
          },
          {
            value: businessList[2],
            name: "发票打印",
            itemStyle: {
              normal: {
                // color: "#ccc",
                borderColor: "#02071E",
                borderWidth: 3 * scaleRatio,
                label: {
                  show: true
                },
                labelLine: {
                  show: true
                }
              },
              emphasis: {
                // color: "#5886f0",
                borderColor: "#02071E",
                borderWidth: 3 * scaleRatio
              }
            }
          }
        ]
      }
    ]
  };
  let charPie = echarts.init(document.getElementById(domId));
  charPie.setOption(optionPie);
}
