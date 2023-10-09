// 用户登录和注册的表单项验证的通用代码

/*
*对某一个表单项进行验证的构造函数
*/
class FieldValidator {
/*
*构造器
*@param{String}      txtId           文本框的Id
*@param{Function}    validatorFunc   验证规则函数，当需要对该文本框进行验证时，会调用该函数，函数的参数为当前文本框的值，函数的返回值为验证的错误消息，若没有返回，则表示无错误
*/
    constructor(txtId, validatorFunc) {
        this.input = $('#' + txtId);
        this.p = this.input.nextElementSibling;     //获取input的下一层姊妹元素
        this.validatorFunc = validatorFunc;
        // 失去焦点触发验证函数
        this.input.onblur = () => {
            this.validate();
        };
    }

    // 验证， 成功返回true，失败返回false
    // 验证函数
    async validate(){
        const err = await this.validatorFunc(this.input.value);
        if(err) {
            //有错误
            this.p.innerText = err;
            return false;
        } else {
            this.p.innerText = ''
            return true;
        }
    }
    // 第一步传递一个文本（是元素的id用来识别是哪个元素）
    // 第二步传递一个函数（验证规则函数，函数的参数是前面的字符串，意思是对哪一个元素进行处理通过id进行识别）


    // 静态方法：直接写到构造函数的方法叫做静态方法
    // 原型方法：直接写道原型里面的方法叫做原型方法

    /*
     * 对传入的所有验证器进行统一的验证,如果所有的验证均通过，则返回true，否则返回false
     * @param {FieldValidator[]}    validators
     */
    static async validate(...validators) {
        // 使用map循环对validators的每一项进行验证方法执行
        const proms = validators.map((v) => v.validate());
        const results = await Promise.all(proms);
        return results.every(r => r)    //每一项的值传递给参数，看返回的值是不是true，全为true那就返回true，有一个为false那就false
    }
}

function test() {
    FieldValidator.validate(loginIdValidator, nicknameValidator).then((result) => {
        console.log(result)
    })
}
