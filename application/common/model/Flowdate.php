<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 流量日期
// +----------------------------------------------------------------------
namespace app\common\model;
class Flowdate extends Common {

    public function add($url) {

        $date = strtotime(date('Ymd')); //今天日期
        $dateFlow = cache(self::$path['dateFlow']."_$date");
        $timedate = time();
        $time = self::$path['time1'];
        if(!$dateFlow) {
            $data = self::where('date','=',$date)->find();
            if(!$data) { //查询没有数据
                $data = [
                    'date' => $date,
                    'pv' => 1,
                    'uv' => 1,
                ];
                //添加数据
                self::isUpdate(false)->save($data);
                $data['flowdate_id'] = $this->id;
            }else {
                $data = json_decode($data,true);
            }
            cache(self::$path['dateFlow']."_$date",$data,$time);
            Model('Pv')->add($data,false,$url,$timedate);
            Model('Uv')->add($data,false,$timedate);
        }else {
            $dateFlow['pv'] += 1;
//            $dateFlow['uv'] += 1;
            $data['pv'] = $dateFlow['pv'];
//            $data['uv'] = $dateFlow['uv'];
            if(self::isUpdate(true)->save($data,['flowdate_id'=>$dateFlow['flowdate_id']])) {
                cache(self::$path['dateFlow']."_$date",$dateFlow,$time);
                Model('Pv')->add($dateFlow,true,$url,$timedate);
            };
            Model('Uv')->add($dateFlow,true,$timedate);
        }
    }


    //展示
    public function show($get,$where) {
        $data = self::where($where)->order('date desc')->paginate($get['limit'],true,['page'=>$get['page']])->toArray();
        $count = self::where($where)->count();
        return self::dataJson(1,'success',[
            'data' => $data['data'],
            'count' => $count,
        ],'',true);
    }

}
?>