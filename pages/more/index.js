// pages/nowplay/index.js
import { getNowMovie, nextPlay } from '../../apis/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
      title:'',
      flag:false,
      isNow:0
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //正在热映
  nowPlay(res){
      console.log(res.ms)
      this.setData({
        list:res.ms
      })
    res.ms.forEach((item, index) => {
      // console.log(typeof (item.image) )
      if (item.img == '') {
        console.log(that.data.list)
        this.data.list[index].img = 'https://i.loli.net/2019/11/26/kT9IHbmNMVsf3EP.jpg'
        this.setData({
          list: this.data.list
        })
        // item = 
      }
    })
  },
  //即将热映
  nextPlay(res){
    console.log(res.moviecomings)
    var that = this
    this.setData({
      list: res.moviecomings
    })
    res.moviecomings.forEach((item, index) => {
      // console.log(typeof (item.image) )
      if (item.image == '') {
        console.log(that.data.list)
        this.data.list[index].image = 'https://i.loli.net/2019/11/26/kT9IHbmNMVsf3EP.jpg'
         this.setData({
           list:this.data.list
         })
        // item = 
      }
    })
  },
  onLoad: function (options) {
      console.log(options.id)
      if(options.id === '0'){
         getNowMovie(this.nowPlay)
         this.setData({
           title:'正在热映',
           flag:true,
           isNow:0
         })
      }
      if(options.id === '1'){
        nextPlay(this.nextPlay)
        this.setData({
          title:'即将上映',
          flag:false,
          isNow: 1
        })
      }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //影片详情
  goDetail(e){
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id //即将
    var movieid = e.currentTarget.dataset.movieid //正在
    console.log(id,movieid)
    if (this.data.isNow === 0){
        wx.navigateTo({
          url: '/pages/detail/detail?id=' + movieid,
      })
    } else if (this.data.isNow === 1){
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + id,
      })
    }else{
       return
    }
  }
})