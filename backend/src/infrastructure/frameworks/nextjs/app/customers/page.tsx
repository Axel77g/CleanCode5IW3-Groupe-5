import Chip from "@/components/Chip";
import { ErrorCallout } from "@/components/ErrorCallout";
import List from "@/components/List";
import ListItem from "@/components/ListItem";
import Pagination from "@/components/Pagination";
import { useServerPagination } from "@/hooks/useServerPagination";
import { listCustomerUseCase } from "@infrastructureCore/useCaseImplementation/maintenance/listCustomerUseCase";
import CustomerRegisterForm from "./CustomerRegisterForm";

export default async function CustomersListPage(pageProps: {
  searchParams: any;
}) {
  const paginationQuery = await useServerPagination(pageProps);
  const result = await listCustomerUseCase(paginationQuery);
  if (!result.success)
    return <ErrorCallout>{result.error.message}</ErrorCallout>;
  const { value, ...pagination } = result;
  return (
    <>
      <List>
        {value.map((customer) => (
          <ListItem link={`/customers/${customer.customerId}`}>
            <Chip>{customer.customerId}</Chip>
            {customer.name}
          </ListItem>
        ))}
        <Pagination {...pagination} />
      </List>

      <br />
      <hr />
      <br />

      <CustomerRegisterForm />
    </>
  );
}
