/**
 * Created by Administrator on 2017/3/20.
 */
window.onload=function () {
    // //方法一：顺序结构下来
    // //构建场景
    // let box=document.querySelector('.box');
    // for(let i=0;i<20;i++){
    //     for(let j=0;j<20;j++){
    //         let div=document.createElement('div');
    //         div.id='c'+j+'-'+i;
    //         box.appendChild(div);
    //     }
    // }
    // //蛇的初始化
    // let she=[
    //     {x:0,y:0},
    //     {x:1,y:0},
    //     {x:2,y:0},
    // ];
    // //画蛇
    // she.forEach((obj)=>{
    //     //得到蛇身体的每一块的坐标
    //     let idname=obj.x+'-'+obj.y;
    //     //获取与蛇身体对应的每一块div
    //     let objdom=document.querySelector('#c'+idname);
    //     //给对应的div添加类名，使之变色
    //     objdom.className='she';
    // })
    // //食物
    // //食物是个随机数
    // let {random:ran,floor:f}=Math;
    // let food=getFood();
    // function getFood() {
    //     let x,y;
    //     do{
    //         x=f(ran()*20);
    //         y=f(ran()*20);
    //     }while(check(x,y,she));
    //     let objdom=document.querySelector('#c'+x+'-'+y);
    //     objdom.className='food';
    //     let food={x,y};
    //     return food;
    //     //food={x,y}
    // }
    // //判断食物是否与蛇的某个坐标一样
    // function check(a,b,arr) {
    //     let result=arr.some(function (obj) {
    //         return obj.x==a&&obj.y==b;
    //     })
    //     return result;
    // }
    // //蛇走
    // let way;
    // function move(way='right') {
    //     //得到蛇头
    //     let oldhead=she[she.length-1];
    //     //判断方向
    //     let newhead;
    //     switch(way){
    //         //向右走
    //         case 'right':
    //             newhead={x:oldhead.x+1,y:oldhead.y};
    //             break;
    //         //向左走
    //         case 'left':
    //             newhead={x:oldhead.x-1,y:oldhead.y};
    //             break;
    //         //向上走
    //         case 'top':
    //             newhead={x:oldhead.x,y:oldhead.y-1};
    //             break;
    //         //向下走
    //         case 'bottom':
    //             newhead={x:oldhead.x,y:oldhead.y+1};
    //             break;
    //     }
    //     //获取新蛇头对应的div
    //     let newobj=document.querySelector('#c'+newhead.x+'-'+newhead.y);
    //     // console.log(newobj);
    //     //判断新蛇头是否撞上边缘
    //     if(newobj==null||check(newhead.x,newhead.y,she)){
    //         alert('Game over!');
    //         clearInterval(t);
    //         return;
    //     }
    //     //给新蛇头添加类名
    //     newobj.className='she';
    //     //将新的头部加入蛇的数组
    //     she.push(newhead);
    //     if(newhead.x==food.x&&newhead.y==food.y){
    //         food=getFood();
    //     }else{
    //         //去尾
    //         let oldend=document.querySelector('#c'+she[0].x+'-'+she[0].y);
    //         oldend.classList.remove('she');
    //         she.shift();
    //     }
    // }
    // let t=setInterval(function () {
    //     //键盘的上下左右键来控制蛇的走向
    //     document.onkeydown=function (e) {
    //         let code=e.keyCode;
    //         switch (code){
    //             case 37:
    //                 if(way=='right'){
    //                     return;
    //                 }
    //                 way='left';
    //                 break;
    //             case 38:
    //                 if(way=='bottom'){
    //                     return;
    //                 }
    //                 way='top';
    //                 break;
    //             case 39:
    //                 if(way=='left'){
    //                     return;
    //                 }
    //                 way='right';
    //                 break;
    //             case 40:
    //                 if(way=='top'){
    //                     return;
    //                 }
    //                 way='bottom';
    //                 console.log(way);
    //                 break;
    //         }
    //     }
    //     move(way);
    // },300);
    // //再来一局
       let button=document.querySelector('button');
       button.onclick=function () {
           location.reload();
       }
    // //暂停
    // let stop=document.querySelector('.stop');
    // stop.onclick=function () {
    //     clearInterval(t);
    // }

    //方法二：用类名
    class Game{
        //父类自己的构造函数constructor，提供父类实例化对象的初始化
        constructor(box){
            this.box=box;
            this.she=[
                {x:0,y:0},
                {x:1,y:0},
                {x:2,y:0},
            ];
            this.t=0;
            this.way='right';
            this.food={x:0,y:0};
        }
        play(){
            this.drawscene();
            this.drawshe();
            this.getfood();
            this.move();
            this.keydown();
        }
        drawscene(){
            for(let i=0;i<20;i++){
                for(let j=0;j<20;j++){
                    let div=document.createElement('div');
                    div.id='c'+j+'-'+i;
                    this.box.appendChild(div);
                }
            }
        }
        drawshe(){
            this.she.forEach((obj)=>{
                let domobj=document.querySelector('#c'+obj.x+'-'+obj.y);
                domobj.className='she';
            })
        }
        getfood(){
            let {random:ran,floor:f}=Math;
            let x,y;
            do{
                x=f(ran()*20);
                y=f(ran()*20);
            }while(this.check(x,y,this.she));
            let domobj=document.querySelector('#c'+x+'-'+y);
            domobj.className='food';
            this.food={x,y};
        }
        check(a,b,arr){
            return arr.some((val)=>{
               return val.x==a&&val.y==b;
            })
        }
        move(){
            this.t=setInterval(()=>{
                //获取旧蛇头
                let oldhead=this.she[this.she.length-1];
                //定义新蛇头
                let newhead;
                //判断方向
                switch (this.way){
                    case 'right':
                        newhead={x:oldhead.x+1,y:oldhead.y};
                        break;
                    case 'left':
                        newhead={x:oldhead.x-1,y:oldhead.y};
                        break;
                    case 'top':
                        newhead={x:oldhead.x,y:oldhead.y-1};
                        break;
                    case 'bottom':
                        newhead={x:oldhead.x,y:oldhead.y+1};
                        break;
                }
                //添头
                let newdom=document.querySelector('#c'+newhead.x+'-'+newhead.y);
                if(!newdom||this.check(newhead.x,newhead.y,this.she)){
                    alert('失败啦~');
                    clearInterval(this.t);
                    return;
                }
                newdom.className='she';
                this.she.push(newhead);
                //判断
                if(newhead.x==this.food.x&&newhead.y==this.food.y){
                    this.getfood();
                }else {
                    //去尾
                    let oldend=document.querySelector('#c'+this.she[0].x+'-'+this.she[0].y);
                    oldend.className='';
                    this.she.shift();
                }
            },200)
        }
        keydown(){
            document.onkeydown=(e)=>{
                let code=e.keyCode;
                switch (code){
                    case 37:
                        if(this.way=='right'){
                            return;
                        }
                        this.way='left';
                        break;
                    case 38:
                        if(this.way=='bottom'){
                            return;
                        }
                        this.way='top';
                        break;
                    case 39:
                        if(this.way=='left'){
                            return;
                        }
                        this.way='right';
                        break;
                    case 40:
                        if(this.way=='top'){
                            return;
                        }
                        this.way='bottom';
                        break;
                }
            }
        }
    }
    let box=document.querySelector('.box');
    let obj=new Game(box);
    obj.play();
}