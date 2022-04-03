import Services from "../services";

export const handleStar = async (listId, personIdList) => {
  const promises = personIdList.map(personId => Services.getUserById(listId, personId));
  const response = await Promise.all(promises);
  const personList = response.map(res => res.data);

  const starPromises = personList.map(person => Services.updateUser(listId, person.id, person.avatar, person.name, person.stars + 1));
  const starResponse = await Promise.all(starPromises);

  const status = !!starResponse.filter(res => res.status !== 204) ? 204 : 400;
  return {status: status, data: personList};
}