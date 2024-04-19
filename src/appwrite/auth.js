import { conf } from "../conf/config.js"; // importing environment variables
import { Client, Account, ID } from "appwrite";

// this service will use Appwrite Account service that is used for
// authenticate and manage userAccount

// we are creating a AuthService class
// --- Attributes of the class
//      --- client
//      --- account

// --- Methods of the class
//      --- login: Session model response
//      --- logount: null
//      --- createAccount: User model response
//      --- getCurrentUser: User model response

class AuthService {
    client = new Client(); // create new CLient instance
    // Client libraries used for integrating with Appwrite to build client-based applications 
    // and websites like we are doing in this project
    account; // this is a attribute of AuthService class that we will define in constructor

    constructor() {

        // configuring client instance with environment variables
        this.client
            .setEndpoint(conf.appwrite_url) // VITE_APPWRITE_URL
            .setProject(conf.appwrite_project_id); // VITE_APPWRITE_PROJECT_ID
            
        this.account = new Account(this.client) // now instantiated the account attribute using Account Service provided by Appwrite API
    }


    // now we will create all the methods of the AuthService Class

    // createAccount method this will allow new user to register new account in project using account.create

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(), // required
                email, // required
                password, //required
                name // not required
            )

            // account.create returns a User model document as response
            // here is a example https://appwrite.io/docs/references/cloud/models/user
            console.log('88888888888888888888888888888');
            console.log(userAccount);

            // if (userAccount) { // if we do get the respons then simply call the login method [ defined later ]
            //     console.log('LOGGED IN'); 
            //     console.log('***************************');
            //     return this.login(email, password)
            // } 

            return userAccount && this.login({ email, password }); // return userAccount respnse as it is

        } catch (error) {
            console.log('APPWRITE SERVICE :: createAccount :: error', error);
        }
    }


    // getCurrentUser is using account.get to returen the logged in user

    async getCurrentUser() {
        try {
            const currentUser = await this.account.get();

            // account.get returns User model document as response
            // here is a example https://appwrite.io/docs/references/cloud/models/user

            if (!currentUser) { // if we don't get the response return null
                return  null;
            }

            return currentUser; // othewise simply return the repsonse

        } catch (error) {
            console.log('APPWRITE SERVICE :: getCurrentUser :: error', error);
        }
    }

    // login method : After you've created your account, users can be logged in using the 
    // Create Email Session method.

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)

            // account.createEmailPasswordSession returns Session model document as response
            // here is a example https://appwrite.io/docs/references/cloud/models/session

        } catch (error) {
            throw error
        }
    }


    // logout method : Delete all sessions from the user account and remove any sessions cookies from the end client. Usinf accoutn.deleteSessions

    async logout() {
        try {
            await this.account.deleteSessions();

             // retuns boolean
        } catch (error) {
            console.log('APPWRITE SERVICE :: logout :: error', error)
        }
    }
}

const authService = new AuthService(); // create a instanse of the AuthService class.

export { authService } // export it.