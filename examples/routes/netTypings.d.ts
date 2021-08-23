import * as IReqRoutes from './request';
import * as IResRoutes from './response';

declare module 'astraea' {
  interface IReqGetRoutes extends IReqRoutes.IGetRoutes { }
  interface IResGetRoutes extends IResRoutes.IGetRoutes { }
  interface IReqPostRoutes extends IReqRoutes.IPostRoutes { }
  interface IResPostRoutes extends IResRoutes.IPostRoutes { }
  interface IReqPutRoutes extends IReqRoutes.IPutRoutes { }
  interface IResPutRoutes extends IResRoutes.IPutRoutes { }
  interface IReqDeleteRoutes extends IReqRoutes.IDeleteRoutes { }
  interface IResDeleteRoutes extends IResRoutes.IDeleteRoutes { }
}