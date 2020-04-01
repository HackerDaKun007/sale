<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 类别验证
// +----------------------------------------------------------------------
namespace app\common\validate;
use think\Validate;

class Category extends Validate {

    protected $rule = [
        'username' => 'require|length:1,32',
        'sort' => 'require|number|length:1,11',
        'category_id' => 'require|number|length:1,11',
    ];

    protected $message = [
        'username' => '类别名称不能为空，并且不能大于32位',
        'sort' => '排序不能为空，并且只能是数字，不能大于11位',
        'category_id' => 'ID异常',
    ];

    protected $scene = [
        'add' => ['username','sort'],
        'edit' => ['username','sort','category_id'],
        'del' => ['category_id']
    ];
}
?>