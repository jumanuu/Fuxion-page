import api from './axios';

const DEFAULT_COUNTRY = 'CO';
const DEFAULT_WAREHOUSE = 1;
const DEFAULT_PRICE_TYPE = 1;
const DEFAULT_CURRENCY = 'COP';
const DEFAULT_CUSTOMER_TYPE = 1;
const DEFAULT_IDIOMA = 1;

const fuxionApi = {
  customer: {
    authenticate: async (loginName, password) => {
      const response = await api.post('/Customer/AuthenticateCustomer', {
        loginName,
        password
      });
      return response.data;
    },

    getById: async (customerId) => {
      const response = await api.post('/Customer/GetCustomer', {
        customerId
      });
      return response.data;
    },

    getByEmail: async (email, idioma = DEFAULT_IDIOMA) => {
      const response = await api.post('/Customer/GetCustomerEmail', {
        email,
        idioma
      });
      return response.data;
    },

    getByMobile: async (mobilePhone, mainCountry = DEFAULT_COUNTRY) => {
      const response = await api.post('/Customer/GetCustomerMobile', {
        mobilePhone,
        mainCountry
      });
      return response.data;
    },

    getByWebAlias: async (webAlias) => {
      const response = await api.post('/Customer/GetCustomerSiteWebAlias', {
        webAlias
      });
      return response.data;
    },

    restorePassword: async (email, idioma = DEFAULT_IDIOMA) => {
      const response = await api.post('/Customer/RestorePassword', {
        email,
        idioma
      });
      return response.data;
    },

    getExtendedDetail: async (customerId, extendedGroupID = 1) => {
      const response = await api.post('/Customer/GetCustomerExtendedDetail', {
        customerId,
        extendedGroupID
      });
      return response.data;
    },

    validatePowerLink: async (idToken) => {
      const response = await api.post('/Customer/GetValidatePowerLink', {
        idToken
      });
      return response.data;
    }
  },

  maestro: {
    getCategories: async (params = {}) => {
      const response = await api.post('/Maestro/GetCategory', {
        countryCode: params.countryCode || DEFAULT_COUNTRY,
        idioma: params.idioma || 'es'
      });
      return response.data;
    },

    getCategoriasFuxionHabilitadas: async (params = {}) => {
      const response = await api.post('/Maestro/GetCategoriasFuxionHabilitadas', {
        menuCategoriaProductoID: params.menuCategoriaProductoID || 0,
        categoriaId: params.categoriaId || 0,
        statusId: params.statusId || 1,
        pais: params.countryCode || DEFAULT_COUNTRY,
        customerType: params.customerType || DEFAULT_CUSTOMER_TYPE
      });
      return response.data;
    },

    getCategoriasFuxionPadre: async (params = {}) => {
      const response = await api.post('/Maestro/GetCategoriasFuxionPadre', {
        menuCategoriaProductoID: params.menuCategoriaProductoID || 0,
        categoriaId: params.categoriaId || 0,
        pais: params.countryCode || DEFAULT_COUNTRY,
        customerType: params.customerType || DEFAULT_CUSTOMER_TYPE
      });
      return response.data;
    },

    getProductsByCategory: async (params = {}) => {
      const response = await api.post('/Maestro/GetItemByCategory', {
        parentID: params.parentID || 0,
        priceTypeId: params.priceTypeId || DEFAULT_PRICE_TYPE,
        currencyCode: params.currencyCode || DEFAULT_CURRENCY,
        warehouseID: params.warehouseID || DEFAULT_WAREHOUSE,
        country: params.countryCode || DEFAULT_COUNTRY,
        tipCon: params.tipCon || 0,
        desCon: params.desCon || '',
        customerTypeID: params.customerTypeID || DEFAULT_CUSTOMER_TYPE
      });
      return response.data;
    },

    getProductItemsAgrupados: async (params = {}) => {
      const response = await api.post('/Maestro/GetProductItemsAgrupados', {
        parentID: params.parentID || 0,
        priceTypeId: params.priceTypeId || DEFAULT_PRICE_TYPE,
        currencyCode: params.currencyCode || DEFAULT_CURRENCY,
        warehouseID: params.warehouseID || DEFAULT_WAREHOUSE,
        country: params.countryCode || DEFAULT_COUNTRY,
        tipCon: params.tipCon || 0,
        desCon: params.desCon || '',
        customerTypeID: params.customerTypeID || DEFAULT_CUSTOMER_TYPE
      });
      return response.data;
    },

    getProductDetails: async (params = {}) => {
      const response = await api.post('/Maestro/GetProductDetails', {
        countryCode: params.countryCode || DEFAULT_COUNTRY,
        currencyCode: params.currencyCode || DEFAULT_CURRENCY,
        warehouseID: params.warehouseID || DEFAULT_WAREHOUSE,
        priceTypeID: params.priceTypeID || DEFAULT_PRICE_TYPE,
        itemCode: params.itemCode,
        idioma: params.idioma || DEFAULT_IDIOMA,
        isTienda: params.isTienda || false
      });
      return response.data;
    },

    getProductSearchText: async (params = {}) => {
      const response = await api.post('/Maestro/GetProductSearchText', {
        priceTypeId: params.priceTypeId || DEFAULT_PRICE_TYPE,
        currencyCode: params.currencyCode || DEFAULT_CURRENCY,
        warehouseID: params.warehouseID || DEFAULT_WAREHOUSE,
        countryCode: params.countryCode || DEFAULT_COUNTRY,
        desCon: params.desCon || '',
        idioma: params.idioma || DEFAULT_IDIOMA,
        tipo: params.tipo || 0
      });
      return response.data;
    },

    getLineaProductos: async (params = {}) => {
      const response = await api.post('/Maestro/GetLineaProductos', {
        countryCode: params.countryCode || DEFAULT_COUNTRY,
        idioma: params.idioma || 'es'
      });
      return response.data;
    },

    getProductItemImages: async (params = {}) => {
      const response = await api.post('/Maestro/GetProductItemImages', {
        itemCode: params.itemCode,
        countrycode: params.countryCode || DEFAULT_COUNTRY,
        warehouseID: params.warehouseID || DEFAULT_WAREHOUSE,
        tipCon: params.tipCon || 0
      });
      return response.data;
    },

    getWarehouses: async () => {
      const response = await api.post('/Maestro/GetWarehouse', {
        warehouseID: 0
      });
      return response.data;
    },

    getWarehouseAvailable: async (countryCode = DEFAULT_COUNTRY) => {
      const response = await api.post('/Maestro/GetWarehouseAvailable', {
        countryCode
      });
      return response.data;
    },

    getUbigeoDepartament: async (countryCode = DEFAULT_COUNTRY) => {
      const response = await api.post('/Maestro/GetUbigeoDepartament', {
        type: 0,
        countryCode
      });
      return response.data;
    },

    getUbigeoCity: async (departament, countryCode = DEFAULT_COUNTRY) => {
      const response = await api.post('/Maestro/GetUbigeoCity', {
        type: 0,
        countryCode,
        departament
      });
      return response.data;
    },

    getUbigeoDistrict: async (departament, city, countryCode = DEFAULT_COUNTRY) => {
      const response = await api.post('/Maestro/GetUbigeoDistrict', {
        type: 0,
        countryCode,
        departament,
        city
      });
      return response.data;
    },

    getCountries: async () => {
      const response = await api.post('/Maestro/GetCountries', {
        countryCode: ''
      });
      return response.data;
    },

    getPaymentbyCountry: async (params = {}) => {
      const response = await api.post('/Payment/GetPaymentbyCountry', {
        country: params.country || DEFAULT_COUNTRY,
        sistema: params.sistema || 'WEB',
        idioma: params.idioma || 'es'
      });
      return response.data;
    },

    generateLinkToPay: async (params = {}) => {
      const response = await api.post('/Maestro/GenerateLinkToPay', {
        orderId: params.orderId,
        transactionId: params.transactionId || '',
        total: params.total,
        fecha: params.fecha || new Date().toISOString(),
        urlReturn: params.urlReturn || ''
      });
      return response.data;
    },

    sendSMS: async (mobilePhone, countryCode = DEFAULT_COUNTRY, message) => {
      const response = await api.post('/Maestro/SendSMS', {
        mobilePhone,
        countryCode,
        message
      });
      return response.data;
    },

    sendEmail: async (email, subject, body) => {
      const response = await api.post('/Maestro/SendEmail', {
        email,
        subject,
        body,
        sistema: 'WEB'
      });
      return response.data;
    }
  },

  order: {
    getCustomerOrders: async (customerId, countryCode = DEFAULT_COUNTRY) => {
      const response = await api.post('/Order/GetCustomerOrdersId', {
        customerID: customerId,
        orderID: 0,
        countryCode,
        includePayments: true
      });
      return response.data;
    },

    getOrderDetailPay: async (orderId) => {
      const response = await api.post('/Maestro/GetOrderDetailPay', {
        orderId
      });
      return response.data;
    },

    getOrderWalletStatus: async (orderID) => {
      const response = await api.post('/Order/GetOrderWalletStatus', {
        orderID
      });
      return response.data;
    }
  }
};

export const FUXION_DEFAULT_COUNTRY = DEFAULT_COUNTRY;
export const FUXION_DEFAULT_WAREHOUSE = DEFAULT_WAREHOUSE;
export const FUXION_DEFAULT_PRICE_TYPE = DEFAULT_PRICE_TYPE;
export const FUXION_DEFAULT_CURRENCY = DEFAULT_CURRENCY;
export const FUXION_DEFAULT_CUSTOMER_TYPE = DEFAULT_CUSTOMER_TYPE;
export const FUXION_DEFAULT_IDIOMA = DEFAULT_IDIOMA;

export default fuxionApi;
