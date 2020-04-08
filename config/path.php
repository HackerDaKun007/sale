<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 公共操作变量
// +----------------------------------------------------------------------

return [
    //controller方法名控制
    'contr' => 'controller',

    //数据缓存
    'modelPowerW1' => 'modelPowerWhether1',  //权限表列表展示栏目1
    'modelPowerW2' => 'modelPowerWhether2',  //权限表列表展示栏目2
    'modelPowerW3' => 'modelPowerWhether3',  //权限表列表展示栏目3
    'modelPowerShow' => 'modelPowerShow',   //权限表列表展示

    //角色目录权限缓存
    'modelRoleShow' => 'modelRoleShow',   //权限表列表根据角色展示栏目
    'modelRoleSelect' => 'modelRoleSelect',   //权限表列表根据角色展示权限列表

    'tuntime' => './tuntime', //后端上传缓存文件地址
    'upload' => './Upload', //后端上传文件地址
    'uploadEnd' => '/Upload/', //后端上传文件地址

    //登陆后台使用的cookie信息
    'cokieUser' => 'cokieUser', //用户名称
    'cokieId' => 'cokieId', //用户ID
    'cokieIp' => 'cokieIp', //用户ip
    'cokieBr' => 'cokieBr', //用户游览器
    'cokieOs' => 'cokieOs', //用户系统
    'cokieTime' => 'cokieTime', //用户系统

    //管理员信息
    'adminInfo_' => 'adminInfo_',

    //产品字母列表
    'letterSelect' => 'letterSelect', //列表缓存

    //站点缓存
    'siteSelte' => 'siteSelte', //站点列表缓存
    'siteSelteLetter' => 'siteSelteLetter', //站点字母列表缓存
    'siteSelteHot' => 'siteSelteHot', //热门站点列表缓存


    //网站首页缓存
    'carouselSelect' => 'carouselSelect', //首页轮播图缓存

    //服务说明缓存
    'cacheSelect' => 'cacheSelect',

    //产品缓存
    'goodsSelect' => 'goodsSelect',

    //付款方式
    'goodsPayment' => [
        1 => '货到付款',  //货到付款
    ],


    //订单状态
    'goodsStatus' => [
        1 => '待发货',
        2 => '待收货',
        3 => '确定收货',
        4 => '取消',
        5 => '待确定',
        6 => '退货',
        7 => '售后服务',
    ],

    //产品类别
    'goodsCategory' => 'goodsCategory',

    //抢购日期
    'goodsRushdate' => 'goodsRushdate',
    //抢购时间
    'Rushtime' => 'Rushtime',

    //抢购商品首页列表
    'goodsTime' => 'goodsTime',//引用goodsTime_今天日期时间戳

    //抢购商品单个信息
    'goodsTig' => 'goodsTig',//引用goodsTig_产品ID_日期ID_时间ID

    //首页栏目推荐缓存
    'recoGoods' => 'recoGoods', //引用recoGoods_今天日期时间戳


    /**
     * 用户信息
     */
    'userName' => 'userName', //用户名称
    'memberUser' => 'memberUser', //会员名称
    'userSex' => 'userSex', //用户性别
    'userTel' => 'userTel', //用户手机号码
    'userImg' => 'userImg', //用户头像
    'initialPass' => 'initialPass', //初始密码
    'userId' => 'userId', //用户ID
    'userAvatar' => '/avatar/', //头像地址
    'useraddressId' => 'useraddressId', //默认地址ID


    /**
     * 用户收藏
     */
    'userFavorite' => 'userFavorite',
    'eachUserFavorite' => 'eachUserFavorite',

    /**
     * 用户收货地址
     */
    'UserAdder' => 'UserAdder',
    'eachUserAdder' => 'eachUserAdder',

    //单个订单缓存
    'Userorder' => 'Userorder',

    //用户订单缓存
    'UserOrderId' => 'UserOrderId',
    'UserOrderIdUser' => 'UserOrderIdUser',
    /**
     * 微信客服缓存
     */
    'vxUser' => 'vxUser',

    //关于我们
    'aboutUs' => 'aboutUs',

    //售后服务说明
    'Aftersale' => 'Aftersale',

    //售后服务说明
    'webCache' => 'webCache',

    //评论
    'cacehComment' => 'cacehComment',

    //提交数据加密
    'dataPassword' => 'dakun007@qq.com,gzlmgvip',

    //日期流量
    'dateFlow' => 'dateFlow',
    'pv' => 'pv',
    'uv' => 'uv',

    //时间秒
    'time30' => (3600*24)*30, //一个月
    'time7' => (3600*24)*7,  //七天
    'time1' => (3600*24)*1, //1天

    'homedate' => 'homedate',  //获取首页点击事件日期
    'Homeclick' => 'Homeclick',  //获取首页点击事件
];

?>