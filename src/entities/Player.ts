import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 3 })
  dailyCouponLimit: number;

  @Column({ default: 21 })
  totalCouponLimit: number;

  @Column('simple-array', { nullable: true }) // An array to store redeemed coupon IDs, initially null
  redeemedCoupons: number[];
}
