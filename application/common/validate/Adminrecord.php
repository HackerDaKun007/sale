<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 删除管理员登陆记录
// +----------------------------------------------------------------------
namespace app\common\validate;
use think\Validate;
class Adminrecord extends Validate {

    protected $rule = [
        'adminrecord_id' => "require|number",
    ];

    protected $message = [
        'adminrecord_id' => 'ID异常'
    ];

    protected $scene = [
        'del' => ['adminrecord_id'],
    ];

}
?>