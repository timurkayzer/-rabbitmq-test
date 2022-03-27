import { Test, TestingModule } from '@nestjs/testing';
import { AmqpController } from './amqp.controller';
import { AmqpService } from './amqp.service';

describe('AmqpController', () => {
  let controller: AmqpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmqpController],
      providers: [AmqpService],
    }).compile();

    controller = module.get<AmqpController>(AmqpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
