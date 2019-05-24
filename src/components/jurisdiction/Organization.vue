<template>
  <!-- 机构管理 -->
   <div class="content_box">
		<!-- 面包屑 -->
      <div class="crumb_module">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item >权限管理</el-breadcrumb-item>
            <el-breadcrumb-item class="active" >机构管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="organ_main">
          <div class="organ_left fl">
            
          </div>
          <div class="organ_right fr">

          </div>
      </div>

    </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  created(){
  },
  mounted(){
    
  },
  methods:{
    init(){
        this.$store.commit('isShowleftNav',false)
    }
  }
}
</script>

<style scoped lang='scss'>

.organ_main{
  background: #fff;
  .organ_left{
    width: 20%;
  }
  .organ_right{
    width: 79%;
  }
}
</style>
