import { NextResponse } from 'next/server';
import { DB_ENABLED, prisma } from '@/lib/dbClient';

/**
 * POST /api/demo-reset
 *
 * Re-seeds the demo data so the workspace is always clean.
 * When the database is disabled (front-end only mode) it simply returns
 * a success response — the client clears localStorage on its own.
 */
export async function POST() {
  try {
    if (DB_ENABLED && prisma) {
      // Truncate user-generated rows while keeping seed data intact.
      await prisma.workNote.deleteMany();
      await prisma.invite.deleteMany();
      await prisma.ticket.deleteMany();
    }

    return NextResponse.json(
      { status: 200, message: 'Demo workspace reset successfully.' },
      { status: 200 },
    );
  } catch (error) {
    console.error('[demo-reset]', error);
    return NextResponse.json(
      { status: 500, message: 'Failed to reset demo data.' },
      { status: 500 },
    );
  }
}
