<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 修改订单
// +----------------------------------------------------------------------
namespace app\common\validate;
use think\Validate;

class Osorder extends Validate {

    protected $rule = [
        'order_id' => 'require|number|length:1,11',
        'username' => 'require|length:1,150',
        'tel' => 'require|mobile',
        'area' => 'require|length:1,150',
        'adder' => 'require|length:1,150',
        'order_status' => 'require|number|between:1,7',
        'os_back' => 'length:1,150',
        'user_back' => 'length:1,150',
    ];

    protected $message = [
        'order_id' => '数据ID异常',
        'username' => '用户名称不能为空',
        'tel' => '手机号码不正确',
        'area' => '所在地区不能为空',
        'adder' => '详情地址不能为空',
        'order_status' => '订单状态异常',
        'express' => '快递公司不能大于150字',
        'express_number' => '快递单号不能大于150字',
        'os_back' => '系统备注不能大于150字',
        'user_back' => '用户备注不能大于150',
    ];



}
?>