<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 输入用途名称
// +----------------------------------------------------------------------
namespace app\common\validate;
use think\Validate;
class Power extends Validate {

    protected $rule = [
        'username' => 'require|length:1,32',
        'whether' => 'require|in:1,2',
        'grade' => 'require|in:1,2,3,4',
        'level' => 'require|number',
        'controller' => 'length:1,32',
        'method' => 'length:1,32',
        'sort' => 'require|number',
        'power_id' => 'require|number',
    ];

    protected $message = [
        'username'      => '栏目名称不能为空或大于32个字',
        'whether'       => '是否展示栏目异常',
        'grade'         => '等级异常',
        'level'         => '父级ID必须是数字',
        'controller'    => '控制名不能大于32个字',
        'method'        => '方法名不能大于32个字',
        'sort'        => '排序不能为空，必须是数字',
        'power_id'      => 'ID异常',
    ];

    protected $scene = [
        'add' => ['username', 'whether', 'grade', 'level', 'controller', 'method', 'sort'],
        'edit' => ['username', 'whether', 'grade', 'level', 'controller', 'method', 'sort', 'power_id'],
        'del' => [ 'power_id'],
    ];

}

?>