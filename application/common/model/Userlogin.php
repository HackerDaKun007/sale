<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 用户近期登陆记录 model
// +----------------------------------------------------------------------
namespace app\common\model;
class Userlogin extends Common {

    //添加用户最近登陆
    public function add($userId) {
        $ip = self::Ipaddr();
        $data = [
            'user_id' => $userId,
            'ip' => self::passIp($ip['ip']),
            'ip_adder' => $ip['country'],
            'login_time' => time(),
        ];
        self::isUpdate(false)->allowField(true)->save($data,false);
    }

    //展示
    public function show($get,$where=[]) {
        $data = self::where($where)->field('a.* ,b.username')->order('userlogin_id desc')->alias('a')->join('user b','b.user_id=a.user_id')->paginate($get['limit'],true,['page'=>$get['page']])->each(function($user){
            $user['login_time'] = date('Y-m-d H:i:s', $user['login_time']);
            $user['ip'] = Long2ip($user['ip']);
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

