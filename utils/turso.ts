import { Client, createClient } from "@libsql/client"

export function useTurso(): Client {
  const url = process.env?.TURSO_DB_URL.trim();
  if(url === undefined){
    throw Error("Url is not defined")
  }
  
  const authToken = process.env?.TURSO_DB_AUTH_TOKEN.trim();
  if(authToken === undefined){
    throw Error("Auth token is not defined")
  }

  return createClient({url, authToken});
}