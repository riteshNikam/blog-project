import { forwardRef, useId } from "react"

const Select = (
    {
        options,
        label,
        className = '',
        ...props
    }, ref
) => {
    const id = useId()

    return (
        <>
            <div>
                { label && <label htmlFor= { id } >{ label }: </label> }

                <select id= { id } { ...props } ref={ ref } className="border rounded-lg py-2 px-3">
                    {
                        options.length !== 0 && options.map( option => <option value={ option } key={ option }>{ option }</option>) 
                    }
                </select>
            </div>
        </>
    )
}

export default forwardRef(Select);