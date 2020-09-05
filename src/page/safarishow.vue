<template>
    <div class="safarishowTipdailog">
        <div style="color:#fff;"> ccb</div>
    </div>
</template>
<script>
import{getChannge} from '@/common/js/common.js'
export default {
  name: "safarishow",
  data() {
    return {
    };
  },
  created() {
  },
  mounted(){
    let ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        // 微信内
        return 
    }else{
        // 2.2微信外
        window.location.href = decodeURIComponent((getChannge('ccbPayResUrl')))
    }
  },
  methods: {
  }
};
</script>