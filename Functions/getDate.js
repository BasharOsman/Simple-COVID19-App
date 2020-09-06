export default function getDate(date){
    const d = new Date(date);
    const result = `${d.getFullYear()}-${d.getMonth()+1<10 ? "0"+(d.getMonth()+1): d.getMonth()+1}-${d.getDate()<10 ? "0"+d.getDate():d.getDate()}`;
    return result
}