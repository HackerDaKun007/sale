<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 服务说明控制器
// +----------------------------------------------------------------------
namespace app\common\validate;
use think\Validate;
class Service extends Validate {

    protected $rule = [
        'title' => 'require|length:1,32',
        'content' => 'require|length:1,150',
        'sort' => 'require|length:1,11|number',
        'service_id' => 'require|length:1,11|number',
    ];

    protected $message = [
        'title' => '标题不能为空，并且不能大于32位字符',
        'content' => '内容不能为空，并且不能大于150字符',
        'sort' => '排序不能为空，并且只是数字',
        'service_id' => 'require|length:1,11|number',
    ];

    protected $scene = [
        'add' => ['title', 'content', 'sort'],
        'edit' => ['title', 'content', 'sort', 'service_id'],
        'del' => ['service_id'],
    ];

}

?>