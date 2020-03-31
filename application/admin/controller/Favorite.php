<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 用户收藏记录 控制器
// +----------------------------------------------------------------------
namespace app\admin\controller;
use app\common\model\Favorite as modelFavorite;
use app\common\validate\Page;
class Favorite extends Common {
    /**
     * 展示
     */
    public function index() {
        $input = self::$reques->get();
        if(self::yzGetShow($input)) {

            $success = '';
            $data='';
            $count=0;
            $page = new Page();
            if(!$page->check($input)) {
                $success = $page->getError();
            }else {
                $model = new modelFavorite();
                $where = [];
                if(!empty($input['user_id'])) {
                    $where[] = ['a.user_id','eq',$input['user_id']];
                }
                $modelData = $model->show($input,$where);
                $data = $modelData['data']['data'];
                $count = $modelData['data']['count'];
            }
            echo self::layuiJson($data,$count,'',$success);
            exit;
        }
        return view();
    }

    //更新全部缓存
    public function uploadselect() {
        $msg = 'error';
        $code = 0;
        if(self::yzPostAdd()) {
            $model = new modelFavorite();
            $model->cacheUpdate();
            $msg = '更新成功';
            $code = 1;
        }
        echo self::dataJson($code, $msg);
    }
}

?>