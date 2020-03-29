<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 抢购日期 验证器
// +----------------------------------------------------------------------
namespace app\common\validate;
use think\Validate;

class Rushdate extends Validate {

    protected $rule = [
        'date' => 'require|date',
        'rushdate_id' => 'require|number|length:1,11',
    ];

    protected $message = [
        'date' => '请选择有效日期',
        'rushdate_id' => 'ID异常',
    ];

    protected $scene = [
        'add' => ['date'],
        'edit' => ['date','rushdate_id'],
        'del' => ['rushdate_id'],
    ];

}

?>