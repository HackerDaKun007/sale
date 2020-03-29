<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 登陆页面操作控制器 Login
// +----------------------------------------------------------------------
 namespace app\admin\controller;
 use think\Controller;
 use think\captcha\Captcha;
 use app\commonConfig\App;
 use think\Url;

 class Login extends Controller {
    use App;
    /**
     * 登陆首页
     */
    public function index() {
        $path = config('path.');
        if(cookie($path['cokieUser']) && cookie($path['cokieId'])) {
            header('Location:/admin/index/index.html#/Index/home.html');
            exit;
        }
        return view();
    }

     /**
      * 提交登陆验证
      */
     public function yzAdd() {
         $request = request();
         $code = 0;
         $msg = 'error';
         if($request->isPost() && $request->isAjax()) {
             $validate = validate('login');
             $input = input('post.');
            if(!$validate->check($input)) {
                $msg = $validate->getError();
            }else {
                $model = Model('Admin')->login($input);
                $code = $model['code'];
                $msg = $model['msg'];
            }
            echo self::dataJson($code,$msg);
         }
     }


    /**
     * 生成验证码
     */
    public function yzm() {
        $config =    [
            // 验证码字体大小
            'fontSize'    =>    30,
            // 验证码位数
            'length'      =>    4,
            'fontttf'     =>   '5.ttf',
            // 关闭验证码杂点
            //'useNoise'    =>    false,
            //'codeSet'     =>    '0123456789'
        ];
        $captcha = new Captcha($config);
        return $captcha->entry();
    }

 }

?>