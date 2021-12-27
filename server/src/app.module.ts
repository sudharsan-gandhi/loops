import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AudiosModule } from './audios/audios.module';
import { PacksModule } from './packs/packs.module';
import { PaymentPlansModule } from './payment-plans/payment-plans.module';
import { PaymentsModule } from './payments/payments.module';
import { RaveModule } from './rave/rave.module';
import { JobsModule } from './jobs/jobs.module';
import { ReviewsModule } from './reviews/reviews.module';
import { WishlistModule } from './wishlist/wishlist.module';

const MODELS = [
  AudiosModule,
  UsersModule,
  PacksModule,
  PaymentPlansModule,
  PaymentsModule,
  RaveModule,
  JobsModule,
  ReviewsModule,
  WishlistModule,
];
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: true,
      playground: true,
      include: MODELS,
    }),
    ...MODELS,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
