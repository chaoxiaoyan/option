<template>
  <div class="login" id="login">
      <ul class="imgList">
          <li><img src="../../assets/images/login1.jpg"></li>
          <li><img src="../../assets/images/login2.jpg" ></li>
          <li><img src="../../assets/images/login3.jpg" ></li>
      </ul>
      <div class="page-container">
          <div class="middle">
              <h1><img src="../../assets/images/logo2.png"></h1>

              <div class="form" >
                  <span ref="errorMsg" class="errorMsg"></span>  
                  <select name="legalPersonNum" id="legalPersonNum"  v-model='user.legalPersonNum' type="text"  >
                      <option value="">{{$t("login.please_choose")}}</option>
                      <option :value="item.legalPersonNum" v-for="(item,index) in option" :key="index">{{item.legalPersonName}}</option>
                  </select>  
                  <input type="text"  v-model='user.loginId' class="username" :placeholder="$t('login.enter_username')">
                  <input type="password"  v-model='user.password'  class="password" :placeholder="$t('login.enter_password')" @keyup.enter="toLogin()">

                  <!-- <p class="forgetpass clearfix"><span class='error fl'>{{errorMsg}}</span> <a  class="fr" href="javascript:;">忘记密码</a></p>  -->

                  <button type="submit" @click.prevent="toLogin()">{{$t("login.login")}}</button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
        user:{
            legalPersonNum:'',
            loginId:'',
            password:''
        },
        option:[]
    }
  },
  mounted(){
    this.toggleBackground(); //切换背景
    this.initLegalPersonNum(); //初始化选择项
  },
  methods:{
    //切换背景图
    toggleBackground(){
        var $aLi=$(".imgList li");
        var num=0;
        var timer=null;
        funFade();
        funTime();
        function funFade(){
            $aLi.eq(num).fadeIn(2000).siblings().fadeOut()
        }
        function funTime(){
            timer=setInterval(function(){
                num++;
                num%=$aLi.length;
                funFade();
            },5000)
        }
    },
    //初始化选择项
    initLegalPersonNum(){
        let _this = this;
        var legelPersonData = {
            "channelNo": "1",
            "transCode": "SETSYSLEG300",
            "indexNo": 0,
            "pageSize": 10,
            "effectiveFlag": "1"
        };
        this.$post(this.$api,legelPersonData).then((res) => {
            if(res.returnMsg == "OK"){
                _this.option = res.rows;
            }
        })
    },
    //去登录
    toLogin(){
        if (!this.user.loginId || !this.user.password) {
            /*温馨提示*//*用户名和密码不能为空*/
            this.$message({
                message: i18n.t('login.login_error_message'),
                type: 'warning' 
            })
            return;
        }else{
            let _this = this;
            var LoginMsgData = {
                "channelNo": "1", 
                "transCode": "SETSYSLOGIN001", 
                "loginId": _this.user.loginId,
                "userPwd": _this.user.password, 
                "legalPersonNum": _this.user.legalPersonNum
            };
            this.$post(this.$loginApi,LoginMsgData).then((res) => {
                if(res.returnMsg == "OK"){
                    this.$store.commit('setToken',res.token);
                    this.$store.commit('setUser',res.userId);
                    this.$router.push('/')

                    this.$store.commit('saveUser',res)  //保存登录信息
                    

                    var pMenu = [],  //一级菜单
                        cMenu = [],
                        ccMenu = [],
                        cMenu_pick =[];
                    var isActive = false;
                    var myVar = false;
                    var rows = res.rows;
                    for (var i in rows) {
                        if (rows[i].parentFunId == "") {
                            pMenu.push(rows[i]);
                            isActive = true;
                            myVar = true;
                        } else {
                            cMenu.push(rows[i]);
                        }
                    }

                    this.$store.commit('setFirstNav',pMenu)  //一级菜单
                    console.log(this.$store.state.firstnav)

                    //二级菜单归父
                    for (var j = 0; j < pMenu.length; j++) {
                        pMenu[j].list = [];
                        pMenu[j].funUrl = "";
                        for (var n = 0; n < cMenu.length; n++) {
                            if (pMenu[j].funId == cMenu[n].parentFunId) {
                                pMenu[j].list.push(cMenu[n]);
                                //挑拣三级菜单s
                                cMenu_pick.concat(cMenu.splice(n, 1, 0))
                            }
                        }
                    };

                    //三级菜单归父
                    $(cMenu).each(function (i, item) {
                        if (item != 0) {
                            ccMenu.push(item);
                        }
                    });
                    $(pMenu).each(function (j, item1) {
                        $(item1.list).each(function (z, item2) {
                            item2.list = [];
                            $(ccMenu).each(function (i, item) {
                                if (item2.funId == item.parentFunId) {
                                    item2.list.push(item);
                                }
                            });
                        });
                    });



                }else{
                    this.$message({
                        message:i18n.t('login.login_error_tips'),
                        type: 'warning' 
                    })
                }
            })
           
        }
    }
  }
  
}
</script>

