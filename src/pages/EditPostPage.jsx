import { Container, EditPostForm } from "../components/components";
import { databaseService } from "../appwrite/database";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


const EditPostPage = () => {

    const { slug } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState()

    useEffect(
        () => {
            if (slug) {
                databaseService.getPost(slug)
                    .then(
                        data => {
                            const newPost = data
                            setPost(newPost)
                        }
                    )
            } else {
                navigate(`/post/${post.$id}`)
            }
        }, 
        [ slug, navigate ]
    )

    return (
        <>
            { post ? 
                <Container>
                    <EditPostForm post = { post } ></EditPostForm>
                </Container>
            : null } 
        </>
    )
}

export default EditPostPage;