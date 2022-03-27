import { Injectable } from '@nestjs/common';
import { AMQPChannel, AMQPClient } from '@cloudamqp/amqp-client';
import { AMQPBaseClient } from '@cloudamqp/amqp-client/types/amqp-base-client';

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
    }

    async subcribe() {

    }

    async createQueue() {

    }

    async sendMessage() {

    }

}
