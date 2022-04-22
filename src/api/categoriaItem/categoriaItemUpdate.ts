import PermissionChecker from '../../services/user/permissionChecker';
import ApiResponseHandler from '../apiResponseHandler';
import Permissions from '../../security/permissions';
import CategoriaService from '../../services/categoriaItemService';

export default async (req, res, next) => {
  try {
    // new PermissionChecker(req).validateHas(
    //   Permissions.values.categoriaItemEdit,
    // );

    const payload = await new CategoriaService(req).update(
      req.params.id,
      req.body.data,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
