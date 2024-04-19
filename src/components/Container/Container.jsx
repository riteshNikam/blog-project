const Container = ({ children, className='' }) => {
    return (
        <div className={`p-4 my-5 mx-5 ${ className }`}> { children } </div>
    )
}

export default Container;