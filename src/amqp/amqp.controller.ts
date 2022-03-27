import { Controller } from '@nestjs/common';
import { AmqpService } from './amqp.service';

@Controller('amqp')
export class AmqpController {
  constructor(private readonly amqpService: AmqpService) {}
}
