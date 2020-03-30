<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 用户信息Model
// +----------------------------------------------------------------------
namespace app\common\model;
use app\common\model\Userlogin;
use Exception;

class User extends Common {

    protected $timeUpdate = true;
    /**
     * 添加用户信息
     *
     * @return void
     */
    public function add($bool=false) {
        //初始密码
        $str = '1234567890qwertyuiopasdfghjklzxcvbnm_+';
        $initial = substr(str_shuffle($str), 0, rand(6,8));
        //随机头像
        $rand = rand(1,4);
        //随机会员名称
        $zm = 'qwertyuiopasdfghjklzxcvbnm';
        $member = '准'.substr(str_shuffle($zm), 0, 3).substr(str_shuffle('1234567890'), 0, 6).substr(str_shuffle($zm), 0, 2);
        //用户名称
        $username = '准会员_'.substr(str_shuffle($zm), 0, 2).substr(str_shuffle('123456789009876543211234567890'), 0, 5);
        $random = random();
        $data = [
            'encrypt' => $random,
            'password' => encrypt($initial, $random),
            'img' => $rand.'.png',
            'member_user' => $member,
            'username' => $username,
            'initial_pass' => $initial,
            'sex' => rand(1,2),
            'useraddressId' => '',
            'tel' => 0,
        ];
        $code = 0;
        $msg = '创建失败';
        self::startTrans();
        try {
            if(self::isUpdate(false)->allowField(true)->save($data)) {
                if($bool) {
                    self::uploadCookie($data,$this->id);
                }
                //创建登陆时间
                $Userlogin = new Userlogin();
                $Userlogin->add($this->id);
                $code = 1;
                $msg = '创建成功';
                self::commit();
            }
        }catch (Exception $e) {
            $msg = '服务器异常';
            self::rollback();
        }
        
        return self::dataJson($code,$msg,'','',true);
    }

    //更新cookie 
    public static function uploadCookie($data,$id) {
        cookie(self::$path['userName'],$data['username']);//用户名称
        cookie(self::$path['memberUser'],$data['member_user']);//会员名称
        cookie(self::$path['userSex'],$data['sex']);//用户性别
        cookie(self::$path['userTel'],$data['tel']);//用户手机号码
        cookie(self::$path['userImg'],self::$path['userAvatar'].$data['img']);//用户头像
        cookie(self::$path['initialPass'],$data['initial_pass']);//初始密码
        cookie(self::$path['useraddressId'],$data['useraddressId']);//收货地址ID
        cookie(self::$path['userId'],self::respass($id)); //用户ID
    }

    //后台修改用户信息
    public function edit($data,$bool=false) {
        $allow = ['sex','tel','img','password','encrypt','initialyes','initialimg','initial_pass'];
        //修改密码
        if(!empty($data['password'])) {
            $random = random();
            $data['password'] = encrypt($data['password'], $random);
            $data['encrypt'] = $random;
            $data['initialyes'] = 1;
            $data['initial_pass'] = 0;
        }
        $msg = '修改失败';
        $code = 0;
        if(self::isUpdate(true)->allowField($allow)->save($data,['user_id'=>$data['user_id']])){
            $msg = '修改成功';
            $code = 1;
            if($bool) {
                $find = self::where('user_id','=',$data['user_id'])->find();
                self::uploadCookie($find,$data['user_id']);
            }
            
        }
        return self::dataJson($code,$msg,'','',true);
    }

    //删除
    public function del($id) {
        $msg = '删除失败';
        $code = 0;
        if(self::where('user_id','=',$id)->delete()) {
            $msg = '删除成功';
            $code = 1;
        }
        return self::dataJson($code,$msg,'','',true);
    }

    //用户修改密码
    public function userPassw($data) {
        //判断当前用户ID是否存在
        $find = self::where('user_id','=',$data['user_id'])->field('encrypt,password,user_id')->find();
        $msg = '原先密码错误';
        $code = 0;
        if($find) {
           
            //判断密码原先密码是否正确
            if($find['password'] == encrypt($data['orpassword'], $find['encrypt'])) {
                $allow = ['password','encrypt','initialyes','initial_pass'];
                //修改密码
                $random = random();
                $data['password'] = encrypt($data['password'], $random);
                $data['encrypt'] = $random;
                $data['initialyes'] = 1;
                $data['initial_pass'] = 0;
                self::startTrans();
                try {
                    if(self::isUpdate(true)->allowField($allow)->save($data,['user_id'=>$data['user_id']])){
                        $msg = '修改成功';
                        $code = 1;
                        $find = self::where('user_id','=',$data['user_id'])->find();
//                        self::uploadCookie($find,$data['user_id']);
                        cookie(self::$path['initialPass'],null);
                        self::commit();
                    }
                }catch (Exception $e) {
                    $msg = '服务器异常';
                    self::rollback();
                }
            }
        }
        return self::dataJson($code,$msg,'','',true);
    }

    //登陆
    public function login($data) {
        $find = self::where('username','=',$data['username'])->find();
        $code = 0;
        $msg = '账号密码错误';
        if($find) {
            if(encrypt($data['password'], $find['encrypt']) == $find['password']) {
                $code = 1;
                $msg = '登陆成功';
                self::uploadCookie($find,$find['user_id']);
            }
        }
        return self::dataJson($code,$msg,'','',true);
    }

    //展示
    public function show($get,$where=[]) {
        $select = self::where($where)->order('user_id desc')->paginate($get['limit'], true, ['page'=>$get['page']])->toArray();
        $count = self::where($where)->count();
        return self::dataJson(1, 'success', ['data'=>$select['data'], 'count'=>$count], '', true);
    }

    //公共修改
    public function publicedit($data,$id,$allow) {
        if(self::isUpdate(true)->allowField($allow)->save($data,$id)) {
            $code = 1;
            $msg = '修改成功';
        }else {
            $code = 0;
            $msg =  '修改失败';
        };
        return self::dataJson($code,$msg,'','',true);
    }

}

?>