<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 设置抢购时间 Model
// +----------------------------------------------------------------------
namespace app\common\model;
class Rushtime extends Common {

    protected $timeUpdate = true;

    public function editAdd($data,$bool=false) {
        $code = 0;
        $msg = $bool?'修改失败':'添加失败';
        $id = false;
        //修改部分
        if($bool) {
            $id = ['rushtime_id'=>$data['rushtime_id']];
        }
        $allow = ['username','rushdate_id','start_time','end_time'];
        $datar = Model('Rushdate')->field('date,rushdate_id')->where('rushdate_id','=',$data['rushdate_id'])->find();
        $data['date'] = strtotime($datar['date']);
        if($datar) {
            $datar = json_decode($datar,true);
            $date = date('Y-m-d',$datar['date']);
            $data['start_time'] = strtotime($date . $data['start_time']);
            $data['end_time'] = strtotime($date . $data['end_time']);
            if($data['start_time'] < $data['end_time']) {
                $where = [
                    ['start_time','elt',$data['end_time']],
                    ['start_time','egt',$data['start_time']],
                    ['rushtime_id','neq',$data['rushtime_id']],
                ];
                if(!self::where($where)->find()) {
                    if(self::allowField($allow)->isUpdate($bool)->save($data, $id)) {
                        $code = 1;
                        $msg = $bool?'修改成功':'添加成功';
                        self::cacheSelect(true,$datar,$data['rushdate_id']);
                    }
                }else {
                    $msg = '当前抢购时间已存在';
                }

            }else {
                $msg = '开始时间必须小于结束时间';
            }

        }
        return self::dataJson($code, $msg, '', '', true);
    }

    //缓存
    public static function cacheSelect($bool=false,$date,$rushdate_id='') {
        $dataSelect = cache(self::$path['Rushtime']."_$date[date]");
        if(!$dataSelect || $bool) {
            $dataSelect = $date;
            $dataSelect['rushtime'] = Model('Rushtime')->field('rushtime_id,username,start_time,end_time')->order('start_time asc')->where('rushdate_id','=',$rushdate_id)->select()->toArray();
            cache(self::$path['Rushtime']."_$date[date]", $dataSelect);
        }
        return $dataSelect;
    }

    /**
     * 删除
     */
    public function del($data) {
        $code = 0;
        $msg = '删除失败';
        $datar = Model('Rushdate')->field('date,rushdate_id')->where('rushdate_id','=',$data['rushdate_id'])->find();
        if($datar) {
            $datar = json_decode($datar,true);
            if(self::where('rushtime_id','=',$data['rushtime_id'])->delete()) {
                $code = 1;
                $msg = '删除成功';
                self::cacheSelect(true,$datar,$data['rushdate_id']);
            }
        }
        return self::dataJson($code, $msg, '', '', true);
    }


    /**
     * 展示数据
     */
    public function show($get,$where=[]) {
        $data = self::where($where)->alias('a')->field('a.*,b.date')->join('rushdate b','b.rushdate_id = a.rushdate_id')->order('b.date desc')->paginate($get['limit'],true,['page'=>$get['page']])->toArray();

        $count = self::where($where)->alias('a')->count();
        return self::dataJson(1,'', [
            'data' => $data['data'],
            'count' => $count,
        ],'',true);
    }

}

?>