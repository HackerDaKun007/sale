<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 用户收货地址 model
// +----------------------------------------------------------------------
namespace app\common\model;
use think\Exception;

class Useraddress extends Common {

    protected $timeUpdate = true;

    //添加/修改地址
    public function editAdd($data,$bool=false) {
        $allow = ['user_id','username','tel','area','adder'];
        $id = $bool?['useraddress_id'=>$data['useraddress_id']]:$bool;
        $code = 0;
        $msg = $bool?'修改失败':'添加失败';
        self::startTrans();
        try {
            if(self::isUpdate($bool)->allowField($allow)->save($data,$id)) {
//                $data['useraddress_id'] = $bool?$data['useraddress_id']:$this->id;
                $msg = $bool?'修改成功':'添加成功';
                $code = 1;
                self::addCache(true,$data['user_id']);
                self::commit();
            }
        }catch(Exception $e) {
            $msg = '服务器异常';
            self::rollback();
        }
        return self::dataJson($code,$msg,'','',true);
    }

    //写入缓存
    public static function addCache($bool=false,$id='') {
        $data = cache(self::$path['UserAdder'].$id);
        if($data || $bool) {
            $data = self::where('user_id','=',$id)->order('useraddress_id desc')->select()->toArray();
            cache(self::$path['UserAdder'].$id,$data);
        }
        return $data;
    }

    //修改缓存
    public static function editCache($val) {
        $data = cache(self::$path['UserAdder']."$val[user_id]");
        if($data) {
            foreach($data as $k => $v) {
                if($v['useraddress_id'] == $val['useraddress_id']) {
                    $data[$k] = $val;
                    cache(self::$path['UserAdder']."$val[user_id]",$data);
                    break;
                }
            }
        }
    }

    //更新单用户缓存,用户$id
    public static function userUpdate($id) {
        $data = [];
        $data = self::where('user_id','=',$id)->field('user_id,username,tel,area,adder,useraddress_id')->order('useraddress_id desc')->select()->toArray();
        cache(self::$path['UserAdder']."$id",$data);
        return $data;
    }

    //读取缓存
    public static function userCache($id) {
        $UserAdder = cache(self::$path['UserAdder']."$id");
        return $UserAdder;
    }

    //更新全部缓存
    public static function cacheUpdate() {
        $user = Model('User')->field('user_id')->select()->toArray();
        if($user) {
            foreach($user as $k => $v) {
                $data = self::where('user_id','=',$v['user_id'])->field('user_id,username,tel,area,adder,useraddress_id')->select()->toArray();
                cache(self::$path['UserAdder']."$v[user_id]",$data);
            }
        }
    }

    public function show($get,$where=[]) {
        $data = self::where($where)->field('a.* ,b.username as user')->order('useraddress_id desc')->alias('a')->join('user b','b.user_id=a.user_id')->paginate($get['limit'],true,['page'=>$get['page']])->toArray();
        $count = self::where($where)->alias('a')->count();
        return self::dataJson(1,'',[
            'data' => $data['data'],
            'count' => $count,
        ],'',true);
    }

    //删除
    public function del($data) {
        $code = 0;
        $msg = '删除失败';
        $where = [
            ['user_id','=',$data['user_id']],
            ['useraddress_id','=',$data['useraddress_id']],
        ];
        self::startTrans();
        try {
            if(self::where($where)->delete()) {
                self::addCache(true,$data['user_id']);
                $code = 1;
                $msg = '删除成功';
                self::commit();
            }
        }catch (Exception $e) {
            $msg = '服务器异常';
            self::rollback();
        }
        return self::dataJson($code,$msg,'','',true);
    }

}

?>