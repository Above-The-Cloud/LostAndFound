//index.js
//获取应用实例

var app = getApp()
var utils = require('../../utils/util.js')
var flag = true;
var serverName = app.globalData.serverName
var image_root_path = "http://101.132.164.188:8088/php/"
Page({
  data: {
    swiper_url: [
      '../../images/index/swiper/1.jpg',
      '../../images/index/swiper/2.jpg',
      '../../images/index/swiper/3.jpg',
      '../../images/index/swiper/4.jpg'
    ],
    listofitem: [],
    listfound: [{ header: 'Found信息' }],
    listlost: [{ header: 'Lost信息' },],

    duration: 2000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    plain: false

  },

  //事件处理函数
  stateswitch: function (e) {
    var that = this;
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
    //console.log(that.data.publish_data);
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
  Loadmsg: function () {
    var that = this;
    var i = 0;
    for (i = 0; i < that.data.publish_data.length; i++) {
      var userid = that.data.publish_data[i].user_id;
      var Msg = that.data.publish_data[i].msg;
      var imageurl='';
      if(that.data.publish_data[i].image_exist=="1")
      imageurl = image_root_path + that.data.publish_data[i].image_url[0];
      if (that.data.publish_data[i].type == 'found')
        this.data.listfound.push({ username: userid, text: Msg, image: imageurl, usericon: '../../images/index/icon/defaulticon.png' });
      else
        this.data.listlost.push({ username: userid, text: Msg, image: imageurl, usericon: '../../images/index/icon/defaulticon.png' });
    }
    that.setData({
      listofitem: this.data.listfound
    })
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {

  },
  onPullDownRefresh: function () {
    this.onload;
  },
  onLoad: function () {
    while(this.data.listfound.length!=1)
      this.data.listfound.pop();
    console.log('清空');
    console.log(this.data.listfound);
    while (this.data.listlost.length!= 1)
      this.data.listlost.pop();
    console.log(this.data.listlost);
    var that = this;

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
      url: serverName + '/index_publish_info.php',
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
        that.Loadmsg()
        }
      }
    )
    var that = this;
    wx.request({

      url: serverName + '/index_image_info.php',
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
    console.log(this.data)

  },

})
