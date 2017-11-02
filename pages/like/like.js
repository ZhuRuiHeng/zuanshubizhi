// pages/like/like.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    niceImg: [],
    niceImgs: [],
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var niceImg = wx.getStorageSync("collectList");
    that.setData({
      niceImg: niceImg.slice(0, 12),
      niceImgs: niceImg
    })
  },
  //轮播图预览
  imgPreview: function (e) { //图片预览
    var current = this.data.niceImg;
    var index = e.currentTarget.dataset.num;
    wx.previewImage({
      current: current[index], // 当前显示图片的http链接
      urls: current,// 需要预览的图片http链接列表
      fail: function () {
        //console.log('fail')
      },
      complete: function () {
        //console.info("点击图片了");
      },
    })
  },
  // 查看图片
  seeImg: function (e) {
    var img = e.currentTarget.dataset.name;
    var gid = e.currentTarget.dataset.gid;
    console.log(img);
    wx.navigateTo({
      url: '../inform/inform?img=' + img +'&gid='+gid
    })
  },
  //下拉分页
  onReachBottom: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    console.log("下拉分页")
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    var that = this;
    var oldPage = that.data.page;
    var reqPage = oldPage + 1;
    var page = reqPage;
    var that = this;
    var num = 12;
    var oldGoodsList = that.data.niceImg;
    var nowNiceImg = that.data.niceImgs.slice(oldPage * num, page * num);
    var Content = oldGoodsList.concat(nowNiceImg);
    that.setData({
      niceImg: Content,
      page: reqPage
    })
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var niceImg = wx.getStorageSync("collectList");
    that.setData({
      niceImg: niceImg
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
      return {
        title: "精选壁纸",
        path: '/pages/star/star',
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