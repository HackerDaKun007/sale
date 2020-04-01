<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------
//use think\Route;

//获取url地址,判断URL路由是否存在index.php /index/index/index.html
$domain = $_SERVER['REQUEST_URI'];
if($domain != '/') {
    $domain_zy = false;
    $domain_arrar = explode('/', $domain);
    $domain_arrarwen = explode('?', $domain);
    if ($domain_arrar[1] == 'index.php' || $domain_arrar[1] == 'index' && count($domain_arrar) > 3) {
        $domain_zy = true;
    } else if ($domain_arrar[1] == 'index' && count($domain_arrar) <= 2) {
        $domain_zy = true;
    }else if ($domain_arrarwen[0] == '/index.php') {
        $domain_zy = true;
    }
    if($domain_zy == true){
        require(Env::get('think_path') . 'tpl/404.html');
        exit;
    }
}

//修改http协议
header('X-Powered-By: reginx');

return [
//    'kk/index' => '@Home/index/index',
];
