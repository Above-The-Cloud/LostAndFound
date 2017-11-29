//index.js
//获取应用实例

var app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    swiper_url: [
      '../../images/index/swiper/1.jpg',
      '../../images/index/swiper/2.jpg',
      '../../images/index/swiper/3.jpg',
      '../../images/index/swiper/4.jpg'
    ],
    list: [{ header: 'lost&found信息' }, { text: '物品描述', image: '../../images/index/goods/eg.jpg' }, { text: '物品描述', image: '../../images/index/goods/eg.jpg' }, { text: '物品描述', image: '../../images/index/goods/eg.jpg' }, { text: '物品描述', image: '../../images/index/goods/eg.jpg' }, { text: '物品描述', image: '../../images/index/goods/eg.jpg' }, { text: '物品描述', image: '../../images/index/goods/eg.jpg' }],
    duration: 2000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    plain: false
  },
  //事件处理函数
  bindViewTap: function (e) {
    
  },

  loadMore: function (e) {
    
  },
  getNextDate: function () {
    var now = new Date()
    now.setDate(now.getDate() - this.index++)
    return now
  },
  onLoad: function () {

    var that = this
    
    this.index = 1
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })


  }
})
