import { Link } from "react-router-dom"
import { storageService } from "../appwrite/storage"

const PostCard = (
    {
        $id,
        title,
        featuredImage
    }
) => {

    return (
        <>
            <Link to={`/post/${ $id }`}>
                <div className="rounded-xl border border-gray-400 ml-2 w-64 h-64">
                    <div>
                        <img src={ storageService.getFilePreview(featuredImage) } alt={ title } className="rounded-xl w-64 h-44 "/>
                    </div>
                    <h2 className="w-full text-xl font-medium ps-2 flex justify-center rounded-lg py-3 text-gray-600">{ title }</h2>
                </div>
            </Link>
        </>
    )
}

export default PostCard