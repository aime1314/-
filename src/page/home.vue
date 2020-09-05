<template>
<div class="payhome" >
    <div class="buyMsgBox">
        <div class="buyTime">
            <i style="display:none">支付剩余时间 {{min}}:{{sec}}</i>
            <i>支付金额</i>
            <i></i>
        </div>
        <div class="buyMoney">
            <span>¥</span>{{money}}
        </div>
        </div>
        <div class="buyBank">
        请选择支付方式
        </div>
        <div class="banklistBox" style="margin-top: 0" v-if="stagesFlage">
            <div class="paytypeName" :class="selectpaytype=='card'?'currontype':''" @click="currontypeFun('card')">
               <div class="paytitle">
                    极融卡支付
                    <div class="paytypeTip">极融额度可用50,000.00元</div>
               </div>
               <div><em>&nbsp;</em></div>
            </div>
            <div v-if="selectpaytype=='card'">
                <div class="paytypeMsgBox">
                    <div class="paytitle">费率</div>
                    <div class="payselctMore">综合费用9折</div>
                </div>
                <div class="paytypeMsgBox">
                    <div class="paytitle">分期</div>
                    <div class="payselctMore">0首付</div>
                </div>
                <div class="paystagListBox">
                    <div class="stagList" :class="stagecurron == 1 ?'curron':''" @click="stagecurronFun(1)">
                        ¥12.32<span>x</span>3期
                        <div class="stagTip">含服务费 ¥2.78/期</div>
                    </div>
                    <div class="stagList" :class="stagecurron == 2 ?'curron':''" @click="stagecurronFun(2)">
                        ¥22.32<span>x</span>6期
                        <div class="stagTip">含服务费 ¥4.78/期</div>
                    </div>
                    <div class="stagList" :class="stagecurron == 3 ?'curron':''" @click="stagecurronFun(3)">
                        ¥32.32<span>x</span>12期
                        <div class="stagTip">含服务费 ¥6.78/期</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="banklistBox"  :style="{marginTop:(stagesFlage?'.3rem':'')}">
        <ul>
            <li v-for="(item, index) in paytype" v-on:click="selsect(index,$event)" v-bind:class="{'curron':index == current}">
            <div><span :class=""><img :src='item.logo'></span>{{item.name}}</div><div><em>&nbsp;</em></div>
            </li>
        </ul>
        </div>
        <div class="buybuttonBox">
        <div class="indexBtn" :class="{disable:!payStatus}" @click="gopay">
            {{paybtnTitle}}
        </div>
        </div>

    <div class="dailogDiv" v-if="dailogflag">
        <div class="dailogmsgbox">
        <div class="dailogTitle">支付确认</div>
        <div class="dailogMsgShow">
            <p>1、请在微信内完成支付，如果你已支付成功，请点击“已完成支付"</p>
            <p>2、如果您还未安装微信6.0.2及以上版本客户端，请点击“取消”并点击其他支付方式</p>
        </div>
        <div class="payBtnbox">
            <div @click="payOrderCancel">取消</div>
            <div @click="payOrderSuc">完成支付</div>
        </div>
        </div>
    </div>
    
</div>

