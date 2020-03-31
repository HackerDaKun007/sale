<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 用户收藏记录 Model
// +----------------------------------------------------------------------
namespace app\common\model;
use think\Exception;

class Favorite extends Common {

    //dateFlow
    public function add($data) {
        $goods = cache(self::$path['goodsTig']."_$data[goods_id]_$data[rushdate_id]_$data[rushtime_id]");
        $code = 0;
        $msg = '收藏失败';
        if($goods) {
            $data = [
                'user_id' => $data['user_id'],
                'rushdate_id' => $data['rushdate_id'],
                'goods_id' => $data['goods_id'],
                'rushtime_id' => $data['rushtime_id'],
                'price' =>  $goods['sty'][0]['price'],
                'orprice' => $goods['sty'][0]['regular_price'],
                'img' => $goods['home_img'],
                'cancel' => 1,
                'add_time' => time(),
            ];
            $options = [
                // 缓存类型为File
                'type'   => 'File',
                // 缓存有效期为永久有效
                'expire' => 0,
                // 指定缓存目录
                'path'   => dirname(getcwd()).'/runtime/cache/',
            ];
            cache($options);
            $user = cache(self::$path['userFavorite']."_$data[user_id]");
            $arr = [];
            if(!$user) { //不存在，添加缓存
                if(self::isUpdate(false)->save($data)) {
                    $data['favorite_id'] = $this->id;
                    $arr[0] = $data;
                    cache(self::$path['userFavorite']."_$data[user_id]",$arr);
                    $code = 1;
                    $msg = '收藏成功';
                }
            }else {
                $bool = true;
                foreach ($user as $k => $v) {
                    if($v['goods_id'] == $data['goods_id'] && $v['rushdate_id'] == $data['rushdate_id'] && $v['rushtime_id'] == $data['rushtime_id']) {
                        if($v['cancel'] == 1) { //取消收藏
                            $garr['cancel'] = 2;
                            if(self::isUpdate(true)->save($garr,['favorite_id'=>$v['favorite_id']])) {
                                $user[$k]['cancel'] = 2;
                                cache(self::$path['userFavorite']."_$data[user_id]",$user);
                                $code = 1;
                                $msg = '取消收藏成功';
                                $bool = false;
                            }
                        }else { //修改收藏
                            $garr['cancel'] = 1;
                            if(self::isUpdate(true)->save($garr,['favorite_id'=>$v['favorite_id']])) {
                                $user[$k]['cancel'] = 1;
                                cache(self::$path['userFavorite']."_$data[user_id]",$user);
                                $code = 1;
                                $msg = '收藏成功';
                                $bool = false;
                            }
                        }
                        break;
                    }
                }
                if($bool) {
                    if(self::isUpdate(false)->save($data)) {
                        $data['favorite_id'] = $this->id;
                        $user[count($user)] = $data;
                        cache(self::$path['userFavorite']."_$data[user_id]",$user);
                        $code = 1;
                        $msg = '收藏成功';
                    }
                }
            }
        }
        return self::dataJson($code,$msg,'','',true);
    }

    //添加用户收藏缓存
    public static function cacheAdd($val) {
        $data = cache(self::$path['userFavorite']."_$val[user_id]");
        if($data) {
            $data[count($data)] = $val;
        }else {
            $data[0] = $val;
        }
        cache(self::$path['userFavorite']."_$val[user_id]",$data);
    }

    //所有缓存更新缓存
    public static function cacheUpdate($data) {
        Model('User')->field('user_id')->cache(function($user) {
            $data = self::where('user_id','=',$user['user_id'])->order('favorite_id desc')->select()->toArray();
            $arr = [];
            foreach($data as $v) {
                $find = Model('Rushgoods')->cacheGoods($v['goods_id'],$v['rushdate_id'],$v['rushtime_id']);
                $arr[] = [
                    'user_id' => $data['user_id'],
                    'rushdate_id' => $data['rushdate_id'],
                    'goods_id' => $data['goods_id'],
                    'rushtime_id' => $data['rushtime_id'],
                    'price' => $find['sty'][0]['price'],
                    'orprice' => $find['sty'][0]['regular_price'],
                    'img' => $find['home_img'],
                    'add_time' => $data['add_time'],
                ];
            }
            cache(self::$path['userFavorite']."_$user[user_id]",$arr);

        })->select();
//        $k = '';
//        if($favorite) {
//
//        }
    }

    //更新单用户缓存,用户$id
    public static function userUpdate($id) {
        $data = self::where('user_id','=',$id)->order('favorite_id desc')->select()->toArray();
        foreach($data as $v) {
            $find = Model('Rushgoods')->cacheGoods($v['goods_id'],$v['rushdate_id'],$v['rushtime_id']);
            $arr[] = [
                'user_id' => $data['user_id'],
                'rushdate_id' => $data['rushdate_id'],
                'goods_id' => $data['goods_id'],
                'rushtime_id' => $data['rushtime_id'],
                'price' => $find['sty'][0]['price'],
                'orprice' => $find['sty'][0]['regular_price'],
                'img' => $find['home_img'],
                'add_time' => $data['add_time'],
            ];
        }
        cache(self::$path['userFavorite']."_$id",$arr);
        return $arr;
    }

    //读取用户缓存是否存在
    public static function userCache($id) {
        $favorite = cache(self::$path['userFavorite']."_$id");
        return $favorite;
    }

    //删除缓存
    public static function del($data) {
        $favorite = cache(self::$path['userFavorite']."_$data[user_id]");
        $msg = '取消收藏失败';
        $code = 0;
        if(!$favorite['bool']) {
            //判断缓存是否存在
            $key = '';
            foreach($favorite as $k => $v) {
                if($data['favorite_id'] == $v['favorite_id'] && $data['user_id'] == $v['user_id'] && $data['$goods_id'] == $v['$goods_id'] && $data['$rushdate_id'] == $v['$rushdate_id'] && $data['rushtime_id'] == $v['rushtime_id']) {
                    $bool = true;
                    $key = $k;
                    break;
                }
            }
            if($bool) {
                self::startTrans();
                try {
                    if(self::where('favorite_id','=',$data['favorite_id'])->delete()) {
                        array_splice($favorite,$key,1);
                        cache(self::$path['userFavorite']."_$data[user_id]",$favorite);
                        $msg = '成功取消收藏';
                        $code = 1;
                        self::commit();
                    }
                }catch (Exception $e) {
                    $msg = '服务器异常';
                    self::rollback();
                }

            }
        }
        return self::dataJson($code, $msg,'','',true);
    }


    public function show($get,$where=[]) {
        $data = self::where($where)->field('a.* ,b.username,c.date,d.start_time,d.end_time')->order('favorite_id desc')->alias('a')->join('user b','b.user_id=a.user_id')->join('rushdate c','c.rushdate_id=a.rushdate_id')->join('rushtime d','d.rushtime_id=a.rushtime_id')->paginate($get['limit'],true,['page'=>$get['page']])->each(function($user){
            $user['add_time'] = date('Y-m-d H:i:s', $user['add_time']);
            $user['date'] = date('Y-m-d', $user['date']);
            $user['start_time'] = date('H:i:s', $user['start_time']);
            $user['end_time'] = date('H:i:s', $user['end_time']);
            return $user;
        })->toArray();
        $count = self::where($where)->alias('a')->count();
        return self::dataJson(1,'',[
            'data' => $data['data'],
            'count' => $count,
        ],'',true);
    }


}

?>