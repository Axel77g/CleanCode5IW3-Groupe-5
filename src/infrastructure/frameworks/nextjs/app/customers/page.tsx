import CustomerRegisterForm from "@/app/customers/CustomerRegisterForm";
import Chip from "@/components/Chip";
import Pagination from "@/components/Pagination";
import List from "@/components/List";
import ListItem from "@/components/ListItem";
import {useServerPagination} from "@/hooks/useServerPagination";
import HeadingTile from "@/components/HeadingTitle";
import {listCustomerUseCase} from "@infrastructureCore/useCaseImplementation/maintenance/customer/listCustomerUseCase";
import {Customer} from "@domain/maintenance/entities/Customer";
export default async function CustomersPage(pageProps : {searchParams: any}){
    const result = await listCustomerUseCase(await useServerPagination(pageProps))
    if(!result.success) return <div>{result.error.message}</div>
    const {value,...pagination} = result
    return <div className={"flex flex-col gap-6"}>
        <HeadingTile>Liste des clients</HeadingTile>
        <List>
            {
              value.map((customer :  Customer)=> (
                    <ListItem key={customer.customerId} link={`/customers/${customer.customerId}`}>
                        <Chip>#{customer.customerId}</Chip> {customer.name}
                    </ListItem>
                ))
            }
        </List>
        <Pagination {...pagination}/>
        <CustomerRegisterForm/>
    </div>
}