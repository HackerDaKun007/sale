<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | uv
// +----------------------------------------------------------------------
namespace app\common\model;
class Uv extends Common {
    public function add($data,$bool=false,$time) {
        $ip = self::Ipaddr();
        $path = cache(self::$path['uv']."_$data[date]");
        if(!$bool) { //添加
            $arr = [
                'ip' => self::passIp($ip['ip']),
                'ipadder' => $ip['country'],
                'addtime' => time(),
                'flowdate_id' => $data['flowdate_id'],
            ];
            if(self::isUpdate(false)->save($arr)) {
                $arr['uv_id'] = $this->id;
                if($path) {
                    $path[count($path)] = $arr;
                    $num['uv'] = $data['uv']+1;
                    Model('Flowdate')->isUpdate(true)->save($num,['flowdate_id'=>$data['flowdate_id']]);
                }else {
                    $path = [];
                    $path[0] = $arr;
                }
                cache(self::$path['uv']."_$data[date]",$path,$time);
                //修改流量日期uv次数

            }
        }else {
            $bool = false;
            foreach($path as $k => $v) {
                if($v['ip'] == self::passIp($ip['ip'])) {
                    $bool = true;
                    break;
                }
            }
            if(!$bool) {
                $this->add($data,false,$time);
            }
        }
    }

    //展示
    public function show($get,$where) {
        $data = self::where($where)->order('uv_id desc')->paginate($get['limit'],true,['page'=>$get['page']])->each(function ($user){
            $user['ip'] = Long2ip($user['ip']);
            return $user;
        })->toArray();
        $count = self::where($where)->count();
        return self::dataJson(1,'success',[
            'data' => $data['data'],
            'count' => $count,
        ],'',true);
    }
}
?>