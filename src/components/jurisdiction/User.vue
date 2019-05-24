<template>
<!-- 用户管理 -->
  <div class="content_box">
		<!-- 面包屑 -->
    <div class="crumb_module">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  	<el-breadcrumb-item >权限管理</el-breadcrumb-item>
			  	<el-breadcrumb-item class="active" >用户管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<!-- 编辑模块(搜索新增查询) -->
    <div class="edit_module">
      <el-form  ref="form"  :model="form"  label-width="100px">
        <el-row class="edit_module_search">
          <el-col :span="10">
							<el-form-item :label="$t('user.Login_account')"> <!-- 登录账号 -->
								<el-input
									:placeholder="$t('user.Please_enter_login_account')"
									v-model="form.ser">
								</el-input><!-- 请输入登录账号 -->
							</el-form-item>
          </el-col>
          <el-col :span="14">
			  		<div class="edit_module_btn">
			  			<el-button type="primary" icon="el-icon-plus" >{{$t("Add")}}</el-button>  <!-- 新增 -->
			  			<el-button type="danger" icon="el-icon-search" >{{$t("Query")}}</el-button> <!-- 查询 -->
			  		</div>
			  	</el-col>
        </el-row>  
      </el-form>
    </div>

		<!-- 列表模块 -->
    <div class="list_module">
	    	<div class="table_body">	
					<h4>{{$t("user.User_list")}}</h4>
					<el-table :data="tableData" border style="width: 100%" stripe  size='small'>
							<el-table-column align="center" type="selection" width="55"> 	</el-table-column>

							<el-table-column prop="index" type="index"  :label='$t("Serial_number")' align="center" width="60px"></el-table-column><!--序号  -->

							<el-table-column prop="loginId" :label='$t("user.Login_account")'  align="center"> </el-table-column><!-- 登录账号 -->

							<!-- <el-table-column prop="userLocale" :label='$t("user.User_codes")'  align="center"> </el-table-column>  -->
							<!--用户代码  -->

							<el-table-column prop="cartTypeVal" :label='$t("user.Credentials_type")'   align="center" width="120px"> </el-table-column><!--证件类型  -->

							<el-table-column prop="cartNum" :label='$t("user.Identification_Number")'  align="center"> </el-table-column><!-- 证件号码 -->

							<el-table-column prop="employeePhone" :label='$t("user.Contact_number")' align="center"  width="140px"> </el-table-column><!--联系电话  -->

							<!-- <el-table-column prop="employeePhone" :label='$t("user.System_coding")' align="center"  width="140px"> </el-table-column> -->
							<!--系统编码  -->

							<el-table-column prop="branchName" :label='$t("user.Affiliate")' align="center"  width="180px"> </el-table-column><!--所属机构  -->

							<!-- <el-table-column prop="branchName" :label='$t("user.Mechanism_coding")' align="center"  width="180px"> </el-table-column> -->
							<!--机构编码  -->
 
 							<el-table-column  :label='$t("Operation")' align="center" width="180px">  <!-- 操作 -->
								<template slot-scope="scope">
										<el-button size="mini" >
											<span>{{$t("user.Editorial_post")}}</span>
										</el-button>
										<el-button size="mini" class="edit-btn" @click="editItem(scope.row)">
											<i class="el-icon-edit"></i>
											<span class="text">{{$t("Edit")}}</span>
										</el-button>
										<el-button size="mini" type="danger" class="delete-btn" @click="deleteItem(scope.row)">
											<i class="el-icon-delete"></i>
											<span class="text">{{$t("Delete")}}</span>
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
  </div>
</template>

<script>
export default {
  data () {
    return {
			hide:false,
			form:{  //编辑模块
				user:''
			},
			tableData:[{
						loginId: '王小虎',
						cartTypeVal:'身份证',
						cartNum:'111000198501010101',
						employeePhone:'11111111111',
						branchName:'平安一账通',
					}, {
						loginId: '王小虎',
						cartTypeVal:'身份证',
						cartNum:'111000198501010101',
						employeePhone:'11111111111',
						branchName:'平安一账通',
          }, {
           loginId: '王小虎',
						cartTypeVal:'身份证',
						cartNum:'111000198501010101',
						employeePhone:'11111111111',
						branchName:'平安一账通',
          }, {
           loginId: '王小虎',
						cartTypeVal:'身份证',
						cartNum:'111000198501010101',
						employeePhone:'11111111111',
						branchName:'平安一账通',
          }, {
            loginId: '王小虎',
						cartTypeVal:'身份证',
						cartNum:'111000198501010101',
						employeePhone:'11111111111',
						branchName:'平安一账通',
          }, {
            loginId: '王小虎',
						cartTypeVal:'身份证',
						cartNum:'111000198501010101',
						employeePhone:'11111111111',
						branchName:'平安一账通',
			}],

			pageSize:10,//一页显示几条数据
			currentPage:1,//当前显示第几页 1开头
      indexNo:'',//当前显示第几页
			totalCount:10,//一共有多少条数据
    }
  },
  mounted(){
		this.initUserData(); // 初始化页面数据
  },
  methods:{
			// 初始化页面数据
			initUserData(){
					let userData = this.$store.state.loginInfo;
			},
			handleSizeChange(size) {
				this.pageSize = size;

			},
			handleCurrentChange(pageIndex) {
	  		this.indexNo = pageIndex-1;
	  		// this.getData();
			}
  }
}
</script>

<style scoped lang='scss'></style>
