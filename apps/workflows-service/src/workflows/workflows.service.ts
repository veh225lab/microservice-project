import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workflow } from './entities/workflow.entity';

@Injectable()
export class WorkflowsService {
  constructor(
    @InjectRepository(Workflow)
    private readonly workflowsRepository: Repository<Workflow>,
  ) {}

  async create(createWorkflowDto: CreateWorkflowDto): Promise<Workflow> {
    const workflow = this.workflowsRepository.create({
      ...createWorkflowDto,
    });

    return await this.workflowsRepository.save(workflow);
  }

  async findAll(): Promise<Workflow[]> {
    return await this.workflowsRepository.find();
  }

  async findOne(id: number): Promise<Workflow> {
    const workflow = await this.workflowsRepository.findOne({ where: { id } });
    if (!workflow) {
      throw new NotFoundException(`Workflow #${id} does not exist.`);
    }
    return workflow;
  }

  async update(
    id: number,
    updateWorkflowDto: UpdateWorkflowDto,
  ): Promise<Workflow> {
    const building = await this.workflowsRepository.preload({
      id: +id,
      ...updateWorkflowDto,
    });

    if (!building) {
      throw new NotFoundException(`Workflow #${id} does not exist.`);
    }

    return await this.workflowsRepository.save(building);
  }

  async remove(id: number): Promise<Workflow> {
    const building = await this.findOne(id);
    return this.workflowsRepository.remove(building);
  }
}
