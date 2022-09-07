import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('tiny'));

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'oauth2',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        flows: {
          password: {
            tokenUrl: '/auth/login',
            scopes: {},
          },
        },
      },
      'JWT',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      responseInterceptor: (res) => {
        const auth = /\/auth\/login$/;

        if (auth.test(res.url)) {
          res.body = res.body.oauth2;
          res.data = JSON.stringify(res.body);
        }
        return res;
      },
    },
  });

  await app.listen(3000);
}
bootstrap();
