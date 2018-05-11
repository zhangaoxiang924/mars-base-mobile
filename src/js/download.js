/**
 * Author：liushaozong
 * Time：2018-03-01
 * Description：about
 */
import {pageLoadingHide, isIos, isAndroid, isWeixin} from '../../libs/js/utils'
import {andUrl, iosUrl} from '../js/public/public'

pageLoadingHide()

$(function () {
    // 下载app
    // let iosUrl = 'https://www.pgyer.com/huoxing24_ios'
    // let andUrl = 'https://www.pgyer.com/huoxing24_android'
    let downLoad = $('.download-cont .down-btn')

    downLoad.on('click', function () {
        if (isWeixin()) {
            if (isIos()) {
                downLoad.attr('href', iosUrl)
            } else if (isAndroid()) {
                $('.Android-hint').show()
            }
        } else if (isAndroid()) {
            downLoad.attr('href', andUrl)
        } else if (isIos()) {
            downLoad.attr('href', andUrl)
        }
    })
})
