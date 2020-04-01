<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用公共文件

/**
 * 用户密码加密函数
 * @param string $val 用户输入密码
 * @param string $rand 随机加密
 * @param string $str 系统固定加密字符
 * @param string 返回加密字符
 */
function encrypt($val, $rand, $str='dakun007@gmail.com') {
    return md5($val . $rand .  $str);
}

/**
 * 随机字符
 * @param int $num 传入字符截取长度
 * @return string 返回随机字符
 */
function random($num=8) {
    $str = '1234567890qwertyuiopasdfghjklzxcvbnm_+QWERTYUIOPASDFGHJKLZXCVBNM';
    return substr(str_shuffle($str), 0, $num);
}





?>