// pages/jxyping/jsyingping.js
import { getJXypDeatil } from '../../apis/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
   item:'',
   list:'',
   content:''
  },
  getDetail(res){
    console.log(res)
    this.setData({
      list:res.data
    })
    var context = this.data.list.content.replace(/\<img /gi,'<img style="max-width:100%;height:auto;display:block;"')
    this.setData({
      content: context
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(JSON.parse(options.data))
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      item: JSON.parse(options.data)
    })
    // console.log(this.data.list)
    //获取影评详情
    getJXypDeatil(this.getDetail,this.data.item.id)
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
    setTimeout(()=>{
      wx.hideLoading()
    },1000)
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

  }
})