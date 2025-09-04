import { atom } from "jotai";
import { UserData } from "../types/user-data";
import { User } from "@supabase/supabase-js";

export const userAtom = atom<User | null>(null);
export const userDataAtom = atom<UserData | undefined>(undefined);
export const userLoadingAtom = atom<boolean>(true);
