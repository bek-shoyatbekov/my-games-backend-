import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post('/signup')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: 'public/avatars',
        filename: (req, file, cb) => {
          return cb(
            null,
            Date.now() + '.' + file.originalname.split('.').pop(),
          );
        },
      }),
    }),
  )
  async register(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    console.log('Coming here', avatar);
    createUserDto.avatar = avatar.originalname;

    const createdUser = await this.userService.create(createUserDto);

    return createdUser;
  }

  @Put('/update/:userId')
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @Param('userId') userId: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(userId, updateUserDto);
  }

  @Delete('/delete/:userId')
  @HttpCode(HttpStatus.OK)
  async deleteProfile(@Param('userId') userId: string) {
    return this.userService.remove(userId);
  }
}
