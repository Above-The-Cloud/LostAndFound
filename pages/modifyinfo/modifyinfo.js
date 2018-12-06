// pages/modifyinfo/modifyinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['手机号','QQ', '微信号'],
      index: 0,
  },
  formSubmit: function (e) {
    //TODO: 表单验证
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var user_id = (wx.getStorageSync('user_id'))
    //console.log('userid: ' + user_id)
    var contact_type = this.data.array[e.detail.value.contact_type]
    var contact_value = e.detail.value.contact_value
    console.log(contact_type, contact_value)
    // wx.request({
    //   url: serverName + '/login/setcontact.php',
    //   data: {
    //     user_id: user_id,
    //     contact_type: contact_type,
    //     contact_value: contact_value,
    //   },
    //   method: 'GET',
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     console.log('setcontact.php: success')
    //     console.log(res.data)
    //     if (res.data.code == 0) {
    //       wx.switchTab({
    //         url: '../index/index'
    //       })
    //     }
    //     else {
    //       console.log(res.msg);
    //     }
    //   }
    // })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})