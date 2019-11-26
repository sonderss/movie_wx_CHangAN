export function getNowMovie(callback){
  // return  axios.post('https://api.cat-shop.penkuoer.com/api/v2/proxy',{url:'https://api-m.mtime.cn/Showtime/LocationMovies.api?locationId=290'})
  wx.request({
    url: 'https://api-m.mtime.cn/Showtime/LocationMovies.api?locationId=290',
    success: res => {
      //  console.log(res.data)
      callback(res.data)  
      //return res.data  异步返回值  这样return 无效
    }
  })
}
export function nextPlay(callback){
 
  wx.request({
    url: 'https://api-m.mtime.cn/Movie/MovieComingNew.api?locationId=290',
    success: res => {
      //  console.log(res.data)
      callback(res.data)
      //return res.data  异步返回值  这样return 无效
    }
  })
}
//电影详情
export function movieDeatail(callBack,id){
  wx.request({
    url: 'https://ticket-api-m.mtime.cn/movie/detail.api?locationId=290&movieId='+id,
    success: res => {
      //  console.log(res.data)
      callBack(res.data)
      //return res.data  异步返回值  这样return 无效
    }
  })
}