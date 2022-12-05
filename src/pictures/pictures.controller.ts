import { Body, Controller, Delete, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PicturesService } from './pictures.service';

@Controller('pictures')
export class PicturesController {
    constructor(private readonly _picturesService: PicturesService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('images'))
    testPic(@UploadedFiles() files: Array<Express.Multer.File>) {
        console.log(files);
    }

    @Put(':postId')
    @UseInterceptors(FilesInterceptor('images'))
    uploadPics(@UploadedFiles() files: Array<Express.Multer.File>) {
        
    }

    @Delete(':postId')
    deletePics(@Param('postId') postId: string, @Body() body: any) {

    }
}

// Return template

// [
//     {
//         fieldname: 'images',
//         originalname: 'img1.jpeg',
//         encoding: '7bit',
//         mimetype: 'image/jpeg',
//         destination: './upload',
//         filename: '75bc4c962af09d365f64ebee0d0446be',
//         path: 'upload/75bc4c962af09d365f64ebee0d0446be',
//         size: 35715
//     }
// ]

// Cloudinary template

// [
//     {
//         fieldname: 'images',
//         originalname: 'calendar1.png',
//         encoding: '7bit',
//         mimetype: 'image/png',
//         path: 'https://res.cloudinary.com/dikymjjry/image/upload/v1670070769/mascotas/ehvaepgfwcbkxy2w71mo.jpg',
//         size: 144104,
//         filename: 'mascotas/ehvaepgfwcbkxy2w71mo'
//     },
//     {
//         fieldname: 'images',
//         originalname: 'firefox_welcome1.png',
//         encoding: '7bit',
//         mimetype: 'image/png',
//         path: 'https://res.cloudinary.com/dikymjjry/image/upload/v1670070769/mascotas/nadraascexlruq1gmxot.jpg',
//         size: 68361,
//         filename: 'mascotas/nadraascexlruq1gmxot'
//     }
// ]
  
  