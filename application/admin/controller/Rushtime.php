<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 设置抢购时间 控制器
// +----------------------------------------------------------------------
namespace app\admin\controller;
class Rushtime extends Common {
    protected static $UserName = 'Rushtime';

    //展示
    public function index() {
        $model = Model(self::$UserName);
        $input = input('get.');
        //Rushtime_1585065600
//        var_dump($model->cacheSelect(false,['date'=>1585065600]));
//        exit;
        if(self::yzGetShow($input)) {
            $validate = Validate('Page');
            $success = 'error';
            $data = '';
            $count = 0;
            if(!$validate->check($input)) {
                $success = $validate->getError();
            }else {
                $where = [];
                if(!empty($input['rushdate_id'])) {
                    $where[] = ['a.rushdate_id','eq',$input['rushdate_id']];
                }
                $dataModel = $model->show($input,$where);
                $data = $dataModel['data']['data'];
                $count = $dataModel['data']['count'];
            }
            echo self::layuiJson($data,$count,'',$success);
            exit;
        }

        return view('',[
            'rushtime' => json_encode(Model('Rushdate')->cacheSelect())
        ]);
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
                $model = Model(self::$UserName)->del($data);
                $code = $model['code'];
                $msg = $model['msg'];
            };
        }
        echo self::dataJson($code, $msg);
    }
}

?>