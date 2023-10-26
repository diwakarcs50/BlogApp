import conf from "../src/conf/conf";
import { Client,Databases,ID,Storage, Query } from "appwrite";


class dataStore{

    client=new Client()
    databases
    bucket

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }

    async createPost({title,slug,content,featured_image,status,userid}){
      try {
       

        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                 title,
                 content,
                 featured_image,
                 status,
                 userid
            }
        )
      } catch (error) {
        console.log("error occured in ::createPost",error)
      }
    }

    async updatePost(slug,{title,content,featured_image,status}){
         try {
           return await databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featured_image,
                    status
                }
               ) 
               
            
         } catch (error) {
            console.log("error in ::updatepost",error)
         }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("error in deleting the post::deletePost",this.deletePost)
            return false
        }
    }
    
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("error in ::getPost",error)
        }
    }


    async getPosts(queries=[Query.equal("status","active")]){
      try {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries
        )
       
      } catch (error) {
        console.log("error in ::getPosts",error)
      }
    }

   //file upload service
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("error in ::getPosts",error)
            return false
        }
    }
    
    async deleteFile(fileId){
         try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
         } catch (error) {
            console.log("error in ::delteFile",error)
            return false
         }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const dataUser=new dataStore()
export default dataUser