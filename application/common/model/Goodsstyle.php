<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 产品款式 Model
// +----------------------------------------------------------------------
namespace app\common\model;
class Goodsstyle extends Common {

    /**
     * @param $data 添加、修改数组
     * @param bool $bool false添加、true修改
     * @return array 返回成功、失败值
     */
    public function editAdd($data,$bool=false) {
        $msg = $bool?'修改失败':'添加失败';
        $id = '';
        $code = 0;
        $allow = ['goods_id','username','price','regular_price','available','sort'];
        if($bool) { //修改
            $id = ['goodsstyle_id'=>$data['goodsstyle_id']];
        }
        if(self::allowField($allow)->isUpdate($bool)->save($data, $id)) {
            $msg = $bool?'修改成功':'添加成功';
            $code = 1;
            $goods = Model('Goods');
            if(!$bool) {
                $goods->isUpdate(true)->save(['style'=>1],['goods_id'=>$data['goods_id']]);
            }
            $goods->cacheSelect(true, $data['goods_id']);
        }
        return self::dataJson($code, $msg,'','',true);
    }

    //删除
    public function del($data) {
        $msg = '删除失败';
        $code = 0;
        if(self::where('goodsstyle_id','=',$data['goodsstyle_id'])->delete()) {
            $msg = '删除成功';
            $code = 1;
            Model('Goods')->cacheSelect(true, $data['goods_id']);
        }
        return self::dataJson($code,$msg,'','',true);
    }

    //展示数据
    public function show($get) {
        $select = self::where('goods_id','=',$get['goods_id'])->order('sort desc')->paginate($get['limit'], true, ['page'=>$get['page']])->toArray();
        $count = self::where('goods_id','=',$get['goods_id'])->count();
        return self::dataJson(1, 'success', ['data'=>$select['data'], 'count'=>$count], '', true);
    }



}
?>