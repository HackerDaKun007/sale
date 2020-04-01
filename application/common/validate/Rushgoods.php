<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 绑定抢购商品 验证器
// +----------------------------------------------------------------------
namespace app\common\validate;
use think\Validate;

class Rushgoods extends Validate {

    protected $rule = [
        'goods_id' => 'require|length:1,11|number',
        'rushdate_id' => 'require|length:1,11|number',
        'rushtime_id' => 'require|length:1,11|number',
        'price_val' => 'require|length:1,250',
        'num' => 'require|length:1,250',
        'rushgoods_id' => 'require|length:1,11|number',
    ];
    protected $message = [
        'goods_id' => '请选择产品',
        'rushdate_id' => '请选择日期',
        'rushtime_id' => '请选择抢购时间',
        'price_val' => '抢购金额不能为空',
        'num' => '抢购数量不能为空',
        'rushgoods_id' => 'ID异常',
    ];
    protected $scene = [
        'add' => ['goods_id','rushdate_id','rushtime_id','price_val','num'],
        'edit' => ['goods_id','rushdate_id','rushtime_id','price_val','num','rushgoods_id'],
        'del' => ['rushgoods_id'],
    ];
}

?>