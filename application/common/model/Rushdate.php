<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 抢购日期 Model
// +----------------------------------------------------------------------

namespace app\common\model;
class Rushdate extends Common {

    protected $timeUpdate = true;

    /**
     * @param $data 添加修改数据
     * @param bool $bool false添加，true修改
     * @return array|false|string
     */
    public function editAdd($data,$bool=false) {
        $code = 0;
        $msg = $bool?'修改失败':'添加失败';
        $data['date'] = strtotime($data['date']);
        $id = false;
        $where[] = ['date','eq',$data['date']];
        //修改部分
        if($bool) {
            $where[] = ['rushdate_id','neq',$data['rushdate_id']];
            $id = ['rushdate_id'=>$data['rushdate_id']];
        }
        if(self::where($where)->count()) {
            $msg = '当前日期已存在';
        }else {
            if(self::allowField('date')->isUpdate($bool)->save($data, $id)) {
                $code = 1;
                $msg = $bool?'修改成功':'添加成功';
                self::cacheSelect(true);
            }
        }
        return self::dataJson($code, $msg, '', '', true);
    }

    /**
     * @param bool $bool false不更新缓存，true更新缓存
     * @return array|mixed
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public static function cacheSelect($bool=false) {
        $data = cache(self::$path['goodsRushdate']);
        if(!$data || $bool) {
            $data = self::order('date desc')->field('date,rushdate_id')->select()->toArray();
            cache(self::$path['goodsRushdate'], $data);
        }
        return $data;
    }

    /**
     * 删除
     */
    public function del($id) {
        $code = 0;
        $msg = '删除失败';
        if(self::where('rushdate_id','eq',$id)->delete()) {
            $code = 1;
            $msg = '删除成功';
            self::cacheSelect(true);
        }
        return self::dataJson($code, $msg, '', '', true);
    }

    /**
     * 展示数据
     */
    public function show($get,$where=[]) {
        $data = self::where($where)->field('date,rushdate_id')->order('date desc')->paginate($get['limit'],true,['page'=>$get['page']])->toArray();
        $count = self::where($where)->count();
        return self::dataJson(1,'', [
            'data' => $data['data'],
            'count' => $count,
        ],'',true);
    }

}

?>