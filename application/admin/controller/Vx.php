<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 客服微信
// +----------------------------------------------------------------------
namespace app\admin\controller;
use app\commonConfig\Img;
class Vx extends Common {

    use Img;
    protected static $UserNmae = 'Vx';

    //展示
    public function index() {
        $model = Model(self::$UserNmae);
        $input = input('');
        //上传图片
        if($this->yzGetShow($input, 201, 'post')) {
            $img = self::leafletImg($size=102400, $ext='jpg,png,gif,jpeg', $upload=self::$path['tuntime']);
            echo self::dataJson($img['code'], $img['msg'],$img['data']);
            exit;
        }
        //展示路径
        if(self::yzGetShow($input)) {
            $validate = Validate('Page');
            $array = [];
            $count = 0;
            $success = '';
            if(!$validate->check($input)) {
                $success = $validate->getError();
            }else {
                $where = [];
                if(!empty($input['username'])) {
                    $where[] = ['username', 'like', $input['username']];
                }if(!empty($input['disable'])) {
                    $where[] = ['disable', 'eq', $input['disable']];
                }
                $data = $model->show($input,$where);
                $array = $data['data']['data'];
                $count = $data['data']['count'];
            }
            echo self::layuiJson($array, $count, '', $success);
            exit;
        }
        //获取角色信息
        $Role = Model('Role')->field('role_id,username')->order('role_id desc')->select();
        return view('',[
            'role' => $Role,
        ]);
    }

    //添加
    public function add() {
        $msg = 'error';
        $code = 0;
        $data = input('post.');
        if(self::yzPostAdd()) {
            $validate = validate(self::$UserNmae);
            if(!$validate->scene('add')->check($data)) {
                $msg = $validate->getError();
            }else {
                $model = Model(self::$UserNmae)->editAdd($data,false);
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
            $validate = validate(self::$UserNmae);
            if(!empty($data['img'])) {
                $yz = $validate->scene('edit')->check($data);
            }else {
                $yz = $validate->scene('editImg')->check($data);
            }
            if(!$yz) {
                $msg = $validate->getError();
            }else {
                $model = Model(self::$UserNmae)->editAdd($data,true);
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
            $validate = validate(self::$UserNmae);
            if(!$validate->scene('del')->check($data)) {
                $msg = $validate->getError();
            }else {
                $model = Model(self::$UserNmae)->del($data['vx_id']);
                $code = $model['code'];
                $msg = $model['msg'];
            };
        }
        echo self::dataJson($code, $msg);
    }

}

?>