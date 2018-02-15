// pages/initinfo/initinfo.js
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
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.switchTab({
      url: '../index/index'
    })

  },
  formReset: function (e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  }
})