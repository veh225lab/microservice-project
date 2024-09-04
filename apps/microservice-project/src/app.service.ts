import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Merci Seigneur pour ta grace infini';
  }
}
