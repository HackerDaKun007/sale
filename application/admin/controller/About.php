<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 关于我们 model
// +----------------------------------------------------------------------
namespace app\admin\controller;
use app\common\model\About as modelAbout;
class About extends Common {

    public function index(modelAbout $modelAbout) {

        return view('',[
            'data' => $modelAbout::cacheSelect(false),
        ]);
    }

    //修改
    public function edit() {
        $code = 0;
        $msg = 'error';
        if(self::yzPostAdd()) {
            $input =$_POST;
            $model = new modelAbout();
            $data = $model->add($input);
            $code = $data['code'];
            $msg = $data['msg'];
        }
        echo self::dataJson($code,$msg);
    }

}

?>