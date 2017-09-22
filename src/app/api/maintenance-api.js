
import http from './http'

export default {
    /*
    主页
    * */
    //热门列表
    hotBrand(params){
        return http.get("front/brand/hot_list",params);
    },
    //品牌列表
    carBrandList(params){
        return http.get("front/brand/list",params);
    },
    //根据车辆获取车型
    choosType(params){
        return http.get("front/car/models_by_brand",params);
    },
    //根据车辆品牌 && 车型参数获取排量-油品
    chooseDisplacement(params){
        return http.get("front/car/spec_list",params);
    },

    //根据车辆品牌 && 车型参数 && 排量-油品获取年份
    chooseYear(params){
        return http.get("front/car/get_year",params);
    },
    //根据车辆品牌 && 车型参数 && 排量-油品 && 年份获取保养数据
    get_recommend(params){
        return http.get("front/car/get_recommend",params);
    },
    //根据图片获取vin码
    getVinByImg(params){
        return http.get("front/car/by_vin_img",params);

    },
    //根据图片获取vin码
    searchData(params){
        return http.get("front/brand/get_brands",params);

    }
}