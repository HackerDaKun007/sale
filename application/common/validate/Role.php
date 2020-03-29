<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 角色验证
// +----------------------------------------------------------------------

namespace app\common\validate;
use think\Validate;
class Role extends Validate {

    protected $rule = [
        'username' => 'require|length:1,32',
        'admin' => 'in:1,2',
        'power_id' => 'require',
        'role_id' => 'require|number|length:1,11',
    ];

    protected $message = [
        'username' => '角色名称不能为空或大于32个字符',
        'admin' => '选择全部异常',
        'power_id' => '请选择权限',
        'role_id' => 'ID异常',
    ];

    protected $scene = [
        'add' =>  ['username', 'admin', 'power_id'],
        'edit' => ['username', 'admin', 'power_id', 'role_id'],
        'del' =>  ['role_id'],
    ];

}