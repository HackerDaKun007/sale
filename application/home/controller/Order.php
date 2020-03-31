<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 前台首页
// +----------------------------------------------------------------------
namespace app\home\controller;
class Order extends Common
{
    //
    public function myorder() {

        return view('',[
            'data' => cache(self::$path['UserOrderId']."_".self::$userId),
        ]);
    }


    //订单提交
    public function order() {
        $input = self::$reques->get();
        if(!empty($input['id']) && !empty($input['date_id']) && !empty($input['time_id'])) {
            if(is_numeric($input['id']) && is_numeric($input['time_id']) && is_numeric($input['date_id']) ) {
                $goods = Model('Rushgoods')->cacheGoods($input['id'],$input['date_id'],$input['time_id']);
                if($goods) {
                    return view('',[
                        'goods' => $goods,
                        'useraddress' => Model('Useraddress')->userCache(self::$userId),
                    ]);
                    exit;
                }
            }
        }
        require(self::$server404);
    }

    public function orderconfirm() {
        $input = self::$reques->get();
        if(!empty($input['id'])) {
            $id = self::repassJie($input['id']);
            if(is_numeric($id)) {
                $data = cache(self::$path['Userorder']."_".$id );
                if($data) {
                    if($data['user_id'] == self::$userId) {
                        return view('',[
                            'time' => date('Y-m-d H:i:s',$data['create_time']),
                            'number' => $data['order_number'],
                            'id' => $input['id'],
                        ]);
                        exit;
                    }
                }
            }
        }
       require(self::$server404);
    }

    public function orderdetail() {

        $input = self::$reques->get();
        if(!empty($input['id'])) {
            $id = self::repassJie($input['id']);
            if(is_numeric($id)) {
                $data = cache(self::$path['Userorder']."_".$id );
                if($data) {
                    if($data['user_id'] == self::$userId) {
                        unset($data['user_id']);
                        unset($data['goods_id']);
                        unset($data['ip']);
                        unset($data['ipadder']);
                        unset($data['order_id']);
                        return view('',[
                            'data' => $data,
                        ]);
                        exit;
                    }
                }
            }
        }
       require(self::$server404);
    }

    //订单提交接口
    public function addorder() {
        $code = 0;
        $msg = 'error';
        $url = '';
        if(self::yzPost()) {
            $input = self::$reques->post();
            $validate = Validate('Order');

            if(!$validate->scene('goods')->check($input)) {
                $msg = $validate->getError();
            }else {
                $goods = Model('Rushgoods')->cacheGoods($input['goods_id'],$input['rushdate_id'],$input['rushtime_id']);
                if($goods) {
                    if($goods['start_time'] <= self::$serverTimeEnd && $goods['end_time'] >= self::$serverTimeEnd) {
                        //判断收货地址
                        $address = Model('Useraddress')->userCache(self::$userId);
                        $bool = false;
                        $data = $input;
                        if($address) { //如果地址存在，判断提交过来的地址ID
                            if(!empty($input['useraddress_id'])) {
                                foreach($address as $v) {
                                    if($v['useraddress_id'] == $input['useraddress_id']) {
                                        $bool = true;
                                        $data['username'] = $v['username'];
                                        $data['tel'] = $v['tel'];
                                        $data['area'] = $v['area'];
                                        $data['adder'] = $v['adder'];
                                        break;
                                    }
                                }
                            }else {
                                $msg = '请选择收货地址';
                            }
                        }
                        //判断地址数据
                        if(!$validate->scene('user')->check($data)) {
                            $msg = $validate->getError();
                        }else {
                            $data['user_id'] = self::$userId;
                            $model = Model('Order')->add($data,$goods,$bool);
                            $msg = $model['msg'];
                            $code = $model['code'];
                            $url = '/home/order/orderconfirm.html?id='.self::respass($model['data']);
                        }
                    }
                }
            }
        }
        echo self::dataJson($code,$msg,'',$url);
    }
}
