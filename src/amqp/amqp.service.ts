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
	private queue: AMQPQueue;

	constructor() {
		this.init();
	}

	async init() {
		this.amqp = new AMQPClient('amqp://localhost');
		this.connection = await this.amqp.connect();
		this.channel = await this.connection.channel();

		this.queue = await this.createQueue('TestMessage');
		this.subcribe(this.queue);
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
		try {
			console.log("Message sent", message.content);
			this.queue.publish(JSON.stringify(message.content, null, 4));
			return true;
		}
		catch (e) {
			console.error('Error while sending message,', e);
			return false;
		}

	}

	handleMessage(msg: AMQPMessage): void {
		console.log("Message received", msg.bodyToString());
	}
}
