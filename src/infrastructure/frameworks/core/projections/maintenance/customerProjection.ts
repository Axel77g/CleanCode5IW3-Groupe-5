import { CustomerProjection } from '@application/maintenance/projections/CustomerProjection';
import { customerRepository } from '@infrastructureCore/repositories/maintenance/customerRepository';

export const customerProjection = new CustomerProjection(customerRepository);