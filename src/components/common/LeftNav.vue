<template>
	<div class="left_nav"  v-show="this.$store.state.showleftNav">
					<el-menu
						default-active="/mainindex/productInstManage"
						class="el-menu-vertical-demo"
						active-text-color="#5bc0de"
						v-if="this.$route.path=='/MainIndex/productInstManage'"
						router
						>
						<el-submenu index="1" >
							<template slot="title">
								<i class="el-icon-location"></i>
								<span>信用卡</span>
							</template>
							<el-menu-item-group>
									<el-menu-item index="/mainindex/productInstManage">分期产品管理</el-menu-item>
									<el-menu-item index="1-2">信用卡产品管理</el-menu-item>
									<el-menu-item index="1-3">产品授额管理</el-menu-item>
							</el-menu-item-group>
						</el-submenu>


						<el-submenu  index="2">
							<template slot="title">
								<i class="el-icon-menu"></i>
								<span>消费贷</span>
							</template>
							<el-menu-item-group>
									<el-menu-item index="2-1">记账日期管理</el-menu-item>
									<el-menu-item index="2-2">基准利率管理</el-menu-item>
									<el-menu-item index="2-2">还款方式管理</el-menu-item>
									<el-menu-item index="2-2">消贷产品管理</el-menu-item>
									<el-menu-item index="2-2">组件库管理</el-menu-item>
									<el-menu-item index="2-2">费用管理</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-submenu  index="3">
							<template slot="title">
								<i class="el-icon-setting"></i>
								<span>通用设置</span>
							</template>
							<el-menu-item-group>
									<el-menu-item index="3-1">电话核查模板管理</el-menu-item>
									<el-menu-item index="3-2">短信模板管理</el-menu-item>
									<el-menu-item index="3-3">表单定制</el-menu-item>
									<el-menu-item index="3-4">参数管理</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
					
					</el-menu>

					<div>
							<el-menu
									default-active="/MainIndex/legalPerson"
									class="el-menu-vertical-demo"
									active-text-color="#5bc0de"
									router
									>
								  <el-menu-item index="/MainIndex/legalPerson">
										<i class="el-icon-menu"></i>
										<span slot="title">法人管理</span>
									</el-menu-item>
									<el-menu-item index="2">
										<i class="el-icon-menu"></i>
										<span slot="title">岗位管理</span>
									</el-menu-item>
									<el-menu-item index="3">
										<i class="el-icon-setting"></i>
										<span slot="title">菜单管理</span>
									</el-menu-item>
									<el-menu-item index="/MainIndex/user">
										<i class="el-icon-setting"></i>
										<span slot="title">用户管理</span>
									</el-menu-item>
										<el-menu-item index="/MainIndex/organization">
										<i class="el-icon-setting" ></i>
										<span slot="title">机构管理</span>
									</el-menu-item>
							</el-menu>
					</div>

					<div v-if="this.$route.path=='/MainIndex/fun'">
								<el-menu
									default-active="/MainIndex/legalPerson"
									class="el-menu-vertical-demo"
									active-text-color="#5bc0de"
									router
									>
								  <el-menu-item index="/MainIndex/legalPerson">
										<i class="el-icon-menu"></i>
										<span slot="title">功能管理</span>
									</el-menu-item>
									<el-menu-item index="2">
										<i class="el-icon-menu"></i>
										<span slot="title">子系统管理</span>
									</el-menu-item>
							</el-menu>
					</div>

	</div>
</template>

<script>
	export default {
    name:'LeftNav',
		data(){
			return{
				productInstManage:[],
				legalPerson:[],
				fun:[],
			}
		},
		mounted(){
			this.initLeftNav();
		},
		methods:{
			//初始化左侧菜单
			initLeftNav(){
				let navDate = this.$store.state.firstnav;
				console.log('lilingling');
				navDate.forEach(element => {
						if(element.funName == "权限管理"){
								this.legalPerson = element.list;
								console.log(this.legalPerson )
						}
				});
			}	
		}
	}
</script>

<style scoped="scoped" lang="scss">
.el-menu{
   border-right: none;
} 
</style>