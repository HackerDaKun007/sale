<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 登陆记录器
// +----------------------------------------------------------------------
namespace app\common\model;
class Adminrecord extends Common {

    //添加登陆操作
    public function add($id, $time) {
        $data = [
            'admin_id' => $id,
            'record_time' => $time,
            'ip' => self::passIp(),
            'ipaddr' => self::Ipaddr()['country'],
            'bro' => self::GetBrowser(false),
            'os' => self::GetOs(false),
        ];
        self::allowField(['admin_id', 'record_time','ip','ipaddr','bro','os'])->isUpdate(false)->save($data);
    }

    //展示
    public function show($get,$where=[]) {
        $username = '';
        if(!empty($get['username'])) {
            $username = "b.username like '%$get[username]%'";
        }
        $data = self::where($username)->where($where)->field('a.*,b.username')->alias('a')->join('admin b',"b.admin_id = a.admin_id")->order('a.adminrecord_id desc')->paginate($get['limit'],true, ['page'=>$get['page']])->each(function($user) {
            $user['ip'] = Long2ip($user['ip']);
            return $user;
        })->toArray();
//        $data = self::where($where)->field('a.*,b.username')->alias('a')->join('admin b',"b.admin_id = a.admin_id")->order('a.admin_id desc')->paginate($get['limit'],true, ['page'=>$get['page']])->toArray();
        $count = self::where($where)->where($username)->alias('a')->join('admin b',"b.admin_id = a.admin_id")->count();
        return self::dataJson(1, 'success', ['data'=>$data['data'], 'count'=>$count], '', true);
    }

    //删除
    public function del($id) {
        $code = 0;
        $msg = '删除失败';
        if(self::where('adminrecord_id','=',$id)->delete()) {
            $code = 1;
            $msg = '删除成功';
        }
        return self::dataJson($code,$msg,'','',true);
    }

}
?>