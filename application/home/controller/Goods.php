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
class Goods extends Common
{
    public function goodsdetail() {
        $input = self::$reques->get();
        if(!empty($input['id']) && !empty($input['date_id']) && !empty($input['time_id'])) {
            if(is_numeric($input['id']) && is_numeric($input['time_id']) && is_numeric($input['date_id']) ) {
                $goods = Model('Rushgoods')->cacheGoods($input['id'],$input['date_id'],$input['time_id']);

                if($goods) {
                    return view('',[
                        'goods' => $goods,
                        'comment' => Model('Comment')->cacheSelect(false,$input['id']),
                    ]);
                    exit;
                }
            }
        }
        require(self::$server404);
    }

    //更新收藏
    public function favorite() {

    }
}
