<template>
<div class="loadhome" >
    <div class="loadMsgDiv">
        <div class="loadStatus">
            <span class="loadPic"></span>
            <p>正在支付中，请耐心等待</p>
        </div>
    </div>
</div>

</template>
<script>
import { Toast } from "mint-ui";
let Base64 = require('js-base64').Base64;
export default {
    name:'loadhome',
    data() {
        return {
           countdown:10,
        }
    },

    components:{

    },
    created() {
        this.settime();
        this.doPay(this.getChannge("payOrderId"));  
    },
    methods: {
        // 支付
        doPay: function(orderId){
            this.axios({
                method: 'post',
                url: '/aggregatePay/result/query',
                headers:{'Content-Type':'application/json'},
                data: orderId
            })
            .then(res => {
                
                if(res.data.code == "200"){
                    Toast({
                        message: res.data.msg
                    });
                } else {
                    if(res.data.result!=null){
                        if(res.data.result.result == 'success'){
                            window.location.href = res.data.result.url+"&reservOrderId="+res.data.result.orderId+'&payStatus='+String(res.data.result.result)+"&channel="+Base64.decode(this.getChannge('channel'))
                        }else{
                            window.location.href = res.data.result.url+"&reservOrderId="+res.data.result.orderId+'&payStatus='+String(res.data.result.result)+'&paybackurl='+$cookies.get('PAYORDERBACKURL')+"&channel="+Base64.decode(this.getChannge('channel'))
                        }
                        

                    } else {
                        if(this.countdown>0){
                            this.doPay(orderId);
                        }
                    }
                   
                }
            })
        },
        // 获取url参数
        getChannge: function(name){
            return decodeURIComponent(
            (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
        },
        // 倒计时 10秒
        settime: function () {
            setInterval(() => {
                this.countdown--
            }, 1000)
        },
    },
}
</script>