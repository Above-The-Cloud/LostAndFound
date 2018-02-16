// pages/initinfo/initinfo.js
const app = getApp()
var serverName = app.globalData.serverName

Page({
  data: {
    array: ['QQ', '微信号', '手机号', '邮箱'],
    index: 0,

  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  pickerConfirm: function (e) {

    this.setData({
      chosen: e.detail.value
    })
  },
  formSubmit: function (e) {
    //TODO: 表单验证



    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var user_id = (wx.getStorageSync('user_id'))
    //console.log('userid: ' + user_id)
    var contact_type = this.data.array[e.detail.value.contact_type]
    var contact_value = e.detail.value.contact_value
    wx.request({
      url: serverName + '/login/setcontact.php',
      data: {
        user_id: user_id,
        contact_type: contact_type,
        contact_value: contact_value,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log('setcontact.php: success')
        console.log(res.data)
        if (res.data == 'true') {
          wx.switchTab({
            url: '../index/index'
          })
        }
        else{

        }
      }
    })


  },
  formReset: function (e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  }
})