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
class Manage extends Common
{
    public function bindmobile() {

        return view();
    }

    public function editgender() {

        return view();
    }

    public function editpass() {

        return view();
    }

    public function manage() {

        return view();
    }

    /** 修改性别 **/
    public function editsex() {
        $code = 0;
        $msg = 'error';
        if(self::yzPost()) {
            $input = self::$reques->post();
            $validate = Validate('User');
            if(!$validate->scene('sex')->check($input)) {
                $msg = $validate->getError();
            }else {
                $model = Model('User');
                $data = $model->publicedit($input,['user_id'=>self::$userId],'sex');
                if($data['code'] == 1) {
                    cookie(self::$path['userSex'],$input['sex']);
                }
                $code = $data['code'];
                $msg = $data['msg'];
            }
        }
        echo self::dataJson($code,$msg);
    }

    /** 修改手机号码 */
    public function edittel() {
        $code = 0;
        $msg = 'error';
        if(self::yzPost()) {
            $input = self::$reques->post();
            $validate = Validate('User');
            if(!$validate->scene('tel')->check($input)) {
                $msg = $validate->getError();
            }else {
                $model = Model('User');
                $data = $model->publicedit($input,['user_id'=>self::$userId],'tel');
                if($data['code'] == 1) {
                    cookie(self::$path['tel'],$input['tel']);
                }
                $code = $data['code'];
                $msg = $data['msg'];
            }
        }
        echo self::dataJson($code,$msg);
    }

    /** 修改密码 */
    public function editpasswod() {
        $code = 0;
        $msg = 'error';
        if(self::yzPost()) {

        }
        echo self::dataJson($code,$msg);
    }
}
