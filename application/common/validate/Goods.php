<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 产品验证
// +----------------------------------------------------------------------
namespace app\common\validate;
use think\Validate;
class Goods extends Validate {

    protected $rule = [
        'home_img' => 'require|length:1,250',
        'username' => 'require|length:1,150',
        'payment' => 'require|array|payment:付款方式错误',
        'details' => 'require',
        'styletitle' => 'require|length:1,32',
        'category_id' => 'require|number|length:1,32',
        'goods_id' => 'require|length:1,11|number',
    ];

    protected $message = [
        'home_img' => '请上传展示图',
        'username' => '产品名称不为空，并且不能大于150字',
        'payment' => '请选择付款方式',
        'details' => '内容不能为空',
        'styletitle' => '款式名称不能为空，并且不能大于32字',
        'category_id' => '请选择产品归类',
        'goods_id' => '产品ID异常',
    ];

    protected $scene = [
        'add' => ['home_img', 'username', 'payment', 'details', 'styletitle'],
        'edit' => ['home_img', 'username', 'payment', 'details', 'styletitle', 'goods_id'],
        'editImg' => ['username', 'payment', 'details', 'styletitle', 'goods_id'],
        'del' => ['goods_id'],
    ];

    //自定义验证付款方式
    protected function payment($value,$rule,$data=[]) {
        return $value == $data['paymentArray'] ? true : $rule;
    }

}
?>