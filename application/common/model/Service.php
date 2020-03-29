<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 服务说明Model
// +----------------------------------------------------------------------
namespace app\common\model;
class Service extends Common {
    protected $timeUpdate = true;
    /**
     * @param $data 添加、修改数组
     * @param bool $bool false添加、true修改
     * @return array 返回成功、失败值
     */
    public function editAdd($data,$bool=false) {
        $msg = $bool?'修改失败':'添加失败';
        $id = '';
        $allow = ['title','content','sort'];
        //判断标题是重复
        $wehre[] = ['title','eq',$data['title']];
        if($bool) { //修改
            $id = ['service_id'=>$data['service_id']];
            $wehre[] = ['service_id','neq',$data['service_id']];
        }
        $find = self::where($wehre)->count();
        if($find) {
            $msg = '产品标题已存在';
        }else {
            if(self::allowField($allow)->isUpdate($bool)->save($data, $id)) {
                $msg = $bool?'修改成功':'添加成功';
                $code = 1;
                self::cacheSelect(true);
            }
        }
        return self::dataJson($code, $msg,'','',true);
    }


    //更新缓存
    public static function cacheSelect($bool=false) {
        $data = cache(self::$path['cacheSelect']);
        if(!$data || $bool == true) {
            $data = self::order('sort desc')->select()->toArray();
            cache(self::$path['cacheSelect'], $data);
        }
        return $data;
    }

    //删除
    public function del($id) {
        $msg = '删除失败';
        $code = 0;
        if(self::where('service_id','=',$id)->delete()) {
            $msg = '删除成功';
            $code = 1;
            self::cacheSelect(true);
        }
        return self::dataJson($code,$msg,'','',true);
    }

    //展示数据
    public function show($get,$where=[]) {
        $select = self::where($where)->order('sort desc')->paginate($get['limit'], true, ['page'=>$get['page']])->toArray();
        $count = self::where($where)->count();
        return self::dataJson(1, 'success', ['data'=>$select['data'], 'count'=>$count], '', true);
    }

}

?>