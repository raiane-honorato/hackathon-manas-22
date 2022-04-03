import Services from "../services";

export const handleRenewTask = async (listId, tasks) => {
  const nowDate = Date.now();
  const aDay = 86400000;

  const promises = tasks.reduce((accum, task) => {
    if(task.renew_time > 0) {
      const renewDate = task.last_renewed_date + task.renew_time * aDay;
      if(nowDate >= renewDate) {
         accum.push(Services.updateTask(listId, task.id, task.name, task.renew_time, false, task.type_id, task.responsable_list, task.created_at, nowDate));
         return accum;
      }
    }
  },[]);

  if(promises?.length > 0) {
      const response = await Promise.all(promises);
      const result = !!response.filter(res => res.status !== 204) ? 204 : 400;
      return result;
  }
  return 304;
};