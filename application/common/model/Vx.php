<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 微信客服 Model
// +----------------------------------------------------------------------
namespace app\common\model;
use think\Exception;

class Vx extends  Common {

    protected $timeUpdate = true;

    //添加 $allow = ['username','img','disable'];

    public function editAdd($data,$bool) {
        $data = array_filter($data);
        $msg = $bool?'修改失败':'添加失败';
        $id = $bool?['vx_id'=>$data['vx_id']]:false;
        $find = '';
        $code = 0;
        if($bool && !empty($data['img'])) {
            $find = self::where('vx_id','=',$data['vx_id'])->field('img')->find();
        }
        self::startTrans();
        try {
            $allow = ['username','img','disable','vx_user'];
            if(self::isUpdate($bool)->allowField($allow)->save($data,$id)) {
                //移动图片
                if(!empty($data['img']) || !$bool){
                    $file = self::$path['upload'] .'/'. date('Ymd'); //新的目录地址
                    //目录为空则创建目录
                    self::createFile($file);
                    $longFile = self::$path['tuntime'].'/'.$data['img'];
                    //移动文件
                    if(self::fileCopy($longFile, self::$path['upload'].'/'.$data['img'])) {
                        //删除文件
                        unlink($longFile);
                    }
                }
                //删除原先图片
                if(!empty($find['img'])) {
                    unlink(self::$path['uploadEnd'].$find);
                }
                $msg = $bool?'修改成功':'添加成功';
                $code = 1;
                self::commit();
            }
        }catch (Exception $e) {
            self::rollback();
            $msg = '当前服务器异常';
        }
        return self::dataJson($code,$msg,'','',true);
    }

    //删除
    public function del($id) {
        $code = 0;
        $msg = '删除失败';
        $where[] = ['vx_id','eq',$id];
        $find = self::where($where)->field('img')->find();
        if($find) {
            self::startTrans();
            try {
                if(self::where($where)->delete()) {
                    unlink(self::$path['upload'].'/'.$find['img']);
                    $code = 1;
                    $msg = '删除成功';
                    self::commit();
                }
            }catch (Exception $e) {
                $msg = '系统故障';
                self::rollback();
            }
        }
        return self::dataJson($code, $msg, '', '', true);
    }

    //更新缓存
    public static function cacehSelect($bool=false) {
        $data = cache(self::$path['vxUser']);
        if(!$data && $bool) {
            $data = self::where('disable','=',1)->field('username,vx_id,img,disable')->select()->toArray();
            cache(self::$path['vxUser'],$data);
        }
        return $data;
    }

    //展示
    public function show($get,$where=[]) {
        $select = self::where($where)->order('vx_id desc')->paginate($get['limit'], true, ['page'=>$get['page']])->toArray();
        $count = self::where($where)->count();
        return self::dataJson(1, 'success', ['data'=>$select['data'], 'count'=>$count], '', true);
    }

}

?>