<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 权限表列表控制器controller
// +----------------------------------------------------------------------

namespace app\admin\controller;

class Power extends Common {

    protected static $validate = 'Power';

    /**
     * 展示权限列表
     */
    public function index() {
        $model = Model(self::$validate);
        return view('', [
            'controller' => self::controller(false),
            'PowerW1' => json_encode($model->yzCache('modelPowerW1')),
            'PowerW2' => json_encode($model->yzCache('modelPowerW2')),
            'PowerW3' => json_encode($model->yzCache('modelPowerW3')),
            'cacheShow' => self::$Authority,
        ]);
    }

    /**
     * 添加权限列表
     */
    public function add() {
        $msg = 'error';
        $code = 0;
        $data = input('post.');
        if(self::yzPostAdd()) {
            $validate = validate(self::$validate);
            if(!$validate->scene('add')->check($data)) {
                $msg = $validate->getError();
            }else {
                $model = Model(self::$validate)->add($data);
                $code = $model['code'];
                $msg = $model['msg'];
            };
        }
        echo self::dataJson($code, $msg);
    }

    /**
     * 修改权限列表
     */
    public function edit() {
        $msg = 'error';
        $code = 0;
        $data = input('post.');
        if(self::yzPostAdd()) {
            $validate = validate(self::$validate);
            if(!$validate->scene('edit')->check($data)) {
                $msg = $validate->getError();
            }else {
                $model = Model(self::$validate)->edit($data);
                $code = $model['code'];
                $msg = $model['msg'];
            };
        }
        echo self::dataJson($code, $msg);
    }

    /**
     * 删除权限
     */
    public function del() {
        $msg = 'error';
        $code = 0;
        $data = input('post.');
        if(self::yzPostAdd()) {
            $validate = validate(self::$validate);
            if(!$validate->scene('del')->check($data)) {
                $msg = $validate->getError();
            }else {
                $model = Model(self::$validate)->del($data['power_id']);
                $code = $model['code'];
                $msg = $model['msg'];
            };
        }
        echo self::dataJson($code, $msg);
    }

    /**
     * 更新缓存
     */
    public function renew() {
        $msg = 'error';
        $code = 0;
        if(self::yzPostAdd()) {
            Model(self::$validate)->cache(false);
            self::controller(true);
            $msg = '更新成功，请刷新页面';
            $code = 1;
        }
        echo self::dataJson($code, $msg);
    }


    /**
     * 获取方法名称
     */
    protected static function controller($str=false) {
        $controller = cache(self::$path['contr']);
        if($controller == '' || $str == true) {
            $dir =  dirname(__FILE__); //获取当前文件目录
            $file = scandir($dir); //扫描当前目录所有的文件名称
            $data = [];
            $remove = ['initialize', 'controller', 'yzPostAdd', 'yzGetShow', 'yzCookie'];
            foreach ($file as $k => $v) {
                if ($v != '.' && $v != '..' && $v != 'Common.php' && $v != '.DS_Store' && $v != 'Login.php') {
                    $arr = str_replace('/','','\app\/'.request()->module().'\controller\/'.substr($v,0,-4));
                    $action  = get_class_methods($arr);     //读取文件所有方法名称
                    if(!empty($action)){
                        $array = [];
                        foreach ($action as $ka => $va) {
                            if($va == '__construct'){
                                break;
                            }else if(!in_array($va, $remove)){
                                $array[] = $va;
                            }
                        }
                        $data[] = [
                            'controller' =>   substr($v,0,-4),  //获取文件名称
                            'action' => $array
                        ];
                    }
                }
            }
            $data = json_encode($data);
            cache(self::$path['contr'], $data);
        }else {
            $data = $controller;
        }

        return $data;
    }

}
?>