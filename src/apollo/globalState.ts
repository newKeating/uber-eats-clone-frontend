import { makeVar } from "@apollo/client";
import { isServer } from "../utils/isServer";
import { LOCALSTORAGE_TOKEN } from "../constants";

export const token = isServer()
  ? null
  : localStorage.getItem(LOCALSTORAGE_TOKEN);

export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);
