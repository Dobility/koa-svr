export const getShopById = async (id: number) => [
  { id: 1, name: 'shopA' },
  { id: 2, name: 'shopB' },
  { id: 3, name: 'shopC' },
].find(s => s.id === id);
