<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 产品类别Model数据控制
// +----------------------------------------------------------------------

namespace app\common\model;
class Category extends Common {

    protected $timeUpdate = true;

    /**
     * @param $data 添加修改数据
     * @param bool $bool false添加，true修改
     * @return array|false|string
     */
    public function editAdd($data, $bool=false) {

        $code = 0;
        $msg = $bool?'修改失败':'添加失败';
        $id = false;
        //判断名称是否存在
        $where[] = ['username','eq',$data['username']];
        if($bool) { //修改
            $id['category_id'] = $data['category_id'];
            $where[] = ['category_id','neq',$data['category_id']];
        }
        if(self::where($where)->count()) {
            $msg = '当前类别已存在';
        }else {
            $allow = ['username','sort'];
             if(self::allowField($allow)->isUpdate($bool)->save($data,$id)) {
                 $msg =  $bool?'修改成功':'添加成功';
                 self::cacehSelect(true);
                 $code = 1;
             }
        }
        return self::dataJson($code,$msg,'','',true);
    }

    /**
     * @param bool $bool false不更新缓存，true更新缓存
     * @return array|boolean
     */
    public static function cacehSelect($bool=false) {
        $data = cache(self::$path['goodsCategory']);
        if(!$data || $bool) {
            $data = self::order('sort desc')->select()->toArray();
            cache(self::$path['goodsCategory'],$data);
        }
        return $data;
    }

    //删除
    public function del($id) {
        $code = 0;
        $msg = '删除失败';
        if(self::where('category_id','=',$id)->delete()) {
            $code = 1;
            $msg = '删除成功';
            self::cacehSelect(true);
        }
        return self::dataJson($code,$msg,'','',true);
    }

    //展示
    public function show($get, $where=[]) {
        $data = self::where($where)->order('sort desc')->paginate($get['limit'],true,['page'=>$get['page']])->toArray();
        $count = self::where($where)->count();
        return self::dataJson(1,'success',[
            'data' => $data['data'],
            'count' => $count,
        ],'',true);
    }

}
?>