$(function () {

    //数据提交url地址

    //var s = "http://flow.xingyuanauto.com/portframe_test/public/index.php/userinfo";
    //var s = "https://h5api.xingyuanauto.com/userinfo"; //正式
    if(window.location.href.indexOf('http://h5.xingyuanauto.com')>-1){
		s = "https://h5api.xingyuanauto.com/userinfo";
	}else{
		s = 'http://flow.xingyuanauto.com/portframe_test/public/index.php/userinfo';
	}

    ProvinceData.init('province', 'city', 'dealer');
    // //获取省份
    // $.each(dataArr, function (index, value) {
    //     console.log(index, value);
    //     var option_html = '<option value=' + value.dealer_id + '>' + value.dealer_name + '</option>';
    //     $("#city").append(option_html);
    // });
    //
    // //获取城市
    // $("#province").change(function () {
    //     $("#city option:not(:first)").remove();
    //     var dealer_id = $("#province").val();
    //     if (dealer_id == "请选择省份") {
    //         $("#city").val(0);
    //         $("#dealer").val(0);
    //     }
    //     else if (dealer_id != "请选择省份") {
    //         $("#city").val(0);data.js
    //         $("#dealer").val(0);
    //             $.each(dataArr[], function (index, value) {
    //                 var option_html = '<option value=' + value.dealer_id + '>' + value.dealer_name + '</option>';
    //                 $("#city").append(option_html);
    //             })
    //     }
    // });
    //
    // //获取经销商
    // $("#city").change(function () {
    //     $("#dealer option:not(:first)").remove();
    //     var dealer_id = $("#city").val();
    //     if (dealer_id == '请选择城市') {
    //         $("#dealer").val(0);
    //     }
    //     else if (dealer_id != "请选择城市") {
    //         $("#dealer").val(0);
    //
    //         $.each(dataArr.city[1], function (index, value) {
    //             var option_html = '<option value=' + value.dealer_id + '>' + value.dealer_name + '</option>';
    //             $("#dealer").append(option_html);
    //         })
    //     }
    // });


    $("#submit").bind("click",function () {

        //项目来源
        var source_end = 2; // 1 pc   0 mobile
        var chart = "user_roewe";
        //名字不为空
        var name = $("input[name='name']").val();
        if (name == "" || name == "姓名") {
            showalert("请输入姓名");
            //$("input[name='name']").focus();
            return false;
        }

        if (!name.match(/^([\u4E00-\u9FA5]{2,4}$)|(^[a-zA-Z]{1,8}$)/)) {
            showalert("抱歉，姓名需要输入2-4位汉字或八个英文字母");
            return false;
        }

        //性别，必选 1男。2女
        //var thesex = $("input[name='sex']:checked").val();
        var thesex = 1;

        //手机号验证
        var phone = $("input[name='phone']").val();
        if (phone == "" || phone == "手机号") {
            showalert("手机号码不能为空！");
            // $("input[name='phone']").focus();
            return false;
        }

        if (!phone.match(/^(((1[3|5|7|8][0-9]{1}))+\d{8})$/)) {
            showalert("手机号码格式不正确！");
            //$("input[name='phone']").focus();
            return false;
        }

        // //省，必选
        // var server = $("select[name='server'] option:selected").text();
        // //console.log(province);
        // if (server == "请选择服务方式") {
        //     toMsg("请选择服务方式");
        //     // $("select[name='provinceId']").focus();
        //     return false;
        // }
        //
        // var car = $("input[name='cartype']").text();
        // if (car == "" || car == "车型") {
        //     toMsg("请选择车型");
        //     //$("input[name='name']").focus();
        //     return false;
        // }


        // //省，必选
        var province = $("select[name='provinceId']").val();
        //console.log(province);
        if (province == "0") {
            showalert("请选择省份");
            // $("select[name='provinceId']").focus();
            return false;
        }
        //
        // //市，必选
        var city = $("select[name='cityId']").val();
        if (city == "0") {
            showalert("请选择城市");
            // $("select[name='cityId']").focus();
            return false;
        }
        //
        // //经销商，必选
        var dealer = $("select[name='dealerId']").val();
        if (dealer == "0") {
            showalert("请选择经销商");
            //$("select[name='dealer']").focus();
            return false;
        }


        ////////////////////////////
        /*意向车型和购车时间为拓展字段*/
        ////////////////////////////


//        //意向车型
//         var cartype = $("#car").find("option:selected").text();
//         if (cartype == "请选择车型") {
//             toMsg("请选择车型");
//             return false;
//         }
//        //购买时间
//         var buycartime = $("#time").find("option:selected").text();
//         if(buycartime == "请选择购车时间"){
//             toMsg("请选择购车时间");
//             //$("select[name='dealer']").focus();
//             return false;
//         }

        //注册信息提交

        //注册信息提交
        $.getJSON(s, {
            name: name,
            sex: "未选择",
            mobile: phone,
            dealer_name: province + "," + city + "," + dealer,
            province: $("#province").find("option:selected").text(),
            city: $("#city").find("option:selected").text(),
            dealer: $("#dealer").find("option:selected").text(),
            others: "未知",
            car_type: "未选择",
            buy_time: "未选择",
            source: "未知来源",
            draw_id: 0,
            source_end: source_end,
            chart: chart
        }, function (v) {
            console.log(v);
            if (v.code === 1001) {
                showalert("提交成功");

            } else if (v.code === 1003) {
                showalert("手机号重复,请重新填写!")
            } else {
                showalert("注册失败!")
            }
            // if (jQuery.type(json) == "string") {
            //     json = eval('(' + json + ')'); //字符串转为json格式
            //     alert(json.msg);
            // }

        })

    });

    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)return unescape(r[2]);
        return null;
    }


})