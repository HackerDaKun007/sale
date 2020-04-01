<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 产品款式 控制器
// +----------------------------------------------------------------------
namespace app\admin\controller;
class Goodsstyle extends Common {

    protected static $UserName = 'Goodsstyle';

    //展示
    public function index() {
        $model = Model(self::$UserName);
        $input = input('get.');
        //展示路径
        if(self::yzGetShow($input)) {
            $validate = Validate('Page');
            $array = [];
            $count = 0;
            $success = '';
            if(!$validate->check($input)) {
                $success = $validate->getError();
            }else {
                if(!empty($input['goods_id']) && is_numeric($input['goods_id'])) {
                    $data = $model->show($input);
                    $array = $data['data']['data'];
                    $count = $data['data']['count'];
                }
            }
            echo self::layuiJson($array, $count, '', $success);
            exit;
        }
    }

    //添加
    public function add() {
        $msg = 'error';
        $code = 0;
        if(self::yzPostAdd()) {
            $data = input('post.');
            $validate = validate(self::$UserName);
            if(!$validate->scene('add')->check($data)) {
                $msg = $validate->getError();
            }else {
                $model = Model(self::$UserName)->editAdd($data,false);
                $code = $model['code'];
                $msg = $model['msg'];
            };
        }
        echo self::dataJson($code, $msg);
    }

    //修改
    public function edit() {
        $msg = 'error';
        $code = 0;
        if(self::yzPostAdd()) {
            $data = input('post.');
            $validate = validate(self::$UserName);
            if(!$validate->scene('edit')->check($data)) {
                $msg = $validate->getError();
            }else {
                $model = Model(self::$UserName)->editAdd($data,true);
                $code = $model['code'];
                $msg = $model['msg'];
            };
        }
        echo self::dataJson($code, $msg);
    }

    //删除
    public function del() {
        $msg = 'error';
        $code = 0;
        $data = input('post.');
        if(self::yzPostAdd()) {
            $validate = validate(self::$UserName);
            if(!$validate->scene('del')->check($data)) {
                $msg = $validate->getError();
            }else {
                $model = Model(self::$UserName)->del($data);
                $code = $model['code'];
                $msg = $model['msg'];
            };
        }
        echo self::dataJson($code, $msg);
    }

}
?>