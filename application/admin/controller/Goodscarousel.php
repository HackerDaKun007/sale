<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 产品轮播图 控制器
// +----------------------------------------------------------------------
namespace app\admin\controller;
use app\commonConfig\Img;

class Goodscarousel extends Common {

    use Img;
    protected static $UserName = 'Goodscarousel';

    //展示
    public function index() {
        $model = Model(self::$UserName);
        $input = input('');
        //上传图片
        if($this->yzGetShow($input, 201, 'post')) {
            $img = self::leafletImg($size=204800, $ext='jpg,png,gif,jpeg', $upload=self::$path['tuntime']);
            $code = $img['code'];
            $data = $img['data'];
            $msg = $img['msg'];
            echo self::dataJson($code, $msg,$data);
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
//            $data = input('post.');
            //上传图片
            $file = $_FILES;
            $code = 0;
            $msg = '上传失败';
            if(!empty($file['file'])) {
                $name = $file['file']['name'];
                $img = self::leafletImg($size=204800, $ext='jpg,png,gif,jpeg,bmp', $upload=self::$path['upload']);
                $input = input('post.');
                if($img['code'] == 1) {
                    $num = rtrim($name,strchr($name, '.'));
                    if(!is_numeric($num)) {
                        $num = 10;
                    }
                    $input['img'] = $img['data'];
                    $input['sort'] = $num;
                    $validate = validate(self::$UserName);
                    if(!$validate->scene('add')->check($input)) {
                        $msg = $validate->getError();
                    }else {
                        $model = Model(self::$UserName)->add($input);
                        $code = $model['code'];
                        $msg = $model['msg'];
                    };
                }else {
                    $msg = $img['msg'];
                }

            }


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
            $img = 'edit';
            if(empty($data['img'])) {
                $img = 'editImg';
            }
            if(!$validate->scene($img)->check($data)) {
                $msg = $validate->getError();
            }else {
                $model = Model(self::$UserName)->edit($data);
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