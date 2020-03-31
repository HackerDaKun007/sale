<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 订单数据验证
// +----------------------------------------------------------------------
namespace app\common\validate;
use think\Validate;

class Order extends Validate {

    protected $rule = [
        //用户信息
        'username' => 'require|length:1,32',  //用户名称
        'tel' => 'require|length:1,11|mobile',  //手机号
        'area' => 'require|length:1,150',  //选择地址
        'adder' => 'require|length:1,150',  //详情地址

        //产品信息
        'goods_id' => 'require|length:1,11|number',//产品ID
        'rushdate_id' => 'require|length:1,11|number',//日期ID
        'rushtime_id' => 'require|length:1,11|number',//时间ID

        //用户备注信息
        'user_back' => 'length:1,150',

    ];

    protected $message = [
        'username' => '请输入收货人',
        'tel' => '请输入收货人手机号码',
        'area' => '请选择收货地区',
        'adder' => '请输入详情地址',

        'goods_id' => '数据异常',
        'rushdate_id' => '数据异常',
        'rushtime_id' => '数据异常',
        'user_back' => '备注信息不能大于150字',
    ];

    protected $scene = [
        'user' => ['username','tel','area','adder','user_back'],
        'goods' => ['goods_id','rushdate_id','rushtime_id'],
    ];

}
?>