<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 设置抢购时间 验证器
// +----------------------------------------------------------------------
namespace app\common\validate;
use think\Validate;

class Rushtime extends Validate {

    protected $rule = [
        'username' => 'require|length:1,32',
        'rushdate_id' => 'require|length:1,11|number',
        'start_time' => 'require|length:1,11',
        'end_time' => 'require|length:1,11',
        'rushtime_id' => 'require|length:1,11|number',
    ];

    protected $message = [
        'username' => '名称不能为空，并且不能大于32个字',
        'rushdate_id' => '请选择日期ID',
        'start_time' => '请选在开始时间',
        'end_time' => '请选择结束时间',
        'rushtime_id' => 'ID异常',
    ];

    protected $scene = [
        'add' => ['username','rushdate_id','start_time','end_time'],
        'edit' => ['username','rushdate_id','start_time','end_time','rushtime_id'],
        'del' => ['rushtime_id'],
    ];

}
?>