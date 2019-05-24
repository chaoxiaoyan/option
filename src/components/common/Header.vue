<template>
		<el-row class="header">
		  	<el-col :span="6" class="h_left">
		  		<div class="grid-content bg-purple">
		  			<img src="../../assets/images/logo1.png">
		  		</div>
		  	</el-col>
		  	<el-col :span="14" class="h_center">
		  		<div class="grid-content bg-purple-light color">
					<ul>
						<li v-for="(item,index) of nav"  :key="index" >
							<router-link 	:to="item.path"
											:class="item.path===$route.path ?'current':' '">
											<i class="iconfont" :class="item.icon"></i> 
											{{item.title}}
							</router-link >
						</li>
					</ul>
		  		</div>
		  	</el-col>
		  	<el-col :span="4" class="h_right">
		  		<div class="grid-content bg-purple" @click="outLogin()">
					<span class="iconfont icon-UserSettings"> 退出</span>  
		  		</div>
		  	</el-col>
		</el-row>
</template>

<script>
import { debug } from 'util';
export default{
	data(){
		return{
			nav:[
				{id:1,title:'工作台',icon:'icon-home',path:'/'},
				{id:2,title:'产品中心',icon:'icon-chanpin',path:'/MainIndex/productInstManage'},
				{id:3,title:'权限管理',icon:'icon-quanxian--xiantiao',path:'/MainIndex/legalPerson'},
				{id:4,title:'系统管理',icon:'icon-yanjizhushou-shangchuan_xitong',path:'/MainIndex/fun'}
			]
		}
	},
	mounted(){
		// this.initFirstNav();
	},
	methods:{
		//登出
		outLogin(){
			this.$store.commit('removeToken')
			this.$router.push('/login');
		},
		//初始化一级导航

		// initFirstNav(){
		// 	this.nav = this.$store.state.firstnav;
		// }	
	}
}
</script>

<style scoped lang='scss'>
.header{width:100%; box-sizing:border-box; padding:0 15px; height:90px; background:#fff; position:fixed;left:0; top:0; 
	@include shadow(0,0,10px,#ccc);
	z-index:999;
}
.h_left{align-content: center; position:relative;height: 100%;}
.h_left img{ width:70%; margin:auto 0; position: absolute; left:0; top:0; right:0; bottom:0;}
.h_center ul{
	margin-top: 30px;
	float: right;
}
.h_center ul li{
    width: 110px;
    float: left;
    margin-right: 2px;
}
.h_center ul li a.current{
    background-color: $deep-color;
    color: #fff;
}
.h_center ul li a{
    -webkit-border-radius: 5px 5px 0 0;
    -moz-border-radius: 5px 5px 0 0;
	border-radius: 5px 5px 0 0;
    background-color: #efefef;
    text-align: center;
    display: block;
    padding: 4px 0 2px;
    text-transform: uppercase;
    color: #666666;
	font-size: 14px;
	&:hover{
		 background-color: $deep-color;
		 color: #fff;
	}
}
.h_center ul li a i{
    display: block;
    font-size: 22px;
}

.h_right{
	text-align: center;
	line-height:90px; 
	span{
		color:$deep-color;	
		cursor: pointer;
	}
}
</style>