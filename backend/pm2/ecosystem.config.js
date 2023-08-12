module.exports = {
  apps : [
    {
      name: 'Checkout',
      script: 'npx tsx ../checkout/src/main-api.ts',
    }, 
    {
      name: 'Catalog',
      script: 'npx tsx ../catalog/src/main-api.ts',
    }, 
    {
      name: 'Freight',
      script: 'npx tsx ../freight/src/main-api.ts',
    }, 
    {
      name: 'Auth',
      script: 'npx tsx ../auth/src/main-api.ts',
    }, 
  ],
};
