<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 网站相关设置
// +----------------------------------------------------------------------

namespace app\admin\controller;
use app\common\model\Web as modelWebe;
use app\commonConfig\Img;
class Web extends Common {
    use Img;
    public function index(modelWebe $modelWebe) {
        $input = input('post.');
        //上传图片
        if($this->yzGetShow($input, 201, 'post')) {
            $img = self::leafletImg($size=102400, $ext='jpg,png,gif,jpeg', $upload=self::$path['tuntime'],'file','logo');
            echo self::dataJson($img['code'], $img['msg'],$img['data']);
            exit;
        }
        return view('',[
            'data' => $modelWebe::cacheSelect(false),
        ]);
    }

//修改
    public function edit() {
        $code = 0;
        $msg = 'error';
        if(self::yzPostAdd()) {
            $input = self::$reques->post();
            $model = new modelWebe();
            $data = $model->edit($input);
            $code = $data['code'];
            $msg = $data['msg'];
        }
        echo self::dataJson($code,$msg);
    }
}
