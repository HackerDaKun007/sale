<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 产品参数 控制器
// +----------------------------------------------------------------------
namespace app\admin\controller;
class Rarameter extends Common {

    protected static $UserName = 'Rarameter';

    //展示
    public function index() {
        $model = Model(self::$UserName);
        $input = input('get.');
        if(self::yzGetShow($input)) {
            $count = 0;
            $array = '';
            $success = 'error';
            $validate = Validate('Page');
            if(!$validate->check($input)) {
                $success = $validate->getError();
            }else {
                if(!empty($input['goods_id']) && is_numeric($input['goods_id'])) {
                    $where = [];
                    if(!empty($input['title'])) {
                        $where[] = ['title', 'like', "%$input[title]%"];
                    }
                    $where[] = ['goods_id','eq',$input['goods_id']];
                    $data = $model->show($input,$where);
                    $array = $data['data']['data'];
                    $count = $data['data']['count'];
                }
            }
            echo self::layuiJson($array,$count,'',$success);
            exit;
        }
        return view();
    }

    //添加
    public function add() {
        $msg = 'error';
        $code = 0;
        $data = input('post.');
        if(self::yzPostAdd()) {
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
        $data = input('post.');
        if(self::yzPostAdd()) {
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
                $model = Model(self::$UserName)->del($data['parameter_id']);
                $code = $model['code'];
                $msg = $model['msg'];
            };
        }
        echo self::dataJson($code, $msg);
    }

}

?>