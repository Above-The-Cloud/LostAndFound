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
    // 单选框
    items: [
      { name: 'lost', value: 'LOST', checked: 'true' },
      { name: 'found', value: 'FOUND' },
    ],
    //图片路径
    tempFilePaths:null,
    //分类按钮
    showModalStatus: false,
    //导航栏
    navbar: ['LOST', 'FOUND'],
    currentTab: 0,
    array: ['所有', '校园卡', '雨伞', '钱包'],
    pflag: 0,
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
      tvalue:'',
      imageList:[],
      pflag:0,
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
        console.log('chooseimage.......')
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    console.log('current')
    console.log(current)
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      pflag: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },


  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(e)
    var that = this;
    var formData = e.detail.value;

    var user_id = wx.getStorageSync('user_id')
    var type_t = this.data.listofitem
    var category = this.data.array[pflag]
    var title = ''
    var msg = e.detail.value.input
    var imagesPaths = this.data.imageList
    console.log("imagelist..........")
    console.log(this.data.imageList)
    console.log(imagesPaths)
    //在此调用uploadAll接口
    this.uploadAll(user_id, type_t, category, title, msg, imagesPaths)

    //跳转到主页
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

  //imagesPaths图片路径数组
  uploadAll: function (user_id, type_t, category, title, msg, imagesPaths) {
    var publish_id=null;
    wx.request({
      url: serverName + '/edit/edit.php',
      data: {
        user_id: user_id,
        type_t: type_t,
        category: category,
        title: title,
        msg: msg,
        image_exist: 0,

      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
          publish_id=res.data
        console.log('当前数据库返回的publish_id')
        console.log(publish_id)
        for (var path in imagesPaths){
          console.log(imagesPaths[path])
          wx.uploadFile({
            url: serverName + '/edit/upload.php',
            filePath: imagesPaths[path],
            name: "file",
            formData: {
              publish_id: publish_id
            },
            success: function (res) {
              console.log('图片上传完成！')
              console.log(res)
            
            },
            fail: function (err) {
              console.log(err)
            }
          })
        }
        
      }
    })
  }

})
