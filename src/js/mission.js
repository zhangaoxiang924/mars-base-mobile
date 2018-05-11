/**
 * Author：liushaozong
 * Time：2018-03-01
 * Description：about
 */
import {pageLoadingHide, getQueryString} from '../../libs/js/utils'
import {ajaxGet, apiUrl} from '../js/public/public'

pageLoadingHide()
let openid = getQueryString('openid')
let token = getQueryString('token')
let userName = getQueryString('userName')
let missionUrl = apiUrl + '/v1/task/get_task_list'

// let openid = 'GiwMc+aiZhYE3Za4g+70Gw=='
// let token = 'iN4Su1afCB9roGChJAAFR1nnmvKr00p0BMc9i'
// console.log(encodeURI(encodeURI(window.location.href)))
console.log(encodeURI(userName))
$(function () {
    let getMissionList = (openid, token) => {
        ajaxGet(missionUrl, {
            openid: openid,
            token: token,
            fresh: Math.random()
        }, (data) => {
            let dataArr = data.data
            let ulList = ''
            dataArr.day_tasks.map((item, index) => {
                ulList += `<li class="list-li ${item.display === 3 ? 'not-enabled' : ''}" data-type="${item.tips}">
                                <a href="${item.url === '' ? 'javascript:void(0)' : item.url}">
                                    <p class="task-text">
                                        <font><img src="./img/decorate-3.png" alt=""></font>${item.name}
                                        <span class="${item.finish === 0 ? 'unfinished' : ''}">+${item.acceleration_value}</span>
                                    </p>
                                    <p class="accomplish-state">
                                        <span class="${item.finish === 0 ? 'unfinished' : ''}">${item.finish === 0 ? '未完成' : '已完成'}</span><font class="${item.finish === 0 ? 'unfinished' : ''}"></font>
                                    </p>
                                </a>
                           </li>`
            })
            $('.mission-list ul').append(ulList)

            $('.list-li').on('click', function () {
                // let liDescribe = $(this).data('type')
                let index = $('.list-li').index(this)
                let dayTasksObj = dataArr.day_tasks[index]
                if (!dayTasksObj.url && dayTasksObj.tips !== '') {
                    layer.open({
                        content: dayTasksObj.tips,
                        style: 'background-color:#fff; color:#666; border:none;',
                        className: 'layercont',
                        btn: '我知道了'
                    })
                }
            })

            let columnList = ''
            let columnListUrl = ['./command.html', '#', '#']
            dataArr.super_tasks.map((item, index) => {
                columnList += `<div data-finish="${item.finish}" class="column-list list${item.taskid} ${item.display === 3 ? 'not-enabled' : ''}">
                                    <a href="${columnListUrl[index].indexOf('.html') === -1 ? 'javascript:void(0)' : `${columnListUrl[index]}?openid=${openid}&userName=${userName}`}"><font><img class="pic" src="${item.pic}" alt=""></font><span class="hot ${item.hot === 1 ? 'active' : ''}"><img src="./img/hot.png" alt=""></span><h6>${item.name}</h6>
                                        <p class="describe  ${!parseInt(item.finish) ? '' : 'finish'}">${item.des}</p>
                                    </a>
                                </div>`
            })
            $('.mission-column').append(columnList)

            $('.column-list').not('.list1').on('click', function () {
                let isFinish = parseInt($(this).data('finish'))
                if ($(this).hasClass('not-enabled') || isFinish !== 0) {
                    return
                }
                let index = $('.column-list').index(this)
                let item = dataArr.super_tasks[index]
                layer.open({
                    content: item.tips,
                    style: 'background-color:#fff; color:#666; border:none;',
                    className: 'layercont',
                    btn: !item.url ? `我知道了` : !item.url_name ? `加速` : item.url_name,
                    yes: function () {
                        if (!item.url) {
                        } else {
                            location.href = item.url
                        }
                    }
                })
            })
        })
    }
    getMissionList(openid, token)
})
