import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { Settings, SettingsDocument } from './schemas/settings.schema';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name) private settingsModel: Model<SettingsDocument>,
  ) {}

  async find(): Promise<Settings> {
    const settingsArray = await this.settingsModel.find().exec();
    if (settingsArray.length === 0) {
      const createdSettings = new this.settingsModel().save();
      return createdSettings;
    }
    return settingsArray[0];
  }

  async update(updateSettingsDto: UpdateSettingsDto) {
    try {
      const settingsArray = await this.settingsModel.find().exec();
      if (settingsArray.length === 0) {
        const createdSettings = new this.settingsModel(
          updateSettingsDto,
        ).save();
        return createdSettings;
      }
      const settings = settingsArray[0];
      await this.settingsModel
        .updateOne({ _id: settings._id }, updateSettingsDto)
        .exec();
      return await this.find();
    } catch (error) {
      throw new NotFoundException('Could not find settings to update.');
    }
  }
}
