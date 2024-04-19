import { forwardRef, useId } from "react";

const Input = (
    {
        label,
        type= 'text',
        className= '',
        ...props
    }, ref
) => {
    const id = useId()

    return (
        <>
            { label && <label htmlFor={ id } className="inline-block mb-1 pl-1">{ label }</label> }
            <input 
                type={ type }
                id={ id }
                ref={ ref }
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none border border-gray-200 w-full ${className}`}
                { ...props }
            />
        </>
    )
}

export default forwardRef(Input)


