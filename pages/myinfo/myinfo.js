// pages/myinfo/myinfo.js

const app = getApp()
var serverName = app.globalData.serverName
var utils = require('../../utils/util.js')
var flag = true;
var type_t = 'lost'
//var publish_data
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


  onPullDownRefresh: function () {
    this.onLoad();
    // console.log('onpull调用前')
    // var user_id = wx.getStorageSync('user_id')
    // console.log(this.data);
    // //console.log(user_id);

    // // this.get_current_user_info(user_id);
    // this.get_publish_of_mine(user_id);
    // console.log('调用后')
    // console.log(this.data);
  },
  // onLoad1: function () {
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse) {
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })

  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  Loadmsg: function (Data) {
    var that = this;
    //   while (this.data.listfound.length != 1)
    //       this.data.listfound.pop();
    //   while (this.data.listlost.length != 1)
    //       this.data.listlost.pop();
    var i = 0;
    console.log('Data!!!')
    console.log(Data)
    for (i = 0; i < Data.length; i++) {
      var userid = Data[i].nickName;
      var Msg = Data[i].msg;
      var Submission_time = Data[i].submission_time.substring(5, Data[i].submission_time.length - 3);
      var imageurl = '';
      var user_icon = Data[i].avatarUrl;
      var publish_id = Data[i].publish_id;
      var imageList = that.data.publish_data[i].image_url;
      // var nick_name = that.Data[i].nickName,
      // var avatarUrl = that.Data[i].avatarUrl,
      if (Data[i].image_exist == "1")
        imageurl =Data[i].image_url[0];
      //   if (that.Data[i].type == 'lost')
      this.data.listfound.push({
        username: userid, text: Msg, image: imageurl, imagelist: imageList, usericon: user_icon, sub_time: Submission_time, publish_id: publish_id
      });
      //   else
      //   this.data.listlost.push({ username: userid, text: Msg, image: imageurl, usericon: user_icon, sub_time: Submission_time });
    }
    this.setData({
      listofitem: this.data.listfound
    })
  },
  photopreview: function (event) {//图片点击浏览
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    //console.log(imgList);
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  Setting:function(){
    var that = this;
    wx.showActionSheet({
      itemList: ['联系方式修改', '退出登录'],
      success(res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          console.log('联系方式修改')
          wx.navigateTo({
            url: '../modifyinfo/modifyinfo',
          })
        }
        else
        {
          that.Logout();
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  Logout:function()//logout注销函数，待写
  {
    
    console.log("logout---------------")
    console.log(wx.getStorageSync('openid'))
    wx.request({
      url: serverName + '/logout.php',
      data: {
        openid: wx.getStorageSync('openid')
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("---------------")
        console.log(res.data)
        wx.redirectTo({
          url: '../login/login',
        })
      }
    })
  },
  onLoad: function () {
    var user_id = wx.getStorageSync('user_id')
    //console.log(user_id);
    
    this.get_current_user_info(user_id);
    this.get_publish_of_mine(user_id);
    wx.showToast({
      title: '下拉可以刷新个人信息',
      icon: 'none'
    })
    console.log(this.data)
   // console.log(publish_data)
    while (this.data.listfound.length != 0)
      this.data.listfound.pop();
    
    console.log('清空');
    console.log(this.data.listfound);
    console.log('上面是found信息')
    while (this.data.listlost.length != 0)
      this.data.listlost.pop();
    console.log(this.data.listlost);
    console.log('上面是lost信息')
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
  messageDelete: function (e) {
    //TODO:调用函数deleteSingleMassageById(publish_id)
    var that = this;
    wx.showActionSheet({
      itemList: ['确认删除'],
      success(res) {
        console.log(res.tapIndex)
        if(res.tapIndex == 0)
        {
          console.log(e);
          console.log(e.target.dataset.publishId);
          var pubid = e.target.dataset.publishId;
          that.deleteSingleMassageById(pubid);
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })

  },

  deleteSingleMassageById: function (publish_id) {
    var that = this;
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
          that.onLoad();
        }
      }
    })
  },

  get_current_user_info: function(user_id){

    //传入的user_id如果是当前登录者， 请用user_id: wx.getStorageSync('user_id') 传入
    var that = this
    // console.log('get_current_user_id....')
    // console.log(user_id)
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
        that.setData({
          nickName: res.data['nickName'],
          avatarUrl: res.data['avatarUrl'],
          contact_type: res.data['contact_type'],
          contact_value: res.data['contact_value']
        })
      }
    })
    console.log('get_current_user_id....')
    console.log(user_id)
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
        var publish_data=res.data
        that.Loadmsg(publish_data)


      }
    })

  }
})
