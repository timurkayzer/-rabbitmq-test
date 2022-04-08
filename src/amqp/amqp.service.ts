import { Injectable } from '@nestjs/common';
import {
	AMQPChannel,
	AMQPClient,
	AMQPMessage,
	AMQPQueue,
} from '@cloudamqp/amqp-client';
import { AMQPBaseClient } from '@cloudamqp/amqp-client/types/amqp-base-client';
import { AmqpMessage } from './amqp-message.entity';

@Injectable()
export class AmqpService {
	private amqp: AMQPClient;
	private connection: AMQPBaseClient;
	private channel: AMQPChannel;

	constructor() {
		this.init();
	}

	async init() {
		this.amqp = new AMQPClient('amqp://localhost');
		this.connection = await this.amqp.connect();
		this.channel = await this.connection.channel();

		const queue = await this.createQueue('TestMessage');
		this.subcribe(queue);
	}

	async subcribe(queue: AMQPQueue): Promise<void> {
		queue.subscribe({}, this.handleMessage);
	}

	async createQueue(name: string): Promise<AMQPQueue> {
		return await this.channel.queue(name, {
			passive: false,
			durable: true,
			autoDelete: false,
		});
	}

	async sendMessage(message: AmqpMessage): Promise<boolean> {
		//await this.channel.basicPublish()
		return false;
	}

	handleMessage(msg: AMQPMessage): void {
		console.log(msg);
	}
}
