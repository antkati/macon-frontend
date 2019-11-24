import {CONTACTS_INIT} from '../actions/contacts';
import _get from 'lodash/get';

export default (state = {}, action) => {
    switch (action.type) {
        case CONTACTS_INIT:
            return {
                ...state,
                ...action.contacts,
            };
    }

    return state;
};

export const getContacts = state => state.contacts;
export const getContactEmail = state => _get(state.contacts, 'email');
