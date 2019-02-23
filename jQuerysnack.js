/**
 * Created by Administrator on 2017/4/4.
 */
$(function () {
    class Game{
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
            this.keyDown();
        }
        drawscene(){
            for(let i=0;i<20;i++){
                for(let j=0;j<20;j++){
                    this.box.append($('<div>').prop('id','c'+j+'-'+i));
                }
            }
        }
        drawshe(){
            this.she.forEach((obj,index)=>{
                $('#c'+obj.x+'-'+obj.y).addClass('she');
            })
        }
        getfood(){
            let {random:ran,floor:f}=Math;
            let x,y;
            do{
                x=f(ran()*20);
                y=f(ran()*20);
            }while(this.check(x,y,this.she));
            $('#c'+x+'-'+y).addClass('food');
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
                // console.log(this.way);
                //判断方向
                console.log(this.way);
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
                let newjQuery=$('#c'+newhead.x+'-'+newhead.y);
                if(!newjQuery[0]||this.check(newhead.x,newhead.y,this.she)){
                    alert('失败啦~');
                    clearInterval(this.t);
                    return;
                }
                newjQuery.addClass('she');
                this.she.push(newhead);
                //判断
                if(newhead.x==this.food.x&&newhead.y==this.food.y){
                    this.getfood();
                    $('#c'+newhead.x+'-'+newhead.y).removeClass('food');
                }else {
                    //去尾
                    $('#c'+this.she[0].x+'-'+this.she[0].y).removeClass();
                    this.she.shift();
                }
            },200)
        }
        keyDown(){
            $(document).on('keydown', (event)=>{
                let code = event.which;
                console.log(code);
                switch (code) {
                    case 37:
                        if (this.way == 'right') {
                            return;
                        }
                        this.way = 'left';
                        break;
                    case 38:
                        if (this.way == 'bottom') {
                            return;
                        }
                        this.way = 'top';
                        break;
                    case 39:
                        if (this.way == 'left') {
                            return;
                        }
                        this.way = 'right';
                        break;
                    case 40:
                        if (this.way == 'top') {
                            return;
                        }
                        this.way = 'bottom';
                        break;
                }
            });
        }

    }
    let box=$('.box');
    let jQueryobj=new Game(box);
    jQueryobj.play();
    // jQueryobj.drawscene();
    // jQueryobj.drawshe();


})