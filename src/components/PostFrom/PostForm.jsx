import { useForm } from "react-hook-form";
import { Btn, RTE, Input, Select  } from '../components';
import { storageService } from "../../appwrite/storage";
import { databaseService } from "../../appwrite/database";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
// import { parse } from "node-html-parser"

const PostForm = () => {

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: "",
            slug: "",
            content: "",
            status: "active"
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.user.userData);
    const submit = async (data) => {

        // first upload image to upwrite
        const uploadedImage = await storageService.uploadFile(data.image[0])
        
        // store the image $id in data object
        data.featuredImage = uploadedImage?.$id;

        data.user_id = userData.$id

        // create a post using the data object
        const dbPost = await databaseService.createPost(
            { 
                title: data.title, 
                slug: data.slug, 
                content: data.content, 
                featured_image: data.featuredImage, 
                status: data.status, 
                user_id: data.user_id 
            }
        )

        if (dbPost) {
            navigate(`/post/${dbPost.$id}`)
        }        
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <>
            <div>
                <form onSubmit={handleSubmit(submit)} className="flex justify-center">
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
                                label="Featured Image :"
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
                                    {"Submit"}
                                </Btn>
                            </center>
                     
                        </div>
                </form>
            </div>
        </>
    );
}

export default PostForm;