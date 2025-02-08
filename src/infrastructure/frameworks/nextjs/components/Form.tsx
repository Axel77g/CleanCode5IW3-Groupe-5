import {ActionResponse} from "@/hooks/useServerForm";
import {ErrorCallout} from "@/components/ErrorCallout";
import {SuccessCallout} from "@/components/SuccessCallout";

export  function Form(props: { action?: any, title:string, children: any, state?: ActionResponse }){
    return <form className={'mt-4 px-4 py-6 border-[1px] border-slate-300 rounded relative'} action={props.action}>

        {
            props?.state?.message && <div className={"mb-4"}>
                {props.state.success == false && <ErrorCallout>{props.state.message}</ErrorCallout>}
                {props.state.success && <SuccessCallout>{props.state.message}</SuccessCallout>}
            </div>
        }


        <h3 className={'text-md font-semibold absolute -top-3 text-slate-500 bg-white px-2'}>{props.title}</h3>
        {props.children}

    </form>
}