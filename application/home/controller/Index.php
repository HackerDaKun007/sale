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
class Index extends Common
{
    public function index() {
//        var_dump(Model('Recogoods')->cacheDate(self::$dateTime));
//    exit;
        return view('',[
            'recogoods' => Model('Recogoods')->cacheDate(self::$dateTime), //获取今天推荐信息
            'rushgoods' => Model('Rushgoods')->cacheSelect(self::$dateTime), //获取今天抢购商品信息
            'carousel' => Model('Carousel')->cacheSelect(false), //轮播图
        ]);
    }


    //记录器
    public function recorder() {
        $code = 0;
        $msg = 'error';
        if(self::yzPost()) {
            Model('Homedate')->add($this->cache);
            $code = 1;
            $msg = 'success';
        }
        echo self::dataJson($code,$msg);
    }
}
