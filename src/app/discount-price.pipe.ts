import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountPrice',
})
export class DiscountPricePipe implements PipeTransform {
  transform(price: number, discountPercentage: number): number {
    if (!price || !discountPercentage) {
      return price;
    }
    const discountAmount = (price * discountPercentage) / 100;
    const discountPrice: number = price - discountAmount;
    return parseFloat(discountPrice.toFixed(2));
  }
}
