<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 登陆验证
// +----------------------------------------------------------------------
namespace app\common\validate;
use think\Validate;
class Login extends Validate {

    protected $rule = [
        'username' => 'require|length:1,32|alphaDash',
        'password' => 'require|length:1,32',
        'yzm' => 'require|length:4|captcha',
        'land' => 'length:1|number',
    ];

    protected $message = [
        'username' => '账号密码错误',
        'password' => '账号密码错误',
        'yzm' => '验证码错误',
        'land' => '数据异常',
    ];

}
?>