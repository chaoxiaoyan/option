<template>
  <div class="content_box">
		<!-- 面包屑 -->
    <div class="crumb_module">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  	<el-breadcrumb-item >权限管理</el-breadcrumb-item>
			  	<el-breadcrumb-item class="active" >法人管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
      <el-form  ref="form" >
        <el-row class="edit_module_search">
          <el-col :span="10">
            <el-form-item>
              <el-input v-model="searchVal" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="社会统一信用代码" >
                  <el-option label="社会统一信用代码" value="1"></el-option>
                  <el-option label="单位名称" value="2"></el-option>
                </el-select>
              </el-input> 
            </el-form-item>
          </el-col>
          <el-col :span="14">
			  		<div class="edit_module_btn">
			  			<el-button type="danger" icon="el-icon-search" @click="allSearch(searchVal)">查询</el-button>
			  			<el-button type="primary" icon="el-icon-plus"  @click="allAdd('addForm')">新增</el-button>
			  		</div>
			  	</el-col>
        </el-row>  
      </el-form>
    </div>

		<!-- 列表模块 -->
    <div class="list_module">
	    	<div class="table_body">
					<h4>法人列表</h4>
					<el-table :data="tableData" border style="width: 100%" stripe  size='small'>
							<el-table-column prop="index" type="index" label="序号" align="center" width="60px"></el-table-column>
							<el-table-column prop="legalPersonNum" label="社会统一信用代码"  align="center"> </el-table-column>
							<el-table-column prop="legalPersonName" label="单位名称"  align="center" width="120px"> </el-table-column>
							<el-table-column prop="judicialPersonName" label="法人代表名称"  align="center"> </el-table-column>
							<el-table-column prop="cardType" label="法人代表证件类型" align="center"  width="140px"> </el-table-column>
							<el-table-column prop="cardNo" label="法人代表证件号码" align="center"  width="180px"> </el-table-column>
							<el-table-column prop="legalPersonMobile" label="法人代表手机号码" align="center" width="140px"> </el-table-column>
							<el-table-column prop="effectiveFlag" label="生效标示" align="center"  width="80px"> </el-table-column>
							<el-table-column label="操作" align="center" width="180px">
								<template slot-scope="scope">
										<el-button size="mini" class="edit-btn" @click="editItem(scope.row)">
											<i class="el-icon-edit"></i>
											<span class="text">编辑</span>
										</el-button>
										<!-- 不可点击 -->
										<el-button size="mini" type="danger" v-if="scope.row.effectiveFlag==1" class="delete-btn" @click="deleteItem(scope.row)" :disabled="true">
											<i class="el-icon-delete"></i>
											<span class="text">删除</span>
										</el-button>
										<el-button size="mini" type="danger" v-else class="delete-btn" @click="deleteItem(scope.row)">
											<i class="el-icon-delete"></i>
											<span class="text">删除</span>
										</el-button>
										<!-- <el-button size="mini" type="danger" class="plus-btn">
											<i class="el-icon-plus"></i>
											<span class="text">新增</span>
										</el-button>
										<el-button size="mini" type="danger" class="search-btn">
											<i class="el-icon-search"></i>
											<span class="text">查看</span>
										</el-button> -->
								</template>
							</el-table-column>
					</el-table>
					<el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="currentPage"
							:page-sizes="[5, 10, 15, 20,25]"
							:page-size="pageSize"
							layout="total, sizes, prev, pager, next, jumper"
							:total="totalCount">
					</el-pagination>
				</div>
			</div>
		<!--新增弹框页面开始-->
		<el-dialog title="新增法人" :visible.sync="dialogFormVisible" >
		  <el-form :model="addForm" :rules="rules" ref="addForm" id="addForm">
		    <el-form-item label="社会统一信用代码" prop="legalPersonNum_add" :label-width="formLabelWidth" >
		      <el-input v-model="addForm.legalPersonNum_add" :disabled="addForm.flag1"></el-input>
		      <span>( 组织机构代码、税务登记证、工商营业执照号 )</span>
		    </el-form-item>
		    <el-form-item label="单位名称" prop="legalPersonName_add" :label-width="formLabelWidth" >
		      <el-input v-model="addForm.legalPersonName_add" ></el-input>
		    </el-form-item>
		    <el-form-item label="法人代表名称" prop="judicialPersonName_add" :label-width="formLabelWidth">
		      <el-input v-model="addForm.judicialPersonName_add" ></el-input>
		    </el-form-item>
		    <el-form-item label="法人代表证件类型" prop="cardType_add" :label-width="formLabelWidth" >
		      <el-select v-model="addForm.cardType_add" placeholder="请选择法人代表证件类型" :disabled="addForm.flag1">
			      <el-option v-for="(item,index) in cardType" :key="index" :label="item.bizTypePropName" :value="item.bizTypePropCode">{{item.bizTypePropName}}</el-option>
			    </el-select>
		    </el-form-item>
		    <el-form-item label="法人代表证件号码" prop="cardNo_add" :label-width="formLabelWidth">
		      <el-input v-model="addForm.cardNo_add" :disabled="addForm.flag1"></el-input>
		    </el-form-item>
		    <el-form-item label="法人代表手机号码" prop="legalPersonMobile_add" :label-width="formLabelWidth">
		      <el-input v-model="addForm.legalPersonMobile_add" type="number"></el-input>
		    </el-form-item>
		    <el-form-item label="法人代表电话号码" prop="legalPersonTel_add" :label-width="formLabelWidth">
		      <el-input v-model="addForm.legalPersonTel_add" type="number"></el-input>
		    </el-form-item>
		    <el-form-item label="法人代表邮箱" prop="legalPersonEmail_add" :label-width="formLabelWidth">
		      <el-input v-model="addForm.legalPersonEmail_add" ></el-input>
		    </el-form-item>
		    <el-form-item label="生效标示" prop="effectiveFlag_add" :label-width="formLabelWidth">
		      <el-select v-model="addForm.effectiveFlag_add" placeholder="请选择法人代表证件类型">
			      <el-option label="是" value="1">是</el-option>
			      <el-option label="否" value="0">否</el-option>
			    </el-select>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button v-if="addForm.edit" type="primary" @click="editSure()">保存</el-button>
		    <el-button v-else type="primary" @click="addSure()">确 定</el-button>
		  </div>
		</el-dialog>
		<!--新增弹框页面结束-->
  </div>
