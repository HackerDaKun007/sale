<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 修改个人相关信息
// +----------------------------------------------------------------------
namespace app\common\validate;
use think\Validate;
class Personal extends Validate {

    protected $rule = [
        'password' => 'require|length:3,32',
        'repassword' => 'require|confirm:password',
        'mail' => 'email',
        'tei' => 'mobile',
        'sex' => 'require|in:1,2',
        'name' => 'length:1,32',
        'admin_id' => 'require|length:1,11|number',
    ];

    protected $message = [
        'password' => '密码不为空、并且不能小于3或大于32字符',
        'repassword' => '确定密码错误',
        'mail' => '邮箱错误',
        'tei' => '手机号码错误',
        'sex' => '请选择性别',
        'name' => '姓名不能小于1位或大于32字符',
        'admin_id' => '数据异常',
    ];

    protected $scene = [
        'personal' => ['mail','tei','sex','name','admin_id'],
        'pass' => ['password','repassword','admin_id'],
    ];
}

?>