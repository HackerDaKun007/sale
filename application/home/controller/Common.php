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
use think\Controller;
use think\Request;
use app\commonConfig\App;
use think\facade\Config;
class Common extends Controller
{
    protected static $reques;  //获取reques信息
    protected static $path;  //获取path配置信息
    protected static $userId;  //用户ID
    protected static $date;  //获取今天日期

    protected static $dateTime;  //获取今天日期开始时间
    protected static $dateTimeEnd;  //获取今天结束时间
    protected static $serverTimeEnd;  //获取今天服务器时间

    protected static $server404;  //获取今天服务器时间

    use App;
    public function __construct(Request $request,Config $config) {
        parent::__construct();
        self::$reques = $request; //获取http，post/get等信息

        self::$path = $config::get('path.');

        self::$serverTimeEnd = strtotime(date('Y-m-d H:i:s'));//获取服务器时间
        self::$dateTime = strtotime(date('Y-m-d'));//获取今天日期开始时间
        self::$dateTimeEnd = (self::$dateTime+60*60*24)-1;//获取今天结束时间



        //404页面
        self::$server404 = dirname(getcwd()).'/thinkphp/tpl/home_404.html';
        $url = self::$reques->server()['REQUEST_URI'];

        //判断url地址长度
        if(strlen($url) > 80) {
            require(self::$server404);
            exit;
        }

        //网络UV/pv信息
        Model('Flowdate')->add($url);

        //用户信息
        self::userInfo();

        //获取网站设置信息
        $web = Model('Web')->cacheSelect();

        //客服
        $vx = Model('Vx')->cacheSelect();
        $vxVal = '';
        if(!empty($vx)) {
            $vxVal = $vx[rand(0,count($vx)-1)];
        }
        $this->assign([
            'web' => $web,
            'serverTimeEnd' => self::$serverTimeEnd,
            'dateTime' => self::$dateTime,
            'dateTimeEnd' => self::$dateTimeEnd,
            'vx' => $vxVal,
            'dataPasswordJson' => password_hash(self::$path['dataPassword'],PASSWORD_DEFAULT),
        ]);
    }

    //判断用户是否登陆
    protected static function userInfo() {
        $userName = cookie(self::$path['userName']);//用户名称
        $memberUser = cookie(self::$path['memberUser']);//会员名称
        $userSex = cookie(self::$path['userSex']);//用户性别
        //$userTel = cookie(self::$path['userTel']);//用户手机号码
        $userImg = cookie(self::$path['userImg']);//用户头像
        //$initialPass = cookie(self::$path['initialPass']);//初始密码
        $userId = cookie(self::$path['userId']); //用户ID
        //$useraddressId = cookie(self::$path['useraddressId']); //用户ID
        $bool = false;
        if(!empty($userId) && !empty($userImg)  && !empty($userSex) && !empty($memberUser)  && !empty($userName)) {
            $userId = self::repassJie($userId);
            if(is_numeric($userId)) {
             self::$userId = $userId;
                $bool = true;
            }
        }
        if(!$bool) {
            cookie(self::$path['userName'],null);//用户名称
            cookie(self::$path['memberUser'],null);//会员名称
            cookie(self::$path['userSex'],null);//用户性别
            cookie(self::$path['userTel'],null);//用户手机号码
            cookie(self::$path['userImg'],null);//用户头像
            cookie(self::$path['initialPass'],null);//初始密码
            cookie(self::$path['userId'],null); //用户ID
            if(Model('User')->add(true)){
                self::userInfo();
            };
        }
    }

    //判断post https协议
    protected static function yzPost() {
        $bool = false;
        if(self::$reques->method() == 'POST' && !empty(self::$reques->server()['HTTP_KEY'])) {
            if(password_verify(self::$path['dataPassword'],self::$reques->server()['HTTP_KEY'])) {
                $bool = true;
            }
        }
        return $bool;
    }
}
