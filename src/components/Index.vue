<template>
  <div class="home">
		<v-header></v-header>
    <div class="home_main mt10 clearfix">
        <div class="home_con clearfix">
            <el-form :inline="true" :model="form" class="demo-form-inline">
              <el-form-item label="申请件编号：">
                <el-input v-model="form.num" placeholder="请输入申请件编号"></el-input>
              </el-form-item>
              <el-form-item label="申请人姓名：">
                <el-input v-model="form.name" placeholder="请输入申请人姓名"></el-input>
              </el-form-item>
              <el-form-item label="身份证号码：">
                <el-input v-model="form.id" placeholder="请输入身份证号码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"> <i class="iconfont icon-search"></i>  查询</el-button>
              </el-form-item>
            </el-form>
            
            <el-tabs type="border-card">
              <el-tab-pane label="可领取任务">
                  <template>
                    <el-table
                      :data="tableData"
                      stripe
                      size='small'
                      style="width: 100%">
                      <el-table-column
                        prop="sqjnum" label="申请件编号">
                      </el-table-column>
                      <el-table-column
                        prop="type" label="业务类型">
                      </el-table-column>
                      <el-table-column
                        prop="name"  label="申请人姓名">
                      </el-table-column>
                      <el-table-column
                        prop="personId" width="200px"  label="身份证号码">
                      </el-table-column>
                      <el-table-column
                        prop="productId"  label="产品编号">
                      </el-table-column>
                      <el-table-column
                        prop="node"  label="审批节点">
                      </el-table-column>
                      <el-table-column
                        prop="date"  label="申请时间">
                      </el-table-column>
                      <el-table-column
                        prop="state"  label="状态">
                      </el-table-column>
                      <el-table-column
                        label="操作"
                        width="200px">
                        <template>
                          <el-button type="primary" size="small">可领取</el-button>
                          <el-button type="primary" disabled size="small">不可领取</el-button>
                        </template>
                      </el-table-column>

                    </el-table>
                  </template>

                  <div class="paging_box" v-if="this.tableData.length>=5">
                      <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="1000">
                      </el-pagination>
                  </div>
              </el-tab-pane>
              <el-tab-pane label="待办任务">
                  <template>
                    <el-table
                      :data="tableData1"
                      stripe
                      size='small'
                      style="width: 100%">
                      <el-table-column
                        prop="sqjnum" label="申请件编号">
                      </el-table-column>
                      <el-table-column
                        prop="type" label="业务类型">
                      </el-table-column>
                      <el-table-column
                        prop="name"  label="申请人姓名">
                      </el-table-column>
                      <el-table-column
                        prop="personId" width="200px"  label="身份证号码">
                      </el-table-column>
                      <el-table-column
                        prop="productId"  label="产品编号">
                      </el-table-column>
                      <el-table-column
                        prop="node"  label="审批节点">
                      </el-table-column>
                      <el-table-column
                        prop="date"  label="申请时间">
                      </el-table-column>
                      <el-table-column
                        prop="state"  label="状态">
                      </el-table-column>
                      <el-table-column
                        label="操作"
                        width="200px">
                        <template>
                          <el-button type="primary" size="small">可领取</el-button>
                          <el-button type="primary" disabled size="small">不可领取</el-button>
                        </template>
                      </el-table-column>

                    </el-table>
                  </template>
                 
              </el-tab-pane>

              <el-tab-pane label="已办任务">
                  <template>
                    <el-table
                      :data="tableData2"
                      stripe
                      size='small'
                      style="width: 100%">
                      <el-table-column
                        prop="sqjnum" label="申请件编号">
                      </el-table-column>
                      <el-table-column
                        prop="type" label="业务类型">
                      </el-table-column>
                      <el-table-column
                        prop="name"  label="申请人姓名">
                      </el-table-column>
                      <el-table-column
                        prop="personId" width="200px"  label="身份证号码">
                      </el-table-column>
                      <el-table-column
                        prop="productId"  label="产品编号">
                      </el-table-column>
                      <el-table-column
                        prop="node"  label="审批节点">
                      </el-table-column>
                      <el-table-column
                        prop="date"  label="申请时间">
                      </el-table-column>
                      <el-table-column
                        prop="state"  label="状态">
                      </el-table-column>
                      <el-table-column
                        label="操作"
                        width="200px">
                        <template>
                          <el-button type="primary" size="small">可领取</el-button>
                          <el-button type="primary" disabled size="small">不可领取</el-button>
                        </template>
                      </el-table-column>

                    </el-table>
                  </template>
              </el-tab-pane>
            </el-tabs>  
        </div>
        <div class="home_con1 mt10 clearfix">
            <div class="home_con1_top fl">
                <div class="select_date">
                  <span>数据:</span>
                  <template>
                    <el-select v-model="selectDate" clearable placeholder="请选择" size="small">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </div>
                <h3 class="title" style="text-align:center;border:none">最近12个月业务趋势</h3>
                <div class="chart" style="width:98%;height:400px">
                    <div id="trendView" ref="trendView" style="width:100%;height:100%"></div>
                </div> 
           </div>
           <div class="home_con1_bot fr">
              <div class="home_item home_data1">
                  <h3 class="title">消贷业务进件量统计</h3>
                  <div class="chart"  style="width:100%;height:200px">
                      <div id="intoNumView" ref="intoNumView" style="width:100%;height:100%"></div>
                  </div>
              </div>  
              <div class="home_item home_data1">
                  <h3 class="title">消贷进件业务对比分析</h3>
                  <div class="chart"   style="width:100%;height:200px">
                      <div id="intoComparView" ref="intoComparView" style="width:100%;height:100%"></div>
                  </div>
              </div> 
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import vHeader from './common/Header.vue'
import echarts from 'echarts'
export default {
  components:{
    vHeader
  },
  data () {
    return {
      selectDate:'',
      options: [{
        value: '选项1',
        label: '本年'
      }, {
        value: '选项2',
        label: '本季度'
      }, {
        value: '选项3',
        label: '本月'
      }],
      search:'',
      islogin:localStorage.getItem('username'),
      tableData:[{
          sqjnum:'1',
          type:'进件',
          name:'浪浪',
          personId:'140421199204214840',
          productId:'123456',
          node:'进件',
          date: '2016-05-02',
          state: '同意',
      },{
          sqjnum:'1',
          type:'进件',
          name:'浪浪',
          personId:'140421199204214840',
          productId:'123456',
          node:'进件',
          date: '2016-05-02',
          state: '同意',
      },{
          sqjnum:'1',
          type:'进件',
          name:'浪浪',
          personId:'140421199204214840',
          productId:'123456',
          node:'进件',
          date: '2016-05-02',
          state: '同意',
      },{
          sqjnum:'1',
          type:'进件',
          name:'浪浪',
          personId:'140421199204214840',
          productId:'123456',
          node:'进件',
          date: '2016-05-02',
          state: '同意',
      },{
          sqjnum:'1',
          type:'进件',
          name:'浪浪',
          personId:'140421199204214840',
          productId:'123456',
          node:'进件',
          date: '2016-05-02',
          state: '同意',
      }],
      tableData1:[],
      tableData2:[],
      form:{
          num:'',
          name:'',
          id:''
      },

    }
  },
  mounted(){  
    this.drawTrendView();    //最近12个月业务趋势
    this.drawIntoNumView();  //消贷业务进件量统计
    this.drawIntoComparView();  //消贷进件业务对比分析
    this.isLogin();   
  },
  methods:{
    isLogin(){
      if(!this.islogin){
        this.$router.push('/login');
      }
    },
    drawTrendView(){
        let myChart = echarts.init(this.$refs.trendView); 

        var  option = {
            backgroundColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#c86589'
                },
                {
                    offset: 1,
                    color: '#06a7ff'
                }
            ], false),
            grid: {
                top: '15%',
                left: '5%',
                right: '5%',
                bottom: '15%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['2019-01', '2019-01', '2019-01', '2019-01', '2019-01', '2019-01', '2019-02', '2019-03', '2019-04', '2019-05'],
                axisLabel: {
                    margin: 30,
                    color: '#ffffff63'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: true,
                    length: 25,
                    lineStyle: {
                        color: "#ffffff1f"
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#ffffff1f'
                    }
                }
            },
            yAxis: [{
                type: 'value',
                position: 'right',
                axisLabel: {
                    margin: 20,
                    color: '#ffffff63'
                },

                axisTick: {
                    show: true,
                    length: 15,
                    lineStyle: {
                        color: "#ffffff1f",
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#ffffff1f'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                        width: 2
                    }
                }
            }],
            series: [{
                name: '注册总量',
                type: 'line',
                smooth: true, //是否平滑曲线显示
                showAllSymbol: true,
                symbol: 'circle',
                symbolSize: 6,
                lineStyle: {
                    normal: {
                        color: "#fff", // 线条颜色
                    },
                },
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#fff',
                    }
                },
                itemStyle: {
                    color: "red",
                    borderColor: "#fff",
                    borderWidth: 3
                },
                tooltip: {
                    show: false
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#eb64fb'
                            },
                            {
                                offset: 1,
                                color: '#3fbbff0d'
                            }
                        ], false),
                    }
                },
                data: [393, 438, 485, 631, 689, 824, 987, 1000, 1100, 1200]
            }]
        };  
        
        myChart.setOption(option)
    },
    drawIntoNumView(){
        let myChart = echarts.init(this.$refs.intoNumView); 

        var  option = {
            backgroundColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#c86589'
                },
                {
                    offset: 1,
                    color: '#06a7ff'
                }
            ], false),

            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            visualMap: {
                show: false,
                min: 150,
                max: 200,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series: [{
                name: '注册总量',
                type: 'pie',
                radius : '90%',
                center: ['50%', '50%'],
                data:[
                  {value:335, name:'直接访问'},
                  {value:310, name:'邮件营销'},
                  {value:274, name:'联盟广告'},
                  {value:235, name:'视频广告'},
                  {value:400, name:'搜索引擎'}
                ].sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',

                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#c23531',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }]
        };  
        
        myChart.setOption(option)
    },
    drawIntoComparView(){
        let myChart = echarts.init(this.$refs.intoComparView); 

        var  option = {
            backgroundColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#c86589'
                },
                {
                    offset: 1,
                    color: '#06a7ff'
                }
            ], false),
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            xAxis:[
              {
                  type : 'category',
                  data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                  axisTick: {
                      alignWithLabel: true
                  },
                  axisLabel: {
                      show: true,
                      textStyle: {
                          color: '#fff'
                      }
                  },
                  axisLine:{
                    lineStyle:{
                       color: '#77C0F3'
                    }
                  }
              }
            ],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    }
                },
                 axisLine:{
                    lineStyle:{
                       color: '#77C0F3'
                    }
                  },
                  splitLine:{ 
                    show:true, 
                    lineStyle:{ 
                      color: '#77C0F3'
                    }
                  }
            }],
            series: [{
                name:'直接访问',
                type:'bar',
                barWidth: '60%',
                data:[10, 52, 200, 334, 390, 330, 220],
                  itemStyle:{
                      normal:{
                          color:'#fff'
                      }
                  },

            }]
        };  
        
        myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang='scss'>
.el-table--border::after, .el-table--group::after, .el-table::before {
    content: '';
    position: absolute; 
    background-color: #fff; 
    z-index: 1;
}
.el-form--inline .el-form-item {
    margin-right: 30px;
}
.title{
    line-height: 40px;
    border-bottom: 1px solid $bordercolor;
    color: $fdcolor;
    padding: 0 15px;
    font-weight: normal;
}
.home_main{
  padding:90px 10px 10px 10px;
  .home_item{
    background: #fff;
    .chart{
       padding: 10px 0;
    }
  }
}
.home_title{
  background: #fff;
}
.home_con{
  width: 100%;
  form{
     background: #fff;
     padding: 20px 20px 0;
  }
  .home_data{
    width: 100%;

  }
}
.home_con1{
  background: #fff;
  padding: 0 15px;
}
.home_con1_top{
  width:60%;
  overflow: hidden;
  .select_date{
    padding: 15px;
    span{
      color: #666;
    }
  }
}
.home_con1_bot{
  width:40%;
  overflow: hidden;
  .home_data1{
    width: 100%;
  }
}
.paging_box{
  text-align: right;
  padding: 10px 0;
}
</style>
