// pages/myinfo/myinfo.js
const app = getApp()
var serverName = app.globalData.serverName
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    animationData: [],
    list: [{ text: '物品描述', image: '../../images/index/goods/eg.jpg' },      { text: '物品描述', image: '../../images/index/goods/eg.jpg' }, { text:     '物品描述', image: '../../images/index/goods/eg.jpg' }, { text: '物品描述', image: '../../images/index/goods/eg.jpg' }, { text: '物品描述', image: '../../images/index/goods/eg.jpg' }, { text: '物品描述', image: '../../images/index/goods/eg.jpg' }],

  },
//获取用户信息
  onLoad: function () {

    var user_id= wx.getStorageSync('user_id')

    //请获取下列函数返回值 ，eg. var temp = this.get_current_user_info(user_id);
    this.get_current_user_info(user_id);
    this.get_publish_of_mine(user_id);
    
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

//删除函数
  messageDelete: function () {
    //TODO:调用函数deleteSingleMassageById(publish_id)
    
  },

  deleteSingleMassageById: function(publish_id){
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

    var user_data=null;
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
        user_data=res.data.User

      }
    })
    return user_data
  },

  get_publish_of_mine: function(user_id){

    //传入的user_id如果是当前登录者， 请用user_id: wx.getStorageSync('user_id') 传入

    var data = null;
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
        data = res.data

      }
    })
    return data
  }
})
