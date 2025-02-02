import { ErrorCallout } from "@/components/ErrorCallout";
import { CustomerDTO } from "@domain/maintenance/entities/Customer";
import { showCustomerUseCase } from "../../../../core/useCaseImplementation/maintenance/customer/showCustomerUseCase";
("use server");

export default async function CustomerShowPâge(pageProps: {
  searchProps: any;
  params: any;
}) {
  const { customerId } = await pageProps.params;
  const result = await showCustomerUseCase({ customerId });
  if (!result.success)
    return <ErrorCallout>{result.error.message}</ErrorCallout>;
  const customer : CustomerDTO = {
    customerId: result.value.customerId,
    name: result.value.name,
    phoneNumber: result.value.phoneNumber,
    email: result.value.email,
    addres
  };
  return (
    <div>
      <div className={"font-semibold text-2xl"}>
        {" "}
        #{value.customerId} {value.name}
      </div>
      <ul></ul>
    </div>
  );
}
