import { net } from './net';


const queryGoodsDetail = net.getApi('/api/v1/goods/detail/:id');

async () => {
  const r = await queryGoodsDetail({
    isSelling: true,
  }, {
    _restful: {
      id: '1',
    }
  });
  console.log(r.data.price)
}