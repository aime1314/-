    function getChannge(name){
        return decodeURIComponent(
            (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }

    function WXbodyBottomshow(){
        let ua = window.navigator.userAgent.toLowerCase()
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true
        }else{
            // 2.2微信外
            return false
        }
    }

export { //输出
    getChannge,
    WXbodyBottomshow
}   