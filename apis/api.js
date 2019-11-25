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
