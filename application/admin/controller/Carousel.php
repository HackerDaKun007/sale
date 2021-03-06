<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 首页轮播图控制器
// +----------------------------------------------------------------------
namespace app\admin\controller;
use app\commonConfig\Img;
class Carousel extends Common {
    use Img;
    protected static $UserNmae = 'Carousel';

    //展示
    public function index() {
        $model = Model(self::$UserNmae);
        $input = input('');
        //上传图片
        if($this->yzGetShow($input, 201, 'post')) {
            $img = self::leafletImg($size=204800, $ext='jpg,png,gif,jpeg', $upload=self::$path['tuntime']);
            echo self::dataJson($img['code'], $img['msg'],$img['data']);
            exit;
        }
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
                    $where[] = ['username', 'like', "%$input[username]%"];
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
        $msg = 'error';
        $code = 0;
        $data = input('post.');
        if(self::yzPostAdd()) {
            $validate = validate(self::$UserNmae);
            if(!$validate->scene('add')->check($data)) {
                $msg = $validate->getError();
            }else {
                $model = Model(self::$UserNmae)->add($data);
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
                unset($data['img']);
            }
            if(!$yz) {
                $msg = $validate->getError();
            }else {
                $model = Model(self::$UserNmae)->edit($data);
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
                $model = Model(self::$UserNmae)->del($data['carousel_id']);
                $code = $model['code'];
                $msg = $model['msg'];
            };
        }
        echo self::dataJson($code, $msg);
    }



}

?>