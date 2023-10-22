import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomerService } from '../customer/customer.service';
import { SignUpDto } from './dto/signup.dto';
import { Customer } from '@prisma/client';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let customerService: CustomerService;
  jest.mock('bcrypt');

  const customerTest: Customer = {
    id: '3ef8a0b9-c841-4dce-8bf6-fe7c1ef0cb77',
    email: 'chihien@gmail.com',
    password: '123456',
    firstName: 'Hien',
    lastName: 'Chi',
    dob: new Date(),
    phone: '0123456789',
    refreshToken: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  let customerServiceMockFunctions = {
    findOneByEmail: jest.fn(),
    create: jest.fn(),
    findOneByID: jest.fn(),
    saveRefreshToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({})],
      providers: [
        AuthService,
        {
          provide: CustomerService,
          useValue: customerServiceMockFunctions,
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('secret'),
          },
        },
      ],
    }).compile();

    customerService = module.get<CustomerService>(CustomerService);
    service = module.get<AuthService>(AuthService);
  });

  describe('signUp', () => {
    const signUpDto: SignUpDto = {
      email: 'chihien@gmail.com',
      password: '123456',
      firstName: 'Hien',
      lastName: 'Chi',
      dob: new Date(),
      phone: '0123456789',
    };

    it('should return two tokens when signing up for a new account successfully', async () => {
      jest.spyOn(customerService, 'findOneByEmail').mockResolvedValue(null);
      jest.spyOn(customerService, 'create').mockResolvedValue(customerTest);
      jest
        .spyOn(customerService, 'saveRefreshToken')
        .mockResolvedValue(customerTest);

      const tokens = await service.signUp(signUpDto);

      expect(tokens).toHaveProperty('accessToken');
      expect(tokens).toHaveProperty('refreshToken');
    });

    it('should throw a BadRequestException if email is already existed', async () => {
      jest
        .spyOn(customerService, 'findOneByEmail')
        .mockResolvedValue(customerTest);

      await expect(service.signUp(signUpDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
  describe('signIn', () => {
    const signInDto: SignInDto = {
      email: 'chihien@gmail.com',
      password: '123456',
    };

    it('should return two tokens when signing in successfully', async () => {
      jest
        .spyOn(customerService, 'findOneByEmail')
        .mockResolvedValue(customerTest);

      (bcrypt.compare as jest.Mock) = jest.fn().mockResolvedValue(true);

      jest
        .spyOn(customerService, 'saveRefreshToken')
        .mockResolvedValue(customerTest);

      const tokens = await service.signIn(signInDto);

      expect(tokens).toHaveProperty('accessToken');
      expect(tokens).toHaveProperty('refreshToken');
    });

    it('should throw a BadRequestException if email is not found', async () => {
      jest.spyOn(customerService, 'findOneByEmail').mockResolvedValue(null);

      await expect(service.signIn(signInDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw a BadRequestException if the password is incorrect', async () => {
      jest
        .spyOn(customerService, 'findOneByEmail')
        .mockResolvedValue(customerTest);

      (bcrypt.compare as jest.Mock) = jest.fn().mockResolvedValue(false);

      await expect(service.signIn(signInDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
  describe('refreshToken', () => {
    it('should return two tokens if the refresh token is valid', async () => {
      customerTest.refreshToken = 'token';
      jest
        .spyOn(customerService, 'findOneByID')
        .mockResolvedValue(customerTest);
      (bcrypt.compare as jest.Mock) = jest.fn().mockResolvedValue(true);
      jest
        .spyOn(customerService, 'saveRefreshToken')
        .mockResolvedValue(customerTest);
      const tokens = await service.refreshToken(customerTest.id, 'token');

      expect(tokens).toHaveProperty('accessToken');
      expect(tokens).toHaveProperty('refreshToken');
    });

    it('should throw a ForbiddenException if the account is logged out (refresh token is null)', async () => {
      customerTest.refreshToken = null;
      jest
        .spyOn(customerService, 'findOneByID')
        .mockResolvedValue(customerTest);
      await expect(
        service.refreshToken(customerTest.id, 'token'),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw a ForbiddenException if the refresh token is invalid', async () => {
      customerTest.refreshToken = 'token';
      jest
        .spyOn(customerService, 'findOneByID')
        .mockResolvedValue(customerTest);
      (bcrypt.compare as jest.Mock) = jest.fn().mockResolvedValue(false);
      await expect(
        service.refreshToken(customerTest.id, 'token'),
      ).rejects.toThrow(ForbiddenException);
    });
  });
  // describe('verifyUser', () => {});
});
