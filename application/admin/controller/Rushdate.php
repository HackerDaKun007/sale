<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 抢购日期 控制器
// +----------------------------------------------------------------------
namespace app\admin\controller;
use think\Validate;

class Rushdate extends Common {

    protected static $UserName = 'Rushdate';

    //展示
    public function index() {
        $model = Model(self::$UserName);
        $input = input('get.');
        if(self::yzGetShow($input)) {
            $validate = Validate('Page');
            $success = 'error';
            $data = '';
            $count = 0;
            if(!$validate->check($input)) {
                $success = $validate->getError();
            }else {
                $where = [];
                if(!empty($input['date'])) {
                    $date = strtotime($input['date']);
                    $where[] = ['date','eq',$date];
                }
                $dataModel = $model->show($input,$where);
                $data = $dataModel['data']['data'];
                $count = $dataModel['data']['count'];
            }
            echo self::layuiJson($data,$count,'',$success);
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
            $validate = validate(self::$UserName);
            if(!$validate->scene('add')->check($data)) {
                $msg = $validate->getError();
            }else {
                $model = Model(self::$UserName)->editAdd($data,false);
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
            if(!$validate->scene('edit')->check($data)) {
                $msg = $validate->getError();
            }else {
                $model = Model(self::$UserName)->editAdd($data,true);
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
                $model = Model(self::$UserName)->del($data['rushdate_id']);
                $code = $model['code'];
                $msg = $model['msg'];
            };
        }
        echo self::dataJson($code, $msg);
    }

}

?>