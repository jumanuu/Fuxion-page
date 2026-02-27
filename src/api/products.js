import fuxionApi, {
  FUXION_DEFAULT_COUNTRY,
  FUXION_DEFAULT_WAREHOUSE,
  FUXION_DEFAULT_PRICE_TYPE,
  FUXION_DEFAULT_CURRENCY,
  FUXION_DEFAULT_CUSTOMER_TYPE,
  FUXION_DEFAULT_IDIOMA
} from './fuxion';

export const USE_FUXION_API = true;

const mapFuxionProductToProduct = (item) => {
  if (!item) return null;

  return {
    id: item.itemID,
    itemID: item.itemID,
    itemCode: item.itemCode,
    name: item.itemDescriptionNew || item.itemDescription || item.name,
    description: item.longDetail1 || item.shortDetail1 || item.descripcionLng || '',
    shortDescription: item.shortDetail1 || item.shortDetail2 || '',
    price: item.price || item.otherPrice3 || 0,
    points: item.bv || item.cv || 0,
    cv: item.cv,
    bv: item.bv,
    currencyCode: item.currencyCode || FUXION_DEFAULT_CURRENCY,
    category: '',
    images: [
      item.largeImageUrl,
      item.smallImageUrl,
      item.tinyImageUrl
    ].filter(Boolean),
    imageUrl: item.largeImageUrl || item.smallImageUrl || item.tinyImageUrl || '',
    thumbnailUrl: item.tinyImageUrl || item.smallImageUrl || '',
    smallImageUrl: item.smallImageUrl || '',
    largeImageUrl: item.largeImageUrl || '',
    weight: item.weight,
    stockLevel: item.stockLevel || 0,
    maxAllowedOnOrder: item.maxAllowedOnOrder || 0,
    empaque: item.empaque,
    tipo: item.tipo,
    flavor: item.sabor,
    tone: item.tono,
    father: item.padre,
    itemCodePadre: item.itemCodePadre,
    versionFormula: item.versionFormula,
    store: item.store,
    iconLine: item.iconLine,
    msjProducto: item.msjProducto,
    isVirtual: item.isVirtual || false,
    isGroupMaster: item.isGroupMaster || false,
    allowOnAutoOrder: item.allowOnAutoOrder || false,
    disponible: item.disponible
  };
};

const mapFuxionCategoryToCategory = (cat) => {
  if (!cat) return null;

  return {
    id: cat.categoriaId,
    categoriaId: cat.categoriaId,
    menuCategoriaProductoID: cat.menuCategoriaProductoID,
    parentID: cat.categoriaIdPadre,
    name: cat.descripcionXIdioma || cat.descripcionTienda || '',
    description: cat.descripcionTienda || '',
    orden: cat.orden,
    color: cat.color,
    image: cat.image_es || cat.image_en || cat.image_pt,
    icono: cat.icono,
    tienda: cat.tienda
  };
};

