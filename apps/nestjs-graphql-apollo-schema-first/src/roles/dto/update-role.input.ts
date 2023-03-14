import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleInput } from './create-role.input';

export class UpdateRoleInput extends PartialType(CreateRoleInput) {}