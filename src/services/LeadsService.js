import ApiConnector from '../api/apiConnector';
import { v4 as uuidv4 } from 'uuid';

const LeadsService = {
  getLeads: () => {
    return ApiConnector.getLeads();
  },

  saveLead: (lead, opportunities) => {
    const newLead = {
      id: uuidv4(),
      name: lead.name,
      email: lead.email,
      telefone: lead.telefone,
      status: 'Cliente Potencial',
      opportunities: opportunities,
    };
    const leads = ApiConnector.getLeads();
    leads.push(newLead);
    ApiConnector.saveLeads(leads);
  },

  updateLeadStatus: (lead, status) => {
    const leads = ApiConnector.getLeads();
    const leadIndex = leads.findIndex((l) => l.id === lead.id);
    console.log(lead);
    console.log(leadIndex);
    if (leadIndex !== -1) {
      leads[leadIndex].status = status;
      ApiConnector.saveLeads(leads);
    }
  },
};

export default LeadsService;
