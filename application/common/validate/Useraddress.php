<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 收货地址验证
// +----------------------------------------------------------------------
namespace app\common\validate;
use think\Validate;

class Useraddress extends Validate {

    protected $rule = [
        'username' => 'require|length:1,32',
        'tel' => 'require|length:11|mobile',
        'area' => 'require|length:3,32|length:1,150',
        'adder' => 'require|length:3,150',
        'useraddress_id' => 'require|length:1,11|number',
    ];

    protected $message = [
        'username' => '请输入收货人',
        'tel' => '手机号码不正确',
        'area' => '请选在所在地区',
        'adder' => '请入详情地址',
        'useraddress_id' => '收货地址ID异常',
    ];

    protected $scene = [
        'add' => ['username','tel','area','adder'],
        'edit' => ['username','tel','area','adder','useraddress_id'],
        'del' => ['useraddress_id'],
    ];

}

?>