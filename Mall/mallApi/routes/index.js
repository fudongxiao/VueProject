var express = require("express");
var router = express.Router();
const connection = require("./../db/db");
const svgCaptcha = require("svg-captcha");
const sms_util = require("../util/sms_util");
const md5 = require("md5");

//用户信息
let users = {};
let oCaptcha = '';
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Express"
  });
});

//0.推荐商品数据插入数据库
const recommendArr = require('../data/recommend').data;
router.get('/recommend/api', (req, res, next) => {
  //1.定义临时数组
  let temp_arr_all = [];
  //2.遍历数组
  for (let i = 0; i < recommendArr.length; i++) {
    //2.1去除单个数据对象
    let oldItem = recommendArr[i];
    // console.log(oldItem);
    //2.2取出数据表中对应字段
    let temp_arr = [];
    temp_arr.push(oldItem.goods_id);
    temp_arr.push(oldItem.goods_name);
    temp_arr.push(oldItem.short_name);
    temp_arr.push(oldItem.thumb_url);
    temp_arr.push(oldItem.hd_thumb_url);
    temp_arr.push(oldItem.image_url);
    temp_arr.push(oldItem.price);
    temp_arr.push(oldItem.normal_price);
    temp_arr.push(oldItem.market_price);
    temp_arr.push(oldItem.sales_tip);
    temp_arr_all.push(temp_arr);
  }
  // console.log(temp_arr_all);
  //3.批量插入数据库
  let sqlStr = "INSERT INTO app_recommend(`goods_id`,`goods_name`,`short_name`,`thumb_url`,`hd_thumb_url`,`image_url`,`price`,`normal_price`,`market_price`,`sales_tip`) VALUES ?";
  //3.1执行语句
  connection.query(sqlStr, [temp_arr_all], (error, results, fields) => {
    if (error) {
      // console.log(error);
      console.log('插入失败');
    } else {
      console.log('插入成功');
    }
  })
});

//0.1.banner数据插入数据库
// const homecasualArr = require('../data/homecasual').data;
// router.get('/homecasual/api', (req, res, next) => {
//   //1.定义临时数组
//   let temp_arr_all = [];
//   //2.遍历数组
//   for (let i = 0; i < homecasualArr.length; i++) {
//     //2.1去除单个数据对象
//     let oldItem = homecasualArr[i];
//     // console.log(oldItem);
//     //2.2取出数据表中对应字段
//     let temp_arr = [];
//     temp_arr.push(oldItem.imgurl);
//     temp_arr.push(oldItem.detail);
//     temp_arr_all.push(temp_arr);
//   }
//   // console.log(temp_arr_all);
//   //3.批量插入数据库
//   let sqlStr = "INSERT INTO app_homecasual(`imgurl`,`detail`) VALUES ?";
//   //3.1执行语句
//   connection.query(sqlStr, [temp_arr_all], (error, results, fields) => {
//     if (error) {
//       // console.log(error);
//       console.log('插入失败');
//     } else {
//       console.log('插入成功');
//     }
//   })
// })

// 1.首页轮播请求
router.get("/api/homecasual", (req, res) => {
  // const data = require('../data/homecasual');
  // res.json({successs_code:200,message:data})
  //1.1数据库查询语句
  let sqlStr = "SELECT * FROM app_homecasual";
  //1.2执行语句
  connection.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({
        error_code: 0,
        message: "数据请求失败"
      });
    } else {
      res.json({
        success_code: 200,
        message: results
      });
    }
    // console.log(results)
  });
});

// 2.首页导航请求
router.get("/api/homenav", (req, res) => {
  const data = require("../data/homenav");
  res.json({
    successs_code: 200,
    message: data
  });
});

// 3.首页商品请求
router.get("/api/shoplist", (req, res) => {
  const data = require("../data/shopList");
  res.json({
    successs_code: 200,
    message: data
  });
});

// 4.推荐商品请求
router.get("/api/recommend", (req, res, next) => {
  //1.0获取参数
  let pageNum = req.query.page || 1;
  let pageSize = req.query.count || 20;
  //1.1数据库查询语句
  let sqlStr =
    "SELECT * FROM app_recommend LIMIT " +
    (pageNum - 1) * pageSize +
    "," +
    pageSize;
  // console.log(sqlStr);
  //1.2执行语句
  connection.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({
        error_code: 0,
        message: "数据请求失败"
      });
    } else {
      setTimeout(() => {
        res.json({
          success_code: 200,
          message: results
        });
      }, 500);
    }
    // console.log(results)
  });
});

// 5.搜索商品请求
router.get("/api/search", (req, res) => {
  const data = require("../data/search");
  res.json({
    successs_code: 200,
    message: data
  });
});

