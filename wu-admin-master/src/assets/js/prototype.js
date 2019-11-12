Array.prototype.notempty = function() {
    var arr = [];
    this.map(function(val, index) {
        //过滤规则为，不为空串、不为null、不为undefined，不为empty也可自行修改
        if (val !== "" && val != undefined && val !='empty') {
            arr.push(val);
        }
    });
    return arr;
}
let whiteMenu = [
    {
    title:"首页",
    path:'/',
    icon:'fa fa-home'
    },
]
const getScrllWindth = () =>{
    var width = doc.documentElement.getBoundingClientRect().width;
    return width
}
//生成菜单
const renderMenu = (arr) =>{
    arr = arr || ""
    if (!arr) {
        return false
    }
    let menu = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].level.split('_').length  == 1) {
            arr[i].children = []
            menu.push(arr[i])
            delete arr[i];
        }
    }
    arr = arr.notempty();
    arr.map((v,i)=>{
        let currentId = v.level.split('_')[0];
        for (let j = 0; j < menu.length;j++) {
            menu[j].id == currentId ? menu[j].children.push(v) : ""
        }
    })
    return menu
}
export {
    renderMenu
}