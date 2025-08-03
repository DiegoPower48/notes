import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotesDto } from './dto/create-notes.dto';
import { UpdateNotesDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async getNotes() {
    const data = await this.prisma.note.findMany({
      orderBy: { updatedAt: 'desc' },
    });
    return data;
  }

  async createNotes(notes: CreateNotesDto, id: number) {
    try {
      const note = await this.prisma.note.create({
        data: {
          text: notes.text,
          category: notes.category,
          archive: false,
          user: {
            connect: { id },
          },
        },
      });

      return note;
    } catch (error) {
      throw new Error('Failed to create note: ' + error.message);
    }
  }

  async setArchived(id: number) {
    const note = await this.prisma.note.findUniqueOrThrow({
      where: { id },
    });

    return await this.prisma.note.update({
      where: { id },
      data: { archive: !note.archive },
    });
  }

  async editNote(notes: UpdateNotesDto) {
    try {
      await this.prisma.note.findUniqueOrThrow({
        where: { id: notes.id },
      });
      const data: any = {};
      if ('text' in notes) {
        data.text = notes.text.trim() === '' ? '' : notes.text;
      }
      if ('category' in notes) {
        data.category = notes.category.trim() === '' ? '' : notes.category;
      }
      const updatedNote = await this.prisma.note.update({
        where: { id: notes.id },
        data,
      });

      return updatedNote;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to edit note: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteNote(id: number) {
    try {
      await this.prisma.note.findUniqueOrThrow({
        where: { id: id },
      });

      await this.prisma.note.delete({
        where: { id: id },
      });
      return { message: 'Note deleted successfully' };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to delete note: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async filter({
    category,
    active,
    id,
  }: {
    category?: string;
    active?: 'archived' | 'active' | '';
    id: number;
  }) {
    const where: any = {};
    where.userId = id;
    if (category) {
      where.category = {
        equals: category,
      };
    }

    if (active === 'archived') {
      where.archive = true;
    } else if (active === 'active') {
      where.archive = false;
    }

    const data = await this.prisma.note.findMany({
      where,
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return data;
  }
}
