<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 产品参数 验证器
// +----------------------------------------------------------------------
namespace app\common\validate;
use think\Validate;

class Rarameter extends Validate {

    protected $rule = [
        'goods_id' => 'require|number|length:1,11',
        'title' => 'require|length:1,32',
        'content' => 'require|length:1,150',
        'sort' => 'require|number|length:1,11',
        'parameter_id' => 'require|number|length:1,11',
    ];

    protected $message = [
        'goods_id' => '产品ID异常',
        'title' => '参数标题不能为空，并且不能大于32字',
        'content' => '参数内容不能为空，并且不能大于150字',
        'sort' => '排序不能为空',
        'parameter_id' => 'ID异常',
    ];

    protected $scene = [
        'add' => ['goods_id','title','content','sort'],
        'edit' => ['goods_id','title','content','sort','parameter_id'],
        'del' => ['parameter_id'],
    ];

}
?>