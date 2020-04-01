<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 售后服务说明 Model
// +----------------------------------------------------------------------

namespace app\admin\controller;
use app\common\model\Aftersale as modelAftersale;
class Aftersale extends Common {
    public function index(modelAftersale $modelAftersale) {

        return view('',[
            'data' => $modelAftersale::cacheSelect(false),
        ]);
    }

//修改
    public function edit() {
        $code = 0;
        $msg = 'error';
        if(self::yzPostAdd()) {
            $input =$_POST;
            $model = new modelAftersale();
            $data = $model->add($input);
            $code = $data['code'];
            $msg = $data['msg'];
        }
        echo self::dataJson($code,$msg);
    }
}
