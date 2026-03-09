import { PrismaClient, TicketStage, TicketStatus, RequestType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.ticket.deleteMany();
  await prisma.company.deleteMany();

  // Seed companies first (Tickets now require a Company relation)
  const acme = await prisma.company.create({
    data: { name: 'Acme Corp', domain: 'acme.com' },
  });
  const northwind = await prisma.company.create({
    data: { name: 'Northwind Labs', domain: 'northwind.io' },
  });
  const globex = await prisma.company.create({
    data: { name: 'Globex Industries', domain: 'globex.com' },
  });

  const tickets = [
    {
      title: 'Reorganize Product squads',
      description: 'Move Alice from Product A to Product B and merge two squads.',
      companyId: acme.id,
      requestType: RequestType.ORG_CHANGE,
      stage: TicketStage.NEW,
      status: TicketStatus.OPEN,
      managerName: 'Jared Lee',
      ceoName: 'Mira Koh',
      submittedAt: new Date('2026-03-01T09:15:00Z'),
    },
    {
      title: 'Update remote work policy',
      description: 'Allow up to 3 days WFH for Engineering teams.',
      companyId: northwind.id,
      requestType: RequestType.POLICY_CHANGE,
      stage: TicketStage.MANAGER_REVIEW,
      status: TicketStatus.OPEN,
      managerName: 'Priya Nair',
      ceoName: 'Alex Ng',
      submittedAt: new Date('2026-02-26T11:30:00Z'),
    },
    {
      title: 'Grant admin access to HR dashboard',
      description: 'Temporary elevated access for onboarding project.',
      companyId: globex.id,
      requestType: RequestType.ACCESS_REQUEST,
      stage: TicketStage.CEO_REVIEW,
      status: TicketStatus.ON_HOLD,
      managerName: 'Marco Diaz',
      ceoName: 'Nora Chua',
      submittedAt: new Date('2026-02-20T08:00:00Z'),
    },
    {
      title: 'Rename Sales to Revenue team',
      description: 'Org-level naming change in directory and systems.',
      companyId: acme.id,
      requestType: RequestType.ORG_CHANGE,
      stage: TicketStage.COMPLETED,
      status: TicketStatus.CLOSED,
      managerName: 'Jared Lee',
      ceoName: 'Mira Koh',
      submittedAt: new Date('2026-01-10T10:00:00Z'),
    },
    {
      title: 'Limit guest access to office',
      description: 'Stricter guest policy after hours.',
      companyId: northwind.id,
      requestType: RequestType.POLICY_CHANGE,
      stage: TicketStage.REJECTED,
      status: TicketStatus.CLOSED,
      managerName: 'Priya Nair',
      ceoName: 'Alex Ng',
      submittedAt: new Date('2026-02-05T14:45:00Z'),
    },
  ];

  for (const ticket of tickets) {
    await prisma.ticket.create({ data: ticket });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
