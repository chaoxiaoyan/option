<template>
	<div class="main_index">
		<v-header></v-header>
		<div class="leftNav" :class="navState?'active':''">
			
			<div class="leftNavMain">
				<v-left-nav></v-left-nav>
				<div class="leftNavBottom"></div>
				<span @click="closeLeftNav()" :class="navState?'active':''">
					<i class="iconfont" :class="navState?'icon-left1':'icon-right '"></i>
				</span>
			</div>
		</div>
		<div class="main" :class="navState?'':'active'">
			<div class="main_content">
				<transition name="move" mode="out-in"> 
					<router-view></router-view>
				</transition>
			</div>
		</div>
	</div>		
</template>

<script>
	import vHeader from './Header.vue'
	import vLeftNav from './LeftNav.vue'
	export default {
		name: 'MainIndex',
		data () {
			return {
				navState:true,
			}
		},
		components:{
			vHeader,vLeftNav
		},
		methods:{
			closeLeftNav(){
				this.navState=!this.navState;			
			}
		}
	}
</script>

<style scoped lang='scss'>
.leftNav{width:250px; height:100%;
position:fixed; top:100px; left:-250px; background:olive; box-sizing:border-box;
z-index:2;
	.leftNavBottom{width:100%; height:100px; background:none;}
	.leftNavMain{height:100%; background:#fff; overflow-y:auto;}
}
.leftNav.active{left:0}
.leftNav span{ 
	width:10px;
	height:80px; 
	background: $deep-color;
	@include radius(0 30px 30px 0);
	position: absolute;
	left:250px; 
	top:40%; 
	margin-top: -40px;
	font-size:40px; 
	cursor: pointer;
	color:#fff;
	z-index: 1000;
	i{
		margin-left: -4px;
	}
}
.main{  
	box-sizing:border-box;
	width:100%;
	height:auto;
	padding-top:100px;
	padding-left:260px;
	background: #f5f5f5;
}
.main.active{
	position: absolute;
	padding-left:0;
	
}
.main_content{ 
	box-sizing:border-box; 
	padding:15px; 
}	
</style>