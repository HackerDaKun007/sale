<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 产品轮播图 验证器
// +----------------------------------------------------------------------
namespace app\common\validate;
use think\Validate;

class Goodscarousel extends Validate {
    protected $rule = [
        'img' => 'require|length:1,150',
        'goods_id' => 'require|length:1,11|number',
        'sort' => 'require|length:1,11|number',
        'goodscarousel_id' => 'require|length:1,11|number',
    ];

    protected $message = [
        'img' => "请上传图片",
        'goods_id' => '产品ID异常',
        'sort' => '请输入排序',
        'goodscarousel_id' => 'ID异常',
    ];

    protected $scene = [
        'add' => ['img','goods_id','sort'],
        'edit' => ['img','goods_id','sort','goodscarousel_id'],
        'editImg' => ['goods_id','sort','goodscarousel_id'],
        'del' => ['goodscarousel_id'],
    ];
}
?>