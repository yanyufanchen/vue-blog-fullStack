// 统一过滤返回数据
const return_JSON = function(json_data, response,err) {
    
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    let res={}
    if(err){
        console.log(err,'报错');
        res={
            mes: err,
            data: '',
            statu: 500
        }
    }else {
        console.log(json_data,'输出');
        res={
            mes: json_data.mes,
            data: json_data.flag?json_data.results: '',
            statu: 200
        }
    }
    
    response.end(JSON.stringify(res));
};

module.exports = {
    json: return_JSON
};
