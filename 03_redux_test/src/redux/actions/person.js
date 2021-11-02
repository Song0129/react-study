import { ADD_PERSON, DEL_PERSON } from "../constant";

// 创建增加一个人的action动作对象
export const addPerson = (personObj) => ({ type: ADD_PERSON, data: personObj });
export const delPerson = (personObj) => ({ type: DEL_PERSON, data: personObj });
