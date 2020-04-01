<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 微信客服 validate
// +----------------------------------------------------------------------
namespace app\common\validate;
use think\Validate;
class Vx extends Validate {

    protected $rule = [
        'username' => 'require|length:1,32',
        'vx_user' => 'require|length:1,32',
        'img' => 'require|length:1,150',
        'disable' => 'require|in:1,2',
        'vx_id' => 'require|length:1,11|number',
    ];

    protected $message = [
        'username' => '名称不能为空，不能大于32个字',
        'vx_user' => '微信号不能为空，不能大于32个字',
        'img' => '请上传图片',
        'disable' => '请选择是否禁用',
        'vx_id' => 'ID异常',
    ];

    protected $scene = [
        'add' => ['username','img','disable'],
        'edit' => ['username','img','disable','vx_id'],
        'editImg' => ['username','disable','vx_id'],
        'del' => ['vx_id'],
    ];

}

?>