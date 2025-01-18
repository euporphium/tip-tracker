'use server';

import { shiftsRepository } from '@/db';
import type { Shift, Shift_Insert } from '@/db/schema';
import type { Result } from '@/lib/types';

export async function addShift(newShift: Shift_Insert): Promise<Result<Shift>> {
  try {
    const shift = await shiftsRepository.create({
      date: newShift.date,
      hours: newShift.hours,
      tips: newShift.tips,
    });
    return { success: true, data: shift };
  } catch (error) {
    console.error('Failed to add shift:', error);
    return { success: false, error: 'Failed to add shift' };
  }
}
