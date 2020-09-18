import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  NotFoundException,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto, UpdateOrganizationDto } from './dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('api/organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  public async getAllOrganization(
    @Res() res,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    const organizations = await this.organizationsService.findAll(
      paginationQuery,
    );
    return res.status(HttpStatus.OK).json(organizations);
  }

  @Get('/:id')
  public async getOrganization(
    @Res() res,
    @Param('id') organizationId: string,
  ) {
    const organization = await this.organizationsService.findOne(
      organizationId,
    );
    if (!organization) {
      throw new NotFoundException('organization does not exist!');
    }
    return res.status(HttpStatus.OK).json(organization);
  }

  @Post()
  public async addOrganization(
    @Res() res,
    @Body() createOrganizationDto: CreateOrganizationDto,
  ) {
    try {
      const organization = await this.organizationsService.create(
        createOrganizationDto,
      );
      return res.status(HttpStatus.OK).json({
        message: 'organization has been created successfully',
        organization,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Organization not created!',
        status: 400,
      });
    }
  }

  @Put('/:id')
  public async updateOrganization(
    @Res() res,
    @Param('id') organizationId: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    try {
      const organization = await this.organizationsService.update(
        organizationId,
        updateOrganizationDto,
      );
      if (!organization) {
        throw new NotFoundException('organization does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'organization has been successfully updated',
        organization,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Organization not updated!',
        status: 400,
      });
    }
  }

  @Delete('/:id')
  public async deleteOrganization(
    @Res() res,
    @Param('id') organizationId: string,
  ) {
    if (!organizationId) {
      throw new NotFoundException('organization ID does not exist');
    }

    const organization = await this.organizationsService.remove(organizationId);

    if (!organization) {
      throw new NotFoundException('organization does not exist');
    }

    return res.status(HttpStatus.OK).json({
      message: 'organization has been deleted',
      organization,
    });
  }
}
