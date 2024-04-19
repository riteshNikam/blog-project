import { useState, useEffect } from "react";
import { Container, PostCard } from "../components/components";
import { databaseService } from "../appwrite/database";


const AllPostPage = () => {

    const [posts, setPosts] = useState([]);

    useEffect(
        () => {
            databaseService.getActivePosts()
                .then(data => {
                    if(data) {
                        setPosts(data.documents)
                    }
                })
        },
        []
    )
    
    return (
        <>
            <Container className="flex flex-wrap">
               
                {
                    posts.map(post => <PostCard 
                        $id={ post.$id } 
                        title={ post.title }
                        featuredImage={ post.featured_image }
                        key={ post.$id }
                    ></PostCard>)
                }
            </Container>
        </>
    )
}

export default AllPostPage;