/**
 * Author：liushaozong
 * Time：2018-03-01
 * Description：about
 */
import {pageLoadingHide, getQueryString, isIos, isAndroid, isWeixin} from '../../libs/js/utils'
import {ajaxGet, isPoneAvailable, apiUrl, andUrl, iosUrl, downLoadUrl} from '../js/public/public'

pageLoadingHide()
let registerUrl = apiUrl + '/v1/user/invite_user_by_phone' // 提交注册
let codeUrl = apiUrl + '/v1/user/send_sms_vcode' // 获取验证码
// let openid = 'ncoetM5RfNlmQ9NSvtMxaw==' // openid
let openid = getQueryString('openid') // openid
$(function () {
    // 解决安卓背景bug
    $('body').css({'height': $(window).height()})
    // 获取验证码
    let getCode = (phone, type) => {
        ajaxGet(codeUrl, {
            phone: phone,
            type: type,
            debug: 1,
            fresh: Math.random()
        }, (data) => {
            if (data.status === 1008) {
                layer.open({
                    content: '该手机号已注册过，不能领取蓝钻噢',
                    anim: 'scale',
                    className: 'hint-layercont',
                    time: 2
                })
            } else if (data.status === 1) {
                codeTime(document.getElementById('btnCode'))
            } else if (data.status === 1011) {
                layer.open({
                    content: '获取验证码太频繁',
                    anim: 'scale',
                    className: 'hint-layercont',
                    time: 2
                })
            }
        })
    }

    // 倒计时
    let wait = 60
    function codeTime(obj) {
        if (wait === 0) {
            obj.removeAttribute('disabled')
            obj.innerHTML = '获取验证码'
            wait = 60
        } else {
            obj.setAttribute('disabled', true)
            obj.innerHTML = `${wait}s`
            wait--
            setTimeout(function () {
                codeTime(obj)
            }, 1000)
        }
    }
    $('#btnCode').on('click', function () {
        if ($.trim($('#phonenum').val()) === '') {
            layer.open({
                content: '手机号不能为空',
                anim: 'scale',
                className: 'hint-layercont',
                time: 2
            })
        } else {
            if (isPoneAvailable($.trim($('#phonenum').val())) === false) {
                layer.open({
                    content: '请输入正确的手机号',
                    anim: 'scale',
                    className: 'hint-layercont',
                    time: 2
                })
            } else {
                getCode($.trim($('#phonenum').val()), 3)
            }
        }
    })

    // 注册验证
    $('.register-submit').on('click', () => {
        let phoneNumber = $.trim($('#phonenum').val())
        let verifcode = $.trim($('#verifcode').val())
        if (phoneNumber === '') {
            layer.open({
                content: '手机号不能为空',
                anim: 'scale',
                className: 'hint-layercont',
                time: 2
            })
        } else if (isPoneAvailable(phoneNumber) === false) {
            layer.open({
                content: '请输入正确的手机号',
                anim: 'scale',
                className: 'hint-layercont',
                time: 2
            })
        } else if (verifcode === '') {
            layer.open({
                content: '验证码不能为空',
                anim: 'scale',
                className: 'hint-layercont',
                time: 2
            })
        } else {
            getInviteRegister(phoneNumber, verifcode, openid)
        }
    })
    let getInviteRegister = (phone, vcode, openid) => {
        ajaxGet(registerUrl, {
            phone: phone,
            vcode: vcode,
            openid: openid,
            debug: 1,
            fresh: Math.random()
        }, (data) => {
            if (data.status === 1) {
                $('.register-cont').hide()
                window.location.href = './succeed.html'
            } else if (data.status === 1008) {
                layer.open({
                    content: '该手机号已注册过，不能领取蓝钻噢',
                    anim: 'scale',
                    className: 'hint-layercont',
                    time: 2
                })
            } else if (data.status === 1003) {
                layer.open({
                    content: '验证码错误',
                    anim: 'scale',
                    className: 'hint-layercont',
                    time: 2
                })
            }
        })
    }

    // 下载app
    // let iosUrl = 'https://www.pgyer.com/huoxing24_ios'
    // let andUrl = 'https://www.pgyer.com/huoxing24_android'
    let downLoad = $('#downLoad')

    downLoad.on('click', function () {
        console.log('111')
        downLoad.attr('href', downLoadUrl)
        /* if (isWeixin()) {
            if (isIos()) {
                downLoad.attr('href', iosUrl)
            } else if (isAndroid()) {
                $('.Android-hint').show()
            }
        } else if (isAndroid()) {
            downLoad.attr('href', andUrl)
        } else if (isIos()) {
            downLoad.attr('href', andUrl)
        } */
    })
})
