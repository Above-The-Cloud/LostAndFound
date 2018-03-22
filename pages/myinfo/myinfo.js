// pages/myinfo/myinfo.js

const app = getApp()
var serverName = app.globalData.serverName
var utils = require('../../utils/util.js')
var flag = true;
var type_t = 'lost'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    animationData: [],
    // list: [],
    listofitem: [],
    listfound: [{ header: ' ' }],
    listlost: [{ header: ' ' },],
    activeIndex: 1,
    duration: 2000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    refresh: 0,
    plain: false,
    actionSheetHidden: true,

  },


    
  onLoad1: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })

      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  Loadmsg: function () {
    var that = this;
    //   while (this.data.listfound.length != 1)
    //       this.data.listfound.pop();
    //   while (this.data.listlost.length != 1)
    //       this.data.listlost.pop();
    var i = 0;
    console.log('that.data.publish_data')
    console.log(that.data.publish_data)
    for (i = 0; i < that.data.publish_data.length; i++) {
      var userid = that.data.publish_data[i].nickName;
      var Msg = that.data.publish_data[i].msg;
      var Submission_time = that.data.publish_data[i].submission_time.substring(5, that.data.publish_data[i].submission_time.length - 3);
      var imageurl = '';
      var user_icon = that.data.publish_data[i].avatarUrl;
      // var nick_name = that.data.publish_data[i].nickName,
      // var avatarUrl = that.data.publish_data[i].avatarUrl,
      if (that.data.publish_data[i].image_exist == "1")
        imageurl =that.data.publish_data[i].image_url[0];
      //   if (that.data.publish_data[i].type == 'lost')
      this.data.listfound.push({
        username: userid, text: Msg, image: imageurl, usericon: user_icon, sub_time: Submission_time
      });
      //   else
      //   this.data.listlost.push({ username: userid, text: Msg, image: imageurl, usericon: user_icon, sub_time: Submission_time });
    }
    if (this.data.activeIndex == 1)
      this.setData({
        listofitem: this.data.listfound
      })
    else this.setData({
      listofitem: this.data.listlost
    })
  },

  // onLoad: function () {
  //   while (this.data.listfound.length != 1)
  //     this.data.listfound.pop();
  //   console.log('清空');
  //   console.log(this.data.listfound);
  //   while (this.data.listlost.length != 1)
  //     this.data.listlost.pop();
  //   console.log(this.data.listlost);
  //   var that = this;

  //   this.index = 1
  //   if (this.data.activeIndex == 1)
  //     this.setData({
  //       listofitem: this.data.listfound
  //     })
  //   else this.setData({
  //     listofitem: this.data.listlost
  //   })
  //   this.show_publish_infos('found', '所有', this)
  //   console.log(this.data)
  // },
  onLoad: function () {
    var user_id = wx.getStorageSync('user_id')

    
    this.get_current_user_info(user_id);
    this.get_publish_of_mine(user_id);

    
    this.Loadmsg()

    while (this.data.listfound.length != 1)
      this.data.listfound.pop();
    console.log('清空');
    console.log(this.data.listfound);
    console.log('上面是found信息')
    while (this.data.listlost.length != 1)
      this.data.listlost.pop();
    console.log(this.data.listlost);
    // console.log('上面是lost信息')
    var that = this;

    this.index = 1
    if (this.data.activeIndex == 1)
      this.setData({
        listofitem: this.data.listlost + this.data.listlost,
      })
    else this.setData({
      listofitem: this.data.listlost + this.data.listlost,
    })


    // console.log(this.data)
  },



  //删除函数
  messageDelete: function () {
    //TODO:调用函数deleteSingleMassageById(publish_id)

  },

  deleteSingleMassageById: function (publish_id) {
    wx.request({
      url: serverName + '/myinfo/delete_publish.php',
      data: {
        publish_id: publish_id
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log('deleteSingleMassageById: success')
        console.log(res.data)
        if (res.data == 'true') {
          this.onLoad();
        }
      }
    })
  },

  get_current_user_info: function(user_id){

    //传入的user_id如果是当前登录者， 请用user_id: wx.getStorageSync('user_id') 传入

    wx.request({
      url: serverName + '/myinfo/get_user_info.php',
      data: {
        user_id: user_id
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log('get_current_user_info....')
        console.log(res)

      }
    })
  },

  get_publish_of_mine: function(user_id){

    //传入的user_id如果是当前登录者， 请用user_id: wx.getStorageSync('user_id') 传入
    var that = this
    wx.request({
      url: serverName + '/myinfo/show_user_publishing.php',
      data: {
        user_id: user_id
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(' get_publish_of_mine......')
        console.log(res)
        that.setData({
          publish_data: res.data

        })

      }
    })

  }
})
