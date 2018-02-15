// pages/login/login.js
const app = getApp()
var serverName = app.globalData.serverName

Page({
  data: {
    focus: false,
    inputValue: '',
    openid: ''
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  formSubmit: function(e){
    wx.redirectTo({
      url: '../initinfo/initinfo'
    })
  },

  onLoad: function () {
    console.log("login onLoad...")
    var that = this
    //获得用户的openid
    var openId = (wx.getStorageSync('openId'))
    if (openId) {
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
          console.log("获取用户信息完成！")
          console.log("openid: " + openId)
        }
      })
    } else {
      wx.login({
        success: function (res) {
          //console.log(res.code)
          if (res.code) {
            wx.getUserInfo({
              withCredentials: true,
              success: function (res_user) {
                wx.request({
                  //后台接口地址
                  url: serverName + '/getopenid.php',
                  data: {
                    code: res.code,
                    encryptedData: res_user.encryptedData,
                    iv: res_user.iv
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
                    wx.setStorageSync('openId', res.data.openId);
                    console.log(res.data)
                    console.log("获取用户openid成功！")
                    console.log("openid: " + res.data.openId)
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
                                          wx.setStorageSync('openId', res.data.openId);
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



  }
    
})
