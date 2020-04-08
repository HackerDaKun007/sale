<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 流量日期
// +----------------------------------------------------------------------
namespace app\admin\controller;
class Flowdate extends Common {

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
                $model = Model('Flowdate');
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


    //展示 日期流量
    public function uvindex() {
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
                $model = Model('Flowdate');
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

    public function pv() {
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
                }if(!empty($input['url'])) {
                    $where[] = ['url', 'like', "%$input[url]%"];
                }if(!empty($input['urladd'])) {
                    $where[] = ['url', 'like', "%$input[urladd]%"];
                }
                $model = Model('Pv');
                $data = $model->show($input,$where);
                $array = $data['data']['data'];
                $count = $data['data']['count'];
            }
        }
        echo self::layuiJson($array, $count, '', $success);

    }


    public function uv() {
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
                $model = Model('Uv');
                $data = $model->show($input,$where);
                $array = $data['data']['data'];
                $count = $data['data']['count'];
            }
        }
        echo self::layuiJson($array, $count, '', $success);

    }

}

?>