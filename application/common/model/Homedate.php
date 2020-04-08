<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 获取首页点击事件日期
// +----------------------------------------------------------------------
namespace app\common\model;

class Homedate extends Common {

    public function add($cache) {
        $date = strtotime(date('Ymd')); //今天日期
        $homeclick = Model('Homeclick');
        // $cache::rm(self::$path['homedate']."_$date");
        // $cache::rm(self::$path['Homeclick']."_$date");
        // // var_dump($cache::get(self::$path['homedate']."_$date"));
        // exit;
        $dateFlow = $cache::get(self::$path['homedate']."_$date");
        self::startTrans();
        try {
            if(!$dateFlow) {
                $data = self::where('date','=',$date)->find();
                if(!$data) { //查询没有数据
                    $data = [
                        'date' => $date,
                        'number' => 1,
                    ];
                    //添加数据
                    self::isUpdate(false)->save($data);
                    $data['homedate_id'] = $this->id;
                    $homeclick->add($date,true, $cache, $data['homedate_id']);
                }else {
                    $data = json_decode($data,true);
                    $data['number'] = $data['number']+1;
                    self::isUpdate(true)->save(['number'=>$data['number']],['homedate_id'=>$data['homedate_id']]);
                    $homeclick->add($date, false, $cache, $data['homedate_id']);
                }
                $cache::set(self::$path['homedate']."_$date",$data,self::$path['time1']);
                self::commit();
            }else {
                $dateFlow['number'] = $dateFlow['number']+1;
                self::isUpdate(true)->save(['number'=>$dateFlow['number']],['homedate_id'=>$dateFlow['homedate_id']]);
                $cache::set(self::$path['homedate']."_$date",$dateFlow,self::$path['time1']);
                $homeclick->add($date,false, $cache, $dateFlow['homedate_id']);
                self::commit();
            }
        }catch (Exception $e) {
            self::rollback();
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