import { Storage, ID, Client, Permission } from "appwrite"; // import Client ID and Client services 
import { conf } from "../conf/config"; // importing environment variables

// creating a DatabaseService class
// --- Attributes of class
//      --- client: instance of the Client Service
//      --- storage: instance of the Storage Service
// --- Methods of the class
//      --- uploadFile: File Model response
//      --- deleteFile: boolean
//      --- getFilePreview: url

class StorageService {
    client = new Client(); // create new Client instance
    // Client libraries used for integrating with Appwrite to build client-based applications 
    // and websites like we are doing in this project
    storage; // this is a attribute of DatabaseService class that we will define in constructor

    constructor() {

        // configuring client instance with environment variables
        this.client
            .setEndpoint(conf.appwrite_url)
            .setProject(conf.appwrite_project_id);

        this.storage = new Storage(this.client) // now instantiated the storage attribute using Storage Service provided by Appwrite API
    }

    // now we will create all the methods of the StorageService Class

    // uploadFile: Creates a new file using storage.createFile mrthod

    async uploadFile(file_name) {
        try {

            // createFile will accept following parameters
            //      --- backet_id
            //      --- file_id
            //      --- file

            return await this.storage.createFile(
                conf.appwrite_bucket_id, // required
                ID.unique(), // required
                file_name // required
            )

            // storage.createFile returns a File model document as response
            // here is a example https://appwrite.io/docs/references/cloud/models/file

        } catch (error) {
            console.log('APPWRITE SERVICE :: uploadFile :: error', error);
        }
    }

    // deleteFile: Delete a file by its unique ID using storage.deleteFile

    async deleteFile(file_id) {
        try {

            // createFile will accept following parameters
            //      --- backet_id
            //      --- file_id

            await this.storage.deleteFile(
                conf.appwrite_bucket_id, // required
                file_id // reuqired
            ) 

            // this methods return boolean

        } catch (error) {
            console.log('APPWRITE SERVICE :: deleteFile :: error', error);
        }
    }

    // getFilePreview: Gives file preview image using storage.getFilePreview method. Currently, this method supports preview for image files (jpg, png, and gif), other supported formats, like pdf, docs, slides, and spreadsheets, will return the file icon image

    getFilePreview(file_id) {
        try {

            // createFile will accept following parameters
            //      --- backet_id
            //      --- file_id
        
            const res = this.storage.getFilePreview(
                conf.appwrite_bucket_id, // required
                file_id, // required
            ) 

            return res;

        // storage.getFilePreview returns a URL

        } catch (error) {
            console.log('APPWRITE SERVICE :: deleteFile :: error', error);
        }
    }
}

const storageService = new StorageService();

export { storageService }

