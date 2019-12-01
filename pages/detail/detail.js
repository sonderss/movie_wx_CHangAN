// pages/detail/detail.js
import {movieDeatail} from '../../apis/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    type:'',
    showTime:'',
    mdname:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  moviecallback(res){
    //这里操作电影详情数据
    console.log(res)
    this.setData({
      list:res.data
    })
    // 电影类型
    var types= ''
    if (this.data.list.basic.type.length>3){
      this.data.list.basic.type = this.data.list.basic.type.splice(0,3)
      this.data.list.basic.type = this.data.list.basic.type
    }
    // console.log(this.data.list.basic.type)
    this.data.list.basic.type.forEach(item=>{
       types =types+ item+'/'
    })
    types= types.split('')
    var tags = ''
    for(let i=0;i<types.length-1;i++){
      tags = tags + types[i]
      this.setData({
        type:tags
      })
    }
    //上映时间
    var time = this.data.list.basic.releaseDate
    var year =''
    var mon = ''
    var day = ''
    time = time.split('')
    time.forEach((item,index)=>{
       if(index<=3){
         year += item
       }
       if(index>3 && index<=5){
         mon += item
          console.log(mon)
         if (index === 4 && item === '0') {
              mon = ''
         }
       }
       if(index>5 && index<=8 ){
          day += item
       }
    })
    var time = year + '年' + mon + '月' + day + '日' + this.data.list.basic.releaseArea+'上映'
    this.setData({
      showTime:time
    })
    //导演名字截取
    var decname = this.data.list.basic.director.name
    if(decname.length>4){
          decname= decname.split('').splice(0,4)
          decname=decname.join('')
        this.setData({
          mdname: decname
        })
    }else{
      this.setData({
        mdname: decname
      })
    }
  },
  onLoad: function (options) {
   
     console.log(options.id)
       var id = options.id
      //  var id =235289

       //这里调用影片详情接口
      movieDeatail(this.moviecallback, id)
    
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

  }
})