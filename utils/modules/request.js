export function requestAPI(url, data, obj){
  var response = null;
  wx.request({
      url: url,
      data:data,
      method: 'GET',
      header: {
        'content-type': 'application/json' 
      },
      success: function (res) {
        response = res
      }
  })
  return response;
}