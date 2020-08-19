import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IOrganization } from './interfaces/organization.interface';
import { CreateOrganizationDto, UpdateOrganizationDto } from './dto';
import { Organization } from './schemas/organization.schema';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel(Organization.name)
    private readonly organizationModel: Model<Organization>,
  ) {}

  public async findAll(): Promise<Organization[]> {
    const organizations = await this.organizationModel
      .find()
      .populate('customers')
      .exec();
    return organizations;
  }

  public async findOne(organizationID: string): Promise<Organization> {
    const organization = await this.organizationModel
      .findById({ _id: organizationID })
      .populate('customers')
      .exec();
    if (!organization) {
      throw new NotFoundException(`Organization #${organizationID} not found`);
    }
    return organization;
  }

  public async create(
    createOrganizationDTO: CreateOrganizationDto,
  ): Promise<IOrganization> {
    const organization = await new this.organizationModel(
      createOrganizationDTO,
    );
    return organization.save();
  }

  public async update(
    organizationID: string,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<IOrganization> {
    const updatedOrganization = await this.organizationModel.findByIdAndUpdate(
      { _id: organizationID },
      updateOrganizationDto,
      { new: true },
    );
    return updatedOrganization;
  }

  public async remove(organizationID: string): Promise<any> {
    const organization = await this.organizationModel.findByIdAndRemove(
      organizationID,
    );
    return organization;
  }
}
