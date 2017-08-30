import $ from 'jquery'

import wxsdk from 'weixin-js-sdk';
export default {
    /**
     * 每个插件都有的install方法，用于安装插件
     * @param {Object} Vue - Vue类
     * @param {Object} [pluginOptions] - 插件安装配置
     */
    install(Vue, pluginOptions = {}) {
        let loading = Vue.loading;
        let wx = wxsdk;
        /*
        *  用来吊起微信选择图片
        *  resolve 选择的图片localIds数组
        * */
        function chooseImage(config) {
            debugger
            return new Promise((resolve) => {
                wx.chooseImage({
                    count: 9, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        resolve(
                            localIds
                        )

                    }
                })
            })
        }
        /*
        *  用来上传图片到微信
        *  data 接收 chooseImage() resolve的localIds
        *  resolve 上传到微信后微信返回的 serverIds 数组
        * */
        function uploadImage(data) {
            return new Promise((resolve) => {
                alert(data.length)
                var uploadCount=0;
                var serverIds=[];
                var upload = function() {
                    wx.uploadImage({
                        localId:data[uploadCount].toString(),
                        success: function(res) {
                            // images.serverId.push(res.serverId);
                            //如果还有照片，继续上传
                            //imageList.push(uploadImageMine(res.serverId))//这个方法是你需要把所谓的媒体meidaid进行下载到本地的ajax处理
                            uploadCount++;
                            if (uploadCount < data.length) {
                                var serverId = res.serverId; // 返回图片的服务器端ID
                                serverIds.push(serverId)
                                upload();
                            }else{
                                var serverId = res.serverId; // 返回图片的服务器端ID
                                serverIds.push(serverId)
                                alert('uploadImageserverId'+serverIds)
                                resolve(
                                    serverIds
                                )
                            }
                        }
                    });
                };
                upload();
            })
        }
        // function fn(want) {
        //     // 返回Promise对象
        //     return new Promise(function(resolve, reject) {
        //         if (typeof want == 'function') {
        //             resolve(want);
        //         } else {
        //
        //         }
        //     })
        // }
        // fn(uploadImageMine).then(function(want) {
        //     want();
        // })
        /*
        *  用来上传图片到微信
        *  data 接收 chooseImage() resolve的localIds
        *  resolve 上传到微信后微信返回的 serverIds 数组
        * */
        function uploadImageMine(serverIds,atId) {
            return new Promise(function(resolve, reject) {
                var serverId=serverIds[0];
                var imageList=[];
                $.post("https://dhr-shell.vchangyi.com/xacy/Common/Api/Attachment/UploadImg",
                    {
                        atId:atId,
                        wxid:serverId,
                        _identifier:'shellhero',
                    },
                    function(data){
                        alert('我们服务器'+data.errcode)
                        alert('我们服务器'+data.result.atId)
                        var atId=data.result.atId;
                        if(data.result.atMqStatus==0){
                            uploadImageMine(serverIds,atId)
                        }
                        if(data.result.atMqStatus==1 && serverIds.length==1){
                            serverIds.slice(0,1)
                            imageList.push(data.result.atAttachment)
                            resolve(imageList)
                            return
                        }
                    },
                    "json");//这里返回的类型有：json,html,xml,text
            })



        }
        var uploadeImg = function () {
            return {
                uploadImg: function (config) {
                    console.log(11)
                    // 参数处理
                    config = config || {};
                    chooseImage(config).then(function (data) {
                        uploadImage(data).then(function (serverIds) {
                            alert('serverIds'+serverIds)
                            uploadImageMine.then(function (imageList) {
                                alert('imageList'+imageList)
                            })
                        })
                        alert(data)
                    })
                }
            }
        }
        Vue.uploade = Vue.prototype.uploade = uploadeImg();
    }
}