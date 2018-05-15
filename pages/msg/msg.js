Page({
  data: {
    list: [
      {
        id: 'location1',
        name: '教学楼',
        open: false,
        pages: [
          {
            zh: '理科大楼',
            url: ''
          }, {
            zh: '文科大楼',
            url: ''
          }, {
            zh: '教书院',
            url: ''
          }, {
            zh: '文史楼',
            url: ''
          }, {
            zh: '中北三馆',
            url: ''
          }, {
            zh: '俊秀楼',
            url: ''
          }
        ]
      }, {
        id: 'location2',
        name: '食堂',
        open: false,
        pages: [
          {
            zh: '河西食堂',
            url: ''
          }, {
            zh: '河东食堂',
            url: ''
          }, {
            zh: '丽娃食堂',
            url: ''
          }, {
            zh: '华闵食堂',
            url: ''
          }
        ]
      }, {
        id: 'location3',
        name: '宿舍',
        open: false,
        pages: [
          {
            zh: '第三宿舍',
            url: ''
          }, {
            zh: '第四宿舍',
            url: ''
          }, {
            zh: '第五宿舍',
            url: ''
          }, {
            zh: '闵行7号宿舍',
            url: ''
          }, {
            zh: '闵行8号宿舍',
            url: ''
          }, {
            zh: '闵行9号宿舍',
            url: ''
          }
        ]
      }, {
        id: 'location',
        name: '学院',
        open: false,
        pages: [
          {
            zh: '计算机科学与技术学院',
            url: ''
          }, {
            zh: '设计学院',
            url: ''
          }, {
            zh: '教育学部',
            url: ''
          }, {
            zh: '心理与认知学院',
            url: ''
          }
        ]
      }
    ]
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        if(list[i].url){
          wx.navigateTo({
            url: 'pages/' + list[i].url
          })
          return
        }
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  }
})
