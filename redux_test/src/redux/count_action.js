/*
   该文件专门为Count组件生成action对象 
 */

import { INCREMENT, DECREMENT } from "./constant";

export const createIncrmentAction = (data) => ({ type: INCREMENT, data });
export const createDecrmentAction = (data) => ({ type: DECREMENT, data });
