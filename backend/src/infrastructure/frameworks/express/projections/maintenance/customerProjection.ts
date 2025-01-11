import { CustomerProjection } from '@application/maintenance/projections/CustomerProjection';
import { customerRepository } from '../../repositories/maintenance/customerRepository';

export const customerProjection = new CustomerProjection(customerRepository);