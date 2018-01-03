//index.js
//获取应用实例

var app = getApp()
var utils = require('../../utils/util.js')
var flag = true;
var image_root_path = "http://localhost/LostAndFound/php/"
Page({
  data: {
    swiper_url: [
      '../../images/index/swiper/1.jpg',
      '../../images/index/swiper/2.jpg',
      '../../images/index/swiper/3.jpg',
      '../../images/index/swiper/4.jpg'
    ],
    listofitem: [],
    listfound: [{ header: 'Found信息' }, { username: 'tourist', text: '中山北路校区教书院捡到校园卡一张,学号为10152150127,姓名为图灵。请失主迅速与我联系 我的手机号138058343360', image: '../../images/index/goods/eg.jpg', usericon: '../../images/index/icon/defaulticon.png' }, { username: 'tourist', text: '中山北路校区教书院捡到校园卡一张,学号为10152150127 ,姓名为图灵。请失主迅速与我联系 我的手机号123445672', image: '../../images/index/goods/eg.jpg', usericon: '../../images/index/icon/defaulticon.png' }, { username: 'tourist', text: '中山北路校区教书院捡到校园卡一张,学号为10152150127,姓名为图灵。请失主迅速与我联系 我的手机号123445672', image: '../../images/index/goods/eg.jpg', usericon: '../../images/index/icon/defaulticon.png' }, { username: 'tourist', text: '中山北路校区教书院捡到校园卡一张,学号为10152150127,姓名为图灵。请失主迅速与我联系 我的手机号123445672', image: '../../images/index/goods/eg.jpg', usericon: '../../images/index/icon/defaulticon.png' }, {
      username: 'tourist',
      text: '中山北路校区教书院捡到校园卡一张,学号为10152150127,姓名为图灵。请失主迅速与我联系 我的手机号123445672', image: '../../images/index/goods/eg.jpg', usericon: '../../images/index/icon/defaulticon.png'
    }, { username: 'tourist', text: '中山北路校区教书院捡到校园卡一张,学号为10152150127 ,姓名为图灵。请失主迅速与我联系 我的手机号123445672', image: '../../images/index/goods/eg.jpg', usericon: '../../images/index/icon/defaulticon.png' }],
    listlost: [{ header: 'Lost信息' }, { username: 'loser', text: '坐标华东师范大学闵行校区丢失校园卡一张,学号为10152150127,姓名为图灵。请看到的人迅速和我联系 我的手机号123445672', image: '../../images/index/goods/eg.jpg', usericon: '../../images/index/icon/defaulticon.png' }, { username: 'loser', text: '坐标华东师范大学闵行校区丢失校园卡一张,学号为10152150127,姓名为图灵。请看到的人迅速和我联系 我的手机号123445672', image: '../../images/index/goods/eg.jpg', usericon: '../../images/index/icon/defaulticon.png' }, { username: 'loser', text: '坐标闵行校区丢失校园卡一张,学号为10152150127,姓名为图灵。请看到的人迅速和我联系 我的手机号123445672', image: '../../images/index/goods/eg.jpg', usericon: '../../images/index/icon/defaulticon.png' }, { username: 'loser', text: '坐标华东师范大学闵行校区丢失校园卡一张,学号为10152150127,姓名为图灵。请看到的人迅速和我联系 我的手机号123445672', image: '../../images/index/goods/eg.jpg', usericon: '../../images/index/icon/defaulticon.png' }, { username: 'loser', text: '坐标华东师范大学闵行校区丢失校园卡一张,学号为10152150127,姓名为图灵。请看到的人迅速和我联系 我的手机号123445672', image: '../../images/index/goods/eg.jpg', usericon: '../../images/index/icon/defaulticon.png' }, { username: 'loser', text: '坐标华东师范大学闵行校区丢失校园卡一张,学号为10152150127,姓名为图灵。请看到的人迅速和我联系 我的手机号123445672', image: '../../images/index/goods/eg.jpg', usericon: '../../images/index/icon/defaulticon.png' }],
    duration: 2000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    plain: false

  },

  //事件处理函数
  stateswitch: function (e) {
    if (flag) {
      this.setData({
        listofitem: this.data.listfound
      })
      flag = false;
    }
    else {
      this.setData({
        listofitem: this.data.listlost
      })
      flag = true;
    }
  },

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
    this.setData({
      listofitem: this.data.listfound
    })
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
    wx.request({
      url: 'http://localhost/LostAndFound/php/index_publish_info.php',
      data: {

      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log('sucess-index-publish---------------')
        //console.log(res)
        //console.log('-----------------------')
        //console.log(res.data)
        //console.log('sucess-----------------')
        that.setData({
        publish_data: res.data  

        })
        console.log('当前数据库返回的publish记录')
        console.log(that.data.publish_data)
      }
    })
    
    wx.request({
      url: 'http://localhost/LostAndFound/php/index_image_info.php',
      data: {

      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log('sucess-index-image---------------')
        //console.log(res)
        //console.log('-----------------------')
        //console.log(res.data)
        //console.log('sucess-----------------')
        that.setData({
          image_data: res.data

        })
        console.log('当前数据库返回的image记录')
        console.log(that.data.image_data)
      }
    })
    
  }
})
