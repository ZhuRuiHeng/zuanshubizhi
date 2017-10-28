//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
       'https://qncdn.playonwechat.com/nice/lunbo.png'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 1000,
    page: 1,
    niceImgs:[]
  },
 
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
    wx.setStorageSync('collectList', []);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      wx.showLoading({
          title: '加载中',
        });
        var that = this;
        // 列表
        wx.request({
          url: "https://qncdn.playonwechat.com/nice/data.json",
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          success: function (res) {
            console.log(res.data);
            that.setData({
              imgUrls: res.data.imgUrls,
              niceImgs: res.data.niceImg,
              niceImg: res.data.niceImg.slice(0, 12)
            })
          }
        })
        wx.hideLoading()
  },
  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
    //商品图预览
  imgPreview: function (e) { //图片预览
    var current = this.data.niceImg;
    var index = e.currentTarget.dataset.num;
    wx.previewImage({
      current: current[index], // 当前显示图片的http链接
      urls: current ,// 需要预览的图片http链接列表
      fail: function () {
         //console.log('fail')
      },
      complete: function () {
         //console.info("点击图片了");
      },
    })
  },
  //轮播图预览
  imgPreviewa: function (e) { //图片预览
    var current = this.data.imgUrls;
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
  seeImg:function(e){
    var img = e.currentTarget.dataset.name;
    var gid = e.currentTarget.dataset.gid;
    console.log(img);
    wx.navigateTo({
      url: '../inform/inform?img=' + img + '&gid=' + gid
    })
  },
  //下拉分页
  onReachBottom:function(){
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
    // console.log(that.data.page);
    // console.log(page);
    // console.log(that.data.niceImgs);
      var that = this;
      var num  = 12;
      var oldGoodsList = that.data.niceImg;
      //console.log("oldGoodsList:" + oldGoodsList);
      var nowNiceImg = that.data.niceImgs.slice(oldPage * num, page * num);
      //console.log("nowNiceImg:",nowNiceImg);
      var Content = oldGoodsList.concat(nowNiceImg);
      that.setData({
        niceImg: Content,
        page: reqPage
      })
      //console.log("Content:",that.data.niceImg);
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
  },
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
