import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';
import { EmailService } from './email.service';

@Global()
@Module({})
export class EmailModule {
  static forRoot<T extends EmailService, G extends Type<T>>(type: G): DynamicModule {
    const providers: Provider[] = [
      {
        provide: EmailService,
        useClass: type,
      },
    ];
    return {
      module: EmailModule,
      providers,
      exports: providers,
    };
  }
}
