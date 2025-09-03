// import { createClient } from "./supabase/server";
// import { UserData } from "./types/user-data";

// export const fetchUserData = async (auth_id: string) => {

//     try {
//         const supabase = createClient();
//       const { data } = await supabase
//         .from("users")
//         .select(
//           "*, roles(*, role_permissions(role_permission_id, permissions(name)))"
//         )
//         .eq("id", auth_id)
//         .single();

//       if (data) {
//         return data as UserData;
//       }
//     } catch (error) {
//       console.dir(error);
//     }
//   };
