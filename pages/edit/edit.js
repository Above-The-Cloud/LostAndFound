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
    currentTab: 0 
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
  },

  //事件处理函数
  bindViewTap: function () {

  },
  onLoad: function () {
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

// // 拍摄照片
//   take_picture: function () {
//     var that = this;
//     wx.chooseImage({
//       count: 1, // 默认9  
//       sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
//       sourceType: 'album', // 可以指定来源是相机 
//       success: function (res) {
//         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
//         that.setData({
//           tempFilePaths: res.tempFilePaths,
//           image_exist: 1
//         })
//       }
//     })
//   },

// 选择照片
  choose_picture: function(){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: 'album', // 可以指定来源是相机 
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        that.setData({
          tempFilePaths: res.tempFilePaths,
          image_exist: 1
        })
      }
    })
  },

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
  //分类按钮
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停  
    animation.translateY(240).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画：Y轴不偏移，停  
      animation.translateY(0).step()
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭抽屉  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示抽屉  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  }  
})
