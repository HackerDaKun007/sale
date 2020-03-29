<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 绑定抢购商品
// +----------------------------------------------------------------------

namespace app\common\model;
class Rushgoods extends Common {

    protected $timeUpdate = true;
    //添加
    public function editAdd($data,$bool=false) {
        $allow = ['rushdate_id','rushtime_id','goods_id','price_val','num','num_back','style_id','orprice_val'];
        $id = false;
        $code = 0;
        $msg = $bool?'修改失败':'添加失败';
        $where = [
            ['rushdate_id','eq',$data['rushdate_id']],
            ['rushtime_id','eq',$data['rushtime_id']],
            ['goods_id','eq',$data['goods_id']],
        ];
        if($bool) {
            $id = ['rushgoods_id' => $data['rushgoods_id']];
            $where[] = ['rushgoods_id','neq',$data['rushgoods_id']];
        }
        if(self::where($where)->count()) {
            $msg = '当前日期时间抢购商品已存在';
        }else{
            if(self::isUpdate($bool)->allowField($allow)->save($data,$id)) {
                $code = 1;
                $msg = $bool?'修改成功':'添加成功';
            }
        }
        return self::dataJson($code,$msg,'','',true);
    }

    /**
     * 更新日期所有产品缓存
     * @param $date 日期时间戳
     * @return mixed
     */
    public static function updateCache($date) {
        $time = strtotime(date('Ymd'));
        $rushdate = false;
        if($date >= $time) {
            $rushdate = Model('Rushtime')->cacheSelect(false,['date'=>$date]);
            $wh = [];
            if($rushdate) {
                $rushgoods = Model('Rushgoods');
                $num = 0;
                foreach($rushdate['rushtime'] as $k => $v) {
                    $where = [
                        ['a.rushdate_id','eq',$rushdate['rushdate_id']],
                        ['a.rushtime_id','eq',$v['rushtime_id']],
                    ];
                    $arr = $rushgoods->where($where)->where('b.shelves','=',1)->field('a.rushgoods_id,a.rushtime_id,a.rushdate_id,a.num_back,a.price_val,a.num,b.home_img,b.username,a.orprice_val,a.goods_id,c.start_time,c.end_time,d.date')->join('goods b','b.goods_id=a.goods_id')->alias('a')->join('rushtime c','c.rushtime_id = a.rushtime_id')->join('rushdate d','d.rushdate_id=a.rushdate_id')->select()->each(function($user) {
                        $time = strtotime(date('Ymd'));
                        $price_val = explode('/',$user['price_val']);
                        $num = explode('/',$user['num']);
                        $orprice_val = explode('/',$user['orprice_val']);
                        $num_back = explode('/',$user['num_back']);
                        $SnapAvailable = 0;
                        $num_back_num = 0;
                        foreach($num as $ke => $ve) {
                            $SnapAvailable += intval($ve);
                            $num_back_num += intval($num_back[$ke]);
                        }
                        $goods = Model('Goods');
                        $goodsData = $goods->cacheSelect(false,$user['goods_id']);
                        $goodsData['rushtime'] = 200;
                        $sty = [];
                        foreach($goodsData['sty'] as $ke => $ve) {
                            $sty[] = [
                                'goodsstyle_id' => $ve['goodsstyle_id'],
                                'username' => $ve['username'],
                                'price' => intval($price_val[$ke]),
                                'regular_price' => intval($orprice_val[$ke]),
                                'available' => intval($num[$ke]),
                                'bak_available' => intval($num_back[$ke]),
                                'sort' => $ve['sort'],
                            ];
                        }
                        $goodsData['sty'] = $sty;
                        $goodsData['rushgoods_id'] = $user['rushgoods_id'];
                        $goodsData['date'] = $user['date'];
                        $goodsData['start_time'] = $user['start_time'];
                        $goodsData['end_time'] = $user['end_time'];
//                    echo self::$path['goodsTig']."_$user[goods_id]_$user[rushdate_id]_$user[rushtime_id]";
                        cache(self::$path['goodsTig']."_$user[goods_id]_$user[rushdate_id]_$user[rushtime_id]",$goodsData,$time+2592000);
                        $user['price_val'] = intval($price_val[0]);
                        $user['num'] = $SnapAvailable;
                        $user['num_back'] = $num_back_num;
                        $user['orprice_val'] = intval($orprice_val[0]);
                        $user['home_img'] = self::$path['uploadEnd'].$user['home_img'];
                        return $user;
                    })->toArray();
                    if(!empty($arr)) {
                        $wh[$num] = $v;
                        $wh[$num]['goods'] = $arr;
                        $num ++;
                    }
                }
                $rushdate['rushtime'] = $wh;
                cache(self::$path['goodsTime']."_$date",$rushdate,$time+2592000);
            }else {
                cache(self::$path['goodsTime']."_$date",null);
            }
        }
        return $rushdate;
    }

    /**
     * 获取日期所有产品缓存
     * @param $date 日期时间戳
     * @return mixed
     */
    public static function cacheSelect($date) {
        $time = strtotime(date('Ymd'));
        $data = false;
        if($date >= $time) {
            $data = cache(self::$path['goodsTime']."_$date");
            if(!$data) {
                $data = self::updateCache($date);
                cache(self::$path['goodsTime']."_$date", $data,$time+2592000);
            }
        }
        return $data;
    }

    /**
     * 获取单个产品缓存
     * @param $goods_id   产品ID
     * @param $rushdate_id 日期ID
     * @param $rushtime_id  时间ID
     * @return mixed
     */
    public static function cacheGoods($goods_id,$rushdate_id,$rushtime_id) {
        return cache(self::$path['goodsTig']."_$goods_id"."_$rushdate_id"."_$rushtime_id");
    }
    //删除
    public function del($id) {
        $code = 0;
        $msg = '删除失败';
        if(self::where('rushgoods_id','=',$id)->delete()) {
            $code = 1;
            $msg = '删除成功';
        }
        return self::dataJson($code,$msg,'','',true);
    }


    /**
     * 展示数据
     */
    public function show($get,$where=[]) {
        $goUser = '';
        $goId = '';
        if(!empty($get['username'])) {
            $goUser = "g.username like '%$get[username]%'";
        }if(!empty($get['goods_id'])) {
            $goId = "g.goods_id = $get[goods_id]";
        }
        $data = self::where($where)->where($goUser)->where($goId)->where('g.shelves','=',1)->field('a.*,b.date,c.start_time,c.end_time,g.username')->join('goods g','g.goods_id=a.goods_id')->alias('a')->join('rushdate b', 'b.rushdate_id = a.rushdate_id')->join('rushtime c','c.rushtime_id = a.rushtime_id')->order('a.rushgoods_id asc')->paginate($get['limit'],true,['page'=>$get['page']])->toArray();
        $count = self::where($where)->alias('a')->where($goId)->where('g.shelves','=',1)->join('goods g','g.goods_id=a.goods_id')->alias('a')->join('rushdate b', 'b.rushdate_id = a.rushdate_id')->join('rushtime c','c.rushtime_id = a.rushtime_id')->count();
        return self::dataJson(1,'', [
            'data' => $data['data'],
            'count' => $count,
        ],'',true);
    }

}

?>