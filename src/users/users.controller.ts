import {
  Body,
  Controller,
  Delete,
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
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: 'public/avatars',
        filename: (req, file, cb) => {
          cb(null, Date.now() + '.' + file.originalname.split('.').pop());
        },
      }),
    }),
  )
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image/*',
        })
        .addMaxSizeValidator({
          maxSize: 10000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    avatar: Express.Multer.File,
  ) {
    createUserDto.avatar = avatar.originalname;

    const createdUser = await this.userService.create(createUserDto);

    return createdUser;
  }

  @Put('/update/:userId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('userId') userId: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(userId, updateUserDto);
  }

  @Delete('/delete/:userId')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('userId') userId: string) {
    return this.userService.remove(userId);
  }
}
