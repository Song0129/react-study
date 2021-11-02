import { ADD_PERSON, DEL_PERSON } from "../constant";

const initState = [{ id: "001", name: "Tom", age: 18 }];

export default function personReducer(perState = initState, action) {
	const { type, data } = action;
	switch (type) {
		case ADD_PERSON: //若是添加一个人
			return [data, ...perState];
		case DEL_PERSON: //若是添加一个人
			return perState.filter((personObj) => {
				return personObj.name !== data.name;
			});
		default:
			return perState;
	}
}
