export default {
    //获取渠道
    getChannel(state,data){
        state.channel = data
    },
    //获取返回第三方地址
    getBackUrl(state,data){
        state.backUrl = data   
    },
    //用户信息
    getUserInfo(state, data){
        state.userMsg = data
    },
}