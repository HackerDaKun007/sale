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
use think\Validate;

class Mine extends Common
{

    /* 关于我们 */
    public function aboutus() {

        return view('',[
            'data' => Model('About')->cacheSelect(),
        ]);
    }

    /* 售后服务 */
    public function aftersale() {

        return view('',[
            'data' => Model('Aftersale')->cacheSelect(),
        ]);
    }

    //添加地址
    public function addader() {
        //提交添加地址
        if(self::yzPost()) {
            $code = 0;
            $input = self::$reques->post();
            $validate = Validate('Useraddress');
            if(!$validate->scene('add')->check($input)) {
                $msg = $validate->getError();
            }else {
                $input['user_id'] = self::$userId;
                $model = Model('Useraddress');
                $data = $model->editAdd($input,false);
                $msg = $data['msg'];
                $code = $data['code'];
            }
            echo self::dataJson($code,$msg);
            exit;
        }
        return view();
    }

    //修改地址
    public function editaddress() {
        $useradder = cache(self::$path['UserAdder'].self::$userId);
        $input = self::$reques->param();
        //修改添加地址
        if(self::yzPost()) {
            $code = 0;
            $msg = '修改失败';
            // $input = self::$reques->post();
            $validate = Validate('Useraddress');
            if(!$validate->scene('edit')->check($input)) {
                $msg = $validate->getError();
            }else {
                if($useradder) {
                    $bool = false;
                    foreach($useradder as $v) {
                        if($v['user_id'] == self::$userId && $v['useraddress_id'] ==  $input['useraddress_id']) {
                            $bool = true;
                            break;
                        }
                    }
                    if($bool) {
                        $input['user_id'] = self::$userId;
                        $model = Model('Useraddress');
                        $data = $model->editAdd($input,true);
                        $msg = $data['msg'];
                        $code = $data['code'];
                    }
                }

            }
            echo self::dataJson($code,$msg);
            exit;
        }
        $bool = false;
        $data = '';
        if($useradder && !empty($input['id']) && is_numeric($input['id'])) {
            foreach ($useradder as $v) {
                if($v['useraddress_id'] == $input['id']) {
                    $data = $v;
                    $bool = true;
                    break;
                }
            }
        }
       if($bool && $data != '') {
           return view('',[
               'data' => $data,
           ]);
       }else {
            require (self::$server404);
       }
    }

    //删除收货地址
    public function deladder() {
        $code = 0;
        $msg = '删除失败';
        if(self::yzPost()){
            $input = self::$reques->post();
            $validate = Validate('Useraddress');
            if(!$validate->scene('del')->check($input)) {
                $msg = $validate->getError();
            }else {
                $input['user_id'] = self::$userId;
                $model = Model('Useraddress');
                $data = $model->del($input);
                $msg = $data['msg'];
                $code = $data['code'];
            }
        }
        echo self::dataJson($code,$msg);
    }

    public function mine() {

        return view();
    }

    /**
     * 收货地址列表
     */
    public function myaddress() {
        
        return view('',[
            'adder' => Model('Useraddress')->addCache(false,self::$userId),
        ]);
    }


    /**
     * 收藏
     */
    public function mycollect() {

        return view('',[
            'data' => cache(self::$path['userFavorite']."_".self::$userId),
        ]);
    }


}
