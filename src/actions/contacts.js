export const CONTACTS_INIT = 'CONTACTS_INIT';

export const initContacts = contacts => ({
    type: CONTACTS_INIT,
    contacts: contacts || null,
});

