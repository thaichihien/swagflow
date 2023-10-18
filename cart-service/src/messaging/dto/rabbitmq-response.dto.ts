export class RabbitMQResponse<T>{
    success: boolean
    message: string
    data : T | null
}