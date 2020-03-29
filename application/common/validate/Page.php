<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 分页验证
// +----------------------------------------------------------------------
namespace app\common\validate;
use think\Validate;
class Page extends Validate {

    protected $rule = [
        'limit' => 'require|number|between:1,100',
        'page' => 'require|number|between:1,1000',
    ];

    protected $message = [
        'limit' => 'limit异常',
        'page' => 'page异常',
    ];

}
?>