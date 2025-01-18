export const dynamic = 'force-dynamic';

import { WageTracker } from '@/components/wage-tracker';
import { shiftsRepository } from '@/db';

async function getShifts() {
  return shiftsRepository.findAll();
}

const HomePage = async () => {
  const shifts = await getShifts();

  return <WageTracker initialShifts={shifts} />;
};

export default HomePage;
