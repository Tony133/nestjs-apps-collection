import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IOrganization } from './interfaces/organization.interface';
import { CreateOrganizationDto, UpdateOrganizationDto } from './dto';
import { Organization } from './schemas/organization.schema';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

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
      .populate('customer')
      .exec();
  }

  public async findOne(organizationId: string): Promise<Organization> {
    const organization = await this.organizationModel
      .findById({ _id: organizationId })
      .populate('customer')
      .exec();

    if (!organization) {
      throw new NotFoundException(`Organization #${organizationId} not found`);
    }
    return organization;
  }

  public async create(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<IOrganization> {
    const organization = await new this.organizationModel(
      createOrganizationDto,
    );
    return organization.save();
  }

  public async update(
    organizationId: string,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<IOrganization> {
    const existingOrganization = await this.organizationModel.findByIdAndUpdate(
      { _id: organizationId },
      updateOrganizationDto,
      { new: true },
    );

    if (!existingOrganization) {
      throw new NotFoundException(`Customer #${organizationId} not found`);
    }
    return existingOrganization;
  }

  public async remove(organizationId: string): Promise<any> {
    const organization = await this.organizationModel.findByIdAndRemove(
      organizationId,
    );
    return organization;
  }
}
