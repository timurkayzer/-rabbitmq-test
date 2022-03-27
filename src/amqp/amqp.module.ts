import { Module } from '@nestjs/common';
import { AmqpService } from './amqp.service';
import { AmqpController } from './amqp.controller';

@Module({
  controllers: [AmqpController],
  providers: [AmqpService],
})
export class AmqpModule { }