export const productService = {
  getAll: async (params = {}) => {
    if (USE_FUXION_API) {
      const response = await fuxionApi.maestro.getProductsByCategory({
        parentID: params.parentID || 0,
        priceTypeId: params.priceTypeId || FUXION_DEFAULT_PRICE_TYPE,
        currencyCode: params.currencyCode || FUXION_DEFAULT_CURRENCY,
        warehouseID: params.warehouseID || FUXION_DEFAULT_WAREHOUSE,
        countryCode: params.countryCode || FUXION_DEFAULT_COUNTRY,
        customerTypeID: params.customerTypeID || FUXION_DEFAULT_CUSTOMER_TYPE
      });

      const products = Array.isArray(response) 
        ? response.map(mapFuxionProductToProduct) 
        : [];

      return {
        products,
        pagination: {
          page: 1,
          limit: products.length,
          total: products.length,
          pages: 1
        }
      };
    }
    throw new Error('API no configurada');
  },

  getById: async (itemCode, params = {}) => {
    if (USE_FUXION_API) {
      const response = await fuxionApi.maestro.getProductDetails({
        itemCode,
        countryCode: params.countryCode || FUXION_DEFAULT_COUNTRY,
        currencyCode: params.currencyCode || FUXION_DEFAULT_CURRENCY,
        warehouseID: params.warehouseID || FUXION_DEFAULT_WAREHOUSE,
        priceTypeID: params.priceTypeID || FUXION_DEFAULT_PRICE_TYPE,
        idioma: params.idioma || FUXION_DEFAULT_IDIOMA
      });

      if (Array.isArray(response) && response.length > 0) {
        const productData = response[0];
        
        return {
          ...mapFuxionProductToProduct(productData.listModelItems?.[0] || {}),
          listModelItems: productData.listModelItems?.map(mapFuxionProductToProduct) || [],
          listImages: productData.listImages || [],
          listDetailItem: productData.listDetailItem || [],
          img_publicidad: productData.img_publicidad
        };
      }
      return null;
    }
    throw new Error('API no configurada');
  },

  getByCategory: async (categoriaId, params = {}) => {
    if (USE_FUXION_API) {
      const response = await fuxionApi.maestro.getProductsByCategory({
        parentID: categoriaId,
        priceTypeId: params.priceTypeId || FUXION_DEFAULT_PRICE_TYPE,
        currencyCode: params.currencyCode || FUXION_DEFAULT_CURRENCY,
        warehouseID: params.warehouseID || FUXION_DEFAULT_WAREHOUSE,
        countryCode: params.countryCode || FUXION_DEFAULT_COUNTRY,
        customerTypeID: params.customerTypeID || FUXION_DEFAULT_CUSTOMER_TYPE
      });

      const products = Array.isArray(response)
        ? response.map(mapFuxionProductToProduct)
        : [];

      return {
        products,
        pagination: {
          page: 1,
          limit: products.length,
          total: products.length,
          pages: 1
        }
      };
    }
    throw new Error('API no configurada');
  },

  search: async (query, params = {}) => {
    if (USE_FUXION_API) {
      const response = await fuxionApi.maestro.getProductSearchText({
        desCon: query,
        priceTypeId: params.priceTypeId || FUXION_DEFAULT_PRICE_TYPE,
        currencyCode: params.currencyCode || FUXION_DEFAULT_CURRENCY,
        warehouseID: params.warehouseID || FUXION_DEFAULT_WAREHOUSE,
        countryCode: params.countryCode || FUXION_DEFAULT_COUNTRY,
        idioma: params.idioma || FUXION_DEFAULT_IDIOMA
      });

      const products = Array.isArray(response)
        ? response.map(mapFuxionProductToProduct)
        : [];

      return {
        products,
        pagination: {
          page: 1,
          limit: products.length,
          total: products.length,
          pages: 1
        }
      };
    }
    throw new Error('API no configurada');
  },

  getFeatured: async (params = {}) => {
    if (USE_FUXION_API) {
      const response = await fuxionApi.maestro.getProductItemsAgrupados({
        parentID: 0,
        priceTypeId: params.priceTypeId || FUXION_DEFAULT_PRICE_TYPE,
        currencyCode: params.currencyCode || FUXION_DEFAULT_CURRENCY,
        warehouseID: params.warehouseID || FUXION_DEFAULT_WAREHOUSE,
        countryCode: params.countryCode || FUXION_DEFAULT_COUNTRY,
        customerTypeID: params.customerTypeID || FUXION_DEFAULT_CUSTOMER_TYPE
      });

      const products = Array.isArray(response)
        ? response.map(mapFuxionProductToProduct)
        : [];

      return {
        products,
        pagination: {
          page: 1,
          limit: products.length,
          total: products.length,
          pages: 1
        }
      };
    }
    throw new Error('API no configurada');
  },

  getNewArrivals: async (params = {}) => {
    return productService.getFeatured(params);
  },

  getCategories: async (params = {}) => {
    if (USE_FUXION_API) {
      const response = await fuxionApi.maestro.getCategoriasFuxionHabilitadas({
        countryCode: params.countryCode || FUXION_DEFAULT_COUNTRY,
        customerType: params.customerType || FUXION_DEFAULT_CUSTOMER_TYPE
      });

      const categories = Array.isArray(response)
        ? response.map(mapFuxionCategoryToCategory)
        : [];

      return categories;
    }
    throw new Error('API no configurada');
  },

  getCategoriasPadre: async (params = {}) => {
    if (USE_FUXION_API) {
      const response = await fuxionApi.maestro.getCategoriasFuxionPadre({
        countryCode: params.countryCode || FUXION_DEFAULT_COUNTRY,
        customerType: params.customerType || FUXION_DEFAULT_CUSTOMER_TYPE
      });

      const categories = Array.isArray(response)
        ? response.map(mapFuxionCategoryToCategory)
        : [];

      return categories;
    }
    throw new Error('API no configurada');
  },

  getLineaProductos: async (params = {}) => {
    if (USE_FUXION_API) {
      const response = await fuxionApi.maestro.getLineaProductos({
        countryCode: params.countryCode || FUXION_DEFAULT_COUNTRY,
        idioma: params.idioma || 'es'
      });
      return response;
    }
    throw new Error('API no configurada');
  },

  getProductImages: async (itemCode, params = {}) => {
    if (USE_FUXION_API) {
      const response = await fuxionApi.maestro.getProductItemImages({
        itemCode,
        countryCode: params.countryCode || FUXION_DEFAULT_COUNTRY,
        warehouseID: params.warehouseID || FUXION_DEFAULT_WAREHOUSE
      });
      return response;
    }
    throw new Error('API no configurada');
  }
};

export default productService;
