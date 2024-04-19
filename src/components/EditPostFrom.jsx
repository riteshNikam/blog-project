import { Input, Btn, Select, RTE } from '../components/components'
import { useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import { storageService } from '../appwrite/storage';
import { databaseService } from '../appwrite/database';
import { useNavigate } from 'react-router-dom';

const EditPostForm = ({ post } ) => {

    // console.log(post);

    const navigate = useNavigate()

    const { register, control, getValues, setValue, watch, handleSubmit } = useForm({
        defaultValues: {
            title: post.title,
            content: post.content,
            status: 'active',
            slug: post.$id
        }
    })

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(
        () => {
            const subscription = watch((value, { name }) => {
                if (name === "title") {
                    setValue("slug", slugTransform(value.title), { shouldValidate: true });
                }
            });

            return () => subscription.unsubscribe()
        }, 
        [ watch, slugTransform, setValue ]
    )

    const edit = async ( data ) => {
        // first delete the image that is already stored in the database
        await storageService.deleteFile(post.featured_image)

        // upload new image to upwrite
        const uploadedImage = await storageService.uploadFile(data.image[0])
        
        // store the image $id in data object
        data.featuredImage = uploadedImage?.$id;

        // create a post using the data object
        const dbPost = await databaseService.updatePost(post.$id, {
            title: data.title,
            content: data.content,
            featured_image: data.featuredImage,
            status: data.featuredImage
        })

        if (dbPost) {
            navigate(`/post/${dbPost.$id}`)
        }  
    }

    return (
        <>
          <div>
                <form onSubmit={handleSubmit(edit)} className="flex justify-center">
                    <div className="flex flex-col p-4 border border-gray-200 w-3/4 rounded-lg">                          
                    
                            {/* title input */}
                            <Input
                                label="Title :"
                                placeholder="Title"
                                className="mb-4"
                                {...register("title", { required: true })}
                            />

                            {/* slug for post */}
                            <Input
                                label="Slug :"
                                placeholder="Slug"
                                className="mb-4"
                                {...register("slug", { required: true })}
                                onInput={(e) => {
                                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                                }}
                            />

                            {/* featured image to upload image */}
                            <Input
                                label="Featured Image : ( Reupload original image or upload new image )"
                                type="file"
                                className="mb-4"
                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                {...register("image", { required: true })}
                            />

                            {/* select menu to toggle btw active and inactive */}
                            <Select
                                options={["active", "inactive"]}
                                label="Status"
                                className="mb-4"
                                {...register("status", { required: true })}
                            />

                            {/* mini editor for content */}
                            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")}/>

                            {/* submit btn */}
                            <center className="mt-5">
                                <Btn type="submit" bgColor={"bg-green-500"}>
                                    {"Edit"}
                                </Btn>
                            </center>
                     
                        </div>
                </form>
            </div>
        </>
    )
}

export default EditPostForm