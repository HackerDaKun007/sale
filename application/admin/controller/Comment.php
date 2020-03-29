<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 商品评论 控制器
// +----------------------------------------------------------------------
namespace app\admin\controller;
use app\commonConfig\Img;
use app\common\model\Comment as CommentModel;
use app\common\validate\Comment as CommentValidte;
class Comment extends Common {
    use Img;

    public function index() {
        $model = new CommentModel();
        $input = self::$reques->param();
        //上传图片
        if($this->yzGetShow($input, 201, 'post')) {
            $img = self::leafletImg($size=102400, $ext='jpg,png,gif,jpeg', $upload=self::$path['tuntime']);
            echo self::dataJson($img['code'], $img['msg'],$img['data']);
            exit;
        }
        //展示路径
        if(self::yzGetShow($input)) {
            $validate = Validate('Page');
            $array = [];
            $count = 0;
            $success = '';
            if(!$validate->check($input)) {
                $success = $validate->getError();
            }else {
                $where = [];
                if(!empty($input['goods_id'])) {
                    $where[] = ['goods_id', 'eq', $input['goods_id']];
                }
                $data = $model->show($input,$where);
                $array = $data['data']['data'];
                $count = $data['data']['count'];
            }
            echo self::layuiJson($array, $count, '', $success);
            exit;
        }
        return view('');
    }

    public function add() {
        $msg = 'error';
        $code = 0;
        $input = self::$reques->post();
        if(self::yzPostAdd()) {
            $validate = new CommentValidte();
            $model = new CommentModel();
            $yz = $validate->scene('add')->check($input);
            if(!$yz) {
                $msg = $validate->getError();
            }else {
                $data =$model->add($input);
                $code = $data['code'];
                $msg = $data['msg'];
            };
        }
        echo self::dataJson($code, $msg);
    }

    public function edit() {
        $msg = 'error';
        $code = 0;
        $input = self::$reques->post();
        if(self::yzPostAdd()) {
            $input = array_filter($input);

            $validate = new CommentValidte();
            $model = new CommentModel();
            if(empty($data['home_img'])) {
                $yz = $validate->scene('editImg')->check($input);
            }else {
                $yz = $validate->scene('edit')->check($input);
            }
            if(!$yz) {
                $msg = $validate->getError();
            }else {
                $data =$model->edit($input);
                $code = $data['code'];
                $msg = $data['msg'];
            };
        }
        echo self::dataJson($code, $msg);
    }

    public function del() {
        $msg = 'error';
        $code = 0;
        $input = self::$reques->post();
        if(self::yzPostAdd()) {
            $validate = new CommentValidte();
            $model = new CommentModel();
            if(!$validate->scene('del')->check($input)) {
                $msg = $validate->getError();
            }else {
                $data = $model->del($input['comment_id']);
                $code = $data['code'];
                $msg = $data['msg'];
            };
        }
        echo self::dataJson($code, $msg);
    }

}

?>