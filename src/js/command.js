/**
 * Author：liushaozong
 * Time：2018-03-01
 * Description：about
 */
import {pageLoadingHide, getQueryString} from '../../libs/js/utils'
import {ajaxGet, apiUrl} from '../js/public/public'

pageLoadingHide()
$(function () {
    let getUrl = apiUrl + '/v1/user/short_url'
    let openid = getQueryString('openid')
    let userName = getQueryString('userName')
    // let commandText = `火星基地发蓝钻啦，邀请你跟我一起去火星基地挖钻，蓝钻数量有限，抓紧噢！挖钻通道：`
    let commandText = `火星上发现大量蓝钻矿石，我已挖到好几颗，邀请你跟我一起挖钻，蓝钻数量有限，抓紧啊！点击这里：`
    $('#commandText').html(commandText)
    $('#userName').html(userName)
    let clipboard = new Clipboard('.command-btn')
    clipboard.on('success', function (e) {
        layer.open({
            content: '复制成功',
            anim: 'scale',
            className: 'hint-layercont',
            time: 2
        })
        e.clearSelection()
    })
    let getSkb = (openid, userName) => {
        ajaxGet(getUrl, {
            openid: openid,
            userName: userName
        }, (data) => {
            $('#commandText').append(data.data)
        })
    }
    getSkb(openid, userName)
})
