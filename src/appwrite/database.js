import { conf } from '../conf/config.js'; // importing environment variables
import { Client, Databases, Query } from 'appwrite'; // import Client Dataseses and Query services

// creating a DatabaseService class
// --- Attributes of class
//      --- client: instance of the Client Service
//      --- databases: instance of the Database Service
// --- Methods of the class
//      --- createPost: Document Model repsonse
//      --- updatePost: Document Model repsonse
//      --- deletePost: boolean
//      --- getPost: Document Model repsonse
//      --- getActivePost: DocumentList Model response


class DatabaseService {
    client = new Client(); // create new Client instance
    // Client libraries used for integrating with Appwrite to build client-based applications 
    // and websites like we are doing in this project
    databases; // this is a attribute of DatabaseService class that we will define in constructor

    constructor() {

        // configuring client instance with environment variables
        this.client
            .setEndpoint(conf.appwrite_url)
            .setProject(conf.appwrite_project_id);

        
        this.databases = new Databases(this.client); // now instantiate the database attribute using Databases Service provided by Appwrite API
    }

    // now we will create all the methods of the DatabaseService Class

    // createPost method will create new document of the Post model in the project uisng databases.createDocument method

    async createPost({ title, slug, content, featured_image, status, user_id }) {
        try {

            // createDocument will accept following parameters
            //      --- database_id
            //      --- collection_id
            //      --- document_id
            //      --- data

            return await this.databases.createDocument(
                conf.appwrite_database_id, // required
                conf.appwrite_collection_id, // required
                slug, // this is document id and is required
                {
                    title,
                    content,
                    featured_image,
                    status,
                    user_id
                } // data
            )

            // databases.createDocument  returns a Document model document as response
            // here is a example https://appwrite.io/docs/references/cloud/models/document


        } catch (error) {
            console.log("APPWRITE SERVICE :: createPost :: error", error)
        }
    }

    // updatePost method is used to update the document already stored in project using databases.updateDocument method

    async updatePost(slug, { title, content, featured_image, status }) {
        try {

            // updateDocument will accept following parameters
            //      --- database_id
            //      --- collection_id
            //      --- document_id
            //      --- data

            return await this.databases.updateDocument(
                conf.appwrite_database_id, // required
                conf.appwrite_collection_id, // required
                slug, // slug is document id and is required
                {
                    title,
                    content,
                    featured_image,
                    status
                } // data
            )

            // databases.updateDocument returns a Document model document as response
            // here is a example https://appwrite.io/docs/references/cloud/models/document

        } catch (error) {
            console.log("APPWRITE SERVICE :: updatePost :: error", error);
        }
    }

    // deletePost: Delete a document by its unique ID using dotabases.deleteDocument

    async deletePost(slug) {
        try {

            // deleteDocument will accept following parameters
            //      --- database_id
            //      --- collection_id
            //      --- document_id

            await this.databases.deleteDocument(
                conf.appwrite_database_id, // required
                conf.appwrite_collection_id, // required
                slug // slug is the document is and is required
            ) 
            
            // this method in itself returns boolean

        } catch (error) {
            console.log("APPWRITE SERVICE :: deletePost :: error", error);
        }
    }

    // getPost: Get a document by its unique ID using databases.getDocument

    async getPost(slug) {
        try {

            // getDocument will accept following parameters
            //      --- database_id
            //      --- collection_id
            //      --- document_id

            return await this.databases.getDocument(
                conf.appwrite_database_id, // required
                conf.appwrite_collection_id, // required
                slug // slug id the document id and is required
            )

            // databases.getDocument returns a Document model document as response
            // here is a example https://appwrite.io/docs/references/cloud/models/document

        } catch (error) {
            console.log("APPWRITE SERVICE :: getPost :: error", error)
        }
    }

    // getActivePosts: given  list of all the user's documents in a given collection using databases.listDocuments 

    async getActivePosts() { // Appwrite Query API is used.
        try {

            // listDocuments will accept following parameters
            //      --- database_id
            //      --- collection_id
            //      --- queries: array

            return await this.databases.listDocuments(
                conf.appwrite_database_id, // required
                conf.appwrite_collection_id, // required
                // [Query.equal('status', 'active')]
            )

            // databases.listDocuments returns a DocumentList model document as response
            // here is a example https://appwrite.io/docs/references/cloud/models/documentList

        } catch (error) {
            console.log("APPWRITE SERVICE :: getActivePosts :: error", error);
        }
    }
}

const databaseService = new DatabaseService(); // creating the instance of the DatabaseService class

export { databaseService } // exporting it.