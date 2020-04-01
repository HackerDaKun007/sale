<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 角色数据控制
// +----------------------------------------------------------------------
namespace app\common\model;
class Role extends Common {

    protected $allow = ['username', 'admin', 'power_id'];
    protected $timeUpdate = true;
    /**
     * 添加数据
     * @param array $data 添加数组数据
     * @param bool $bool  是否为修改或添加
     * @param array 返回相关状态码数组
     */
    public function add($data, $bool) {
        $data['power_id'] = implode(',', $data['power_id']);
        $id = '';
        $msg = '操作失败';
        $code = 0;
        $where = [];
        $where[] = ['username', 'eq', $data['username']];
        if($bool ==  true) {
            $id = ['role_id'=>$data['role_id']];
            $where[] = ['role_id', 'neq', $data['role_id']];
        }
        //判断名称是否存在
        if(self::where($where)->count()) {
            $msg = '角色名称已经存在';
        }else {
            if(empty($data['admin'])) {
                $data['admin'] = 2;
            }
            if(self::allowField($this->allow)->isUpdate($bool)->save($data, $id)) {
                if($bool == true){
                    self::cacheShow($data['power_id'], $data['role_id'], $data['admin']);
                }else {
                    self::cacheShow($data['power_id'], $this->id, $data['admin']);
                }
                $msg = '操作成功';
                $code = 1;
            };
        }
        return self::dataJson($code, $msg, '', '', true);
    }

    protected static function cacheShow($power_id, $id, $admin) {
        $s = Model('Power')->where([['power_id', 'in', $power_id]])->order('sort desc')->select()->toArray();
        $select = array_column($s, 'url'); //权限表列表根据角色展示权限列表
        $arr['admin'] = $admin;
        $select = $select + $arr;
        $data1 = [];
        $data2 = [];
        foreach ($s as $v) {
            if($v['grade'] == 1) {
                $data1[] = $v;
            }else if($v['grade'] == 2) {
                $data2[] = $v;
            }
        }
        $data = [];
        foreach ($data1 as $k => $v) {
            $data[$k] = $v;
            foreach ($data2 as $ve) {
                if($ve['level'] == $v['power_id']) {
                    $data[$k]['grade2'][] = $ve;
                }
            }
        }
        cache(self::$path['modelRoleShow'] .'_'. $id, $data);
        cache(self::$path['modelRoleSelect'] .'_'. $id, $select);
    }

    //删除
    public function del($id) {
        $msg = '删除失败';
        $code = 0;
        if(self::where('role_id','=', $id)->delete()) {
            cache(self::$path['modelRoleShow'] .'_'. $id, null);
            cache(self::$path['modelRoleSelect'] .'_'. $id, null);
            $msg = '删除成功';
            $code = 1;
        };
        return self::dataJson($code, $msg, '', '', true);
    }

    //展示
    public function show($get,$where=[]) {
        $select = self::where($where)->order('role_id desc')->paginate($get['limit'],true, ['page'=>$get['page']])->toArray();
        $count = self::where($where)->count();
        return self::dataJson(1,'success', ['data'=>$select['data'],'count'=>$count],'',true);
    }
    //判断缓存是否存在
    public function modelRoleSelect($id) {
        $data = cache(self::$path['modelRoleSelect'] .'_'. $id);  //获取角色权限路径
        if(!$data) {
            $find = self::where('role_id', '=', $id)->find();
            if($find) {
                self::cacheShow($find['power_id'], $id, $find['admin']);
                $data = cache(self::$path['modelRoleSelect'] .'_'. $id);  //获取角色权限路径
            }
        }
        return $data;
    }

}
?>