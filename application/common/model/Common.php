<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | model公共模块
// +----------------------------------------------------------------------
namespace app\common\model;
use think\Model;
use app\commonConfig\App;
class Common extends Model {
    use App;
    protected static $path;

    protected $timeUpdate = false;
//    protected $autoWriteTimestamp = false;

    protected function initialize()
    {
        parent::initialize();
        self::$path = config('path.');
        $this->autoWriteTimestamp = $this->timeUpdate;
    }
}

?>