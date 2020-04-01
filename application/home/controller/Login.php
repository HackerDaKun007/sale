<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 前台首页
// +----------------------------------------------------------------------
namespace app\home\controller;
class Login extends Common
{
    public function login() {
       return view();
    }

    public function loginadd() {
        $code = 0;
        $msg = 'error';
        if(self::yzPost()) {
            $input = self::$reques->post();
            $validate = Validate('User');
            $input['user_id'] = self::$userId;
            if(!$validate->scene('login')->check($input)) {
                $msg = $validate->getError();
            }else {
                $model = Model('User');
                $data = $model->login($input);
                $code = $data['code'];
                $msg = $data['msg'];
            }
        }
        echo self::dataJson($code,$msg);
    }
}
