//index.js
//获取应用实例

var app = getApp()
var utils = require('../../utils/util.js')
var flag = true;
var serverName = app.globalData.serverName
var image_root_path = serverName +"/"
var Category = ['所有', '校园卡', '雨伞', '钱包']
Page({
  data: {
    swiper_url: [
      '../../images/index/swiper/1.jpg',
      '../../images/index/swiper/2.jpg',
      '../../images/index/swiper/3.jpg',
      '../../images/index/swiper/4.jpg'
    ],
    listofitem: [],
    listfound: [{ header: ' ' }],
    listlost: [{ header: ' ' },],
    cur_type:'所有▼',
    activeIndex:1,
    duration: 2000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    refresh:0,
    plain: false,
    actionSheetHidden: true,
    actionSheetItems: Category


  },
  bind所有: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden,
      cur_type: '所有▼'
    })
  },
  bind校园卡: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden,
      cur_type: '校园卡▼'
    })
  },
  bind钱包: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden,
      cur_type: '钱包▼'
    })
  },
  bind雨伞: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden,
      cur_type: '雨伞▼'
    })
  },
  actionSheetTap: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetChange: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  //事件处理函数
  refresh: function (e){
    while (this.data.listfound.length != 1)
      this.data.listfound.pop();
    console.log('清空');
    console.log(this.data.listfound);
    while (this.data.listlost.length != 1)
      this.data.listlost.pop();
    console.log(this.data.listlost);
    var that = this;
    console.log(this.data.activeIndex);
    this.index = 1
    if(this.data.activeIndex==1)
    this.setData({
      listofitem: this.data.listfound
    })
    else
      this.setData({
        listofitem: this.data.listlost
      })

    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
    wx.request({
      url: serverName + '/index_publish_info.php',
      data: {

      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log('sucess-index-publish---------------')
        //console.log(res)
        //console.log('-----------------------')
        //console.log(res.data)
        //console.log('sucess-----------------')
        that.setData({
          publish_data: res.data

        })
        //console.log('当前数据库返回的publish记录')
        //console.log(that.data.publish_data)
        that.Loadmsg()
      }
    }
    )
  } ,

  stateswitch: function (e) {
    var that = this;
    var type = e.target.dataset.index;
    if (type == 0) {
      this.setData({
        listofitem: this.data.listlost,
        activeIndex:type
      })
      flag = false;
    }
    else {
      this.setData({
        listofitem: this.data.listfound,
        activeIndex: type
      })
      flag = true;
    }
    //console.log(that.data.publish_data);
  },

  bindViewTap: function (e) {

  },

  loadMore: function (e) {
  },
  getNextDate: function () {
    var now = new Date()
    now.setDate(now.getDate() - this.index++)
    return now
  },
  Loadmsg: function () {
    var that = this;
    var i = 0;
    for (i = 0; i < that.data.publish_data.length; i++) {
      var userid = that.data.publish_data[i].user_id;
      var Msg = that.data.publish_data[i].msg;
      var imageurl='';
      if(that.data.publish_data[i].image_exist=="1")
      imageurl = image_root_path + that.data.publish_data[i].image_url[0];
      if (that.data.publish_data[i].type == 'found')
        this.data.listfound.push({ username: userid, text: Msg, image: imageurl, usericon: '../../images/index/icon/defaulticon.png' });
      else
        this.data.listlost.push({ username: userid, text: Msg, image: imageurl, usericon: '../../images/index/icon/defaulticon.png' });
    }
    if (this.data.activeIndex == 1)
      this.setData({
        listofitem: this.data.listfound
      })
    else this.setData({
      listofitem: this.data.listlost
    })
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
   // this.onLoad
  },
  onPullDownRefresh: function () {
    this.onload;
    this.refresh();
  },
  onLoad: function () {
    while(this.data.listfound.length!=1)
      this.data.listfound.pop();
    console.log('清空');
    console.log(this.data.listfound);
    while (this.data.listlost.length!= 1)
      this.data.listlost.pop();
    console.log(this.data.listlost);
    var that = this;

    this.index = 1
    if (this.data.activeIndex == 1)
    this.setData({
      listofitem: this.data.listfound
    })
    else this.setData({
      listofitem: this.data.listlost
    })
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
    wx.request({
      url: serverName + '/index_publish_info.php',
      data: {

      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log('sucess-index-publish---------------')
        //console.log(res)
        //console.log('-----------------------')
        //console.log(res.data)
        //console.log('sucess-----------------')
        that.setData({
          publish_data: res.data

        })
        
        console.log('当前数据库返回的publish记录')
        console.log(that.data.publish_data)
        that.Loadmsg()
        }
      }
    )
    var that = this;
    wx.request({

      url: serverName + '/index_image_info.php',
      data: {

      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log('sucess-index-image---------------')
        //console.log(res)
        //console.log('-----------------------')
        //console.log(res.data)
        //console.log('sucess-----------------')
        that.setData({
          image_data: res.data

        })
        console.log('当前数据库返回的image记录')
        console.log(that.data.image_data)
      }
    })
    console.log(this.data)

  },

})
