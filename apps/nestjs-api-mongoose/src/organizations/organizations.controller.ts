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
  BadRequestException,
} from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto, UpdateOrganizationDto } from './dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  public async getAllOrganization(
    @Query() paginationQuery: PaginationQueryDto
  ) {
    return await this.organizationsService.findAll(paginationQuery);
  }

  @Get('/:id')
  public async getOrganization(@Param('id') organizationId: string) {
    return await this.organizationsService.findOne(organizationId);
  }

  @Post()
  public async addOrganization(
    @Body() createOrganizationDto: CreateOrganizationDto
  ) {
    try {
      const organization = await this.organizationsService.create(
        createOrganizationDto
      );
      return {
        message: 'Organization has been created successfully',
        organization,
      };
    } catch (err) {
      throw new BadRequestException(err, 'Error: Organization not created!');
    }
  }

  @Put('/:id')
  public async updateOrganization(
    @Param('id') organizationId: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto
  ) {
    try {
      const organization = await this.organizationsService.update(
        organizationId,
        updateOrganizationDto
      );

      return {
        message: 'Organization has been successfully updated',
        organization,
      };
    } catch (err) {
      throw new BadRequestException(err, 'Error: Organization not updated!');
    }
  }

  @Delete('/:id')
  public async deleteOrganization(@Param('id') organizationId: string) {
    if (!organizationId) {
      throw new NotFoundException('organization ID does not exist');
    }

    const organization = await this.organizationsService.remove(organizationId);

    return {
      message: 'Organization has been deleted',
      organization,
    };
  }
}
