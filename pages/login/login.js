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
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindPwdInput: function(e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  bindGetUserInfo: function(e) {
    console.log('bindgetuserinfo 调用')
    // console.log(e);
    this.wxLogin();
  },
  wxLogin: function(e) {
    var that = this;
    var openid;
    wx.login({
      success: function(res) {
        console.log('code: ' + res.code)
        if (res.code) {
          wx.getUserInfo({
            withCredentials: true,
            success: function(res_user) {
              console.log(res_user.userInfo.avatarUrl);
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
                success: function(res) {
                  // this.globalData.userInfo = JSON.parse(res.data);
                  console.log(res);
                  that.setData({
                    // nickName: res.data.nickName,
                    // avatarUrl: res.data.avatarUrl,
                    openid: res.data.openid,
                  })
                  app.globalData.openid = openid;
                  wx.setStorageSync('openid', res.data.openid);
                  // console.log('getopenid: ' + res.data)
                  console.log("获取用户openid成功！")
                  console.log("openid: " + res.data.openid)
                  var user_id = that.data.inputValue;
                  var user_password = that.data.pwd;
                  var openid = that.data.openid;
                  var nickName = that.data.nickName;
                  var avatarUrl = res_user.userInfo.avatarUrl;
                  console.log(avatarUrl);
                  that.register(user_id, user_password, openid, nickName, avatarUrl)
                },
                fail: function(err) {
                  console.log(err)
                }
              })
            },
            fail: function() {
              wx.showModal({
                title: '警告通知',
                content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
                success: function(res) {
                  if (res.confirm) {
                    wx.openSetting({
                      success: (res) => {
                        if (res.authSetting["scope.userInfo"]) { ////如果用户重新同意了授权登录
                          wx.login({
                            success: function(res_login) {
                              if (res_login.code) {
                                wx.getUserInfo({
                                  withCredentials: true,
                                  success: function(res_user) {
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
                                      success: function(res) {
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
                      fail: function(res) {

                      }
                    })

                  }
                }
              })
            },
            complete: function(res) {

            }
          })
        }
      }
    })

  },
  formSubmit: function(e) {
    //TODO:表单检查
    console.log(this.data);
    //DONE:表单检查
    // console.log(e.detail.value)


  },

  onLoad: function() {
    console.log("login onLoad...")
    // wx.redirectTo({
    //   url: '../initinfo/initinfo'
    // })
    var that = this
    that.setData({
      userInfo: app.globalData.userInfo
    })
    //获得用户的openid
    var openid = (wx.getStorageSync('openid'))

    if (openid) {
      wx.getUserInfo({
        success: function(res) {
          that.setData({
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl,
          })
        },
        fail: function() {
          // fail
          console.log("获取失败！")
        },
        complete: function() {
          // complete
          that.setData({
            openid: openid
          })
          console.log("获取用户信息完成！")
          console.log("openid: " + openid)

        }
      })
    }
    //用户身份验证
    if (openid) {
      console.log('13:19');
      wx.request({
        url: serverName + '/login/auto_login.php',
        data: {
          openid: openid,

        },
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log('1322')
          console.log(res)
          console.log(res.data)
          if (res.data.user_id) {
            wx.setStorageSync('user_id', res.data.user_id);
            wx.switchTab({
              url: '../index/index'
            })
          }

        }
      })

    } else {
      console.log(openid)

    }

  },


  register: function(user_id, user_password, openid, nickName, avatarUrl) {
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
      success: function(res) {
        console.log("register");
        console.log(res);
        if (res.data.code != 0) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
        if (res.data.data.tag == 'unregistered') {
          wx.setStorageSync('user_id', user_id);
          wx.redirectTo({
            url: '../initinfo/initinfo'
          })
        } else if (res.data.data.tag == 'registered') {
          wx.setStorageSync('user_id', user_id);

          console.log('-----')
          wx.switchTab({
            url: '../index/index'
          })
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 5000
          })
        }
      }
    })
  }
})