<style scoped lang="scss">
.imgList{
  position: absolute;
  width: 100%;
  height: 100%;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  img{
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
}
.imgList li{display: none;}

.page-container{
    text-align:  center;
    position: absolute;
    left: 50%;
    margin-left: -210px;
    top:120px;
    .middle {
        width: 420px;
        padding: 35px 0;
        height: 100%;
        background: rgba(255, 255, 255, .3);
        margin: 0 auto;
        
        h1 {
            font-size: 30px;
            font-weight: 700;
            text-shadow: 0 1px 4px rgba(0,0,0,.2);
            img{
              height:80px;
            }
        }
        .form{
            position: relative;
            margin: 15px auto 0 auto;
            text-align: center;
            select{
              option{
                height: 30px;
              }
            }
        }
    }
}
.forgetpass {
    padding: 0 35px;
    margin-top: 15px;
    a{
      color: #ef4300;
      text-decoration: none;
      font-size: 13px;
    }
    .error{
        color: #ef4300;
    }
}

input:-moz-placeholder { color: #fff; }
input:-ms-input-placeholder { color: #fff; }
input::-webkit-input-placeholder { color: #fff; }

input:focus {
    outline: none;
    -moz-box-shadow:
        0 2px 3px 0 rgba(0,0,0,.1) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    -webkit-box-shadow:
        0 2px 3px 0 rgba(0,0,0,.1) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    box-shadow:
        0 2px 3px 0 rgba(0,0,0,.1) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
}
input,select{
    box-sizing: border-box;
    width: 350px;
    height: 45px;
    margin-top: 20px;
    padding: 0 15px;
    background: #2d2d2d; /* browsers that don't support rgba */
    background: rgba(45,45,45,.15);
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    border: 1px solid #3d3d3d; /* browsers that don't support rgba */
    border: 1px solid rgba(255,255,255,.15);
    -moz-box-shadow: 0 2px 3px 0 rgba(0,0,0,.1) inset;
    -webkit-box-shadow: 0 2px 3px 0 rgba(0,0,0,.1) inset;
    box-shadow: 0 2px 3px 0 rgba(0,0,0,.1) inset;
    font-family: 'PT Sans', Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0,0,0,.1);
    -o-transition: all .2s;
    -moz-transition: all .2s;
    -webkit-transition: all .2s;
    -ms-transition: all .2s;
}
button {
    cursor: pointer;
    width: 350px;
    height: 44px;
    margin-top: 25px;
    background: #ef4300;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    border: 1px solid #ff730e;
    -moz-box-shadow:
        0 15px 30px 0 rgba(255,255,255,.25) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    -webkit-box-shadow:
        0 15px 30px 0 rgba(255,255,255,.25) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    box-shadow:
        0 15px 30px 0 rgba(255,255,255,.25) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    font-family: 'PT Sans', Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0,0,0,.1);
    -o-transition: all .2s;
    -moz-transition: all .2s;
    -webkit-transition: all .2s;
    -ms-transition: all .2s;
}

button:hover {
    -moz-box-shadow:
        0 15px 30px 0 rgba(255,255,255,.15) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    -webkit-box-shadow:
        0 15px 30px 0 rgba(255,255,255,.15) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    box-shadow:
        0 15px 30px 0 rgba(255,255,255,.15) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
}

button:active {
    -moz-box-shadow:
        0 15px 30px 0 rgba(255,255,255,.15) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    -webkit-box-shadow:
        0 15px 30px 0 rgba(255,255,255,.15) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    box-shadow:        
        0 5px 8px 0 rgba(0,0,0,.1) inset,
        0 1px 4px 0 rgba(0,0,0,.1);

    border: 0px solid #ef4300;
}
.errorMsg{
    display: block;
    width: 350px;
    margin: 0 auto;
    text-align: left;
    color: #f60;
}
</style>

