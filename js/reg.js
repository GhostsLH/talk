const loginIdValidator = new FieldValidator('txtLoginId', async function (val) {
    if (!val) {
        return '请填写账号';
    }
    const resp = await API.exists(val);
    if (resp.data) {
        // 账号已存在
        return '该账号已被占用，请重新选择一个账号名'
    }
    console.log(resp)
});

const nicknameValidator = new FieldValidator('txtNickname', function (val) {
    if (!val) {
        return '请输入昵称';
    }
})

const loginPwdValidator = new FieldValidator('txtLoginPwd', function (val) {
    if (!val) {
        return '请填写密码';
    }
})

const loginPwdAgainValidator = new FieldValidator('txtLoginPwdConfirm', function (val) {
    if (!val) {
        return '请填写确认密码';
    }
    if (val !== loginPwdValidator.input.value) {
        return '两次密码不一致';
    }
})

const form = $('.user-form');

form.onsubmit = async function (e) {
    e.preventDefault();
    const result = await FieldValidator.validate(
        loginIdValidator, 
        nicknameValidator, 
        loginPwdValidator, 
        loginPwdAgainValidator
    );
    if (!result) {
        return; //验证未通过
    }

    // 方法一手动创建
    // const data = {
    //     loginId: loginIdValidator.input.value,
    //     loginPwd: loginPwdValidator.input.value,
    //     nickname: nicknameValidator.input.value,
    // }

    // 方法二   高端处理
    const formData = new FormData(form);    
    const data = Object.fromEntries(formData.entries());   
    const resp = await API.reg(data);
    if(resp.code === 0) {
        alert('注册成功，点击确定，跳转到登录页');
        location.href= './login.html'
    }
};