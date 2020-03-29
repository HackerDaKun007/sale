<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 产品控制器
// +----------------------------------------------------------------------
namespace app\admin\controller;
use app\commonConfig\Img;
class Goods extends Common {
    use Img;
    protected static $UserName = 'Goods';
    //展示
    public function index() {

        $model = Model(self::$UserName);
    //    print_r($model->cacheSelect(false,9));
    //    exit;
        $input = input('');
        //上传图片
        if($this->yzGetShow($input, 201, 'post')) {
            $file = $_FILES;
            $code = 0;
            $msg = '上传失败';
            $data = '';
            if(!empty($file['file'])) {
                $arr = GetImageSize($file['file']['tmp_name']);
                if($arr[1] == $arr[0]) {
                    $img = self::leafletImg($size=204800, $ext='jpg,png,gif,jpeg', $upload=self::$path['tuntime']);
                    $code = $img['code'];
                    $data = $img['data'];
                    $msg = $img['msg'];
                }else {
                    $msg = '图片必须1:1正方形';
                }
            }
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
                $where = [];
                if(!empty($input['username'])) {
                    $where[] = ['username', 'like', "%$input[username]%"];
                }if(!empty($input['shelves'])) {
                    $where[] = ['shelves', 'eq', $input['shelves']];
                }
                $data = $model->show($input,$where);
                $array = $data['data']['data'];
                $count = $data['data']['count'];
            }
            echo self::layuiJson($array, $count, '', $success);
            exit;
        }
        //获取产品类别
        $category = Model('Category')->cacehSelect();
        return view('',[
            'category' => json_encode($category),
        ]);
    }

    //添加
    public function add() {
        $msg = 'error';
        $code = 0;
        $data = input('post.');
        if(self::yzPostAdd()) {
            $validate = validate(self::$UserName);
            $data['paymentArray'] = self::$path['goodsPayment'];
            if(!$validate->scene('add')->check($data)) {
                $msg = $validate->getError();
            }else {
                $model = Model(self::$UserName)->add($data);
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
            $data['paymentArray'] = self::$path['goodsPayment'];
            if(!empty($data['home_img'])) {
                $yz = $validate->scene('edit')->check($data);
            }else {
                $yz = $validate->scene('editImg')->check($data);
            }
            if(!$yz) {
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
                $model = Model(self::$UserName)->del($data['goods_id']);
                $code = $model['code'];
                $msg = $model['msg'];
            };
        }
        echo self::dataJson($code, $msg);
    }


}

?>