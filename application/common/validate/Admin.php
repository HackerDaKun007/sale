<?php
namespace app\common\validate;
use think\Validate;
class Admin extends Validate {

    protected $rule = [
        'username' => 'require|length:1,32|alphaDash',
        'img' => 'require|length:1,150',
        'role_id' => 'require|length:1,11|number',
        'password' => 'require|length:3,32',
        'repassword' => 'require|confirm:password',
        'disable' => 'require|length:1,11|number',
        'mail' => 'email',
        'tei' => 'mobile',
        'sex' => 'require|in:1,2',
        'name' => 'length:1,32',
        'admin_id' => 'require|length:1,11|number',
    ];

    protected $message = [
        'username'      => '名称不能为空，只能是字母、数字、_、-',
        'img'           => '请上传头像',
        'role_id'       => '请选择角色',
        'password.require'      => '密码不能为空',
        'password.length'      => '密码不能小于3位或大于32位',
        'repassword'    => '确定密码不正确',
        'disable'       => '请选择是否禁用',
        'mail'          => '邮箱不正确',
        'tei'           => '手机号码不正确',
        'sex'           => '请选择性别',
        'name'          => '姓名不能大于32位字符',
        'admin_id'      => 'ID异常',
    ];

    protected $scene = [
        'add' => ['username','img','role_id','password','repassword','mail','tei','sex','name'],
        'edit' => ['username','img','role_id','password','repassword','disable','mail','tei','sex','name','admin_id'],
        'editImg' => ['username','img','role_id','disable','mail','tei','sex','name','admin_id'],
        'editPass' => ['username','role_id','password','repassword','disable','mail','tei','sex','name','admin_id'],
        'editNote' => ['username','role_id','disable','mail','tei','sex','name','admin_id'],
        'del' => ['admin_id'],
    ];

}