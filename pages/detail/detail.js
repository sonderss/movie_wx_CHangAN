// pages/detail/detail.js
import { movieDeatail, movieactors,movieJP} from '../../apis/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    type:'',
    showTime:'',
    mdname:'',
    height_:'85rpx',
    height_1: '200rpx',
    isShow:false,
    movie_acti:[],
    img_dec:[],
    jp_txt:[],
    user_time:'',
    user_text:'',
    act_view:[]//演员
  },

  /**
   * 生命周期函数--监听页面加载
   */
  moviecallback(res){
    //这里操作电影详情数据
    //  console.log(res)
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
  movieacti(res){
     console.log(res)
    this.setData({
      movie_acti:res.data.types,
      img_view: res.data.types
    })
    // console.log(this.data.img_view)
    var arr = []
    for (let i = 0; i <2;i++){
      arr.push(this.data.img_view[1].persons[i]) 
    } 
    // console.log(arr)
    this.setData({
      act_view:arr
    })
  },
  movieJP(res){
      console.log(res)
      this.setData({
        jp_txt: res.data
      })
    //用户评论发表时间
    var modifyTime = this.data.jp_txt.comments[0].modifyTime*1000
    //用户发表内容
    var userText = this.data.jp_txt.comments[0].content.slice(0,50)+'...'
     console.log(userText)
    var Time = new Date(modifyTime)
    var year = Time.getFullYear()
    var month = Time.getMonth()
    var day = Time.getDay()
    var hour = Time.getHours()
    var min = Time.getMinutes()
    var s = Time.getSeconds()
    var userTime = year + '.' + month + '.' + day + ' ' + hour + ':' + min + ':' + s
    this.setData({
       user_time:userTime,
      user_text: userText
    })
    // console.log(year+'.'+month + '.'+ day + ' ' + hour+':'+min+':'+s)
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
     console.log(options.id)
      var id = options.id
      //  var id = ''
      //  var id =235289

       //这里调用影片详情接口
      movieDeatail(this.moviecallback, id)
      //演员表
      movieactors(this.movieacti, id)
      //精选影评
      movieJP(this.movieJP,1,id)
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

  },
  show_story(){
    // this.data.isShow = !this.data.isShow
    if (!this.data.isShow){
      this.setData({
        height_: 'auto',
        height_1: 'auto',
        isShow: !this.data.isShow
      })
    }else{
      this.setData({
        height_: '85rpx',
        height_1: '200rpx',
        isShow: !this.data.isShow
      })
    }
  },
  //演职员表
  goMore_acti(e){
    // console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/actiview/actiview?data=' + JSON.stringify(e.currentTarget.dataset),
    })
  },
  goTextDeatil(e){
    console.log(e.currentTarget.dataset.item)
    var item = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/jxyping/jsyingping?data='+item
    })
  }
})