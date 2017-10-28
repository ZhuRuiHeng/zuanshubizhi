// pages/inform/inform.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gid  : '',
    img  : ''   //图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options);
    var img = options.img;
    var gid = options.gid;
    console.log("gid:", gid);
    var collectList = wx.getStorageSync('collectList');
    console.log("collectList", collectList);
    if (collectList.length == 0){
      console.log(1);
       that.setData({
         collect: false
       })
    }else{
      console.log(2);
        for (var i = 0; i < collectList.length; i++) {
          console.log(collectList[i].gid);
          console.log(options.gid);
          if (collectList[i].gid == options.gid) {
            var collect = collectList[i].collect;
            console.log("20", collect,i);
            that.setData({
              collect: true
            })
          }
        }
    }
    
    that.setData({
      img    : img,
      gid    : gid
    })
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
  //收藏
  loveImg:function(e){
    var collectList   = wx.getStorageSync('collectList');
    var gid     = e.currentTarget.dataset.gid;
    var that = this;
    console.log("3", that.data.collect)
    if (collectList.length == 0){  //数组为0，添加
        var collectList = [];
        var both = {};
        both.collect = true; //新建both对象
        both.gid = that.data.gid;
        both.img = that.data.img;
        console.log(both);
        collectList.push(both);
        console.log(collectList);
        wx.setStorageSync("collectList", collectList);
        that.setData({
          collect: true
        })
    } else {  //数组不为0 true 添加splice    false删除push
      var collect = that.data.collect;
      console.log(11, collect)
      if (collect == true){
        for (var i = 0; i < collectList.length; i++) {
            var both = {};
            both.collect = that.data.collect; //新建both对象
            both.gid = that.data.gid;
            both.img = that.data.img;
            var arr = [];
            arr[0] = both;
            wx.setStorageSync("collectList", collectList);
            wx.setStorageSync("arr", arr);
            if (collectList[i].gid == that.data.gid) {
              collectList.splice(i, 1);
              wx.setStorageSync("collectList", collectList);
          }
        }
        that.setData({
          collect: false
        })
      } else{
         
          var both = {};
          both.collect = true; //新建both对象
          both.gid = that.data.gid;
          both.img = that.data.img;
          collectList.push(both);
          wx.setStorageSync("collectList", collectList);
          console.log(1111);
        
          that.setData({
            collect: true
          })
      }
      console.log(that.data.collect)
      
   }
      
    
  },
  // 海报下载
  downLoad: function () {
    var that = this;
    console.log(that.data.img);
    wx.downloadFile({
      url: '' + that.data.img + '', //图片
      success: function (res) {
        console.log(res);
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            console.log(res);
            wx.showToast({
              title: '壁纸下载成功，请去相册查看',
              icon: 'success',
              duration: 800
            })
          }
        })
      }
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    var gid = that.data.gid;
    return {
      title: "精选壁纸",
      path: '/pages/index/index',
      success: function (res) {
        console.log(res);
        // 转发成功
      },
      fail: function (res) {
        console.log(res);
        // 转发失败
      }
    }
  }
})