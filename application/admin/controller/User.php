<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 用户展示信息
// +----------------------------------------------------------------------
namespace app\admin\controller;
use app\common\model\User as modelUser;
use app\common\Validate\User as validateUser;
class User extends Common {

    /**
     * 
     */
    public function index() {
        //reques
        $input = self::$reques->get();
        //展示路径
        if(self::yzGetShow($input)) {
            $model = new modelUser();
            $validate = Validate('Page');
            $array = [];
            $count = 0;
            $success = '';
            if(!$validate->check($input)) {
                $success = $validate->getError();
            }else {
                $where = [];
                if(!empty($input['username'])) {
                    $where[] = ['username', 'like', "%$input[username]%"];
                }if(!empty($input['member_user'])) {
                    $where[] = ['member_user', 'like', "%$input[member_user]%"];
                }if(!empty($input['tel'])) {
                    $where[] = ['tel', 'eq', $input['tel']];
                }
                $data = $model->show($input,$where);
                $array = $data['data']['data'];
                $count = $data['data']['count'];
            }
            echo self::layuiJson($array, $count, '', $success);
            exit;
        }
        return view();
    }

    //添加
    public function add() {
        $code = 0;
        $msg = 'error';
        if(self::yzPostAdd()) {
            $model = new modelUser();
            $data = $model->add();
            $code = $data['code'];
            $msg = $data['msg'];
        }
        echo self::dataJson($code,$msg);
    }

    //修改密码
    public function editpassw() {
        $code = 0;
        $msg = 'error';
        if(self::yzPostAdd()) {
            $input = self::$reques->param();
            $validate = new validateUser();
            $yz = $validate->scene('password')->check($input);
            if(!$yz) {
                $msg = $validate->getError();
            }else {
                $model = new modelUser();
                $data = $model->edit($input);
                $code = $data['code'];
                $msg = $data['msg'];
            }
        }
        echo self::dataJson($code,$msg);
    }

    //删除
    public function del() {
        $code = 0;
        $msg = 'error';
        if(self::yzPostAdd()) {
            $input = self::$reques->param();
            $validate = new validateUser();
            if(!$validate->scene('del')->check($input)) {
                $msg = $validate->getError();
            }else {
                $model = new modelUser();
                $data = $model->del($input['user_id']);
                $code = $data['code'];
                $msg = $data['msg'];
            }
        }
        echo self::dataJson($code,$msg);
    }

}
?>
