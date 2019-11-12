<template>
    <div class="sys-login">
        <div class="login-area">
            <div class="logo">
                <!-- <img src="@/assets/image/newlogo.png" alt=""> -->
                <img class="logo-w" src="@/assets/image/fn2-57.png" alt="">
                <img src="@/assets/image/logo-font.svg" alt="">
            </div>
            <div class="form-group">
                <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px">
                    <el-form-item prop="userName">
                        <el-input v-model="loginForm.userName" type="text" placeholder="请输入账号">
                            <i slot="prefix" class="el-input__icon fa fa-user"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" @keyup.enter.native="submitForm()"  type="password" placeholder="请输入密码">
                            <i slot="prefix" class="el-input__icon fa fa-lock"></i>
                        </el-input>
                    </el-form-item>
                    <p class="textR"></p>
                    <div class="btn-login" type="primary"   @click="submitForm()">登录</div>
                </el-form>
                <div v-if="sysMsg" class="err-msg">{{sysMsg}}</div>
            </div>
            <!-- <div class="tip">
                <p>{{$t('global.loginTip')}}</p>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loginForm: {
                userName: '',
                password: '',
                captcha: ''
            },
            loginRules: {
                name: [
                    {required: true, message: '', trigger: 'blur'}
                ],
                password :[
                    {required: true, message: '', trigger: 'blur'}
                ],
                captcha: [
                    {required: false, message: '', trigger: 'blur'}
                ]
            },
            sysMsg: ''
        }
    },
    created(){
        //键盘监听回车事件
        //方法1:@keyup.enter直接作用与elemen组件无法直接使用需改为@key.enter.native
        //方法2:var _this = this;
        // document.onkeydown = function(e) {
        //     var key = window.event.keyCode;
        //     if (key == 13) {
        //     _this.submitForm();
        //     };
        // }
    },
    beforeMount(){
        // 初始化错误信息。保证单独点击input时可以弹出正确的错误提示
    },
    
    methods:{
        submitForm(){
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    let resData = {
                        name:"张先生",
                        userAcount:'admin',
                        psd:'admin',
                        token:'1233dasdsa241dsa12ddsas123'
                    }
                    let _this = this
                        this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
                            _this.$store.dispatch('GenerateRoutes',resData).then((res)=>{
                                _this.$router.push({path:'/'}); //登录成功之后重定向到首页
                            }).catch(err=>{
                                
                            })
                        }).catch(err => {
                         this.$message.error(err); //登录失败提示错误
                    });
                } else {
                    return false
                }
            });
        }
    }
}
</script>


<style lang="scss" scoped>
.sys-login{
    width: 100%;
    height: 100%;
    background-image: linear-gradient(120deg, #a1C4FD 0%, #C2E9FB 100%);
}
.logo .logo-w{
    height:60px;
}
.logo img{
    height: 20px;
}
.login-area{
  width: 340px;
  height: atuo;
  border-radius: 5px;
  padding: 15px;
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 150px;
  margin: auto;
  
}
.logo{
    width: 100%;
    height: 80px;
    text-align: center;
    font-size: 18px;
    color: #333;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        height:40px;
        margin-right: 5px;
    }
}
.form-group{
  width: 100%;
  height: auto;
}
.btn-login{
  display: block;
  width: 100%;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: #a1C4FD;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  color: #fff;
}
</style>
