<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 产品Model数据
// +----------------------------------------------------------------------
namespace app\common\model;

use think\Exception;

class Goods extends Common {
    protected $timeUpdate = true;
    protected static $allow = ['username','payment','details','styletitle','home_img','shelves','category_id'];

    //添加
    public function add($data) {
        $msg = '添加失败';
        $code = 0;

        self::startTrans();
        try {
            if(self::allowField(self::$allow)->isUpdate(false)->save($data)) {
                /**
                 * 移动文件操作
                 */
                $file = self::$path['upload'] . '/' . date('Ymd'); //新的目录地址
                //目录为空则创建目录
                self::createFile($file);
                $longFile = self::$path['tuntime'] . '/' . $data['home_img'];
                //移动文件
                if (self::fileCopy(self::$path['tuntime'] . '/' . $data['home_img'], self::$path['upload'] . '/' . $data['home_img'])) {
                    $msg = '添加成功';
                    $code = 1;
                    self::cacheSelect(true, $this->id);
                    //删除文件
                    unlink($longFile);
                self::commit();
                } else {
                self::rollback();
                    $msg = '文件移动失败';
                }
            }
        }catch (Exception $e){
            self::rollback();
            $msg = '数据异常';
        }
        return self::dataJson($code, $msg, '', '', true);
    }

    /**
     * @param bool $bool true更新缓存，false不更新缓存
     * @param string $id 产品ID
     * @return array|boolean 有数据返回缓存数组\没有数据返回false
     */
    public static function cacheSelect($bool=false, $id) {
        $data = cache(self::$path['goodsSelect']. "_$id");
        if(!$data || $bool) {
            $where = [
                ['carousel' ,'eq', 1],
                ['style' ,'eq', 1],
                ['goods_id' ,'eq', $id],
            ];
            $count = self::where($where)->order('goods_id desc')->count();
            if($count) {
                $data = self::where($where)->order('goods_id desc')->find()->toArray();
                $data['images'] = Model('Goodscarousel')->order('sort desc')->where('goods_id', '=', $id)->select()->toArray();
                //产品款式
                $data['sty'] = Model('Goodsstyle')->order('sort desc')->where('goods_id', '=', $id)->select()->toArray();
                //参数
                $data['parameter'] = Model('Rarameter')->order('sort desc')->where('goods_id', '=', $id)->select()->toArray();
                cache(self::$path['goodsSelect']. "_$id", $data);
            }else {
                cache(self::$path['goodsSelect']. "_$id", null);
            }

        }
        return $data;
    }

    //更新抢购

    //写入前后操作
    protected static function init() {
        //前
        self::event('before_write', function($user) {
            if(empty($user['home_img'])) {
                unset($user['home_img']);
            }
            if(!empty($user['payment'])) {
                $user['payment'] = implode(',',$user['payment']);
            }
        });

    }

    //修改
    public function edit($data) {
        $msg = '修改失败';
        $code = 0;
        $find = '';
        if(!empty($data['home_img'])) {
            $find = self::where('goods_id','=',$data['goods_id'])->field('home_img')->find();
        }
        //查询数据
        self::startTrans();
        try {
            if(self::allowField(self::$allow)->isUpdate(true)->save($data,['goods_id'=>$data['goods_id']])) {
                if(!empty($data['home_img'])) {
                    /**
                     * 移动文件操作
                     */
                    $file = self::$path['upload'] .'/'. date('Ymd'); //新的目录地址
                    //目录为空则创建目录
                    self::createFile($file);
                    $longFile = self::$path['tuntime'].'/'.$data['home_img'];
                    //移动文件
                    if(self::fileCopy(self::$path['tuntime'].'/'.$data['home_img'], self::$path['upload'].'/'.$data['home_img'])) {
                        $msg = '修改成功';
                        $code = 1;
                        self::cacheSelect(true, $data['goods_id']);
                        //删除文件
                        unlink($longFile);
                        unlink(self::$path['upload'].'/'.$find['home_img']);
                        self::commit();
                    }else {
                        self::rollback();
                        $msg = '文件移动失败';
                    }
                }else {
                    self::cacheSelect(true, $data['goods_id']);
                    $msg = '修改成功';
                    $code = 1;
                    self::commit();
                }

            }
        }catch (Exception $e){
            self::rollback();
            $msg = '数据异常';
        }
        return self::dataJson($code, $msg, '', '', true);
    }

    //删除
    public function del($id) {
        $code = 0;
        $msg = '删除失败';
        $where[] = ['goods_id','eq',$id];
        $find = self::where($where)->field('home_img,carousel,style')->find();
        if($find) {
            $carousel = false;
            $style = false;
            //轮播图和款式
            if($find['carousel']==1 && $find['style']==1) {
                $carousel = true;
                $style = true;
            }else if($find['carousel']==1) {
                $carousel = true;
            }else if($find['style']==1) {
                $style = true;
            }
            self::startTrans();
            try {

                if(self::where($where)->delete()) {
                    if($carousel) {
                        $goodscarousel = Model('Goodscarousel');
                        $carousel = $goodscarousel->where($where)->select()->toArray();
                        if($goodscarousel->where($where)->delete()) {
                            foreach($carousel as $v) {
                                @unlink(self::$path['upload'].'/'.$v['img']);
                            }
                        }
                    }
                    if($style) {
                        Model('goodsstyle')->where($where)->delete();
                    }
                    @unlink(self::$path['upload'].'/'.$find['home_img']);
                    self::cacheSelect(true, $id);
                    $msg = '删除成功';
                    $code = 1;
                    self::commit();
                }
            }catch (Exception $e) {
                $msg = '数据异常';
                self::rollback();
            }
        }
        return self::dataJson($code, $msg, '', '', true);
    }


    //展示
    public function show($get,$where=[]) {
        $select = self::where($where)->order('goods_id desc')->paginate($get['limit'], true, ['page'=>$get['page']])->toArray();
        $count = self::where($where)->count();
        return self::dataJson(1, 'success', ['data'=>$select['data'], 'count'=>$count], '', true);
    }


}

?>