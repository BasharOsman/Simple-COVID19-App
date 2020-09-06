export default function numbersFormat(number){
    let arr=[]
    number.toString().split('').reverse().map((item, i)=>{
        if((i+1)%3===0){
            arr.push(","+item)
        }else(arr.push(item) )
    });
    const format = arr.reverse().join('');
    if(format[0] ===","){
        return format.slice(1,format.length)
    }else{
        return  format;
    }

}