</template>
<script>
import { Toast } from "mint-ui";
import wx from 'weixin-js-sdk'
import{getChannge,WXbodyBottomshow} from '@/common/js/common.js'
let Base64 = require('js-base64').Base64;
export default {
    name:'payhome',
    data() {
        return {
        title: "确认支付",
        money:"-",
        current: 0,
        kelefu_type:"",
        payImgflag:true,
        payStatus:true,
        timeStatus:true,
        orderExpireTime:"-",//结束时间
        dailogflag:false,
        paysuccUrl:'/mygift',//回调中转页
        paytype:[],//支付方式
        endtime:'2019/09/10 23:59:59',
        day: "0",
        hr: "0",
        min: "0",
        sec: "0",
        headFlag:false,
        payChannelId:"-",//支付渠道名称
        channel:'',//渠道
        orderId:"-",//订单号
        merchantId:'',//商户号
        terminal:'WECHAT_WAP',//终端来源
        paramsOld:'',
        params:'',//支付签名参数
        payOrderId:'',//支付单号,
        domainname: location.host.split(".")[1]+"."+location.host.split(".")[2], //一级域名
        paybtnflage:true,
        auth_time:'',
        stagecurron:'', //分期
        selectpaytype:'', //极融卡支付
        paybtnTitle:'立即支付',
        stagesFlage:false
        }
    },

    components:{

    },
    created() {
        // this.countdown()
        if(WXbodyBottomshow()){
            this.terminal = 'WECHAT_SUB'
        }
        if(getChannge('h5')){
            this.dailogflag = true
        }
        if(getChannge('stages') == 'show'){
            this.stagesFlage = true
        }else{
            this.stagesFlage = false
        }
        if(getChannge('backurl')){
            localStorage.setItem('thirdbackgurl',window.location.href.split('backurl=')[1])
            this.$store.commit('getBackUrl',window.location.href.split('backurl=')[1])
            $cookies.set('THIRDBACKURL', window.location.href.split('backurl=')[1],'','/', this.domainname);
        }else{
            // localStorage.removeItem('thirdbackgurl')
            $cookies.remove('THIRDBACKURL')
        }
        this.channel = Base64.decode(getChannge('channel'))  //渠道
        this.paramsOld = decodeURIComponent(Base64.decode(getChannge('params')))
        this.params = eval('(' + this.paramsOld + ')');   //支付签名参数
        console.log(this.params)
        this.money = this.params['amount'].toFixed(2)
        this.findpaychannle(this.params['merchantId'])
        
    },
    methods: {
        findpaychannle:function(bussinessId){
            this.axios.post("/aggregatePay/Merchant/querySupportPayChannel",{channel: this.channel, merchantId: bussinessId, terminal: ["WAP",this.terminal]})
            .then(res => {
                if (res.data.code == 100) {
                    this.paytype = res.data.result
                    this.payChannelId = this.paytype[this.current]['payChannelId']
                } else {
                    Toast({ message:res.data.msg});
                }
            })
            .catch(error => {
            console.log(error);
            });
        },
        selsect: function (index, $event) {
            this.current = index
            this.selectpaytype = 'none'
            this.paybtnTitle = '立即支付'
            this.payStatus = true
            this.payChannelId = this.paytype[this.current]['payChannelId']
        },

        gopay:function(){
            if(this.paybtnflage){
                // this.getAuthCode()
                if(this.selectpaytype == 'card'){
                   Toast({ message:'正在处理中，请耐心等待'}); 
                }else{
                    this.axios.post("/aggregatePay/pay/order",{params:this.paramsOld,payChannelId:this.payChannelId})
                        .then(res => {
                            if (res.data.code == 100) {                   
                                //上海银行
                                if(res.data.result.payChannel == 'SH_BANK'){
                                    this.$router.push({name: "orderform", params: {reservOrderId: this.params['orderId'],}});
                                //建设银行      
                                }else if(res.data.result.payChannel == 'CCB_MOBILE'){
                                if(WXbodyBottomshow()){//微信内
                                        window.location.href = 'safarishow?channel='+ Base64.encode(this.channel) +'&ccbPayResUrl='+encodeURIComponent(this.encodeSearchKey(res.data.result.ccbPayRes.url))
                                    }else{
                                        window.location.href= res.data.result.ccbPayRes.url
                                    } 
                                    //微信H5支付
                                }else if(res.data.result.payChannel == 'WX_MWEB'){
                                    $cookies.set('PAYORDERID', res.data.result.payOrderId);
                                    $cookies.set('PAYORDERBACKURL', encodeURIComponent(this.encodeSearchKey(window.location.href)));
                                    window.location.href=res.data.result.wxPayRes.mwebUrl+"&redirect_url="+ encodeURIComponent(window.location.href+'&h5=h5')
                                    //微信公众号支付
                                }else if(res.data.result.payChannel == 'WX_JSAPI'){
                                    //微信支付返回跳转地址
                                    this.onBridgeReady(res.data.result.wxPayRes,'/load?channel='+ Base64.encode(this.channel) +'&payOrderId='+res.data.result.payOrderId);
                                    //微信支付监听
                                    if (typeof WeixinJSBridge == "undefined"){
                                    if( document.addEventListener ){
                                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                                    }else if (document.attachEvent){
                                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                                    }
                                    }else{
                                        this.onBridgeReady()
                                    }
                                }else if(res.data.result.payChannel == 'ALIPAY_WAP'){
                                    //支付宝支付
                                    Toast({ message:'小二还在路上，莫急'});
                                }else if(res.data.result.payChannel == 'ICBC_MOBILE'){
                                    //工行支付
                                    Toast({ message:'系统正在对接中'});
                                }else if(res.data.result.payChannel == 'KLT_WAP'){
                                    //开联通支付
                                    if(res.data.result.kltPayRes.result == 'success'){
                                        window.location.href=process.env.BOOKING_ROOT+'/percenter/myorder/all'
                                    }else{
                                        Toast({ message:res.data.result.kltPayRes.result});
                                    }
                                }
                            } else {
                                Toast({ message:res.data.msg});
                            }
                        })
                        .catch(error => {
                        console.log(error);
                        });
                }
            }else{
                
            }
            
        },

        //分期
        stagecurronFun(id){
            this.stagecurron = id
        },
        currontypeFun(item){
            this.selectpaytype = item
            this.current = 'none'
            this.paybtnTitle = '提交分期订单'
        },

        //倒计时 
        getAuthCode: function () {
             this.auth_time = 30
                var auth_timetimer = setInterval(() => {
                this.auth_time--
                if (this.auth_time <= 0) {
                this.paybtnflage = true;
                clearInterval(auth_timetimer);
                }else{
                    this.paybtnflage = false
                    clearInterval(auth_timetimer);
                }
            }, 1000)
            
        },
        
        onBridgeReady: function (event,url){
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                "appId": process.env.WECHAT_JSAPI,     //公众号名称，测试：wxa6718ad0b10bf642    生产：wx3bd94d3a0ee86c01    
                "timeStamp": event.timestamp,         //时间戳，自1970年以来的秒数     
                "nonceStr": event.nonceStr, //随机串     
                "package": event.package0,     
                "signType": event.signType,         //微信签名方式：     
                "paySign":event.paySign //微信签名 
                },
                function(res){
                if(res.err_msg == "get_brand_wcpay_request:ok" ){
                    // 使用以上方式判断前端返回,微信团队郑重提示：
                    //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    window.location.href = url
                } 
            }); 
        },
        payOrderSuc:function(){
            console.log(this.payOrderId)
            window.location.href = '/load?channel='+ Base64.encode(this.channel) +'&payOrderId='+ $cookies.get('PAYORDERID')
        },
        payOrderCancel:function(){
            this.dailogflag = false
        },
        countdown: function () {
            var end = Date.parse(this.formateDate(new Date(this.endtime)))
            var now = Date.parse(this.formateDate(new Date()))
            var msec = end - now
            var day = parseInt(msec / 1000 / 60 / 60 / 24)
            var hr = parseInt(msec / 1000 / 60 / 60 % 24)
            var min = parseInt(msec / 1000 / 60 % 60)
            var sec = parseInt(msec / 1000 % 60)
            if(msec < 0){
            this.timeStatus = false
            this.$router.push({name:'/about'})
            }else{
            this.day = day
            this.hr = hr > 9 ? hr : '0' + hr
            this.min = min > 9 ? min : '0' + min
            this.sec = sec > 9 ? sec : '0' + sec
            var that = this
            setTimeout(function () {
                that.countdown()
            }, 1000)
            }
        
      },

        encodeSearchKey(key) {
            const encodeArr = [{
            code: '%',
            encode: '%25'
            }, {
            code: '?',
            encode: '%3F'
            }, {
            code: '#',
            encode: '%23'
            }, {
            code: '&',
            encode: '%26'
            }, {
            code: '=',
            encode: '%3D'
            }];
            return key.replace(/[%?#&=]/g, ($, index, str) => {
            for (const k of encodeArr) {
                if (k.code === $) {
                return k.encode;
                }
            }
            });
        },

        formateDate:function(date, format){
        if (!date) return;
			    if (!format) format = "yyyy/MM/dd HH:mm:ss";
			    switch (typeof date) {
			        case "string":
			            date = new Date(date.replace(/-/g, "/"));
			            break;
			        case "number":
			            date = new Date(date);
			            break;
			    }
			    if (!date instanceof Date) return;
			    var dict = {
			        "yyyy": date.getFullYear(),
			        "M": date.getMonth() + 1,
			        "d": date.getDate(),
			        "H": date.getHours(),
			        "m": date.getMinutes(),
			        "s": date.getSeconds(),
			        "MM": ("" + (date.getMonth() + 101)).substr(1),
			        "dd": ("" + (date.getDate() + 100)).substr(1),
			        "HH": ("" + (date.getHours() + 100)).substr(1),
			        "mm": ("" + (date.getMinutes() + 100)).substr(1),
			        "ss": ("" + (date.getSeconds() + 100)).substr(1)
			    };
			    return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
			        return dict[arguments[0]];
			    });

      }
    },
}
</script>
<style scoped>
    
</style>