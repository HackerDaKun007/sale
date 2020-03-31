<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 商品评论 Model
// +----------------------------------------------------------------------
namespace app\common\model;
use think\Exception;

class Comment extends Common {
    protected $timeUpdate = true;
    protected $allow = ['goods_id','home_img','username','content','img1','img2','img3','img4','img5','img6','date'];

    //添加
    public function add($data) {
        $data['date'] = strtotime($data['date']);
        $msg = '添加失败';
        $code = 0;
        self::startTrans();
        try {
            if(self::isUpdate(false)->allowField($this->allow)->save($data)) {
                $file = self::$path['upload'] .'/'. date('Ymd'); //新的目录地址
                self::createFile($file);
                for($i=1;$i<=6;$i++) {
                    $img = $data["img$i"];
                    if(!empty($img)) {
                        /**
                         * 移动文件操作
                         */
                        //目录为空则创建目录
                        $longFile = self::$path['tuntime'].'/'.$img;
                        self::fileCopy($longFile, self::$path['upload'].'/'.$img);
                        //删除文件
                        unlink($longFile);
                    }
                }
                //移动头像
                $homeImg = self::$path['tuntime'].'/'.$data['home_img'];
                self::fileCopy($homeImg, self::$path['upload'].'/'.$data['home_img']);
                //删除文件
                unlink($homeImg);
                $msg = '添加成功';
                $code = 1;
                self::cacheSelect(true,$data['goods_id']);
                self::commit();
            }
        }catch (Exception $e) {
            $msg = '服务器异常';
            self::rollback();
        }
        return self::dataJson($code,$msg,'','',true);
    }


    //更新缓存
    public static function cacheSelect($bool,$id) {
        $data = cache(self::$path['cacehComment']."_$id");
        if($bool || !$data) {
            $data = self::where('goods_id','=',$id)->order('date desc')->select()->toArray();
            cache(self::$path['cacehComment']."_$id", $data);
        }
        return $data;
    }

    //修改
    public function edit($data) {
        $data['date'] = strtotime($data['date']);
        self::startTrans();
        $msg = '修改失败';
        $code = 0;
        $find = self::where('comment_id','=',$data['comment_id'])->find();
        for($i=1;$i<=6;$i++) {
            if(!empty($data["delimg$i"])) {
                $data["img$i"] = '';
            }
        }
        try {
            if(self::isUpdate(false)->allowField($this->allow)->save($data,['comment_id'=>$data['comment_id']])) {
                for($i=1;$i<=6;$i++) {
                    if(!empty($data["img$i"])) {
                        $img = $data["img$i"];
                        /**
                         * 移动文件操作
                         */
                        $file = self::$path['upload'] .'/'. date('Ymd'); //新的目录地址
                        //目录为空则创建目录
                        self::createFile($file);
                        $longFile = self::$path['tuntime'].'/'.$img;
                        self::fileCopy($longFile, self::$path['upload'].'/'.$img);
                        //删除文件
                        unlink($longFile);
                    }
                    //删除原先图片
                    if(!empty($data["delimg$i"])) {
                        $delImg = $data["delimg$i"];
                        $delImgUrl = '.'.$delImg;
                        unlink($delImgUrl);
                    }
                }

                if(!empty($data['home_img'])) {
                    //移动头像
                    $homeImg = self::$path['tuntime'].'/'.$data['home_img'];
                    self::fileCopy($homeImg, self::$path['upload'].'/'.$data['home_img']);
                    unlink(self::$path['upload'].'/'.$find['home_img']);
                    unlink($homeImg);
                }
                $msg = '修改成功';
                $code = 1;
                self::cacheSelect(true,$data['goods_id']);
                self::commit();
            }
        }catch (Exception $e) {
            $msg = '服务器异常';
            self::rollback();
        }
        return self::dataJson($code,$msg,'','',true);
    }

    //删除
    public function del($id) {
        $msg = '删除失败';
        $code = 0;
        self::startTrans();
        try {
            $where[] = ['comment_id','eq',$id];
            $find = self::where($where)->find();
            if(self::where($where)->delete()) {
                for($i=1;$i<=6;$i++) {
                    //删除原先图片
                    $delImg = $find["img$i"];
                    if(!empty($delImg)) {
                        $longFile = self::$path['upload'].'/'.$delImg;
                        unlink($longFile);
                    }
                }
                unlink(self::$path['upload'].'/'.$find['home_img']);
                self::cacheSelect(true,$find['goods_id']);
                $msg = '删除成功';
                $code = 1;
                self::commit();
            }
        }catch (Exception $e) {
            $msg = '服务器异常';
            self::rollback();
        }
        return self::dataJson($code,$msg,'','',true);
    }

    //展示数据
    public function show($get,$where=[]) {
        $select = self::where($where)->order('comment_id desc')->paginate($get['limit'], true, ['page'=>$get['page']])->each(function($user) {
            $user['img1'] = $user['img1']?self::$path['uploadEnd'].$user['img1']:'';
            $user['img2'] = $user['img2']?self::$path['uploadEnd'].$user['img2']:'';
            $user['img3'] = $user['img3']?self::$path['uploadEnd'].$user['img3']:'';
            $user['img4'] = $user['img4']?self::$path['uploadEnd'].$user['img4']:'';
            $user['img5'] = $user['img5']?self::$path['uploadEnd'].$user['img5']:'';
            $user['img6'] = $user['img6']?self::$path['uploadEnd'].$user['img6']:'';
            $user['home_img'] = $user['home_img']?self::$path['uploadEnd'].$user['home_img']:'';
            $user['date'] = date('Y-m-d H:i:s',$user['date']);
            return $user;
        })->toArray();
        $count = self::where($where)->count();
        return self::dataJson(1, 'success', ['data'=>$select['data'], 'count'=>$count], '', true);
    }

    //所有缓存更新缓存
    public static function cacheUpdate() {
        $select = self::select()->toArray();
        if($select) {
            $user_id = array_column($select,'goods_id');
            $unique = array_unique($user_id);
            foreach ($unique as $k => $v) {
                $data = self::where('goods_id','=',$v)->select()->toArray();
                cache(self::$path['cacehComment']."_$v",$data);
            }
        }
    }
}

?>