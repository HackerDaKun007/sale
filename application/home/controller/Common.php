<?php
// +----------------------------------------------------------------------
// | ThinkPHP 5.1 [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: dakun007 <dakun007@hotmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 前台首页
// +----------------------------------------------------------------------
namespace app\home\controller;
use think\Controller;
use think\Request;
use app\commonConfig\App;
class Common extends Controller
{
    use App;
    public function __construct(Request $request) {
        parent::__construct();

    }
}
