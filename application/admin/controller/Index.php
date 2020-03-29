<?php
namespace app\admin\controller;

class Index extends Common
{
    public function index()
    {
//        var_dump(Model('carousel')->cacheSelect());
//        echo 2;
//        $ar = [
//            ['user_id'=>123,'goods_id'=>'ds'],
//            ['user_id'=>1235,'goods_id'=>'gg'],
//            ['user_id'=>1235,'goods_id'=>'ff'],
//        ];
//        $ar[1] = ['user_id'=>66,'goods_id'=>'ppo'];
//        var_dump($ar);
//        exit;
        return view('', [
            'column' => self::$Authority,
            'AdminArray' =>  self::$AdminArray,
        ]);
    }

    public function home() {
        echo 1;
    }

    public function Logout() {
        $msg = '注销失败';
        $code = 0;
        $url = '';
        if(self::yzPostAdd()) {
            cookie(self::$path['cokieUser'], null);
            cookie(self::$path['cokieId'], null);
            cookie(self::$path['cokieIp'], null);
            cookie(self::$path['cokieBr'], null);
            cookie(self::$path['cokieOs'], null);
            cookie(self::$path['cokieTime'], null);
            $msg = '注销成功';
            $code = 1;
            $url = url('Login/index');
        }
        echo self::dataJson($code, $msg, '', $url);
    }

    //修改个人资料
    public function personal() {
        $msg = 'error';
        $code = 0;
        $data = input('post.');
        if(self::yzPostAdd()) {
            $data['admin_id'] = self::$AdminId;
            $validate = validate('personal');
            if(!$validate->scene('personal')->check($data)) {
                $msg = $validate->getError();
            }else {
                $model = Model('admin')->personal($data, self::$AdminId);
                $code = $model['code'];
                $msg = $model['msg'];
            };
        }
        echo self::dataJson($code, $msg);
    }

    //修改个人登陆密码
    public function pass() {
        $msg = 'error';
        $code = 0;
        $data = input('post.');
        if(self::yzPostAdd()) {
            $validate = validate('personal');
            $data['admin_id'] = self::$AdminId;
            if(!$validate->scene('pass')->check($data)) {
                $msg = $validate->getError();
            }else {
                $model = Model('admin')->personalPass($data, self::$AdminId);
                $code = $model['code'];
                $msg = $model['msg'];
            };
        }
        echo self::dataJson($code, $msg);
    }
}
