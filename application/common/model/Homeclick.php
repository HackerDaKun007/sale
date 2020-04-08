<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 获取首页点击事件
// +----------------------------------------------------------------------
namespace app\common\model;

class Homeclick extends Common {

    public function add($date, $bool=true, $cache, $id) {
        $path = $cache::get(self::$path['Homeclick']."_$date");
        $ip = self::Ipaddr();
        if($bool) { //添加
            $data = [
                'homedate_id' => $id,
                'ip' => self::passIp($ip['ip']),
                'ipadder' => $ip['country'],
                'number' => 1,
                'addtime' => time(),
            ];

            if(self::isUpdate(false)->save($data)) {
                $data['homeclick_id'] = $this->id;
                if($path) {
                    $path[count($path)] = $data;
                }else {
                    $path = [];
                    $path[0] = $data;
                }
                $cache::set(self::$path['Homeclick']."_$date",$path,self::$path['time1']);
            }
        }else { //修改
            $bool = false;
            $key = '';
            $id = '';
            $num = 0;
            if($path && is_array($path)) {
                foreach($path as $k => $v) {
                    if($v['ip'] == self::passIp($ip['ip'])) {
                        $bool = true;
                        $key = $k;
                        $id = $v['homeclick_id'];
                        $num = $v['number']+1;
                        break;
                    }
                }
            }
           
            if($bool) {  //true
                //修改
                $da['number'] = $num;
                if(self::isUpdate(true)->save($da,['homeclick_id'=>$id])) {
                    $path[$key]['number'] = $num;
                    $cache::set(self::$path['Homeclick']."_$date", $path, self::$path['time1']);
                }

            }else {
                //添加
               $this->add($date,true,$cache,$id);
            }
        }
    }

    //展示
    public function show($get,$where) {
        $data = self::where($where)->order('homeclick_id desc')->paginate($get['limit'],true,['page'=>$get['page']])->each(function($user) {
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