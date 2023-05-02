import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  equals,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export const IsEqualToProperty =
  <T>(property: keyof T, options?: ValidationOptions) =>
  (object: unknown, propertyName: string) =>
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [property],
      validator: IsEqualToPropertyConstraint,
    });

@ValidatorConstraint({ name: 'IsEqualToProperty' })
export class IsEqualToPropertyConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, validationArguments?: ValidationArguments): boolean {
    const [relatedPropertyName] = validationArguments.constraints;
    const relatedValue = (validationArguments.object as any)[
      relatedPropertyName
    ];
    return equals(value, relatedValue);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const [propertyNameToCompare] = validationArguments.constraints;
    return `${propertyNameToCompare} and ${validationArguments.property} does not match`;
  }
}