</template>

<script>
export default {
  data () {
    return {
//  	form1:"",
    	searchVal:"",//搜索的文本
    	legalPersonNum:"",//社会统一信用代码时查询值
    	legalPersonName:"",//单位名称时的查询值
      select:"",
      indexNo:0,//当前显示第几页
      currentPage:1,//当前显示第几页 1开头
      pageSize:10,//一页显示几条数据
      totalCount:10,//一共有多少条数据
      tableData:[],//页面table数据
	    dialogFormVisible: false,//新增法人是否显示
	    cardType:[],//法人代表证件类型
	    addForm: {
	      legalPersonNum_add: '',//社会统一信用代码
	      legalPersonName_add:'',//单位名称 
	      judicialPersonName_add:'',//法人代表名称
	      cardType_add:'',//法人代表证件类型
	      cardNo_add:'',//法人代表证件号码
	      legalPersonMobile_add:'',//法人代表手机号码
	      legalPersonTel_add:'',//法人代表电话号码
	      legalPersonEmail_add:'',//法人代表邮箱
	      effectiveFlag_add:'',//生效标识
	      flag1:false,
	      flag2:false,
	      edit:false
	    },
	    rules:{
	    	legalPersonNum_add: [
            { required: true, message: '社会统一信用代码不能为空', trigger: 'blur' },
            { pattern: /^[A-Z0-9]{18,20}$/, message: '请输入正确的社会统一信用代码（只支持大写字母和数字）' },
          ],
          legalPersonName_add:[
          	{ required: true, message: '单位名称不能为空', trigger: 'blur' },
            { pattern:/^[a-zA-Z\u4e00-\u9fa5]+$/, message: '请输入正确的单位名称（只能输入英文、汉字）' },
          ],
          judicialPersonName_add:[
          	{ required: true, message: '法人代表名称不能为空', trigger: 'blur' },
            { pattern:/^[a-zA-Z\u4e00-\u9fa5\.]+$/, message: '请输入正确的法人代表名称（只能输入英文、汉字和.）' },
          ],
          cardType_add:[
          	{ required: true, message: '请选择法人代表证件类型', trigger: 'blur' }
          ],
          cardNo_add:[
          	{ required: true, message: '法人代表证件号码不能为空', trigger: 'blur' },
            { min: 1, max: 18, message: '对不起，您输入的键值过长！', trigger: 'blur' }
          ],
          legalPersonMobile_add:[
          	{ required: true, message: '法人代表手机号码不能为空', trigger: 'blur' },
            { pattern:/^1[3|4|5|7|8]\d{9}$/, message: '请输入正确的法人代表手机号码' }
          ],
          legalPersonTel_add:[
          	{ required: true, message: '法人代表电话号码不能为空', trigger: 'blur' },
            { pattern:/^([0-9]{3,4}-)?[0-9]{7,8}$/, message: '请输入正确的法人代表电话号码' }
          ],
          legalPersonEmail_add:[
          	{ required: true, message: '法人代表邮箱不能为空', trigger: 'blur' },
            { pattern:/^([\w\.\-]+)\@(\w+)(\.([\w^\_]+)){1,2}$/, message: '请输入正确的法人代表邮箱' }
          ],
	    },
	    formLabelWidth: '160px'
    }
  },
  mounted(){
  	this.getData();
  	this.getType();
  },
  methods:{
      //初始化页面
      getData(){
          var that=this;
          this.$post(this.$api,{
              "channelNo": "1",
			  			"transCode" :"SETSYSLEG300",
			  			"indexNo": that.indexNo,
			  			"pageSize": that.pageSize,
          }).then((res) =>{
              that.tableData = res.rows
			  			that.totalCount = res.totalCount
			  			console.log(res)
          })
	  	},
	  	getType(){//获取法人代表证件类型
	  		var that=this;
	  		this.$post(this.$api,{
		  			"channelNo":"1",
				 		"transCode":"SETPARARGS301",
				 		"bizTypeCode":"APPI_MC_ID_TYPE",
				 		"legalPersonNum":"001"
		  	})
	  		.then(function( res ){
	  			console.log(res.rows)
	  			that.cardType=res.rows;
	  		})
	  	},
	  	allSearch(searchVal){//查询按钮点击事件
		  		var that=this;
		  		if(this.select==1){
			  			this.legalPersonNum=searchVal,
			  			this.legalPersonName=""
		  		}else{
			  			this.legalPersonNum="",
			  			this.legalPersonName=searchVal
		  		}
		  		this.$axios.post(this.$api,{
			  			"channelNo": "1",
			  			"transCode":"SETSYSLEG300",
			  			"indexNo": that.indexNo,
			  			"pageSize": that.pageSize,
			  			"legalPersonNum":that.legalPersonNum,
			  			"legalPersonName":that.legalPersonName
		  		})
		  		.then(function(res){
		  				that.tableData=res.rows//table列表数据
			  			that.totalCount=res.totalCount
		  		})
	  	},
		  allAdd(addForm) {//点击新增按钮
		  	this.dialogFormVisible=true;
		  	this.addForm.edit=false;
				 if (this.$refs[addForm]!==undefined) {
				     this.$refs[addForm].resetFields();
				 }
	    },
	    addSure(){//点击新增页面中的确定按钮
	    	var that=this;
	    	var obj={
	    		"channelNo":"1",
		 			"transCode":"SETSYSLEG000",
	    		"legalPersonNum":this.addForm.legalPersonNum_add,
	    		"legalPersonName":this.addForm.legalPersonName_add,
	    		"judicialPersonName":this.addForm.judicialPersonName_add,
	    		"cardType":this.addForm.cardType_add,
	    		"cardNo":this.addForm.cardNo_add,
	    		"legalPersonMobile":this.addForm.legalPersonMobile_add,
	    		"legalPersonTel":this.addForm.legalPersonTel_add,
	    		"legalPersonEmail":this.addForm.legalPersonEmail_add,
	    		"effectiveFlag":this.addForm.effectiveFlag_add,
	    	}
	    	console.log(obj)
	    	this.$post(this.$api,obj)
	    	.then(function(res){
	    		console.log(res)
	    		that.dialogFormVisible=false;
	    		that.allSearch()
	    	})
	    },
	    editItem(row){//点击编辑按钮
	    	console.log(row)
	    	this.dialogFormVisible=true;
	    	this.addForm.legalPersonNum_add=row.legalPersonNum
	    	this.addForm.legalPersonName_add=row.legalPersonName
	    	this.addForm.judicialPersonName_add=row.judicialPersonName
	    	this.addForm.cardType_add=row.cardType
	    	this.addForm.cardNo_add=row.cardNo
	    	this.addForm.legalPersonMobile_add=row.legalPersonMobile
	    	this.addForm.legalPersonTel_add=row.legalPersonTel
	    	this.addForm.legalPersonEmail_add=row.legalPersonEmail
	    	this.addForm.effectiveFlag_add=row.effectiveFlag
	    	this.addForm.flag1=true;
	    	this.addForm.edit=true;
	    },
	    editSure(){//点击编辑中的确定按钮
	    	var that=this
	    	var obj = {
			 		"channelNo":"1",
			 		"transCode":"SETSYSLEG200",
			 		"legalPersonNum":this.addForm.legalPersonNum_add,
					"legalPersonName":this.addForm.legalPersonName_add,
					"judicialPersonName":this.addForm.judicialPersonName_add,
					"cardType":this.addForm.cardType_add,
					"cardNo":this.addForm.cardNo_add,
					"effectiveFlag":this.addForm.effectiveFlag_add,
					"legalPersonEmail":this.addForm.legalPersonEmail_add,
					"legalPersonMobile":this.addForm.legalPersonMobile_add,
					"legalPersonTel":this.addForm.legalPersonTel_add
				}
	    	this.$post(this.$api,obj)
	    	.then(function(res){
	    		console.log(res)
	    		if(res.returnMsg=="OK"){
	    			that.allSearch()
	    			that.dialogFormVisible=false
	    		}else{
	    			alert(res.returnMsg)
	    		}
	    		
	    	})
	    },
	    deleteItem(row){//点击删除按钮
	    	console.log(row)
	    	var that=this;
	    	var obj={
	    		"channelNo":"1",
		 			"transCode":"SETSYSLEG100",
		 			"legalPersonNum":row.legalPersonNum
	    	}
	    	this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
       }).then(() => {
					this.$axios.post(this.$api,obj)
		    	.then(function(res){
		    		console.log(res)
		    		that.allSearch()
		    	})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
	    	
	    	
	    },
	  	handleSizeChange(size){//pageSize改变时触发
	  		console.log(size)
	  		this.pageSize=size;
	  		this.getData();
	  	},
	  	handleCurrentChange(pageIndex){//currentPage改变时触发
	  		console.log(this.indexNo)
	  		this.indexNo=pageIndex-1;
	  		console.log(this.indexNo)
	  		this.getData();
	  	},
  }
}
</script>

<style scoped lang='scss'></style>
