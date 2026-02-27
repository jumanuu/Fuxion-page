import fuxionApi, { 
  FUXION_DEFAULT_COUNTRY,
  FUXION_DEFAULT_WAREHOUSE,
  FUXION_DEFAULT_PRICE_TYPE,
  FUXION_DEFAULT_CURRENCY,
  FUXION_DEFAULT_CUSTOMER_TYPE
} from './fuxion';

export const USE_FUXION_API = true;

const mapFuxionCustomerToUser = (customer) => {
  if (!customer) return null;
  
  return {
    id: customer.customerID,
    customerID: customer.customerID,
    firstName: customer.firstName,
    lastName: customer.lastName,
    middleName: customer.middleName,
    nameSuffix: customer.nameSuffix,
    email: customer.email,
    phone: customer.primaryPhone,
    mobilePhone: customer.mobilePhone,
    company: customer.company,
    country: customer.country || FUXION_DEFAULT_COUNTRY,
    city: customer.city,
    state: customer.state,
    address: customer.address1,
    address2: customer.address2,
    zip: customer.zip,
    webAlias: customer.webAlias,
    loginName: customer.loginName,
    currencyCode: customer.currencyCode || FUXION_DEFAULT_CURRENCY,
    defaultWarehouseID: customer.defaultWarehouseID || FUXION_DEFAULT_WAREHOUSE,
    customerTypeID: customer.customerTypeID || FUXION_DEFAULT_CUSTOMER_TYPE,
    canLogin: customer.canLogin,
    birthDate: customer.birthDate,
    rankID: customer.rankID,
    rankDescription: customer.rankDescription,
    verified: customer.verified,
    role: customer.customerTypeID === 99 ? 'admin' : 'user'
  };
};

export const authService = {
  login: async (loginName, password) => {
    if (USE_FUXION_API) {
      try {
        const response = await fuxionApi.customer.authenticate(loginName, password);
        
        console.log('Auth response:', response);
        
        if (response && (response.customerID || response.loginName)) {
          const user = mapFuxionCustomerToUser(response);
          const token = `fuxion_${response.customerID}_${Date.now()}`;
          
          localStorage.setItem('fuxion_token', token);
          localStorage.setItem('fuxion_customerId', response.customerID);
          
          return {
            success: true,
            token,
            user
          };
        }
        
        return {
          success: false,
          message: response?.message || 'Credenciales inválidas'
        };
      } catch (error) {
        console.error('Auth error:', error.response?.data || error.message);
        return {
          success: false,
          message: error.response?.data?.message || error.message || 'Error de autenticación'
        };
      }
    }
    
    throw new Error('Configuración de API no válida');
  },

  getProfile: async (customerId) => {
    if (USE_FUXION_API) {
      const response = await fuxionApi.customer.getById(customerId);
      return mapFuxionCustomerToUser(response);
    }
    throw new Error('Configuración de API no válida');
  },

  getByEmail: async (email) => {
    if (USE_FUXION_API) {
      const response = await fuxionApi.customer.getByEmail(email);
      return mapFuxionCustomerToUser(response);
    }
    throw new Error('Configuración de API no válida');
  },

  getByMobile: async (mobilePhone, mainCountry = FUXION_DEFAULT_COUNTRY) => {
    if (USE_FUXION_API) {
      const response = await fuxionApi.customer.getByMobile(mobilePhone, mainCountry);
      return mapFuxionCustomerToUser(response);
    }
    throw new Error('Configuración de API no válida');
  },

  restorePassword: async (email) => {
    if (USE_FUXION_API) {
      const response = await fuxionApi.customer.restorePassword(email);
      return response;
    }
    throw new Error('Configuración de API no válida');
  },

  logout: async () => {
    return { success: true };
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('fuxion_token');
    const user = localStorage.getItem('fuxion_current_user');
    return !!(token && user);
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('fuxion_current_user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }
};

export default authService;
