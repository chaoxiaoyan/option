<template>
  <div class="product_inst">
    <div class="crumb">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  	<el-breadcrumb-item>产品中心</el-breadcrumb-item>
			  	<el-breadcrumb-item>信用卡</el-breadcrumb-item>
			  	<el-breadcrumb-item class="active">分期产品管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
    <div class="title mt20">
      <el-form  ref="form"  >
        <el-row class="header">
          <el-col :span="10" class="h_left">
            <el-form-item>
              <el-input v-model="input" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="产品名称" >
                  <el-option label="产品名称" value="1"></el-option>
                  <el-option label="产品编号" value="2"></el-option>
                </el-select>
              </el-input> 
            </el-form-item>
          </el-col>
          <el-col :span="2" class="h_center">
            <el-form-item>
              <el-button type="primary" > <i class="el-icon-search"></i> 查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="h_right">
            <el-form-item>
              <el-button type="danger"><i class="el-icon-plus"></i> 新增</el-button>
            </el-form-item>
          </el-col>
        </el-row>  
      </el-form>
    </div>

    <div class="content">
         <template>
            <el-table
              :data="tableData" height="400"  border  style="width: 100%" size="small">
              <el-table-column  prop="xnum"  label="序号"  width="180"></el-table-column>
              <el-table-column  prop="name"  label="产品名称"  width="180"></el-table-column>
              <el-table-column  prop="bnum" label="产品编号"></el-table-column>
              <el-table-column  prop="lossdate" label="生效日期"></el-table-column>
              <el-table-column  prop="rawdate" label="失效日期"></el-table-column>
              <el-table-column  prop="edit" label="操作">
                  <template >
                    <el-button type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                  </template>
              </el-table-column>
            </el-table>
        </template> 
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      select:1,
      input:'',
      tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
    }
  }
}
</script>
<style>


</style>


<style scoped lang='scss'>
.content{
  height: 100%;
  overflow: auto;
}
</style>
