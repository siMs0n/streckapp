import { Controller, Get, Body, Put, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  find() {
    return this.settingsService.find();
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() updateSettingDto: UpdateSettingsDto) {
    return this.settingsService.update(updateSettingDto);
  }
}
