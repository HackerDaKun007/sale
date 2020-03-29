<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 产品轮播图 Model
// +----------------------------------------------------------------------
namespace app\common\model;
use think\Exception;

class Goodscarousel extends Common {

    //添加
    public function add($data) {
        $msg = '添加失败';
        $code = 0;
        $allow = ['img','goods_id','sort'];
        self::startTrans();
        try {
            if(self::allowField($allow)->isUpdate(false)->save($data)) {
                $msg = '添加成功';
                $code = 1;
                $goods = Model('Goods');
                $goodsData['carousel'] = 1;
                $goods->isUpdate(true)->save($goodsData,['goods_id'=>$data['goods_id']]);
                $goods->cacheSelect(true, $data['goods_id']);
                self::commit();
            }
        }catch(Exception $e) {
            $msg = '系统故障';
            self::rollback();
        }
        return self::dataJson($code, $msg, '', '', true);
    }

    //修改
    public function edit($data) {
        $msg = '修改失败';
        $code = 0;
        $find = '';
        if(!empty($data['img'])) {
            $find = self::where('goodscarousel_id','=',$data['goodscarousel_id'])->field('img')->find();
        }

        $allow = ['img','sort'];
        self::startTrans();
        try {
            if(self::allowField($allow)->isUpdate(true)->save($data,['goodscarousel_id'=>$data['goodscarousel_id']])) {
                if(!empty($find['img'])) {
                    /**
                     * 移动文件操作
                     */
                    $file = self::$path['upload'] .'/'. date('Ymd'); //新的目录地址
                    //目录为空则创建目录
                    self::createFile($file);
                    $longFile = self::$path['tuntime'].'/'.$data['img'];
                    //移动文件
                    if(self::fileCopy($longFile, self::$path['upload'].'/'.$data['img'])) {
                        //删除文件
                        unlink($longFile);
                        unlink(self::$path['upload'].'/'.$find['img']);
                    }
                }
                $msg = '修改成功';
                $code = 1;
                Model('Goods')->cacheSelect(true, $data['goods_id']);
                self::commit();
            }
        }catch(Exception $e) {
            $msg = '系统故障';
            self::rollback();
        }
        return self::dataJson($code, $msg, '', '', true);
    }

    //删除
    public function del($data) {
        $code = 0;
        $msg = '删除失败';
        $where[] = ['goodscarousel_id','eq',$data['goodscarousel_id']];
        $find = self::where($where)->field('img')->find();
        if($find) {
            self::startTrans();
            try {
                if(self::where($where)->delete()) {
                    unlink(self::$path['upload'].'/'.$find['img']);
                    $code = 1;
                    $msg = '删除成功';
                    Model('Goods')->cacheSelect(true, $data['goods_id']);
                    self::commit();
                }
            }catch (Exception $e) {
                $msg = '系统故障';
                self::rollback();
            }
        }
        return self::dataJson($code, $msg, '', '', true);
    }

    //展示
    public function show($get) {
        $select = self::where('goods_id','=',$get['goods_id'])->order('sort asc')->paginate($get['limit'], true, ['page'=>$get['page']])->toArray();
        $count = self::where('goods_id','=',$get['goods_id'])->count();
        return self::dataJson(1, 'success', ['data'=>$select['data'], 'count'=>$count], '', true);
    }

}

?>