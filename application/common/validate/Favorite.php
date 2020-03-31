<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 收藏验证器
// +----------------------------------------------------------------------
namespace app\common\validate;
use think\Validate;

class Favorite extends Validate {

    protected $rule = [
        'goods_id' => 'require|number|length:1,11',
        'rushdate_id' => 'require|number|length:1,11',
        'rushtime_id' => 'require|number|length:1,11',
    ];

    protected $message = [
        'goods_id' => '数据异常',
        'rushdate_id' => '数据异常',
        'rushtime_id' => '数据异常',
    ];

}
?>