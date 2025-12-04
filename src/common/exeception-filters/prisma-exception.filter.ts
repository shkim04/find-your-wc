import {
  Catch,
  ConflictException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements GqlExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError): any {
    switch (exception.code) {
      case 'P2002': {
        throw new ConflictException('Not Unique Email');
      }
      case 'P2003': {
        throw new UnprocessableEntityException('Entity Not Exist');
      }
      case 'P2025': {
        throw new NotFoundException('Cannot find');
      }
      default:
        break;
    }

    return exception;
  }
}
