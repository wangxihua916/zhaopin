const $ = require('utils/util.js');
const {
    server
} = require('configs/serverConfig.js');
let event = require('utils/event.js');
App({
    onLaunch: function() {
        //获取本地存储的workplaceCity,如为空,采用当地为workplaceCity,如果拒绝,采用'全国'
        let workplaceCity = wx.getStorageSync('workplaceCity');
        if (!workplaceCity) {
            $.getWorkplace(this);
        } else {
            this.globalData.workplaceCity = workplaceCity;
        }

        let location = wx.getStorageSync('location');
        if (!location) {
            $.getLocation(this);
        } else {
            this.globalData.location = location;
        }
        //获取本地存储的cityList
        let cityList = wx.getStorageSync('cityList');
        if (!cityList) {
            $.getCityList(this); //调用腾讯地图开放平台获取城市列表 保存在本地存储
        } else {
            this.globalData.cityList = cityList;
        }

        this.globalData.workplaceDistrict = wx.getStorageSync('workplaceDistrict');

        //如果本地不存在session 调用登录
        let session = wx.getStorageSync('session');
        if (!session) {
            this.login();
        } else {
            this.globalData.session = session;
        }

        event.on('userInfoChanged', this, function(data) {
            this.globalData.userInfo = data.userInfo
        }.bind(this))
        this.login();

        this.getUserInfo();

    },
    onShow: function() {
        //checkSession
        this.checkSession();
    },
    login() {
        console.log('登录');
        let that = this;
        $.ajaxLogin().then((res) => {
            if (res) {
                //登录成功 得到code 发送到服务器换取session
                return $.ajax({
                    url: server + '/common/onLogin',
                    data: {
                        code: res.code,
                        identity: that.globalData.identity
                    }
                })
            }
        }).catch(() => null).then((res) => {
            if (res) {
                //获取session成功 保存到globalData中并存储到本地
                that.globalData.session = res.data;
                wx.setStorageSync('session', res.data);
            }
        })
    },
    checkSession() {
        let that = this;
        wx.checkSession({
            fail: () => {
                that.login();
            }
        })
    },
    getUserInfoFromWX(cb) {
        let _this = this;
        if (this.globalData.userInfoFromWX) {
            typeof cb == "function" && cb(this.globalData.userInfoFromWX)
        } else {
            let userInfoFromWX = wx.getStorageSync('userInfoFromWX');
            if (!userInfoFromWX) {
                wx.login({
                    success: function() {
                        wx.getUserInfo({
                            success: function(res) {
                                _this.globalData.userInfoFromWX = res.userInfo;
                                wx.setStorageSync('userInfoFromWX', res.userInfo);
                                typeof cb == "function" && cb(_this.globalData.userInfoFromWX)
                            },
                            fail: function() {
                                console.log('用户拒绝授权');
                                _this.globalData.userInfoFromWX = {};
                                typeof cb == "function" && cb(_this.globalData.userInfoFromWX)
                            }
                        })
                    }
                })
            } else {
                _this.globalData.userInfoFromWX = userInfoFromWX;
                typeof cb == "function" && cb(_this.globalData.userInfoFromWX)
            }
        }
    },
    getUserInfo(cb) {
        let _this = this;
        console.log(1);
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            console.log(2);
            let userInfo = wx.getStorageSync('userInfo');
            if (!userInfo) {
                console.log(3);
                let timer = setInterval(function() {
                    let {
                        thirdSessionKey
                    } = _this.globalData.session;
                    if (!thirdSessionKey) {
                        console.log(4)
                        return;
                    }
                    console.log(5);
                    $.ajax({
                        url: `${server}/seeker/getUserInfo`,
                        data: {
                            thirdSessionKey: thirdSessionKey
                        }
                    }).then((res) => {
                        console.log(6);
                        clearInterval(timer);
                        _this.globalData.userInfo = res.data;
                        wx.setStorageSync('userInfo', res.data);
                        typeof cb == "function" && cb(_this.globalData.userInfo)
                    }).catch((res) => {
                        console.log(7);
                        clearInterval(timer)
                    })
                }.bind(this), 2000)
            } else {
                _this.globalData.userInfo = userInfo;
                typeof cb == "function" && cb(_this.globalData.userInfo)
            }
        }
    },
    getWorkplace(cb) {
        if (this.globalData.workplaceCity) {
            typeof cb == 'function' && cb(this.globalData.workplaceCity)
        } else {
            $.getWorkplace(this, function() {
                typeof cb == "function" && cb(this.globalData.workplaceCity);
            });
        }
    },
    resume(url, method, data) {
        return $.ajax({
            url: `${server}/${url}`,
            method: method,
            data: data
        })
    },
    getLocation(cb) {
        if (this.globalData.location) {
            typeof cb == 'function' && cb(this.globalData.location);
        } else {
            $.getLocation(this, function() {
                typeof cb == "function" && cb(this.globalData.location);
            })
        }
    },
    globalData: {
        userInfoFromWX: null,
        location: '',
        workplaceCity: '',
        workplaceDistrict: '',
        cityList: [],
        identity: 0, //0代表seeker  1代表hr
        session: {},
        userInfo: null,

    }
})