import { atom } from "jotai";
import { UserData } from "../types/user-data";

export const userAtom = atom<UserData | undefined>(undefined);
