import ajax from './ajax';


//1.基础路径
const BASE_URL = '/api';
// const BASE_URL = 'http://localhost:3000';

//2.请求方法
//2.1 请求首页轮播
export const getHomeCasual = () => ajax(BASE_URL + '/api/homecasual');

//2.2 请求首页导航
export const getHomeNav = () => ajax(BASE_URL + '/api/homenav');

//2.3 请求首页商品列表数据
export const getShopList = () => ajax(BASE_URL + '/api/shoplist');

//2.4 请求推荐商品列表数据
export const getRecommendList = (params) => ajax(BASE_URL + '/api/recommend', params);

//2.5 请求搜索商品列表数据
export const getSearchShopList = () => ajax(BASE_URL + '/api/search');

//2.6 请求短信验证码
export const getSmsCode = (phone) => ajax(BASE_URL + '/api/send_code', {
  phone
});

//2.7 手机验证码登录
export const phoneLoginCode = (phone, code) => ajax(BASE_URL + '/api/login_code', {
  phone,
  code
}, 'POST');

//2.8 用户名密码登录
export const pwdLogin = (user_name, pwd, captcha) => ajax(BASE_URL + '/api/login_pwd', {
  user_name,
  pwd,
  captcha
}, 'POST');

//2.9 获取登录的用户信息
export const getUserInfo = () => ajax(BASE_URL + '/api/user_info');

//2.10 退出登录
export const getLoginOut = () => ajax(BASE_URL + '/api/loginout');

//2.11 修改用户信息
export const changeUserInfo = (user_id, user_name, user_gender, user_address, user_brithday, user_sign) => ajax(BASE_URL + '/api/change_user_msg', {
  user_id,
  user_name,
  user_gender,
  user_address,
  user_brithday,
  user_sign
}, 'POST');

//2.12 修改用户信息
export const addGoodsToCart = (user_id, goods_id, goods_name, thumb_url, price) => ajax(BASE_URL + '/api/add_shop_cart', {
  user_id,
  goods_id,
  goods_name,
  thumb_url,
  price
}, 'POST');

//2.13 请求购物车的数据
export const getCartGoods = () => ajax(BASE_URL + '/api/cart_goods');
