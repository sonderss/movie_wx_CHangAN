//index.js
//获取应用实例
 const app = getApp()
import { getNowMovie, nextPlay} from '../../apis/api.js'
Page({
  data: {
    avatarUrl:'',
    nickname:'',
    city:'',
    list:[],
    testlist:[],
    nextList:[]
  },
  callback(res){
    // console.log(res)
    var a = []
    var b = []
    res.ms.forEach((item,index)=>{
       if(index <3){
         a.push(item)
         this.setData({
           list: a
         })  
       }
      
    })
    
  },
  //即将上映
  nextPlayBack(res){
    // console.log(res.moviecomings)
    var nextList = []
    res.moviecomings.forEach((item,index)=>{
        if(index<3){
          nextList.push(item)
          this.setData({
            nextList: nextList
          })
        }
    })
  },
  onLoad: function () {
      getNowMovie(this.callback)
      //即将上映
      nextPlay(this.nextPlayBack)
     //正在热映
    wx.getSetting({
      success(res) {
        // console.log(res.authSetting)
        if(!res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo
              console.log('用户信息'+userInfo)
            },
            fail(err){
              console.log(JSON.stringify(err))
              if (err.errMsg == 'getUserInfo:fail scope unauthorized'){
                 wx.showModal({
                   title: '授权失败',
                   content: '为了更好的为您服务，请开启用户权限',                  success:()=>{
                       wx.authorize({
                         scope:'scope.userInfo',
                         success:res=>{
                           console.log(res)
                         },
                         fail:err=>{
                           console.log(err)
                         }
                       })
                   }
                 })
              }
            }
          })
        }
      },
      fail(err){
        console.log(err)
      }

    })
   
  },
  onGotUserInfo(e){
    console.log(e.detail.userInfo)
    var userInfo = e.detail.userInfo
    this.setData({
      avatarUrl: userInfo.avatarUrl,
      nickname:userInfo.nickName,
      city:userInfo.city
    })
  },
  goDetail(e){
    var id = e.currentTarget.dataset['index'];
    // console.log(id)
    wx.navigateTo({
      url: '../more/index?id='+id
    })
  },
  //影片详情
  goMovieDeatil(e){
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id='+id,
    })
  }
  
})
