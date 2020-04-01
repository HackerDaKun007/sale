<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 首页轮播图
// +----------------------------------------------------------------------

namespace app\common\validate;
use think\Validate;

class Carousel extends Validate {

    protected $rule = [
        'username' => 'require|length:1,32',
        'img' => 'require|length:1,250',
        'url' => 'length:1,255',
        'sort' => 'require|length:1,11|number',
        'carousel_id' => 'require|length:1,11|number',
    ];

    protected $message = [
        'username' => '标题名称不能为空，并且不能大于32字符',
        'img' => '请上传图片',
        'url' => 'url不能大于255',
        'sort' => '排序不能为空，并且只能是数字',
        'carousel_id' => 'ID异常',
    ];

    protected $scene = [
        'add' => ['username','img','url','sort'],
        'edit' => ['username','img','url','sort','carousel_id'],
        'editImg' => ['username','url','sort','carousel_id'],
        'del' => ['carousel_id'],
    ];

}

?>