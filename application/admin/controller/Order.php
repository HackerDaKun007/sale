<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 订单信息 控制器
// +----------------------------------------------------------------------
namespace app\admin\controller;
use app\common\model\Order as modelOrder;
use app\common\validate\Page;
class Order extends Common {
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
                $model = new modelOrder();
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
        return view('', [
            'goodsStatus' => self::$path['goodsStatus'],
        ]);
    }

    //修改
    public function edit() {
        $msg = 'error';
        $code = 0;
        if(self::yzPostAdd()) {
            $input = self::$reques->post();
            $validate = Validate('Osorder');
            if(!$validate->check($input)) {
                $msg = $validate->getError();
            }else {
                $model = Model('Order')->osedit($input);
                $msg = $model['msg'];
                $code = $model['code'];
            }
        }
        echo self::dataJson($code, $msg);
    }

    //更新全部缓存
    public function uploadselect() {
        $msg = 'error';
        $code = 0;
        if(self::yzPostAdd()) {
            Model('Order')->uploadOrder();
            $msg = '更新成功';
            $code = 1;
        }
        echo self::dataJson($code, $msg);
    }
}
?>