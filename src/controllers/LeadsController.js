import { LeadsProvider } from '../hooks/LeadsContext';
import LeadView from '../views/LeadView';

const LeadsController = () => {
  return (
    <LeadsProvider>
      <LeadView />
    </LeadsProvider>
  );
};

export default LeadsController;
