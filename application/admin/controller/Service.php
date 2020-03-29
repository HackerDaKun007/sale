<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 服务说明
// +----------------------------------------------------------------------
namespace app\admin\controller;
use think\Validate;

class Service extends Common {
    protected static $UserName = 'Service';

    //展示
    public function index() {
        $model = Model(self::$UserName);
        $input = self::$reques->get();
        if(self::yzGetShow($input)) {
            $data = '';
            $count = 0;
            $msg = 'error';
            $validte = Validate('Page');
            if(!$validte->check($input)) {
                $msg = $validte->getError();
            }else {
                $where = [];
                if(!empty($input['title'])) {
                    $where[] = ['title', 'like', "%$input[title]%"];
                }
                $modelData = $model->show($input, $where);
                $data = $modelData['data']['data'];
                $count = $modelData['data']['count'];
                $msg = 'success';
            }
            echo self::layuiJson($data,$count,'',$msg);
            exit;
        }
        return view();
    }

    //添加
    public function add() {
        $code = 0;
        $msg = 'error';
        if(self::yzPostAdd()) {
            $validate = Validate(self::$UserName);
            $input = self::$reques->post();
            if(!$validate->scene('add')->check($input)) {
                $msg = $validate->getError();
            }else {
                $model = Model(self::$UserName)->editAdd($input,false);
                $msg = $model['msg'];
                $code = $model['code'];
            }
        }
        echo self::dataJson($code, $msg);
    }

    //修改
    public function edit() {
        $code = 0;
        $msg = 'error';
        if(self::yzPostAdd()) {
            $validate = Validate(self::$UserName);
            $input = self::$reques->post();
            if(!$validate->scene('edit')->check($input)) {
                $msg = $validate->getError();
            }else {
                $model = Model(self::$UserName)->editAdd($input,true);
                $msg = $model['msg'];
                $code = $model['code'];
            }
        }
        echo self::dataJson($code, $msg);
    }

    //删除
    public function del() {
        $msg = 'error';
        $code = 0;
        if(self::yzPostAdd()) {
            $input = self::$reques->post();;
            $validate = Validate(self::$UserName);
            if(!$validate->scene('del')->check($input)) {
                $msg = $validate->getError();
            }else {
                $model = Model(self::$UserName)->del($input['service_id']);
                $msg = $model['msg'];
                $code = $model['code'];
            }
        }
        echo self::dataJson($code, $msg);
    }

}

?>