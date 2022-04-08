import { Body, Controller, Post } from '@nestjs/common';
import { AmqpMessage } from './amqp-message.entity';
import { AmqpService } from './amqp.service';

@Controller('amqp')
export class AmqpController {
	constructor(private readonly amqpService: AmqpService) {}

	@Post()
	async sendMessage(@Body() body: AmqpMessage) {
		return { success: await this.amqpService.sendMessage(body) };
	}
}
