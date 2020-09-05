<template>
<div class="suchome" >
    <div class="resBox">
        <span class="sucspan">&nbsp;</span>
        <p class="suctip">支付成功
            <span>实付：<i>¥{{money}}</i></span>
        </p>
        
        <div class="oterlinkBox">
            <router-link to="" >继续行权</router-link>
            <router-link to="" >查看详情</router-link>
        </div>
    </div>
    <div class="othercoupon">
            <div class="recommendTitle">
                <span>&nbsp;</span>恭喜获得<span>&nbsp;</span>
            </div>
            <ul class="couponlistDiv">
                <li>
                <div class="couponlistMsg">
                    <div >
                    <div class="couponlistShow">
                        <p class="couponlist_Name">5折咖啡券</p>
                        <p class="couponlist_Date">有效期: 2019/03/12-2019/03/18</p>
                    </div>
                    </div>
                    <div class="couponType"><div><i>5</i>折</div><span>最高减15元</span></div>
                </div>
                <div class="couponlistType">
                    <div>仅限咖啡券类商品</div>
                    <div class="prolink">查看可用商品</div>
                </div>
                </li>
            </ul>
        </div> 
        <div class="recommendBox">
            <div class="recommendTitle">
                <span>&nbsp;</span>猜你喜欢<span>&nbsp;</span>
            </div>
            <div class="recommendProBox">
                <div class="recommendProMsg">
                    <div class="recommendProImg">
                       <span></span>
                    </div>
                    <div class="recommendProName">
                    下午茶超值套餐—下午茶双人免费1次+两人…
                    </div>
                    <div class="recommendProPrice">
                         <span><i>¥</i>599</span><em>¥788</em>
                    </div>
                </div>
                <div class="recommendProMsg">
                    <div class="recommendProImg">
                         <span></span>
                    </div>
                     <div class="recommendProName">
                    下午茶超值套餐—下午茶双人免费1次+两人…
                    </div>
                    <div class="recommendProPrice">
                        <span><i>¥</i>599</span><em>¥788</em>
                    </div>
                </div>
                <div class="recommendProMsg">
                    <div class="recommendProImg">
                         <span></span>
                    </div>
                     <div class="recommendProName">
                    下午茶超值套餐—下午茶双人免费1次+两人…
                    </div>
                    <div class="recommendProPrice">
                        <span><i>¥</i>599</span><em>¥788</em>
                    </div>
                </div>
                <div class="recommendProMsg">
                    <div class="recommendProImg">
                         <span></span>
                    </div>
                     <div class="recommendProName">
                    下午茶超值套餐—下午茶双人免费1次+两人…
                    </div>
                    <div class="recommendProPrice">
                        <span><i>¥</i>599</span><em>¥788</em>
                    </div>
                </div> 

            </div>
        </div>
</div>

</template>
<script>
export default {
    name:'payhome',
    data() {
        return {
            money:'300.00'
        }
    },

    components:{

    },
    created() {

    },
    methods: {
    },
}
</script>