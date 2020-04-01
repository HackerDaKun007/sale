<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 产品参数 model
// +----------------------------------------------------------------------
namespace app\common\model;

class Rarameter extends Common {
    //添加修改
    public function editAdd($data,$bool=false) {
        $msg = $bool?'修改失败':'添加失败';
        $code = 0;
        $id = false;
        $where = [
            ['goods_id','eq',$data['goods_id']],
            ['title','eq',$data['title']],
        ];
        if($bool) {
            $id = ['parameter_id'=>$data['parameter_id']];
            $where[] = ['parameter_id','neq',$data['parameter_id']];
        }
        if(self::where($where)->count()) {
            $msg = '当前参数标题已存在';
        }else {
            $allow = ['goods_id','title','content','sort'];
            if(self::isUpdate($bool)->allowField($allow)->save($data,$id)) {
                $msg = $bool?'修改成功':'添加成功';
                Model('Goods')->cacheSelect(true, $data['goods_id']);
                $code = 1;
            }
        }
        return self::dataJson($code,$msg,'','',true);
    }

    //删除
    public function del($id) {
        $msg = '删除失败';
        $code = 0;
        if(self::where('parameter_id','eq',$id)->delete()) {
            $msg = '删除成功';
            $code = 1;
        }
        return self::dataJson($code,$msg,'','',true);
    }
    //展示
    public function show($get,$where=[]) {
        $select = self::where($where)->order('sort desc')->paginate($get['limit'], true, ['page'=>$get['page']])->toArray();
        $count = self::where($where)->count();
        return self::dataJson(1, 'success', ['data'=>$select['data'], 'count'=>$count], '', true);
    }

}
?>