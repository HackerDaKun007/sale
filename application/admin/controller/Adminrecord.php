<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 展示登陆记录
// +----------------------------------------------------------------------

namespace app\admin\controller;
class Adminrecord extends Common {
    protected static $UserName = 'Adminrecord';
    public function index() {
        $input = input('get.');
        if(self::yzGetShow($input)) {
            $validate = Validate('Page');
            $array = [];
            $count = 0;
            $success = '';
            if(!$validate->check($input)) {
                $success = $validate->getError();
            }else {
                $model = Model(self::$UserName);
                $data = $model->show($input);
                $array = $data['data']['data'];
                $count = $data['data']['count'];
            }
            echo self::layuiJson($array, $count, '', $success);
            exit;
        }
        return view();
    }

    //删除
    public function del() {
        $code = 0;
        $msg = 'error';
        $input = input('post.');
        if(self::yzPostAdd($input, 200, 'post')) {
            $validate = Validate(self::$UserName);
            if(!$validate->scene('del')->check($input)) {
                $msg = $validate->getError();
            }else {
                $model = Model(self::$UserName)->del($input['adminrecord_id']);
                $code = $model['code'];
                $msg = $model['msg'];
            }
        }
        echo self::dataJson($code, $msg);
    }

}
?>