import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function LogValidation(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'logValidation',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // Add your custom logging logic here
          console.log(`Validating ${propertyName} with value: ${value}`);

          // Perform the default validation logic
          // You may want to replace this with the actual validation logic you need
          return typeof value === 'string' && value.length > 0;
        },
      },
    });
  };
}