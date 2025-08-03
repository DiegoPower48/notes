import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNotesDto } from './dto/create-notes.dto';
import { UpdateNotesDto } from './dto/update-note.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createNotes(
    @Body() notes: CreateNotesDto,
    @CurrentUser('id') id: number,
  ) {
    return this.notesService.createNotes(notes, id);
  }

  @Patch()
  @UseGuards(AuthGuard)
  async editNote(@Body() note: UpdateNotesDto) {
    return this.notesService.editNote(note);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteNote(@Param('id') id: string) {
    return this.notesService.deleteNote(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async setArchived(@Param('id') id: string) {
    return this.notesService.setArchived(+id);
  }

  @Get('/filter')
  @UseGuards(AuthGuard)
  async filter(
    @CurrentUser('id') id: number,
    @Query('category') category?: string,
    @Query('active') active?: 'archived' | 'active' | '',
  ) {
    return this.notesService.filter({ category, active, id });
  }
}
