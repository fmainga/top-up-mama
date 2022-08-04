import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Top Up Mama Test')
    .setDescription('TUM Test API Specification')
    .setVersion('1.0')
    .addTag('Top Up Mama Test APIs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = process.env.PORT;
  await app.listen(port, () => {
    console.log('Application Started on Port:', port);
  });
}
bootstrap();
