export default function Chip({children} : {children : React.ReactNode}){
    return(
        <div className="bg-blue-50 text-slate-600 text-sm rounded-full px-3 py-1">
            {children}
        </div>
    )
}