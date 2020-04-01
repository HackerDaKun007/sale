<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 用户信息 验证器
// +----------------------------------------------------------------------
namespace app\common\Validate;
use think\Validate;
class User extends Validate {
    
    protected $rule = [
        'username' => 'require|length:1,32',
        'sex' => 'require|in:1,2',
        'tel' => 'require|mobile',
        'orpassword' => 'require|length:1,32',
        'password' => 'require|length:1,32',
        'ropassword' => 'require|confirm:password',
        'yzm' => 'require|length:4|captcha',
        'user_id' => 'require|number|length:1,11',
    ];

    protected $message = [
        'username' => '用户名称异常',
        'sex' => '性别异常',
        'tel' => '手机号码不正确',
        'orpassword' => '原密码错误',
        'password' => '密码错误',
        'ropassword' => '确定密码错误',
        'user_id' => 'ID异常',
        'yzm' => '验证码错误',
    ];

    protected $scene = [
        'passw' => ['yzm','orpassword','password','ropassword','user_id'],
        'password' => ['password','ropassword','user_id'],
        'login' => ['username','password','yzm'],
        'tel' => ['tel'],
        'sex' => ['sex'],
        'del' => ['user_id'],
    ];
}


?>