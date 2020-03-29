<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 权限表列表数据逻辑Model
// +----------------------------------------------------------------------

namespace app\common\model;
class Power extends Common
{
    protected $timeUpdate = true;
    protected static $allow = ['username', 'whether', 'grade', 'level', 'controller', 'method', 'sort', 'url'];

    /**
     * 添加权限列表
     * @param array $data 传入添加数据
     */
    public function add($data) {
        $msg = '添加失败';
        $code = 0;
        if(self::allowField(self::$allow)->isUpdate(false)->save($data)) {
            $msg = '添加成功';
            $code = 1;
            self::cache($data['grade']);
        };
        return self::dataJson($code, $msg, '', '', true);
    }

    /**
     * 修改权限列表
     * @param array $data 传入添加数据
     */
    public function edit($data) {
        $msg = '修改失败';
        $code = 0;
        if(self::allowField(self::$allow)->isUpdate(true)->save($data, ['power_id'=>$data['power_id']])) {
            $msg = '修改成功';
            $code = 1;
            self::cache($data['grade']);
        };
        return self::dataJson($code, $msg, '', '', true);
    }

    /**
     * 删除
     */
    public function del($id) {
        $msg = '删除失败';
        $code = 0;
        if(self::where('power_id','=', $id)->delete()) {
            self::cache(false);
            $msg = '删除成功';
            $code = 1;
        };
        return self::dataJson($code, $msg, '', '', true);
    }

    /**
     * 更新缓存方法
     * @param number\bool $grade 传入等级针对更新等级缓存，为false全部更新
     */
    public static function cache($grade) {
        $model1 = '';
        $model2 = '';
        $model3 = '';
        if($grade == 1 || $grade == 2  || $grade == 3) {
            $model = self::where([['grade', 'eq', $grade]])->order('sort desc')->select()->toArray();
            cache(self::$path['modelPowerW'. $grade], $model);
            if($grade == 1) {
                $model1 = $model;
            }else if($grade == 2) {
                $model2 = $model;
            }else if($grade == 3) {
                $model3 = $model;
            }
        }else {
            $model1 = self::where([['grade', 'eq', 1]])->order('sort desc')->select()->toArray();
            $model2 = self::where([['grade', 'eq', 2]])->order('sort desc')->select()->toArray();
            $model3 = self::where([['grade', 'eq', 3]])->order('sort desc')->select()->toArray();
            cache(self::$path['modelPowerW1'], $model1);
            cache(self::$path['modelPowerW2'], $model2);
            cache(self::$path['modelPowerW3'], $model3);
        }
        self::cacheShow($model1, $model2, $model3);

        //一级权限目录展示，用于友好的判断用户是否存在权限
//        $model = self::order('sort desc')->field('url')->select()->toArray();
//        cache(self::$path['modelPower'], array_column($model, 'url'));
    }

    /**
     * 获取缓存判断是否存在
     */
    public function yzCache($val) {
        $data = cache(self::$path[$val]);
        if(empty($data)) {
            $this->cache(false);
            $data = cache(self::$path[$val]);
        }
        return $data;
    }

    //写入之前操作
    public static function init()
    {
        self::event('before_write', function ($user) {
            if(!empty($user->controller)) {
                $user['url'] = $user->controller . '/' .$user->method;
            }
        });
    }

    /**
     * 更新modelPowerShow缓存
     */
    protected static function cacheShow($data1='', $data2='', $data3='') {
        if(empty($data1)) {
            $data1 = cache(self::$path['modelPowerW1']);
        }if(empty($data2)) {
            $data2 = cache(self::$path['modelPowerW2']);
        }if(empty($data3)) {
            $data3 = cache(self::$path['modelPowerW3']);
        }
        $data = [];
        if(!empty($data1)) {
            foreach ($data1 as $k => $v) {
                $data[$k] = $v;
                if(!empty($data2)) {
                    $num = 0;
                    foreach($data2 as $k2 => $v2) {
                        if($v2['level'] == $v['power_id']) {
                            $data[$k]['grade2'][$num] = $v2;
                            if(!empty($data3)) {
                                foreach($data3 as $k3 => $v3) {
                                    if($v3['level'] == $v2['power_id']) {
                                        $data[$k]['grade2'][$num]['grade3'][] = $v3;
                                    }
                                }
                            }
                            $num ++;
                        }
                    }
                }
            }
            cache(self::$path['modelPowerShow'], $data);
        }

    }

}

?>