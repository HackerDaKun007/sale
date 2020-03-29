<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 订单信息
// +----------------------------------------------------------------------
namespace app\common\model;
use think\Exception;

class Order extends Common {
    protected $timeUpdate = true;
    /**
     * 添加
     */
    public function add($data) {
        $allow = ['user_id','payment','username','tel','area','adder','goods_id','goods_user','price','freight','order_status','express','express_number','order_number','user_back'];
        $timeR = strtotime(date('Ymd'));
        $times = strtotime(date('His'));
        $time = strtotime(date('YmdHis'));
        //判断当前用户是否重复提交多次订单

        $code = 0;
        $msg = '提交订单失败';
        //判断提交过来商品缓存是否存在
        $goods = Model('Rushgoods')->cacheGoods($data['goods_id'],$data['rushdate_id'],$data['rushtime_id']);
        if($goods) {
            if($goods['date']==$timeR && $goods['start_time']<=$times && $goods['end_time']>=$times) {
                $where = [
                    ['time','=',$timeR],
                    ['user_id','=',$data['user_id']]
                ];
                $user = self::where($where)->count();
                if($user > 5) {
                    $msg = '同一天重复购买的商品不能超过5次';
                }else {
                    //判断收货地址ID是否存在
                    if(!empty($data['useraddress_id'])) {
                        $useraddress = Model('Useraddress')->userCache($data['user_id']);
                        if($useraddress) {
                            foreach($useraddress as $v) {
                                if($v['useraddress_id'] ==  $data['useraddress_id']) {
                                    $data['username'] = $v['username'];
                                    $data['tel'] = $v['tel'];
                                    $data['area'] = $v['area'];
                                    $data['adder'] = $v['adder'];
                                    break;
                                }
                            }
                        }
                    }
                    //获取款式ID和名称
                    $price = 0;
                    $goods_style = '';
                    if($goods['num'] > 0) {//判断库存是否

                        foreach($goods['sty'] as $k => $v) {
                            if($v['goods_style_id'] = $v['goodsstyle_id']) {
                                $price = $v['price'];
                                $goods_style = $v['username'];
                                $goods['sty'][$k]['available'] = $goods['sty'][$k]['available']-1;
                            }
                        }
                        $goods['num'] = $goods['num']-1;
                        $sty = implode('/',$goods['sty']);
                        if($price != 0) {
                            $num = substr(str_shuffle('12345678909876543214315678912345987'),0,8);
                            $arr = [
                                'user_id' => $data['user_id'],
                                'payment' => 1,
                                'username' => $data['username'],
                                'tel' => $data['tel'],
                                'area' => $data['area'],
                                'adder' => $data['adder'],
                                'goods_id' => $goods['goods_id'],
                                'goods_user' => $goods['username'],
                                'goods_style' => $goods_style,
                                'price' => $price,
                                'freight' => $goods['freight'],
                                'order_status' => 1,
                                'order_number' => $num,
                                'express' => '尚未有快递公司',
                                'express_number' => '无',
                                'time' => $timeR,
                                'user_back' => $data['user_back'],
                                'number' => $data['number'],
                            ];
                            self::startTrans();
                            try {
                                if(self::isUpdate(false)->allowField($allow)->save($arr)) {
                                    $arr['order_id'] = $this->id;
                                    $rushgoods = [
                                        'num' =>$sty
                                    ];
                                    if(Model('Rushgoods')->save($rushgoods,['rushgoods_id',$goods['rushgoods_id']])){
                                        cache(self::$path['goodsTig']."_$data[goods_id]_$data[rushdate_id]_$data[rushtime_id]",$goods,$time+2592000);
                                        self::addCache($arr);
                                    };
                                    $msg = '添加成功';
                                    $code = 1;
                                    self::commit();
                                }
                            }catch (Exception $e) {
                                $msg = '很抱歉，服务器异常！';
                                self::rollback();
                            }
                        }else {
                            $msg = '收货地址异常';
                        }
                    }else {
                        $msg = '很抱歉，当前库存不足！';
                    }
                }
            }
        }
        return self::dataJson($code,$msg,'','',true);
    }

    //添加缓存
    public static function addCache($val) {
        $data = cache(self::$path['Userorder']."_$val[user_id]");
        if($data) {
            $data[count($data)] = $data;
        }else {
            $data[0] = $data;
        }
        cache(self::$path['Userorder']."_$val[user_id]",$data);
    }

    //修改
    public static function saveCache($val) {
        $data = cache(self::$path['Userorder']."_$val[user_id]");
        if($data) {
            foreach($data as $k => $v) {
                if($val['order_id'] == $v['order_id']) {
                    $arr = [
                        'user_id' => $v['user_id'],
                        'payment' => $val['payment'],
                        'username' => $val['username'],
                        'tel' => $val['tel'],
                        'area' => $val['area'],
                        'adder' => $val['adder'],
                        'goods_id' => $val['goods_id'],
                        'goods_user' => $val['username'],
                        'goods_style' => $val['goods_style'],
                        'price' => $val['price'],
                        'freight' => $val['freight'],
                        'order_status' => $val['order_status'],
                        'order_number' => $data['order_number'],
                        'express' => $val['express'],
                        'express_number' => $val['express_number'],
                        'time' => $data['time'],
                        'user_back' => $data['user_back'],
                        'number' => $val['number'],
                    ];
                    $data[$k] = $arr;
                    break;
                }
            }
            cache(self::$path['Userorder']."_$val[user_id]",$data);
        }
    }

    //修改数据库
    public function edit($data) {
        $allow = ['payment','number','price','os_user_back','freight','order_status','express','express_number','order_number','username','tel','area','adder','goods_id','goods_user','goods_style'];
        $code = '修改失败';
        $msg = 0;
        self::startTrans();
        try {
            if(self::isUpdate(true)->allowField($allow)->save($data,['order_id'=>$data['order_id']])) {
                self::saveCache($data);
                $code = '修改成功';
                $msg = 1;
                self::commit();
            }
        }catch (Exception $e) {
            $msg = '服务器异常';
            self::rollback();
        }

        return self::dataJson($code,$msg,'','',true);
    }

    //展示数据
    public function show($get,$where=[]) {
        $select = self::where($where)->order('order_id desc')->paginate($get['limit'], true, ['page'=>$get['page']])->each(function($user){
            foreach(self::$path['goodsStatus'] as $k => $v) {
                if($k == $user['order_status']) {
                    $user['status'] = $v;
                    break;
                }
            }
            return $user;
        })->toArray();
        $count = self::where($where)->count();
        return self::dataJson(1, 'success', ['data'=>$select['data'], 'count'=>$count], '', true);
    }
}

?>