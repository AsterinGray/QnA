import { HttpException, HttpStatus } from '@nestjs/common';

function _uppercaseFirstLetter(key: string) {
  return key.charAt(0).toUpperCase() + key.slice(1);
}

export function validateData(data: any) {
  Object.keys(data).map((key) => {
    if (!data[key]) {
      throw new HttpException(
        `${_uppercaseFirstLetter(key)} may not be empty`,
        HttpStatus.BAD_REQUEST,
      );
    }
  });
}
