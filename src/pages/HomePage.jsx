import { useState, useEffect } from "react";
import { databaseService } from "../appwrite/database";
import { Container, PostCard } from "../components/components";

const HomePage = () => {
    const [posts, setPosts] = useState([])
    useEffect(
        () => {
            databaseService.getActivePosts()
                .then(data => {
                    setPosts(data?.documents)
                })
        },
        []
    )

    if (!posts) {
        return (
            <>
                <div className="w-full text-center">
                    <Container>
                        <div className="flex flex-wrap">
                            <div className="p-2 w-full">
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    Login to read posts
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>
            </>
        )
    }

    return (
        <>
            {
                posts ? <div className="w-full py-8">
                <Container>
                    <div className="flex flex-wrap">
                        { 
                            posts?.map(post => {
                                <div key={ post.$id } className="p-2 w-1/4">
                                    <PostCard post= { post }></PostCard>
                                </div>
                            }) 
                        }
                    </div>
                
                </Container> </div> :
                <Container className='flex justify-center items-center'>
                    <div>
                        <h1 className="text-xl">Np post yet</h1>
                    </div>
                </Container>
            }
            
        </>
    )
}

export default HomePage;