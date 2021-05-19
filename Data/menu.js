const fs = require('fs').promises;
const path = './data/menu.json';

async function getMenu(){
    const menus = await fs.readFile(path, 'utf-8');
    return await JSON.parse(menus);
}

async function getMenuByID(id){
    const menu = await getMenu();
    return menu.find(menu => menu._id == id);
}

async function addMenu(menu){
    const menus = await getMenu();
    menus.sort((a,b)=> a._id - b._id);
    const lastId = menus[menus.length-1]._id;
    menu._id = lastId + 1;
    menus.push(menu);
    await fs.writeFile(path, JSON.stringify(menus, null, ' '));

    return menu;
}

// async function updateMenu(menu){
//     const menu = await getMenu();
//     const index = menu.findIndex(inv => inv._id == menu._id);
//     if(menu.first){
//         menu[index].first = menu.first;
//     }
//     if(menu.last){
//         menu[index].last = menu.last;
//     }
//     if(menu.year){
//         menu[index].year = menu.year;
//     }
//     await fs.writeFile(path, JSON.stringify(menu, null, ' '));

//     return menu[index];
// }

async function deleteMenu(id){
    const menus = await getMenu();
    const index = menus.findIndex(menu => menu._id == id);
    menus.splice(index,1);
    await fs.writeFile(path, JSON.stringify(menus, null, ' ')); 
}

module.exports = {getMenu, getMenuByID, addMenu, deleteMenu};