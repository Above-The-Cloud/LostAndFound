//index.js
//获取应用实例
const app = getApp()
var serverName = app.globalData.serverName

Page({
  data: {
    listofitem: [],
    listfound: [{ header: ' ' }],
    listlost: [{ header: ' ' },],
    activeIndex: 1,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    animationData: [],
    publish_id: -1,
    image_exist: 0,
    user_id: 10152150127,
    array: ['所有', '校园卡', '雨伞', '钱包'],
    pflag: 0,
    // 单选框
    items: [
      { name: 'lost', value: 'LOST', checked: 'true' },
      { name: 'found', value: 'FOUND' },
    ],
    //图片路径
    tempFilePaths: [],
    //分类按钮
    showModalStatus: false,
    //导航栏
    navbar: ['LOST', 'FOUND'],
    currentTab: 0,
    imageList: [],
    tvalue:'',
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  //单选框触发函数
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

  },
  //
  stateswitch: function (e) {
    console.log('LLL')
    if (this.data.currentTab == 0) {
      this.setData({
        listofitem: "lost"
      })
    } else {
      this.setData({
        listofitem: "found"
      })
    }
    console.log(this.data.currentTab)
    console.log(this.data.listofitem)
    console.log('FFF')
    this.setData({
      tvalue: '',
      imageList:'',
      pflag:'0',
    })
  },

  //事件处理函数
  bindViewTap: function () {

  },

  chooseImage: function () {
    var that = this
    wx.chooseImage({
      count: 3,
      success: function (res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      pflag: e.detail.value
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  
  // onShow: function () {
  //  this.setData({
  //    tvalue: '',
  //    imageList:'',
  //    pflag:'0',
  //  })
  // },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(e)
    var that = this;
    var formData = e.detail.value;
    wx.request({
      url: serverName + '/edit.php',
      data: {
        user_id: that.data.user_id,
        type_t: e.detail.value.type,
        title: '',
        msg: e.detail.value.input,
        image_exist: 0,

      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log('sucess-----------------')
        //console.log(res)
        //console.log('-----------------------')
        //console.log(res.data)
        //console.log('sucess-----------------')
        that.setData({
          publish_id: res.data.max_pid

        })
        console.log('当前数据库返回的publish_id')
        console.log(that.data.publish_id)
        if (that.data.image_exist == 1) {
          //console.log(that.data)
          wx.uploadFile({
            url: serverName + '/upload.php',
            filePath: that.data.tempFilePaths[0],
            name: "file",
            formData: {
              publish_id: that.data.publish_id
            },
            success: function (res) {
              console.log('图片上传完成！')
              console.log(res)
              //var data = res.data
              //do something
            }
          })
        }
      }
    })
    wx.switchTab({
      url: '../index/index',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        setTimeout(function () {
          page.onLoad();
        }, 2000);

      }
    })
  },


})
