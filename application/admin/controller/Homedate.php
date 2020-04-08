<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 首页点击事件
// +----------------------------------------------------------------------
namespace app\admin\controller;
class Homedate extends Common {

    //展示 日期流量
    public function index() {
        $input = self::$reques->get();
        if(self::yzGetShow($input)) {
            $validate = Validate('Page');
            $array = [];
            $count = 0;
            $success = '';
            if(!$validate->check($input)) {
                $success = $validate->getError();
            }else {
                $where = [];
                if(!empty($input['date'])) {
                    $input['date'] = strtotime($input['date']);
                    $where[] = ['date', 'eq', $input['date']];
                }
                $model = Model('Homedate');
                $data = $model->show($input,$where);
                $array = $data['data']['data'];
                $count = $data['data']['count'];
            }
            echo self::layuiJson($array, $count, '', $success);
            exit;
        }
        //获取角色信息
        return view();
    }

    public function homeclick() {
        $array = [];
        $count = 0;
        $success = '';
        $input = self::$reques->post();
        if(self::yzGetShow($input,200,'post')) {
            $validate = Validate('Page');
            if(!$validate->check($input)) {
                $success = $validate->getError();
            }else {
                $where = [];
                if(!empty($input['flowdate_id'])) {
                    $where[] = ['flowdate_id', 'eq', $input['flowdate_id']];
                }if(!empty($input['ip'])) {
                    $input['ip'] = self::passIp($input['ip']);
                    $where[] = ['ip', 'eq', $input['ip']];
                }if(!empty($input['ipadder'])) {
                    $where[] = ['ipadder', 'like', "%$input[ipadder]%"];
                }
                $model = Model('Homeclick');
                $data = $model->show($input,$where);
                $array = $data['data']['data'];
                $count = $data['data']['count'];
            }
        }
        echo self::layuiJson($array, $count, '', $success);

    }

}

?>