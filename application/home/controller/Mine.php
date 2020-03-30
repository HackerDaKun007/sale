<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 前台首页
// +----------------------------------------------------------------------
namespace app\home\controller;
class Mine extends Common
{

    /* 关于我们 */
    public function aboutus() {

        return view('',[
            'data' => Model('About')->cacheSelect(),
        ]);
    }

    /* 售后服务 */
    public function aftersale() {

        return view('',[
            'data' => Model('Aftersale')->cacheSelect(),
        ]);
    }

    public function editaddress() {

        return view();
    }

    public function mine() {

        return view();
    }

    public function myaddress() {

        return view();
    }

    public function mycollect() {
        
        return view('',[
            'data' => cache(self::$path['userFavorite']."_".self::$userId),
        ]);
    }


}
