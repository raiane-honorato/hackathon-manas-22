export const formatDate = (date) => {
  const mounthList = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];

let formatedDate = ((date.getDate() + " " + mounthList[(date.getMonth())] + " " + date.getFullYear()));
return formatedDate;
}