import { Injectable } from "@nestjs/common";
import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import { storage } from "./multer.storage";

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    createMulterOptions(): MulterModuleOptions | Promise<MulterModuleOptions> {
        return {
            // dest: './upload',
            storage
        };
    }
}
