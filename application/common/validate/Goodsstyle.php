<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 产品款式 验证器
// +----------------------------------------------------------------------
namespace app\common\validate;
use think\Validate;

class Goodsstyle extends Validate {

    protected $rule = [
        'username' => 'require|length:1,32',
        'price' => 'require|length:1,32|float',
        'regular_price' => 'require|length:1,32|float',
        'available' => 'require|length:1,11|number',
        'sort' => 'require|length:1,11|number',
        'goods_id' => 'require|length:1,11|number',
        'goodsstyle_id' => 'require|length:1,11|number',
    ];

    protected $message = [
        'username' => '款式名称不能为空',
        'price' => '价格不能为空',
        'regular_price' => '原价不能为空',
        'available' => '库存不能为空',
        'sort' => '排序不能为空',
        'goods_id' => '产品ID数据异常',
        'goodsstyle_id' => '数据异常',
    ];

    protected $scene = [
        'add' => ['username','price','regular_price','available','sort','goods_id'],
        'edit' => ['username','price','regular_price','available','sort','goods_id','goodsstyle_id'],
        'del' => ['goodsstyle_id'],
    ];

}


?>