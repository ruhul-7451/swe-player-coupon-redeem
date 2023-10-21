import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('should redeem a valid coupon', async () => {
    const response = await request(app.getHttpServer())
      .post('/coupon-redeem')
      .send({ playerId: 1, rewardId: 1 })
      .expect(HttpStatus.OK);

    expect(response.body.id).toBeDefined();
    expect(response.body.value).toBeDefined();
  });

  it('should handle invalid reward', async () => {
    await request(app.getHttpServer())
      .post('/coupon-redeem')
      .send({ playerId: 1, rewardId: 999 }) // Non-existent reward
      .expect(HttpStatus.NOT_FOUND);
  });

  it('should handle reward out of date range', async () => {
    // Adjust the reward's date range to be outside the current date
    const rewardId = 1;
    // Set reward.endDate to a past date
    // and set reward.startDate to a future date
    await request(app.getHttpServer())
      .post('/coupon-redeem')
      .send({ playerId: 1, rewardId })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('should reject redemption when per-day limit is exceeded', async () => {
    const response = await request(app.getHttpServer())
      .post('/coupon-redeem')
      .send({ playerId: 1, rewardId: 2 }) // Reward with a perDayLimit of 1
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.error).toContain('per-day limit');
  });

  it('should reject redemption when total limit is exceeded', async () => {
    const response = await request(app.getHttpServer())
      .post('/coupon-redeem')
      .send({ playerId: 1, rewardId: 3 }) // Reward with a totalLimit of 1
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.error).toContain('total limit');
  });

  it('should reject redemption when the reward is not available at this time', async () => {
    const response = await request(app.getHttpServer())
      .post('/coupon-redeem')
      .send({ playerId: 1, rewardId: 4 }) // Reward with past or future dates
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.error).toContain('not available at this time');
  });
});
