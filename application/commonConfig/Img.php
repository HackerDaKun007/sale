<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 图片上传
// +----------------------------------------------------------------------

namespace app\commonConfig;

trait Img{

    /**
     * 单张图片上传
     * @param int $size  允许上传大小
     * @param string $ext 格式
     * @param string $upload 路径
     * @param string $file 键名
     * @param array 返回信息状态码
     */
    protected static function leafletImg($size=1048576, $ext='jpg,png,gif,jpeg', $upload='./tuntime', $file='file',$user=false) {
        $file = request()->file($file);
        if($user) {
            $info = $file->validate(['size'=>$size, 'ext'=>$ext])->move($upload,$user);
        }else {
            $info = $file->validate(['size'=>$size, 'ext'=>$ext])->move($upload);
        }
        $code = 0;
        $msg = 'error';
        $data = '';
        if($info) {
            $data = str_replace('\\', '/', $info->getSaveName());
            $msg = 'success';
            $code = 1;
        }else {
            $msg = $file->getError();
        }
        return ['code'=>$code, 'msg'=>$msg, 'data'=>$data];
    }

}
?>