import { InMemoryCache, ReactiveVar, makeVar } from "@apollo/client";

// export const accountLoginVar: ReactiveVar<any> = makeVar<any>(null);
// export const dataServerConnectVar: ReactiveVar<any> = makeVar<any>([])
// export const infoDeleteDataVar: ReactiveVar<any> = makeVar<any>({
//   Title: "",
//   Table: "",
//   ID: 0,
//   Form: null,
// });

export const numberVar: ReactiveVar<number> = makeVar<number>(0)

const cache = new InMemoryCache();
export default cache;
