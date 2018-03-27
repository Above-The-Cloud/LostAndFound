// pages/login/login.js
const app = getApp()
var serverName = app.globalData.serverName

Page({
  data: {
    focus: false,
    inputValue: '',
    userInfo: null,
    openid: ''
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  formSubmit: function(e){
    //TODO:表单检查


    //DONE:表单检查
    console.log(e.detail.value)
    var user_id = e.detail.value.userid;
    var user_password = e.detail.value.user_password;
    var openid = this.data.openid;
    var nickName = this.data.nickName;
    var avatarUrl = this.data.avatarUrl;

    this.register(user_id, user_password, openid, nickName, avatarUrl)
    
  },

  onLoad: function () {
    console.log("login onLoad...")
    var that = this
    that.setData({
      userInfo: app.globalData.userInfo
    })
    //获得用户的openid
    var openid = (wx.getStorageSync('openid'))
    if (openid) {
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl,
          })
        },
        fail: function () {
          // fail
          console.log("获取失败！")
        },
        complete: function () {
          // complete
          that.setData({
            openid: openid
          })
          console.log("获取用户信息完成！")
          console.log("openid: " + openid)
        }
      })
    } else {
      wx.login({
        success: function (res) {
          console.log('code: ' + res.code)
          if (res.code) {
            wx.getUserInfo({
              withCredentials: true,
              success: function (res_user) {
                wx.request({
                  //后台接口地址
                  url: serverName + '/getopenid.php',
                  data: {
                    code: res.code,
                    //encryptedData: res_user.encryptedData,
                    //iv: res_user.iv
                  },
                  method: 'GET',
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    // this.globalData.userInfo = JSON.parse(res.data);
                    that.setData({
                      nickName: res.data.nickName,
                      avatarUrl: res.data.avatarUrl,
                    })
                    app.globalData.openid = openid;
                    wx.setStorageSync('openid', res.data.openid);
                    console.log('getopenid: ' + res.data)
                    console.log("获取用户openid成功！")
                    console.log("openid: " + res.data.openid)
                  },
                  fail: function (err) {
                    console.log(err)
                  }
                })
              }, 
              
              fail: function () {
                wx.showModal({
                  title: '警告通知',
                  content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
                  success: function (res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success: (res) => {
                          if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                            wx.login({
                              success: function (res_login) {
                                if (res_login.code) {
                                  wx.getUserInfo({
                                    withCredentials: true,
                                    success: function (res_user) {
                                      wx.request({
                                        url: serverName + '/getopenid.php',
                                        data: {
                                          code: res_login.code,
                                          encryptedData: res_user.encryptedData,
                                          iv: res_user.iv
                                        },
                                        method: 'GET',
                                        header: {
                                          'content-type': 'application/json'
                                        },
                                        success: function (res) {
                                          that.setData({
                                            nickName: res.data.nickName,
                                            avatarUrl: res.data.avatarUrl,

                                          })
                                          wx.setStorageSync('openid', res.data.openid);
                                        }
                                      })
                                    }
                                  })
                                }
                              }
                            });
                          }
                        }, 
                        fail: function (res) {

                        }
                      })

                    }
                  }
                })
              }, 
              complete: function (res) {

              }
            })
          }
        }
      })

    }


    //用户身份验证
    if(openid){

      console.log('login.php... ')
      wx.request({
        url: serverName + '/login/login.php',
        data: {
          openid: openid,

        },
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res)
          if(res.data.user_id){
            wx.setStorageSync('user_id', res.data.user_id);
            wx.switchTab({
              url: '../index/index'
            })
          }
         
        }
      })

    }else{
      console.log('else... ')
      console.log(openid)

    }
    console.log(this.data)
    console.log(app.globalData)
    console.log("...login onLoad")

  },


  register: function (user_id, user_password, openid, nickName, avatarUrl){
    wx.request({
      url: serverName + '/login/register.php',
      data: {
        user_id: user_id,
        user_password: user_password,
        openid: openid,
        nickName: nickName,
        avatarUrl: avatarUrl,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data == 'true') {
          wx.setStorageSync('user_id', user_id);
          wx.redirectTo({
            url: '../initinfo/initinfo'
          })
        }
      }
    })
  }
})
