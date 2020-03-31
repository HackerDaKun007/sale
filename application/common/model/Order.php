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
    public function add($data,$goods,$bool) {
        $allow = ['ip','ipadder','user_id','payment','username','tel','area','adder','goods_id','goods_user','price','freight','order_status','express','express_number','order_number','user_back','goods_style','number','time','zoprice','img'];
        $timeR = strtotime(date('Ymd'));
        $times = strtotime(date('His'));
        $time = strtotime(date('YmdHis'));
        //判断当前用户是否重复提交多次订单
        $dataId = '';
        $code = 0;
        $num = 0;
       
        $msg = '提交订单失败';

            $where = [
                ['time','eq',$timeR],
                ['user_id','eq',$data['user_id']],
                ['goods_id','eq',$data['goods_id']]
            ];
            $user = self::where($where)->select()->toArray();
            $userNumber = 0;
            foreach ($user as $v) {
                $userNumber += $v['number'];
            }
            if($userNumber >= 5) {
                $msg = '同一天重复购买的商品数量不能超过5件';
            }else {
            //获取款式ID和名称
            $price = 0;
            $goods_style = '';
            $number = [];
            $styleNum = 0;
            foreach($goods['sty'] as $k => $v) {
                if($data['goodsstyle_id'] == $v['goodsstyle_id']) {
                    $price = $v['price'];
                    $goods_style = $v['username'];
                    $goods['sty'][$k]['available'] = $goods['sty'][$k]['available']-$data['number'];
                    $number[] = $goods['sty'][$k]['available'];
                    $styleNum = $goods['sty'][$k]['available'];
                }else {
                    $number[] = $goods['sty'][$k]['available'];
                }
            }
            
            if($styleNum > 0) {
                // $sty = implode('/',$goods['sty']);
                if($price != 0) {
                    $ip = self::Ipaddr();
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
                        'zoprice' => $price*$data['number'],
                        'freight' => $goods['freight'],
                        'order_status' => 1,
                        'order_number' => $num,
                        'express' => '尚未有快递公司',
                        'express_number' => '无',
                        'time' => $timeR,
                        'img' => $goods['home_img'],
                        'user_back' => $data['user_back'],
                        'number' => $data['number'],
                        'ip' => self::passIp($ip['ip']),
                        'ipadder' => $ip['country'],
                    ];
                    self::startTrans();
                    try {
                        if(self::isUpdate(false)->allowField($allow)->save($arr)) {
                            $arr['order_id'] = $this->id;
                            $dataId = $this->id;
                            $arr['create_time'] = time();
                            $msg = '提交成功';
                            $code = 1;
                            //是否要添加地址
                            if(!$bool) {
                                Model('Useraddress')->editAdd($data);
                            }
                            //更新数据库
                            // var_dump(Model('Rushgoods')->isUpdate(true)->save(['num'=>implode('/',$number)],['rushgoods_id'=>$goods['rushgoods_id']]));
                            if(Model('Rushgoods')->isUpdate(true)->save(['num'=>implode('/',$number)],['rushgoods_id'=>$goods['rushgoods_id']])) {
                                //更新独立订单缓存
                                cache(self::$path['goodsTig']."_$data[goods_id]"."_$data[rushdate_id]"."_$data[rushtime_id]",$goods,self::$path['time30']);
                                //更新首页推荐
                                $recoGoods = cache(self::$path['recoGoods']."_$timeR");
                                if($recoGoods) {
                                    foreach ($recoGoods as $k => $v) {
                                        if($v['rushgoods_id'] == $goods['rushgoods_id']) {
                                            $recoGoods[$k]['num'] = $recoGoods[$k]['num']-1;
                                            break;
                                        }
                                    }
                                    cache(self::$path['recoGoods']."_$timeR",$recoGoods,self::$path['time30']);
                                }
                                //更新首页抢购商品缓存
                                Model('Rushgoods')->updateCache($timeR);
                                $options = [
                                    // 缓存类型为File
                                   'type'   => 'File', 
                                    // 缓存有效期为永久有效
                                   'expire' => 0,
                                    // 指定缓存目录
                                   'path'   => dirname(getcwd()).'/runtime/cache/', 
                               ];
                               cache($options);
                                cache(self::$path['Userorder']."_$num",$arr);
                                $userDataArray = [
                                    'user_id' => $data['user_id'],
                                    'payment' => 1,
                                    'goods_user' => $goods['username'],
                                    'number' => $data['number'],
                                    'order_status' => 1,
                                    'order_number' => $num,
                                    'price' => $price,
                                    'zoprice' => $price*$data['number'],
                                    'img' => $goods['home_img'],
                                    'order_number_pass' => self::respass($num),
                                ];
                                $userData = cache(self::$path['UserOrderIdUser']."_$data[user_id]");
                                $userDataArr = [];
                                if($userData) {
                                    $userDataArr[count($userData)] = $userDataArray;
                                }else {
                                    $userDataArr[0] = $userDataArray;
                                }
                                cache(self::$path['UserOrderIdUser']."_$data[user_id]",$userDataArr);
                            };
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
        return self::dataJson($code,$msg,$num,'',true);
    }

    //添加缓存
    public static function addCache($val) {
        $data = cache(self::$path['Userorder']."_$val[user_id]");
        if($data) {
            $data[count($data)] = $val;
        }else {
            $data[0] = $val;
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
            $user['ip'] = Long2ip($user['ip']);
            return $user;
        })->toArray();
        $count = self::where($where)->count();
        return self::dataJson(1, 'success', ['data'=>$select['data'], 'count'=>$count], '', true);
    }


    //系统修改
    public function osedit($data) {
        $code = 0;
        $msg = '修改失败';
        $allow = ['username','tel','area','adder','order_status','os_back','user_back','express','express_number'];

        self::startTrans();
        try {
            if(self::isUpdate(true)->allowField($allow)->save($data,['order_id'=>$data['order_id']])) {
                $find = self::where('order_id','=',$data['order_id'])->find();
                if($find) {
                    $find = json_decode($find,true);
                    $options = [
                        // 缓存类型为File
                        'type'   => 'File',
                        // 缓存有效期为永久有效
                        'expire' => 0,
                        // 指定缓存目录
                        'path'   => dirname(getcwd()).'/runtime/cache/',
                    ];
                    cache($options);
                    cache(self::$path['Userorder']."_$find[order_number]",$find);
                    $sel = self::where('order_id','=',$data['order_id'])->order('order_id asc')->field('user_id,payment,goods_user,number,order_status,order_number,price,zoprice,img')->select()->each(function($user) {
                        $user['order_number_pass'] =  self::respass($user['order_number']);
                    })->toArray();
                    cache(self::$path['UserOrderIdUser']."_$find[user_id]",$sel);
                }
                 self::commit();
                $msg = '修改成功';
                $code = 1;
            }
        }catch (Exception $e) {
            $msg = '服务器异常';
            self::rollback();
        }
        return self::dataJson($code,$msg,'','',true);
    }

    //更新订单所有缓存
    public function uploadOrder() {
        $options = [
            // 缓存类型为File
            'type'   => 'File',
            // 缓存有效期为永久有效
            'expire' => 0,
            // 指定缓存目录
            'path'   => dirname(getcwd()).'/runtime/cache/',
        ];
        cache($options);
        $select = self::order('order_id asc')->select()->each(function($user){
            //更新所有单个缓存
            cache(self::$path['Userorder']."_$user[order_number]",$user);
        })->toArray();
        if($select) {
            $user_id = array_column($select,'user_id');
            $unique = array_unique($user_id);
            foreach ($unique as $v) {
                $select = self::where('user_id','=',$v)->field('user_id,payment,goods_user,number,order_status,order_number,price,zoprice,img')->order('order_id asc')->select()->toArray();
                cache(self::$path['UserOrderIdUser']."_$v",$select);
            }
        }
    }

}

?>