// 6.一次性图形验证码
router.get("/api/captcha", (req, res) => {
  //1.生成随机验证码
  let captcha = svgCaptcha.create({
    size: 4, // 验证码长度
    ignoreChars: "0o1i", // 验证码字符中排除 0o1i
    noise: 2, // 干扰线条的数量
    color: true // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
  });
  //2.保存验证码
  req.session.captcha = captcha.text.toLocaleLowerCase();
  //3.类型为 SVG
  res.type("svg");
  //4.返回客户端
  res.send(captcha.data);
  // res.status(200).send(captcha.data);
  // console.log(captcha);
  // console.log(req.session);
  // oCaptcha = req.session.captcha;
  // console.log(req.session.captcha);
});

//7.发送验证码短信
router.get("/api/send_code", (req, res) => {
  //1.获取手机号码
  let phone = req.query.phone;
  //2.随机产生验证码
  let code = sms_util.randomCode(6);
  // console.log(code);
  //3.成功
  setTimeout(() => {
    users[phone] = code;
    res.json({
      successs_code: 200,
      message: code
    });
  }, 2000);
});

//8.手机验证码登录
router.post("/api/login_code", (req, res) => {
  //1.获取数据
  const phone = req.body.phone;
  const code = req.body.code;
  //2.验证验证码是否正确
  if (users[phone] != code) {
    res.json({
      err_code: 0,
      message: "验证码错误！"
    });
    return;
  }
  //3.查询数据
  delete users[phone];
  const sqlStr =
    "SELECT * FROM app_user_info WHERE user_phone = '" + phone + "' LIMIT 1";
  connection.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({
        err_code: 0,
        message: "请求数据失败！"
      });
    } else {
      results = JSON.parse(JSON.stringify(results));
      if (results[0]) {
        // console.log(results[0]);
        //用户已经存在
        req.session.userId = results[0].id;
        //返回数据给客户端
        res.json({
          success_code: 200,
          message: {
            id: results[0].id,
            user_name: results[0].user_name,
            user_phone: results[0].user_phone
          }
        });
      } else {
        //新用户注册
        const addSql =
          "INSERT INTO app_user_info(user_name,user_phone) VALUES (?,?)";
        const addSqlParams = [phone, phone];
        connection.query(addSql, addSqlParams, (error, results, fields) => {
          results = JSON.parse(JSON.stringify(results));
          if (!error) {
            req.session.userId = results.insertId;
            let sqlStr =
              "SELECT * FROM app_user_info WHERE id = '" +
              results.insertId +
              "' LIMIT 1";
            connection.query(sqlStr, (error, results, fields) => {
              if (error) {
                res.json({
                  err_code: 0,
                  message: "请求数据失败！"
                });
              } else {
                results = JSON.parse(JSON.stringify(results));
                res.json({
                  success_code: 200,
                  message: {
                    id: results[0].id,
                    user_name: results[0].user_name,
                    user_phone: results[0].user_phone
                  }
                });
              }
            });
          }
        });
      }
    }
  });
});

//9.账号密码登录
router.post("/api/login_pwd", (req, res) => {
  //1.获取数据
  // console.log(req.session.captcha);
  const user_name = req.body.user_name;
  const user_pwd = md5(req.body.pwd);
  const captcha = req.body.captcha.toLowerCase();
  console.log(captcha, req.session.captcha, req.session);
  // console.log(user_name);
  // console.log(user_pwd);

  //2.验证验证码是否正确   req.session.captcha,
  if (captcha !== req.session.captcha) {
    res.json({
      err_code: 0,
      message: "验证码错误！"
    });
    return;
  }
  // console.log(req.session.captcha);
  delete req.session.captcha;
  // oCaptcha = "";
  //3.查询数据
  const sqlStr = "SELECT * FROM app_user_info WHERE user_name = '" + user_name + "' LIMIT 1";
  connection.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({
        err_code: 0,
        message: "用户名不正确！"
      });
    } else {
      results = JSON.parse(JSON.stringify(results));
      // console.log(results);
      if (results[0]) {
        //用户已经存在
        if (md5(results[0].user_pwd) !== user_pwd) {
          res.json({
            err_code: 0,
            message: "密码不正确！"
          });
        } else {
          req.session.userId = results[0].id;
          //返回数据给客户端
          res.json({
            success_code: 200,
            message: {
              id: results[0].id,
              user_name: results[0].user_name,
              user_phone: results[0].user_phone
            },
            info: "登陆成功！"
          });
        }
      } else {
        res.json({
          err_code: 0,
          message: "用户不存在！"
        });
      }
    }
  });
});

