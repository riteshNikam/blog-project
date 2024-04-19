import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { databaseService } from "../appwrite/database";
import { storageService } from "../appwrite/storage";
import { Container } from "../components/components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";

const PostPage = () => {

    const { slug } = useParams()
    const [ post, setPost ] = useState()
    let isAuthor;
    const navigate = useNavigate()

    const userStoreData = useSelector(state => state.user)
    
    useEffect(
        () => {
            databaseService.getPost(slug)
                .then(
                    data => 
                        {
                            setPost(data)
                        }
                )
        },
        []
    )

    isAuthor = post?.user_id === userStoreData.userData?.$id ? true : false

    const handleDelete = async () => {
        await storageService.deleteFile(post?.featured_image);
        await databaseService.deletePost(slug);
        setPost({})
        navigate('/all-posts')
    }

    const handleEdit = async () => {
        navigate(`/edit-post/${slug}`)
    }

    return post && (
        <Container>
            <>
                <div className="flex flex-col w-3/4 border-2 rounded-lg mx-auto">
                    <div className="flex justify-between p-10">
                        <h1 className="text-3xl font-bold">{ post?.title }</h1>
                        <span>
                            {isAuthor && <button className="bg-red-700 px-4 py-2 text-white font-bold rounded-lg mr-2.5 text-2xl" onClick={ handleDelete }><MdDelete /></button>}

                            {isAuthor && <button className="bg-gray-500 px-4 py-2 text-white font-bold rounded-lg mr-2.5 text-2xl" onClick={ handleEdit }><MdModeEditOutline /></button>}
                        </span>
                    </div>
                    
                    <center className="border-y-2">
                        <img src={ storageService.getFilePreview(post?.featured_image) } alt="" className="w-full my-4 px-10"/>
                    </center>
                    
                    <div className="p-10">{parse( post?.content )}</div>
                </div>

                
                
            </>
            
        </Container>
    )
}

export default PostPage;