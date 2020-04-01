<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 抢购商品 控制器
// +----------------------------------------------------------------------
namespace app\admin\controller;
class Rushgoods extends Common {

    protected static $UserName = 'Rushgoods';

    //展示
    public function index() {
        $model = Model(self::$UserName);
        $goods = Model('Goods');
        $input = input('');
        //post查询
        if(self::yzPostAdd()) {
            /** 区分 */

            //获取日期时间
            if(!empty($input['date'])) {
                $msg = '当前日期没有开始时间和结束时间';
                $code = 0;
                $data = Model('Rushtime')->cacheSelect(false,['date'=>$input['date']]);
                if($data && !empty($data['rushtime'][0])) {
                    $msg = '获取成功';
                    $code = 1;
                }
                echo self::dataJson($code,$msg,$data);
                exit;
            }
            //产品款式查询
            if(!empty($input['goods']) && !empty($input['goods_id'])) {
                $msg = '当前没有产品没有款式或轮播图，请添加好款式或轮播图!';
                $code = 0;
                $data = '';
                $goodsstyle = $goods->cacheSelect(false,$input['goods_id']);
                if($goodsstyle) {
                    $msg = '产品款式数据获取成功';
                    $code = 1;
                    $data = $goodsstyle['sty'];
                }
                echo self::dataJson($code,$msg,$data);
                exit;
            }
            exit;
        }
        //展示
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
                        if(!empty($input['username'])) {
                        $where[] = ['username', 'like', "%$input[username]%"];
                    }
                    if(!empty($input['goods_id'])) {
                        $where[] = ['goods_id', 'eq', $input['goods_id']];
                    }
                    $data = $goods->show($input,$where);
                }else { //默认
                    $where = [];
                    if(!empty($input['rushdate_id'])) {
                        $where[] = ['a.rushdate_id','eq',$input['rushdate_id']];
                    }
                    if(!empty($input['goods_id'])) {
                        $where[] = ['a.goods_id', 'eq', $input['goods_id']];
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

    //更新缓存
    public function uploadcache() {
        $msg = 'error';
        $code = 0;
        if(self::yzPostAdd()) {
            $rushdate = Model('Rushdate')->cacheSelect();
            foreach($rushdate as $v) {
                model(self::$UserName)->updateCache($v['date']);
            }
            $msg = '更新成功';
            $code = 1;
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
                $model = Model(self::$UserName)->del($data['rushgoods_id']);
                $code = $model['code'];
                $msg = $model['msg'];
            };
        }
        echo self::dataJson($code, $msg);
    }

}

?>