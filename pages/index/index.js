//index.js
//获取应用实例
 const app = getApp()
import { getNowMovie } from '../../apis/api.js'
Page({
  data: {
    avatarUrl:'',
    nickname:'',
    city:''
  },
  callback(res){
    console.log(res)
  },
  onLoad: function () {
    //https://api.cat-shop.penkuoer.com/api/v2/proxy
    //https://api-m.mtime.cn/Showtime/LocationMovies.api?locationId=290
     getNowMovie(this.callback)
   
    wx.getSetting({
      success(res) {
        console.log(res.authSetting)
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
  }
})
