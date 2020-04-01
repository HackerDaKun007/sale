<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 推荐抢购商品 控制器
// +----------------------------------------------------------------------
namespace app\admin\controller;
class Recogoods extends Common {

    protected static $UserName = 'Recogoods';

    public function index() {
        $input = input('get.');
        $model = Model(self::$UserName);
        $goods = Model('Rushgoods');
//        var_dump($model->cacheDate(1585065600));
//        exit;
        if(self::yzGetShow($input)) {
            $validate = Validate('Page');
            $array = [];
            $count = 0;
            $success = '';
            if(!$validate->check($input)) {
                $success = $validate->getError();
            }else {
                if(!empty($input['goods'])) { //goods产品查询
                    $where = [];
                    if(!empty($input['rushdate_id'])) {
                        $where[] = ['a.rushdate_id', 'eq', $input['rushdate_id']];
                    }
                    $data = $goods->show($input,$where);
                }else { //默认
                    $where = [];
                    if(!empty($input['rushdate_id'])) {
                        $where[] = ['a.rushdate_id', 'eq', $input['rushdate_id']];
                    }
                    $data = $model->show($input,$where);
                }
                $array = $data['data']['data'];
                $count = $data['data']['count'];
            }
            echo self::layuiJson($array, $count, '', $success);
            exit;
        }
        return view('',[
            'rushdate' => json_encode(Model('Rushdate')->cacheSelect())
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
                $model = Model(self::$UserName)->del($data['recogoods_id']);
                $code = $model['code'];
                $msg = $model['msg'];
            };
        }
        echo self::dataJson($code, $msg);
    }

    //更新缓存
    public function uploadcache() {
        $msg = 'error';
        $code = 0;
        if(self::yzPostAdd()) {
            model(self::$UserName)->cacheUpdate();
            $msg = '更新成功';
            $code = 1;
        }
        echo self::dataJson($code, $msg);
    }

}

?>