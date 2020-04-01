<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 售后服务说明 Model
// +----------------------------------------------------------------------
namespace app\common\model;
class Aftersale extends Common {
    protected $timeUpdate = true;

    public function add($data) {
        $code = 0;
        $msg = '修改失败';
        $id = ['aftersale_id'=>1];
        self::startTrans();
        try {
            if(self::isUpdate(true)->allowField('content')->save($data,$id)) {
                $code = 1;
                $msg = '修改成功';
                self::cacheSelect(true);
                self::commit();
            }
        }catch (Exception $e) {
            $msg = '服务器异常';
            self::rollback();
        }
        return self::dataJson($code,$msg,'','',true);
    }

    //更新缓存
    public static function cacheSelect($bool=false) {
        $data = cache(self::$path['Aftersale']);
        if(!$data || $bool) {
            $data = self::order('aftersale_id desc')->field('content')->find();
            if(!empty($data['content'])) {
                cache(self::$path['Aftersale'],$data['content']);
            }else {
                $data = false;
            }
        }
        return $data;
    }
}

?>