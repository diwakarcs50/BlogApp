import conf from "../src/conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
   client =new Client();
   account


   constructor(){
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
    this.account=new Account(this.client)
   }

//user can signup from here
   async createAccount({email,password,name}){
    try {

        const userAccount =await this.account.create(ID.unique(),email,password)

        if(userAccount){
             return this.login({email,password})
        }
        else{
            return userAccount
        }
        
    } catch (error) {
        throw error
    }
   }

   //user can login from here
   async login({email,password}){
    try {
        await this.account.createEmailSession(email,password)
    } catch (error) {
        throw error
    }
   }

   //user can get dashboard information from here
   async getcurrentUser(){
    try {
        return await this.account.get()
        
    } catch (error) {
        console.log("")
    }

    return null



   }

   //user logs out
   async logout(){
    try {
        //delete sessions log user out from all places
        return await this.account.deleteSessions()
    } catch (error) {
        throw error
    }
   }






}


const authService=new AuthService()


export default authService