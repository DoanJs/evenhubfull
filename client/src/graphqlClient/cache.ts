import { InMemoryCache, ReactiveVar, makeVar } from "@apollo/client";

// export const accountLoginVar: ReactiveVar<any> = makeVar<any>(null);
// export const dataServerConnectVar: ReactiveVar<any> = makeVar<any>([])
// export const infoDeleteDataVar: ReactiveVar<any> = makeVar<any>({
//   Title: "",
//   Table: "",
//   ID: 0,
//   Form: null,
// });

export const tokenVar: ReactiveVar<string> = makeVar<string>('')
export const userVar: ReactiveVar<any> = makeVar<any>(null)

const cache = new InMemoryCache();
export default cache;
