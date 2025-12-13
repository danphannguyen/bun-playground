import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS using the CORS_ORIGIN environment variable, or allow all origins by default
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
  });

  app.setGlobalPrefix(process.env.API_PREFIX || 'api');

  const port = process.env.PORT || 3001;
  await app.listen(port);

  // Startup logs similar to Next.js
  console.log('\n');
  console.log('   🚀 NestJS Backend');
  console.log(`   - Local:         http://localhost:${port}`);
  console.log(`   - Network:       http://0.0.0.0:${port}`);
  console.log(`   - API Prefix:    /${process.env.API_PREFIX || 'api'}`);
  console.log(`   - Environment:   ${process.env.NODE_ENV || 'development'}`);
  console.log('\n   ✓ Ready');
}
bootstrap();