//10.根据session中用户ID获取用户信息
router.get("/api/user_info", (req, res, next) => {
  let userId = req.session.userId;
  let sqlStr =
    "SELECT * FROM app_user_info WHERE id = '" + userId + "' LIMIT 1";
  connection.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({
        err_code: 0,
        message: "请求数据失败！"
      });
    } else {
      results = JSON.parse(JSON.stringify(results));
      // console.log(results + "12345698");
      if (!results[0]) {
        delete req.session.userId;
        res.json({
          err_code: 0,
          message: "请先登录！"
        });
      } else {
        res.json({
          success_code: 200,
          message:results[0]
        });
      }
    }
  });
});

//11.退出登录
router.get("/api/loginout", (req, res) => {
  //1.清除session里的用户id
  delete req.session.userId;
  //2.提示用户
  res.json({
    success_code: 200,
    message: "退出登录成功！"
  });
});

//12.修改用户信息
router.post("/api/change_user_msg", (req, res) => {
  //1.获取信息
  const id = req.body.user_id;
  const user_name = req.body.user_name || '';
  const user_gender = req.body.user_gender || '';
  const user_address = req.body.user_address || '';
  const user_brithday = req.body.user_brithday || '';
  const user_sign = req.body.user_sign || '';
  //2.验证
  if (!id) {
    res.json({
      err_code: 0,
      message: "修改用户信息失败！"
    });
  }
  //3.更新数据
  let sqlStr = "UPDATE app_user_info SET user_name = ? , user_gender = ? , user_address = ? , user_brithday = ? , user_sign = ? WHERE id = " + id;
  let strParams = [user_name, user_gender, user_address, user_brithday, user_sign];
  connection.query(sqlStr, strParams, (error, results, fields) => {
    if (error) {
      res.json({
        err_code: 0,
        message: "修改用户信息失败！"
      });
    } else {
      res.json({
        success_code: 200,
        message: "修改用户信息成功！"
      });
    }
  });
});

//13.添加商品到购物车
router.post("/api/add_shop_cart", (req, res) => {
  //1.验证用户
  let user_id = req.body.user_id;
  if(!user_id || user_id !== req.session.userId){
    res({err_code:0,message:"用户不存在"});
  }
  //2.获取客户端传过来的数据
  let goods_id = req.body.goods_id;
  let goods_name = req.body.goods_name;
  let thumb_url = req.body.thumb_url;
  let price = req.body.price;
  let buy_count = 1;
  let is_pay = 0;//0未购买 1 购买
  //3.查询数据
  let sqlStr = "SELECT * FROM app_cart WHERE goods_id = '"+goods_id+"' LIMIT 1;"
  connection.query(sqlStr,(error,results,fields)=>{
    if(error){
      res.json({err_code:0,message:'服务器内部错误！'});
    }else{
      results = JSON.parse(JSON.stringify(results));
      // console.log(results);
      if(results[0]){//3.1商品存在
         console.log(results[0]);
         let buys_count = results[0].buy_count + 1;
        //  buys_count += buys_count;
         console.log(buys_count);
         let sqlStrs = "UPDATE app_cart SET buy_count = "+buys_count+" WHERE goods_id = '"+goods_id+"' LIMIT 1;";
         connection.query(sqlStrs,(error,results,fields)=>{
          if(error){
            res.json({err_code:0,message:'加入购物车失败！'});
          }else{
            res.json({success_code:200,message:'加入购物车成功！'});
          }
         })
      }else{//3.2商品不存在
        let add_sql = "INSERT INTO app_cart(goods_id,goods_name,thumb_url,price,buy_count,is_pay) VALUES (?,?,?,?,?,?);";
        let addSqlParams = [goods_id,goods_name,thumb_url,price,buy_count,is_pay];
        connection.query(add_sql,addSqlParams,(error,results,fields)=>{
          if(error){
            res.json({err_code:0,message:'加入购物车失败！'});
          }else{
            res.json({success_code:200,message:'加入购物车成功！'});
          }
         })
      }
    }
  })
});

//14.查询购物车商品
router.get("/api/cart_goods", (req, res, next) => {
  // let userId = req.session.userId;
  if(!req.session.userId){
    res.json({
      err_code: 0,
      message: "请先登录！"
    });
    return;
  }else{
    let sqlStr ="SELECT * FROM app_cart";
    connection.query(sqlStr, (error, results, fields) => {
      if (error) {
        res.json({
          err_code: 0,
          message: "请求数据失败！"
        });
      } else {
        // results = JSON.parse(JSON.stringify(results));
        res.json({
          success_code: 200,
          message:results
        });
      }
    });
  }
});

module.exports = router;