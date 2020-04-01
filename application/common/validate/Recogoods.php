<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 推荐抢购商品 验证器
// +----------------------------------------------------------------------
namespace app\common\validate;
use think\Validate;

class Recogoods extends Validate {

    protected $rule = [
        'rushgoods_id' => 'require|number|length:1,11',
        'rushdate_id' => 'require|number|length:1,11',
        'title' => 'require|length:1,16',
        'sort' => 'require|number|length:1,11',
        'recogoods_id' => 'require|number|length:1,11',
    ];

    protected $message = [
        'rushgoods_id' => '请选择抢购商品',
        'rushdate_id' => '请选择日期',
        'title' => '请输入短文标题介绍，不能大于16字',
        'sort' => '请输入排序',
        'recogoods_id' => 'ID异常',
    ];

    protected $scene = [
        'add' => ['rushgoods_id','rushdate_id','title','sort'],
        'edit' => ['rushgoods_id','rushdate_id','title','sort','recogoods_id'],
        'del' => ['recogoods_id'],
    ];

}
?>