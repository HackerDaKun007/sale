<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 推荐抢购商品Model
// +----------------------------------------------------------------------
namespace app\common\model;
class Recogoods extends Common {
    protected $timeUpdate = true;
    public function editAdd($data, $bool=false) {
        $id = false;
        $where = [
            ['rushgoods_id' ,'=', $data['rushgoods_id']],
            ['rushdate_id' ,'=', $data['rushdate_id']]
        ];
        $code = 0;
        $msg = $bool?'修改失败':'添加失败';
        if($bool) {
            $id = ['recogoods_id'=>$data['recogoods_id']];
            $where[] = ['recogoods_id','neq',$data['recogoods_id']];
        }
        if(self::where($where)->count()) {
            $msg = '当前日期的推荐商品已存在';
        }else {
            $allow = ['rushgoods_id','rushdate_id','title','sort'];
            if(self::isUpdate($bool)->allowField($allow)->save($data,$id)) {
                $code = 1;
                $msg = $bool?'修改成功':'添加成功';
            }
        }
        return self::dataJson($code, $msg, '','',true);
    }

    /**
     * @param $date 日期ID
     * @param bool $bool 判断是更新
     * @return array
     */
    public static function cacheUpdate() {
        $time = strtotime(date('Ymd'));
        $date = Model('Rushdate')->cacheSelect();
        foreach($date as $v) {
            if($v["date"] >= $time) {
                $field = 'a.rushgoods_id,a.rushdate_id,a.title,g.home_img,c.start_time,c.end_time,c.rushtime_id,b.price_val,b.orprice_val,b.num,b.num_back';
                $data = self::where('a.rushdate_id','=',$v['rushdate_id'])->alias('a')->field($field)->join('rushgoods b','b.rushgoods_id = a.rushgoods_id')->join('goods g','g.goods_id=b.goods_id')->join('rushtime c','c.rushtime_id=b.rushtime_id')->order('sort desc')->select()->each(function ($user) {
                    $user['home_img'] = self::$path['uploadEnd'].$user['home_img'];
                    $user['price_val'] = self::$path['uploadEnd'].$user['home_img'];
                    $user['home_img'] = self::$path['uploadEnd'].$user['home_img'];
                    $price_val = explode('/',$user['price_val']);
                    $orprice_val = explode('/',$user['orprice_val']);
                    $num = explode('/',$user['num']);
                    $num_back = explode('/',$user['num_back']);
                    $SnapAvailable = 0;
                    $num_back_num = 0;
                    foreach($num as $ke => $ve) {
                        $SnapAvailable += intval($ve);
                        $num_back_num += intval($num_back[$ke]);
                    }
                    $user['price_val'] = intval($price_val[0]);
                    $user['num'] = $SnapAvailable;
                    $user['num_back'] = $num_back_num;
                    $user['orprice_val'] = intval($orprice_val[0]);
                    return $user;
                })->toArray();
                if($data) {
                    cache(self::$path['recoGoods']."_$v[date]",$data,$time+2592000);
                }
            }else {
                cache(self::$path['recoGoods']."_$v[date]",null);
            }
        }
    }

    //获取日期缓存缓存
    public static function cacheDate($date) {
        return cache(self::$path['recoGoods']."_$date");
    }

    //删除
    public function del($id) {
        $code = 0;
        $msg = '删除失败';
        if(self::where('recogoods_id','=',$id)->delete()) {
            $msg = '删除成功';
            $code = 1;
        }
        return self::dataJson($code,$msg,'','',true);
    }

    public function show($get,$where=[]) {
        $data = self::where($where)->alias('a')->field('a.*,b.date,c.goods_id,g.username,e.start_time,e.end_time')->join('rushgoods c','c.rushgoods_id=a.rushgoods_id')->join('rushtime e','e.rushtime_id = c.rushtime_id')->join('goods g','g.goods_id=c.goods_id')->join('rushdate b','b.rushdate_id=a.rushdate_id')->paginate($get['limit'],true,['page'=>$get['page']])->toArray();
        $count = self::where($where)->alias('a')->count();
        return self::dataJson(1,'success',[
            'data' => $data['data'],
            'count' => $count,
        ],'',true);
    }

}

?>