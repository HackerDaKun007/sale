<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 控制/模块等都可以直接访问该模块公共方法/变量等
// +----------------------------------------------------------------------
namespace app\commonConfig;

trait App {

    /*
     * 返回信息json状态码或数组状态码
     * @param  int $code 返回状态码
     * @param string $msg  返回提示语句
     * @param arrar $data 返回相关数据
     * @param array $data 返回相关url
     * @param bool $bool false返回json码、true返回数组
     * */
    protected static function dataJson($code=1,$msg='', $data='',$url='', $bool=false) {
        $json = [
            'code' => $code
            ,'msg' => $msg
            ,'data' => $data
            ,'url' => $url
        ];
        if($bool == false) {
            return json_encode($json);
        }else {
            return $json;
        }
    }

    /**
     * 获取用户提交http过来的数据
     */
    protected static function getallheaders() {
        $headers = [];
        foreach ($_SERVER as $name => $value) {
            if (substr($name, 0, 5) == 'HTTP_') {
                $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
            }
        }
        return $headers;
    }


    /*
 * 返回layui数据
 * @param $data array 结果数组
 * @param $count int 数据总长度
 * @para $page bool 正常true不正常false
 * */
    protected static function layuiJson($data=[],$count=0,$page=true,$success='success')
    {
        return json_encode([
            'code' => 0,
            'count' => $count,
            'data' => $data,
            'page' => $page,
            'success' => $success
        ]);
    }

    /**
     * 创建目录
     * @param string $val 目录地址
     */
    protected static function createFile($val) {
        if(empty(file_exists($val))) { //为空就创建文件夹
            if(!is_dir($val)){
                mkdir(iconv("UTF-8", "GBK", $val),0777,true);
            }
        }
    }

    /**
     * 移动文件
     * @param string $url 久文件地址
     * @param string $val 新文件地址
     * @return bool 移动成功返回true, 失败false
     */
    protected static function fileCopy($url, $val) {
        if(!empty(copy($url,$val))){
            return true;
        }
        return false;
    }



    //获得访客浏览器类型
    protected static function GetBrowser($bool=true){
        if(!empty($_SERVER['HTTP_USER_AGENT']))
        {
            $random = '446690';
            $br = $_SERVER['HTTP_USER_AGENT'];
            if (preg_match('/MSIE/i',$br)){
//                $br = 'MSIE';
                $br = $bool?$random.'010':'MSIE';
            }
            elseif (preg_match('/Firefox/i',$br)){
//                $br = 'Firefox';
                $br = $bool?$random.'011':'Firefox';
            }elseif (preg_match('/Chrome/i',$br)){
//                $br = 'Chrome';
                $br = $bool?$random.'012':'Chrome';
            }elseif (preg_match('/Safari/i',$br)){
//                $br = 'Safari';
                $br = $bool?$random.'013':'Safari';
            }elseif (preg_match('/Opera/i',$br)){
//                $br = 'Opera';
                $br = $bool?$random.'014':'Opera';
            }else {
//                $br = 'Other';
                $br = $bool?$random.'015':'Opera';
            }
            return $br;
        }else{
            return false;
        }
    }

    //获取客户端操作系统信息包括win10
    protected static function GetOs($bool=true){
        $random = '1998520';
        $agent = strtolower($_SERVER['HTTP_USER_AGENT']);
        if(strpos($agent, 'windows nt')) {
//            $platform = 'windows';
            $platform = $bool?$random.'001':'windows';
        } elseif(strpos($agent, 'macintosh')) {
//            $platform = 'mac';
            $platform = $bool?$random.'002':'mac';
        } elseif(strpos($agent, 'ipod')) {
//            $platform = 'ipod';
            $platform = $bool?$random.'003':'ipod';
        } elseif(strpos($agent, 'ipad')) {
//            $platform = 'ipad';
            $platform = $bool?$random.'004':'ipad';
        } elseif(strpos($agent, 'iphone')) {
//            $platform = 'iphone';
            $platform = $bool?$random.'005':'iphone';
        } elseif (strpos($agent, 'android')) {
//            $platform = 'android';
            $platform = $bool?$random.'006':'android';
        } elseif(strpos($agent, 'unix')) {
//            $platform = 'unix';
            $platform = $bool?$random.'007':'unix';
        } elseif(strpos($agent, 'linux')) {
//            $platform = 'linux';
            $platform = $bool?$random.'008':'linux';
        } else {
//            $platform = 'other';
            $platform = $bool?$random.'009':'other';
        }
        return $platform;
    }

    /**
     * 获取真实用IP地址
     *
     */
   protected static function getIp() {
        static $realip = NULL; //设置静态变量
        if($realip !== NULL) {
            return $realip;
        }
        if(getenv('HTTP_X_FROWARD_FOR')) {
            $realip = getenv('HTTP_X_FROWARD_FOR');
        } elseif(getenv('HTTP_CLIENT_IP')) {
            $realip = getenv('HTTP_CLIENT_IP');
        } else {
            $realip = getenv('REMOTE_ADDR');
        }

        return $realip;
    }


    /**
     * 加密
     * @param string $val 加密字符
     * @param string $key 固定加密字符
     * @return static 返回加密数据
     */
    protected static function respass($txt='',$key='dakun007') {
        $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-=+";
        $nh = rand(0,64);
        $ch = $chars[$nh];
        $mdKey = md5($key.$ch);
        $mdKey = substr($mdKey,$nh%8, $nh%8+7);
        $txt = base64_encode($txt);
        $tmp = '';
        $i=0;$j=0;$k = 0;
        for ($i=0; $i<strlen($txt); $i++) {
            $k = $k == strlen($mdKey) ? 0 : $k;
            $j = ($nh+strpos($chars,$txt[$i])+ord($mdKey[$k++]))%64;
            $tmp .= $chars[$j];
        }
        return urlencode($ch.$tmp);
    }

    /**
     * @param string $val 解密数据
     * @return static 返回解密后数据
     */
    protected static function repassJie($txt='', $key='dakun007') {
        $txt = urldecode($txt);
        $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-=+";
        $ch = $txt[0];
        $nh = strpos($chars,$ch);
        $mdKey = md5($key.$ch);
        $mdKey = substr($mdKey,$nh%8, $nh%8+7);
        $txt = substr($txt,1);
        $tmp = '';
        $i=0;$j=0; $k = 0;
        for ($i=0; $i<strlen($txt); $i++) {
            $k = $k == strlen($mdKey) ? 0 : $k;
            $j = strpos($chars,$txt[$i])-$nh - ord($mdKey[$k++]);
            while ($j<0) $j+=64;
            $tmp .= $chars[$j];
        }
        return base64_decode($tmp);
    }


    /*
     * 返回IP相关信息
     * @param $ip string 传入ip地址
     * return 返回地区信息
     * */
    protected static function Ipaddr()
    {
        $ip = self::getIp();
        $Ip = new \Net\IpLocation('UTFWry.dat');
        $ipadder = $Ip->getlocation($ip);
        $data['ip'] = $ip;
        if($ip == '127.0.0.1'){
            $data['country'] = '本地局网地址';
        }else{
            $data['country'] = $ipadder['country'].' '.$ipadder['area'];
        }
        return $data;
    }

    /*
     * 加密IP地址
     */
    protected static function passIp($ip='') {
        if($ip=='') {
            $ip = self::getIp();
        }
        return sprintf('%u',ip2long($ip));
    }

}

?>