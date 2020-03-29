<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 网站相关设置 Model
// +----------------------------------------------------------------------
namespace app\common\model;
use think\Exception;

class Web extends Common {

    public function edit($data) {
        $data = array_filter($data);
        $id = ['web_id'=>1];
        $allow = ['username','seo','seointroduction','logo','ipc','ipc_url'];
        $msg = '修改失败';
        $code = 0;
        if(!empty($data['img'])) {
            $data['logo'] = '/'.$data['img'];
        }
        $find = self::field('logo')->where('web_id','=',1)->find();

        self::startTrans();
        try {
            if(self::isUpdate(true)->allowField($allow)->save($data,$id)) {
                if(!empty($data['logo'])) {
                    $img = self::$path['tuntime'].'/'.$data['img'];
                    //移动文件
                    self::fileCopy($img, '.'.$data['logo']);
                    //复制ico图
                    $image = \think\Image::open($img);
                    @unlink('./favicon.ico');
                    //将图片裁剪为300x300并保存为crop.png
                    $image->thumb(100, 100)->save('./favicon.ico');
                    if($find['logo'] != $data['logo']) {
                        @unlink('.'.$find['logo']);
                    }
                    @unlink($img);
                }
                $msg = '修改成功';
                $code = 1;
                self::cacheSelect(true);
                self::commit();
            }
        }catch (Exception $e) {
            $msg = '服务器异常';
            self::rollback();
        }
        return self::dataJson($code,$msg,'','',true);
    }

    //更新缓存
    public static function cacheSelect($bool=false) {
        $data = cache(self::$path['webCache']);
        if(!$data || $bool) {
            $data = self::field('username,seo,seointroduction,logo,ipc,ipc_url')->find();
            if(!empty($data)) {
                $data = json_decode($data,true);
                cache(self::$path['webCache'],$data);
            }
        }
        return $data;
    }
}

?>