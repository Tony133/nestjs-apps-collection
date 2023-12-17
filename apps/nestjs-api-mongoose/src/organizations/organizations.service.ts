import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrganizationDto, UpdateOrganizationDto } from './dto';
import { Organization } from './schemas/organization.schema';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { OrganizationsProfile } from './interfaces/organizations-profile';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel(Organization.name)
    private readonly organizationModel: Model<Organization>,
  ) {}

  public async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<Organization[]> {
    const { limit, offset } = paginationQuery;
    return await this.organizationModel
      .find()
      .skip(offset)
      .limit(limit)
      .populate({
        path: 'customers',
        select: 'customers',
        options: { strict: false },
      })
      .exec();
  }

  public async findOne(organizationId: string): Promise<Organization> {
    const organization = await this.organizationModel
      .findById({ _id: organizationId })
      .populate({
        path: 'customers',
        select: 'customers',
        options: { strict: false },
      })
      .exec();

    if (!organization) {
      throw new NotFoundException(`Organization #${organizationId} not found`);
    }

    return organization;
  }

  public async create(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<OrganizationsProfile> {
    const organization = await this.organizationModel.create(
      createOrganizationDto,
    );
    return organization;
  }

  public async update(
    organizationId: string,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<OrganizationsProfile> {
    const existingOrganization = await this.organizationModel.findByIdAndUpdate(
      { _id: organizationId },
      updateOrganizationDto,
      { new: true },
    );

    if (!existingOrganization) {
      throw new NotFoundException(`Organization #${organizationId} not found`);
    }
    return existingOrganization;
  }

  public async remove(organizationId: string): Promise<any> {
    const organization =
      await this.organizationModel.findByIdAndDelete(organizationId);
    return organization;
  }
}
