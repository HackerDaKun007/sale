<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | admin后台公共操作控制器
// +----------------------------------------------------------------------

namespace app\admin\controller;
use think\Controller;
use app\commonConfig\App;
use think\Request;
use think\facade\Config;

class Common extends Controller {
    use App;
    protected static $reques; //定义系统内置方法为静态变量
    protected static $path;
    protected static $gethttp;

    protected static $Authority = '';//权限列表目录1维数组
    protected static $PowerShow = ''; //权限列表目录区分等级展示

    protected static $AdminId = ''; //用户ID
    protected static $AdminArray = '';//用户资料
    /**
     * common constructor. 构造方法
     */
    public function __construct(Request $reques,Config $config) {
        parent::__construct();

        self::$reques = $reques;
        self::$path = $config::get('path.');
        // print_r(self::$reques); param全部，get,post
        // exit;
        $controller = self::$reques->controller() .'/'. self::$reques->action(); //获取控制名称, 方法名称
        
        //访问admin模块,全部必须要ajax访问，除了index/index
        self::$gethttp = self::$reques->server();
        if( $controller != 'Index/index' && !self::$reques->isPost() && !self::$reques->isAjax() && empty(self::$gethttp['HTTP_ADDDATE'])) {
            echo self::dataJson(0, '访问的连接不存在', [],'');
            exit;
        }

        //判断cookie信息,以及是否登陆
        self::yzCookie();
        /**
         * 获取权限目录 ,判断权限
         */
        $RoleSelect = Model('Role')->modelRoleSelect(self::$AdminArray['role_id']);
        if($RoleSelect['admin'] != 1){ //不是超级管理员则需要验证权限路径
            $arrayHead = ['Index/index', 'Index/logout', 'Index/personal', 'Index/pass'];
            if(!in_array($controller,$arrayHead)) {
                //判断权限
                if(!in_array($controller, $RoleSelect)) {
                    echo self::dataJson(404, '当前权限不足, 无法进行操作！', '','');
                    exit;
                }
            }
            if(self::$Authority === '') {
                self::$Authority = cache(self::$path['modelRoleShow'] .'_'. self::$AdminArray['role_id']);//返回目录
            }
        }else { //超级管理员不需要验证
            if(self::$Authority === '') {
                self::$Authority = Model('Power')->yzCache('modelPowerShow'); //返回目录
            }
        }

        //基本信息
        self::assign([
            'personal' => json_encode([
             'mail' => self::$AdminArray['mail'],
             'name' => self::$AdminArray['name'],
             'tei' => self::$AdminArray['tei'],
             'sex' => self::$AdminArray['sex'],
            ]),
        ]);

    }

    /**
     * 验证提交展示数据
     * @return bool
     */
    protected static function yzPostAdd() {
        if(self::$reques->isPost() && !empty(self::$gethttp['HTTP_ADDDATE']) && self::$gethttp['HTTP_ADDDATE'] == 2) {
            return true;
        }else {
            return false;
        }
    }

    /**
     * @param array $input 传入数组
     * @param int $num  200添加修改数据\201上传图片
     * @return bool
     */
    protected static function yzGetShow($input, $num=200, $get='get') {
        if($get == 'get') {
            if(self::$reques->isAjax() && self::$reques->isGet() && !empty($input['request']) && $input['request'] == $num) {
                return true;
            }else {
                return false;
            }
        }else if($get == 'post') {
            if(self::$reques->isAjax() && self::$reques->isPost() && !empty($input['request']) && $input['request'] == $num) {
                return true;
            }else {
                return false;
            }
        }

    }


    /**
     * 验证cookie是否正常，以及是否登陆
     */
    protected static function yzCookie() {
        $cokieUser = cookie(self::$path['cokieUser']);
        $cokieId = cookie(self::$path['cokieId']);
        $cokieIp = cookie(self::$path['cokieIp']);
        $cokieBr = cookie(self::$path['cokieBr']);
        $cokieOs = cookie(self::$path['cokieOs']);
        $cokieTime = cookie(self::$path['cokieTime']);
        $boolCoolie = false;
        if(!empty($cokieUser) && !empty($cokieId) && !empty($cokieIp) && !empty($cokieBr) && !empty($cokieOs) && !empty($cokieTime)) {
            //解密
//            $cokieUser = repassJie(cookie(self::$path['cokieUser']));
            $cokieId = self::repassJie($cokieId);
            $cokieIp = self::repassJie($cokieIp);
            $cokieBr = self::repassJie($cokieBr);
            $cokieOs = self::repassJie($cokieOs);
            $cokieTime = self::repassJie($cokieTime);
            //判断数据是否正常
            $time = time();
            if(is_numeric($cokieId) && is_numeric($cokieTime) && is_numeric($cokieIp) && $cokieBr == self::GetBrowser() && $cokieOs == self::GetOs() && $cokieTime > $time) {
                //判断IP
                $ip = sprintf('%u',ip2long(self::getIp()));
                self::$AdminArray = cache(self::$path['adminInfo_'] . $cokieId); //获取用户信息
                if($cokieIp == $ip && !empty(self::$AdminArray) && self::$AdminArray['disable'] == 1) {
                    self::$AdminId = $cokieId;
                    $boolCoolie = true;
                }
            }
        }

        if($boolCoolie == false) {
            cookie(self::$path['cokieUser'], null);
            cookie(self::$path['cokieId'], null);
            cookie(self::$path['cokieIp'], null);
            cookie(self::$path['cokieBr'], null);
            cookie(self::$path['cokieOs'], null);
            cookie(self::$path['cokieTime'], null);
            $url = url('Login/index');
            self::$AdminId = '';
            $prompt = '请重新的登陆';
            if(self::$reques->isAjax()) {
                echo self::dataJson(500, $prompt, '',$url);
            }else {
                echo "<script>alert('$prompt');window.location.href='$url'</script>";
            }
            exit;
        }
    }

}
?>