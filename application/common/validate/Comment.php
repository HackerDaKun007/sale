<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 商品评论 验证器
// +----------------------------------------------------------------------
namespace app\common\validate;
use think\Validate;

class Comment extends Validate {

    protected $rule = [
        'username' => 'require|length:1,32',
        'goods_id' => 'require|length:1,11|number|goodsYz:产品ID不正确或已经下架',
        'home_img' => 'require',
        'content' => 'require|length:1,150',
        'date' => 'require|date',
        'comment_id' => 'require|length:1,11|number',
    ];

    protected $message = [
        'username' => '名称不能为空',
        'goods_id' => '产品ID不能为空',
        'home_img' => '请上传图片',
        'content' => '请输入内容',
        'date' => '请选择时间日期',
        'comment_id' => 'ID异常',
    ];

    protected $scene = [
        'add' => ['username','goods_id','home_img','content','date'],
        'edit' => ['username','goods_id','home_img','content','date','comment_id'],
        'editImg' => ['username','goods_id','content','date','comment_id'],
        'del' => ['comment_id'],
    ];

    protected function goodsYz($value,$rule,$data=[]) {
        $model = Model('Goods')->where('goods_id','=',$value)->count();
        if(!$model) {
            return $rule;
        }
        return true;
    }
}

?>