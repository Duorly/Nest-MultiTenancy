import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class PhoneValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!value.phone) {
      throw new BadRequestException('Le numéro de téléphone est requis.');
    }

    const phone = value.phone;

    if (!this.isValidPrefix(phone)) {
      throw new BadRequestException(
        'Le numéro de téléphone doit commencer par 06 ou 05 ou 04.',
      );
    }

    if (!this.isValidLength(phone)) {
      throw new BadRequestException(
        'Le numéro de téléphone doit comporter 9 caractères.',
      );
    }

    return value;
  }

  private isValidPrefix(phone: string): boolean {
    return (
      phone.startsWith('06') || phone.startsWith('05') || phone.startsWith('04')
    );
  }

  private isValidLength(phone: string): boolean {
    return phone.length === 9;
  }
}
